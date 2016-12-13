/*global windowfactory,fin,SyncCallback,EventHandler*/
/*jshint bitwise: false*/
(function () {
    if (windowfactory._isRenderer && !windowfactory._isBackend && windowfactory.runtime.isBrowser) {
        const geometry = windowfactory.geometry;
		const Vector = geometry.Vector;
		const Position = geometry.Position;
		const Size = geometry.Size;
		const BoundingBox = geometry.BoundingBox;
		const currentWin = window;
		const defaultConfig = {
			width: 600,
			height: 600,
			frame: false,
			resizable: true,
			saveWindowState: false,
			autoShow: true,
			icon: location.href + "favicon.ico",
			url: ".",
			minWidth: 100,
			minHeight: 100,
			maxWidth: Infinity,
			maxHeight: Infinity
		};
		const configMap = {
		};
        const acceptedEventHandlers = [
			"drag-start", "drag-before", "drag-stop",
			"dock-before",
			"move", "move-before",
			"resize-before", "close", "minimize"];
		const transformPropNames = ["-ms-transform", "-moz-transform", "-o-transform",
									"-webkit-transform", "transform"];

		const Window = function (config) {
			if (!(this instanceof Window)) { return new Window(config); }

			config = config || {}; // If no arguments are passed, assume we are creating a default blank window
			const isArgConfig = !(config instanceof window.Window);

			// Call the parent constructor:
			EventHandler.call(this, acceptedEventHandlers);
            this._ready = false;
            this._isClosed = false;
			this._isHidden = false;
			this._isMinimized = false;
			this._isMaximized = false;
			this._dockedGroup = [this];
			this._children = []; // TODO: Add way to remove or change heirarchy.
			this._parent = undefined;

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

				if (config.parent) {
					config.parent._children.push(this);
					this._parent = config.parent;
					// TODO: Emit event "child-added" on parent
					delete config.parent;
				}

				this._minSize = new BoundingBox(config.minWidth, config.minHeight);
				this._maxSize = new BoundingBox(config.maxWidth, config.maxHeight);
				let newWindow = windowfactory._launcher.document.createElement("iframe");
				newWindow.src = config.url;
				newWindow.style.position = "absolute";
				if (!Number.isFinite(config.left)) {
					config.left = (windowfactory._launcher.innerWidth - config.width) / 2;
				}
				newWindow.style.left = config.left  + "px";
				if (!Number.isFinite(config.top)) {
					config.top = (windowfactory._launcher.innerHeight - config.height) / 2;
				}
				newWindow.style.top = config.top + "px";
				newWindow.style.width = config.width + "px";
				newWindow.style.height = config.height + "px";
				newWindow.style.minWidth = this._minSize.left + "px";
				newWindow.style.minHeight = this._minSize.top + "px";
				newWindow.style.maxWidth = this._maxSize.left + "px";
				newWindow.style.maxHeight = this._maxSize.top + "px";
				newWindow.style.margin = 0;
				newWindow.style.padding = 0;
				newWindow.style.border = 0;
				newWindow.style.resize = "both";
				newWindow.style.overflow = "auto";
				windowfactory._launcher.document.body.appendChild(newWindow);

				this._window = newWindow;
				windowfactory._windows.push(this);
				this._ready = true;
				this.emit("ready");
				windowfactory._internalBus.emit("window-create", this);
				this.bringToFront();
				this.focus();
			} else {
				this._minSize = new BoundingBox(defaultConfig.minWidth, defaultConfig.minHeight);
				this._maxSize = new BoundingBox(defaultConfig.maxWidth, defaultConfig.maxHeight);
				this._window = config;
				windowfactory._windows.push(this);
				this._ready = true;
				//this._setupDOM();
			}
		};
		// Inherit EventHandler
		Window.prototype = Object.create(EventHandler.prototype);
		// Correct the constructor pointer because it points to EventHandler:
		Window.prototype.constructor = Window;

		/*Window.prototype._setupDOM = function () {
			let thisWindow = this;
			// TODO: Rewrite to remove setTimeout for the following:
			function setWindows() {
				if (thisWindow._window.contentWindow.windowfactory) {
					thisWindow._window.contentWindow.windowfactory._windows = windowfactory._windows;
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
                thisWindow._isClosed = true;
				delete windowfactory._windows[thisWindow._window.name];
				thisWindow.undock();
                thisWindow.emit("close");
                thisWindow._window = undefined;
                // TODO: Clean up ALL listeners
            }
            this._window.addEventListener("closed", onClose);
			this._ready = true;
			// Notify Subscribers
		}*/

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
			return new Position(this._window.getBoundingClientRect());
		};

		Window.prototype.getMinWidth = function () {
			return this._minSize.left;
		};
		Window.prototype.getWidth = function () {
			return this._window.getBoundingClientRect().width;
		};
		Window.prototype.getMaxWidth = function () {
			return this._maxSize.left;
		};

		Window.prototype.getMinHeight = function () {
			return this._minSize.top;
		};
		Window.prototype.getHeight = function () {
			return this._window.getBoundingClientRect().height;
		};
		Window.prototype.getMaxHeight = function () {
			return this._maxSize.top;
		};

		Window.prototype.getMinSize = function () {
			return this._minSize.clone();
		};
		Window.prototype.getSize = function () {
			let box = this._window.getBoundingClientRect();
			return new Size(box.width, box.height);
		};
		Window.prototype.getMaxSize = function () {
			return this._maxSize.clone();
		};

		Window.prototype.getBounds = function () {
			return new BoundingBox(this._window.getBoundingClientRect());
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

			this._window.parentElement.removeChild(this._window);
			let index = windowfactory._windows.indexOf(this);
			if (index >= 0) { windowfactory._windows.splice(index, 1); }

			// Undock:
			this.undock();

			// Move children to parent:
			const parent = this.getParent();
			for (const child of this.getChildren()) {
				// We use getChildren to have a copy of the list, so child.setParent doesn't modify this loop's list!
				// TODO: Optimize this loop, by not making a copy of children, and not executing splice in each setParent!
				child.setParent(parent);
			}
			this.setParent(undefined); // Remove from parent

			this._isClosed = true;
			if (callback) { callback(); }
			this.emit("close");
			windowfactory._internalBus.emit("window-close", this);
		};

		Window.prototype.minimize = function (callback) {
			if (!this._ready) { throw "minimize can't be called on an unready window"; }

			// TODO: What do we do on minimize in this runtime?
			for (let window of this._dockedGroup) {
				window._isMinimized = true;
				window.emit("minimize");
			}
		};

		Window.prototype.maximize = function (callback) {
			if (!this._ready) { throw "maximize can't be called on an unready window"; }

			this._restoreBounds = this.getBounds();
			this._window.style.left = 0;
			this._window.style.top = 0;
			this._window.style.width = "100%";
			this._window.style.height = "100%";
			this._isMaximized = true;
			if (callback) { callback(); }
		};

		Window.prototype.show = function (callback) {
			if (!this._ready) { throw "show can't be called on an unready window"; }

			for (let window of this._dockedGroup) {
				window._window.style.display = "";
				window._isHidden = false;
			}
			if (callback) { callback(); }
		};

		Window.prototype.hide = function (callback) {
			if (!this._ready) { throw "hide can't be called on an unready window"; }

			for (let window of this._dockedGroup) {
				window._window.style.display = "none";
				window._isHidden = true;
			}
			if (callback) { callback(); }
		};

		Window.prototype.restore = function (callback) {
			if (!this._ready) { throw "restore can't be called on an unready window"; }

			for (let window of this._dockedGroup) {
				if (window._isMaximized) {
					window._window.style.left = window._restoreBounds.left + "px";
					window._window.style.top = window._restoreBounds.top + "px";
					window._window.style.width = window._restoreBounds.getWidth() + "px";
					window._window.style.height = window._restoreBounds.getHeight() + "px";
					window._isHidden = false;
					window._isMinimized = false;
					window._isMaximized = false;
				}
			}
			if (callback) { callback(); }
		};

		Window.prototype.bringToFront = function (callback) {
			if (!this._ready) { throw "bringToFront can't be called on an unready window"; }

			for (let window of this._dockedGroup) {
				if (window !== this) {
					window._window.style["z-index"] = windowfactory._getNextZIndex();
				}
			}
			this._window.style["z-index"] = windowfactory._getNextZIndex();
			if (callback) { callback(); }
		};

		Window.prototype.focus = function (callback) {
			if (!this._ready) { throw "focus can't be called on an unready window"; }

			for (let window of this._dockedGroup) {
				if (window !== this) { window._window.contentWindow.focus(); }
			}
			this._window.contentWindow.focus();
			if (callback) { callback(); }
		};

		Window.prototype.resizeTo = function (width, height, callback) {
			if (!this._ready) { throw "resizeTo can't be called on an unready window"; }
			if (!this.emit("resize-before")) { return; } // Allow preventing resize
			let size = new Position(width, height);

			this.undock();
			this._window.width = size.left + "px";
			this._window.height = size.top + "px";
			if (callback) { callback(); }
		};

		Window.prototype.moveTo = function (left, top, callback) {
			if (!this._ready) { throw "moveTo can't be called on an unready window"; }
			if (!this.emit("move-before")) { return; } // Allow preventing move
			let deltaPos = (new Position(left, top)).subtract(this.getPosition());

			for (let window of this._dockedGroup) {
				let pos = window.getPosition().add(deltaPos);
				window._window.style.left = pos.left + "px";
				window._window.style.top = pos.top + "px";
			}
			if (callback) { callback(); }
		};

		Window.prototype.moveBy = function (deltaLeft, deltaTop, callback) {
			if (!this._ready) { throw "moveBy can't be called on an unready window"; }
			if (!this.emit("move-before")) { return; } // Allow preventing move
			let deltaPos = new Position(deltaLeft, deltaTop);

			for (let window of this._dockedGroup) {
				let pos = window.getPosition().add(deltaPos);
				window._window.style.left = pos.left + "px";
				window._window.style.top = pos.top + "px";
			}
			if (callback) { callback(); }
			for (let window of this._dockedGroup) {
				window.emit("move");
			}
		};

		Window.prototype.setMinSize = function (width, height, callback) {
			if (!this._ready) { throw "setMinSize can't be called on an unready window"; }
			const size = new Size(width, height);

			this.undock(); // TODO: Support changing size when docked.
			this._minSize.left = size.left;
			this._minSize.top = size.top;
			this._window.style.minWidth = this._minSize.left + "px";
			this._window.style.minHeight = this._minSize.top + "px";
			if (this.getWidth() < size.left || this.getHeight() < size.top) {
				// Resize window to meet new min size:
				// TODO: Take into account transform?
				this._window.style.width = Math.max(this.getWidth(), size.left) + "px";
				this._window.style.height = Math.max(this.getHeight(), size.top) + "px";
				if (callback) { callback(); }
				this.emit("resize");
			} else {
				if (callback) { callback(); }
			}
		};
		Window.prototype.setSize = function (width, height, callback) {
			if (!this._ready) { throw "setMaxSize can't be called on an unready window"; }
			const size = new Size(width, height);

			this.undock(); // TODO: Support changing size when docked.
			this._window.style.width = Math.min(this._maxSize.left, Math.max(this._minSize.left, size.left)) + "px";
			this._window.style.height = Math.min(this._maxSize.top, Math.max(this._minSize.top, size.top)) + "px";
			// Clear transform:
			for (let transformPropName of transformPropNames) {
              this._window.style[transformPropName] = "";
            }
			if (callback) { callback(); }
			this.emit("resize");
		};
		Window.prototype.forceScaledSize = function (width, height, callback) {
			if (!this._ready) { throw "setMaxSize can't be called on an unready window"; }
			const size = new Size(Math.min(this._maxSize.left, Math.max(this._minSize.left, width)),
								Math.min(this._maxSize.top, Math.max(this._minSize.top, height)));

			this.undock(); // TODO: Support changing size when docked.
			this._window.style.width = size.left + "px";
			this._window.style.height = size.top + "px";
			// TODO: Calc transform:
            let transform = Math.min(width / size.left, height / size.top);
			for (let transformPropName of transformPropNames) {
              this._window.style[transformPropName] = "scale(" + transform + ")";
            }
			if (callback) { callback(); }
			this.emit("resize");
		};
		Window.prototype.setMaxSize = function (width, height, callback) {
			if (!this._ready) { throw "setMaxSize can't be called on an unready window"; }
			const size = new Size(width, height);

			this.undock(); // TODO: Support changing size when docked.
			this._maxSize.left = size.left;
			this._maxSize.top = size.top;
			this._window.style.maxWidth = this._maxSize.left + "px";
			this._window.style.maxHeight = this._maxSize.top + "px";
			if (this.getWidth() > size.left || this.getHeight() > size.top) {
				// Resize window to meet new min size:
				// TODO: Take into account transform?
				this._window.style.width = Math.min(this.getWidth(), size.left) + "px";
				this._window.style.height = Math.min(this.getHeight(), size.top) + "px";
				// Clear transform:
				for (let transformPropName of transformPropNames) {
				this._window.style[transformPropName] = "";
				}
				if (callback) { callback(); }
				this.emit("resize");
			} else {
				if (callback) { callback(); }
			}
		};

		Window.prototype.setBounds = function (left, top, right, bottom, callback) {
			if (!this._ready) { throw "resizeTo can't be called on an unready window"; }
			let bounds = new BoundingBox(left, top, right, bottom);

			this.undock(); // TODO: Support changing size when docked.
			this._window.style.left = bounds.left + "px";
			this._window.style.top = bounds.top + "px";
			// TODO: Take into account transform?
			this._window.style.width = Math.min(this._maxSize.left, Math.max(this._minSize.left, bounds.getWidth())) + "px";
			this._window.style.height = Math.min(this._maxSize.top, Math.max(this._minSize.top, bounds.getHeight())) + "px";
			// Clear transform:
			for (let transformPropName of transformPropNames) {
              this._window.style[transformPropName] = "";
            }
			// TODO: Events
			if (callback) { callback(); }
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
			this.restore();
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
			for (const other of windowfactory._windows) {
				if (other._dockedGroup !== this._dockedGroup) {
					snapDelta.setMin(thisBounds.getSnapDelta(other.getBounds()));
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

				other._window.style.left = (pos.left + deltaLeft) + "px";
				other._window.style.top = (pos.top + deltaTop) + "px";
				//let transformMatrix = [1, 0, 0, 1, pos.left + deltaLeft, pos.top + deltaTop];
				//other._window.style.transform = "matrix(" + transformMatrix.join() + ")";
				//other._window.style.transform = "translate(" + (pos.left + deltaLeft) + "px," + (pos.top + deltaTop) + "px)";
				other.emit("move");
			}
		};

		Window.prototype._dragStop = function () {
			// Dock to those it snapped to:
			const thisBounds = this.getBounds();
			for (const other of windowfactory._windows) {
				if (thisBounds.isTouching(other.getBounds())) {
					this.dock(other);
				}
			}

			for (let window of this._dockedGroup) {
				delete window._dragStartPos;
			}

			this.emit("drag-stop");
		};

        // Handle current window in this context:
		Window.current = (function () {
			for (let win of windowfactory._windows) {
				if (win._window.contentWindow === window) { return win; }
			}
		})();

		Window.getAll = function () {
			return windowfactory._windows.slice();
		};

		// Add launcher to list of windows:
		if (windowfactory.isLauncher) { let _ = new Window(window); }

        Object.assign(windowfactory, {
            Window: Window
        });
	}
})();