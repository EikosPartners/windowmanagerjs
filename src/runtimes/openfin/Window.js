/*global windowfactory,fin,SyncCallback,EventHandler*/
/*jshint eqnull: true*/
(function () {
    if (windowfactory._isRenderer && !windowfactory._isBackend && windowfactory.runtime.isOpenFin) {
        const geometry = windowfactory.geometry;
		const Vector = geometry.Vector;
		const Position = geometry.Position;
		const Size = geometry.Size;
		const BoundingBox = geometry.BoundingBox;
		let currentWin;// = fin.desktop.Window.getCurrent();
		const defaultConfig = {
			defaultWidth: 600,
			defaultHeight: 600,
			frame: false,
			resizable: true,
			saveWindowState: false,
			autoShow: true,
			icon: location.href + "favicon.ico"
		};
		const configMap = {
			title: "name",
			left: "defaultLeft",
			top: "defaultTop",
			width: "defaultWidth",
			height: "defaultHeight"
		};
        const acceptedEventHandlers = [
			"ready",
			"drag-start", "drag-before", "drag-stop",
			"dock-before",
			"move", "move-before",
			"resize-before", "close", "minimize"];

		const Window = function (config) {
			if (!(this instanceof Window)) { return new Window(config); }

			config = config || {}; // If no arguments are passed, assume we are creating a default blank window
			const isArgConfig = (/*jshint camelcase: false*/config.app_uuid/*jshint camelcase: true*/ === undefined);

			// Call the parent constructor:
			EventHandler.call(this, acceptedEventHandlers);
			this._bounds = new BoundingBox();
            this._ready = false;
            this._isClosed = false;
            this._isHidden = false;
            this._isMinimized = false;
            this._isMaximized = false;
			this._dockedGroup = [this];
			this._children = [];
			this._parent = undefined;
			this._title = undefined;
			this._id = windowfactory.getUniqueWindowName();

			if (isArgConfig) {
				for (const prop in config) {
					if (config.hasOwnProperty(prop) && configMap[prop] !== undefined) {
						config[configMap[prop]] = config[prop];
						delete config[prop];
					}
				}
				for (const prop in defaultConfig) {
					if (defaultConfig.hasOwnProperty(prop)) {
						config[prop] = config[prop] || defaultConfig[prop];
					}
				}
				this._title = config.title == null ? this._id : config.title;
				config.name = this._id; // Need name to be unique

				if (config.parent) {
					config.parent._children.push(this);
					this._parent = config.parent;
					// TODO: Emit event "child-added" on parent
					delete config.parent;
				}

				windowfactory._windows[config.name] = this;
				this._window = new fin.desktop.Window(config, this._setupDOM.bind(this), function (err) {
					console.error(err, config);
				});
			} else {
				this._window = config;
				windowfactory._windows[this._window.name] = this;
				this._setupDOM();
			}

			// TODO: Ensure docking system
		};
		// Inherit EventHandler
		Window.prototype = Object.create(EventHandler.prototype);
		// Correct the constructor pointer because it points to EventHandler:
		Window.prototype.constructor = Window;

		Window.prototype._setupDOM = function () {
			let thisWindow = this;
			// TODO: Rewrite to remove setTimeout for the following:
			function setWindows() {
				if (thisWindow._window.contentWindow.windowfactory) {
					thisWindow._window.contentWindow.windowfactory._windows = windowfactory._windows;
					thisWindow._window.contentWindow.windowfactory._internalBus = windowfactory._internalBus;
				} else {
					setTimeout(setWindows, 5);
				}
			}
			setWindows();

			this._window.getBounds(function (bounds) {
				thisWindow._bounds.set(bounds.left, bounds.top, bounds.left + bounds.width, bounds.top + bounds.height);
			});

            // Setup _window event listeners:
            // TODO: look into moving these elsewhere, might not work if currentWin is closed, and thisWindow is not.
			function onBoundsChange(event) {
				thisWindow._bounds.set(event.left, event.top, event.left + event.width, event.top + event.height);
				if (event.changeType !== 0) {
					thisWindow.undock(); // Undock on resize. TODO: Allow resize with docking
				}
				if (event.changeType !== 1) {
                	thisWindow.emit("move"); // TODO: Pass what position it is at.
				}
			}
			this._window.addEventListener("bounds-changing", onBoundsChange);
			this._window.addEventListener("bounds-changed", onBoundsChange);

            function onClose() {
				// TODO: Is it possible that onClose might not be called when the window is closed?
				//       What if this event is set up on a window that has closed already, and then this window closes?
                thisWindow._isClosed = true;
				delete windowfactory._windows[thisWindow._window.name];

				// Undock:
				thisWindow.undock();

				// Move children to parent:
				const parent = thisWindow.getParent();
				for (const child of thisWindow.getChildren()) {
					// We use getChildren to have a copy of the list, so child.setParent doesn't modify this loop's list!
					// TODO: Optimize this loop, by not making a copy of children, and not executing splice in each setParent!
					child.setParent(parent);
				}
				thisWindow.setParent(undefined); // Remove from parent

                thisWindow.emit("close");
				windowfactory._internalBus.emit("window-close", thisWindow);
                thisWindow._window = undefined;
                // TODO: Clean up ALL listeners
            }
            this._window.addEventListener("closed", onClose);

			function onMinimized() {
				thisWindow.emit("minimize");
			}
			this._window.addEventListener("minimized", onMinimized);

			// Setup title element:
			this._titleEl = this._window.document.createElement("title");
			this._titleEl.innerText = this._title;
			this._window.document.head.appendChild(this._titleEl);

			this._ready = true;
			this.emit("ready");
			windowfactory._internalBus.emit("window-create", this);
		};

        Window.getCurrent = function () {
            return Window.current;
        };

        Window.prototype.isReady = function () {
            return this._ready;
        };
		Window.prototype.onReady = function (callback) {
			if (this.isClosed()) { throw "onReady can't be called on a closed window"; }
			if (this.isReady()) { return callback.call(this); }

			this.once("ready", callback);
		};

        Window.prototype.isClosed = function () {
            return this._isClosed;
        };

		Window.prototype.getPosition = function () {
			return this._bounds.getPosition();
		};

		Window.prototype.getWidth = function () {
			return this._bounds.getWidth();
		};

		Window.prototype.getHeight = function () {
			return this._bounds.getHeight();
		};

		Window.prototype.getSize = function () {
			return this._bounds.getSize();
		};

		Window.prototype.getBounds = function () {
			return this._bounds.clone();
		};

		Window.prototype.getParent = function () {
			return this._parent;
		};
		Window.prototype.setParent = function (parent) {
			// TODO: Execute appropriate checks (if not closed, and is this new parent a window)

			if (parent === this._parent) { return; }

			if (this._parent) {
				const index = this._parent._children.indexOf(this);
				if (index >= 0) { this._parent._children.splice(index, 1); }
				// TODO: Emit event "child-removed" on current parent.
			}

			if (parent) {
				this._parent = parent;
				this._parent._children.push(this);
				// TODO: Emit event "child-added on parent".
			}
		};

		Window.prototype.getChildren = function () {
			return this._children.slice();
		};
		Window.prototype.addChild = function (child) {
			child.setParent(this);
		};

		Window.prototype.getTitle = function () {
			return this._title;
		};
		Window.prototype.setTitle = function (newTitle) {
            if (!newTitle) { throw "setTitle requires one argument of type String"; }
			this._titleEl.innerText = this._title = newTitle;
		};

		Window.prototype.isHidden = function () {
			return this._isHidden;
		};
		Window.prototype.isShown = function () {
			return !this._isHidden;
		};

		Window.prototype.isMinimized = function () {
			return this._isMinimized;
		};
		Window.prototype.isRestored = function () {
			return this.isShown() && !this.isMinimized() && !this.isMaximized();
		};
		Window.prototype.isMaximized = function () {
			return this._isMaximized;
		};




		Window.prototype.close = function (callback) {
            if (this.isClosed()) { return callback && callback(); }
			this._window.close(callback);
		};

		Window.prototype.minimize = function (callback) {
			if (!this._ready) { throw "minimize can't be called on an unready window"; }

			callback = new SyncCallback(callback);
			for (let window of this._dockedGroup) {
				window._isMinimized = true;
				window._window.minimize(callback.ref());
			}
		};

		Window.prototype.maximize = function (callback) {
			if (!this._ready) { throw "maximize can't be called on an unready window"; }

			this._isMaximized = true;
			this._window.maximize(callback);
		};

		Window.prototype.show = function (callback) {
			if (!this._ready) { throw "show can't be called on an unready window"; }

			callback = new SyncCallback(callback);
			for (let window of this._dockedGroup) {
				window._isHidden = false;
				window._window.show(callback.ref());
			}
		};

		Window.prototype.hide = function (callback) {
			if (!this._ready) { throw "hide can't be called on an unready window"; }

			callback = new SyncCallback(callback);
			for (let window of this._dockedGroup) {
				window._isHidden = true;
				window._window.hide(callback.ref());
			}
		};

		Window.prototype.restore = function (callback) {
			if (!this._ready) { throw "restore can't be called on an unready window"; }

			callback = new SyncCallback(callback);
			for (let window of this._dockedGroup) {
				window._isHidden = false;
				window._isMinimized = false;
				window._isMaximized = false;
				window._window.restore(callback.ref());
			}
		};

		Window.prototype.bringToFront = function (callback) {
			if (!this._ready) { throw "bringToFront can't be called on an unready window"; }
			let thisWindow = this;

			let beforeCallback = new SyncCallback(function () {
				thisWindow._window.bringToFront(callback);
			});
			for (let window of this._dockedGroup) {
				if (window !== this) {
					window._window.bringToFront(beforeCallback.ref());
				}
			}
		};

		Window.prototype.focus = function (callback) {
			if (!this._ready) { throw "focus can't be called on an unready window"; }
			let thisWindow = this;

			let beforeCallback = new SyncCallback(function () {
				thisWindow._window.focus(callback);
			});
			for (let window of this._dockedGroup) {
				if (window !== this) {
					window._window.focus(beforeCallback.ref());
				}
			}
		};

		Window.prototype.resizeTo = function (width, height, callback) {
			if (!this._ready) { throw "resizeTo can't be called on an unready window"; }
			if (!this.emit("resize-before")) { return; } // Allow preventing resize
			let size = new Position(width, height);

			this._window.resizeTo(size.left, size.top, "top-left", callback);
		};

		Window.prototype.moveTo = function (left, top, callback) {
			if (!this._ready) { throw "moveTo can't be called on an unready window"; }
			if (!this.emit("move-before")) { return; } // Allow preventing move
			let deltaPos = (new Position(left, top)).subtract(this.getPosition());

			callback = new SyncCallback(callback);
			for (let window of this._dockedGroup) {
				let pos = window.getPosition().add(deltaPos);
				window._bounds.moveTo(pos);
				window._window.moveTo(pos.left, pos.top, callback.ref());
			}
		};

		Window.prototype.moveBy = function (deltaLeft, deltaTop, callback) {
			if (!this._ready) { throw "moveBy can't be called on an unready window"; }
			if (!this.emit("move-before")) { return; } // Allow preventing move
			let deltaPos = new Position(deltaLeft, deltaTop);

			callback = new SyncCallback(callback);
			for (let window of this._dockedGroup) {
				let pos = window.getPosition().add(deltaPos);
				window._bounds.moveTo(pos);
				window._window.moveTo(pos.left, pos.top, callback.ref());
			}
		};

		Window.prototype.setSize = function (width, height, callback) {
			if (!this._ready) { throw "setSize can't be called on an unready window"; }
			const size = new Size(width, height);

			this._window.resizeTo(size.left, size.top, "top-left", callback);
		};

		Window.prototype.setBounds = function (left, top, right, bottom, callback) {
			if (!this._ready) { throw "resizeTo can't be called on an unready window"; }
			let bounds = new BoundingBox(left, top, right, bottom);

			this._window.setBounds(bounds.left, bounds.top, bounds.right, bounds.bottom, callback);
		};

		Window.prototype.dock = function (other) {
			if (!this.emit("dock-before")) { return; } // Allow preventing dock
			if (other === undefined) { return; } // Failed to find other. TODO: Return error

			// If other is already in the group, return:
			if (this._dockedGroup.indexOf(other) >= 0) { return; }

			// Loop through all windows in otherGroup and add them to this's group:
			for (let other of other._dockedGroup) {
				this._dockedGroup.push(other);
				// Sharing the array between window objects makes it easier to manage:
				other._dockedGroup = this._dockedGroup;
			}

			//console.log("dock", thisWindow._dockedGroup);
			// TODO: Check if otherGroup is touching
		};
		Window.prototype.undock = function (other) {
			// Check to see if window is already undocked:
			if (this._dockedGroup.length === 1) { return; }

			// Undock this:
			this._dockedGroup.splice(this._dockedGroup.indexOf(this), 1);
			this._dockedGroup = [this];

			//console.log("undock", this._dockedGroup);
			// TODO: Redock those still touching, EXCEPT 'this'.
		};

		Window.prototype._dragStart = function () {
			if (!this.emit("drag-start")) { return; } // Allow preventing drag
			for (let window of this._dockedGroup) {
				window._dragStartPos = window.getPosition();
			}
		};

		Window.prototype._dragBy = function (deltaLeft, deltaTop) {
			if (!this.emit("drag-before")) { return; } // Allow preventing drag
			// Perform Snap:
			const thisBounds = this.getBounds().moveTo(this._dragStartPos.left + deltaLeft,
														this._dragStartPos.top + deltaTop);
			let snapDelta = new Vector(NaN, NaN);
			for (const otherID in windowfactory._windows) {
				if (windowfactory._windows.hasOwnProperty(otherID)) {
					let other = windowfactory._windows[otherID];
					if (other._dockedGroup !== this._dockedGroup) {
						snapDelta.setMin(thisBounds.getSnapDelta(other.getBounds()));
					}
				}
			}
			deltaLeft += snapDelta.left || 0;
			deltaTop += snapDelta.top || 0;

			for (let other of this._dockedGroup) {
				let pos = other._dragStartPos;

				// If other doesn't have a drag position, start it:
				if (pos === undefined) {
					pos = other._dragStartPos = other.getPosition();
					pos.left -= deltaLeft;
					pos.top -= deltaTop;
				}

				other._window.moveTo(pos.left + deltaLeft, pos.top + deltaTop);
			}
		};

		Window.prototype._dragStop = function () {
			// Dock to those it snapped to:
			const thisBounds = this.getBounds();
			for (const otherID in windowfactory._windows) {
				if (windowfactory._windows.hasOwnProperty(otherID)) {
					let other = windowfactory._windows[otherID];
					if (thisBounds.isTouching(other.getBounds())) {
						this.dock(other);
					}
				}
			}

			for (let window of this._dockedGroup) {
				delete window._dragStartPos;
			}

			this.emit("drag-stop");
		};

        // Handle current window in this context:
		// TODO: Rewrite to remove setTimeout for the following:
		fin.desktop.main(function () {
			currentWin = fin.desktop.Window.getCurrent();
			const getCurrent = function () {
				if (windowfactory._windows) {
					Window.current = windowfactory._windows[currentWin.name] || new Window(currentWin);
				} else {
					setTimeout(getCurrent, 5);
				}
			};
			getCurrent();
		});

        Window.getAll = function () {
			return Object.keys(windowfactory._windows).map(function (name) { return windowfactory._windows[name]; });
		};

        Object.assign(windowfactory, {
            Window: Window
        });
	}
})();