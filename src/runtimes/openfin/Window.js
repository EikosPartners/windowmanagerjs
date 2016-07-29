/*global windowfactory,fin,SyncCallback,EventHandler*/
/*jshint bitwise: false*/
(function () {
    if (windowfactory.isRenderer && !windowfactory.isBackend && windowfactory.openfinVersion) {
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
			left: "defaultLeft",
			top: "defaultTop",
			width: "defaultWidth",
			height: "defaultHeight"
		};
        const acceptedEventHandlers = [
			"drag-start", "drag-before", "drag-stop",
			"dock-before",
			"move", "move-before",
			"resize-before", "close", "minimize"];

		let lut = [];
		for (let i = 0; i < 256; i += 1) { lut[i] = (i < 16 ? "0" : "") + (i).toString(16); }
		const genUIDE7 = function () {
			let d0 = Math.random()*0xffffffff|0;
			let d1 = Math.random()*0xffffffff|0;
			let d2 = Math.random()*0xffffffff|0;
			let d3 = Math.random()*0xffffffff|0;
			return lut[d0&0xff]+lut[d0>>8&0xff]+lut[d0>>16&0xff]+lut[d0>>24&0xff]+"-"+
			lut[d1&0xff]+lut[d1>>8&0xff]+"-"+lut[d1>>16&0x0f|0x40]+lut[d1>>24&0xff]+"-"+
			lut[d2&0x3f|0x80]+lut[d2>>8&0xff]+"-"+lut[d2>>16&0xff]+lut[d2>>24&0xff]+
			lut[d3&0xff]+lut[d3>>8&0xff]+lut[d3>>16&0xff]+lut[d3>>24&0xff];
		}
		const getUniqueWindowName = function () {
			return "window" + genUIDE7() + (new Date()).getTime();
		}

		const Window = function (config) {
			if (!(this instanceof Window)) { return new Window(config); }

			config = config || {}; // If no arguments are passed, assume we are creating a default blank window
			const isArgConfig = (config["app_uuid"] === undefined);

			// Call the parent constructor:
			EventHandler.call(this, acceptedEventHandlers);
			this._bounds = new BoundingBox();
            this._ready = false;
            this._isClosed = false;
			this._dockedGroup = [this];

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
				config.name = getUniqueWindowName();

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
                thisWindow._isClosed = true;
				delete windowfactory._windows[thisWindow._window.name];
				thisWindow.undock();
                thisWindow.emit("close");
                thisWindow._window = undefined;
                // TODO: Clean up ALL listeners
            }
            this._window.addEventListener("closed", onClose);

			function onMinimized() {
				thisWindow.emit("minimize");
			}
			this._window.addEventListener("minimized", onMinimized);

			this._ready = true;
			// TODO: Notify onReady Subscribers
			windowfactory._internalBus.emit("window-create", this);
		}

        Window.getCurrent = function () {
            return Window.current;
        };

        Window.prototype.isReady = function () {
            return this._window !== undefined;
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




		Window.prototype.close = function (callback) {
			this._window.close(callback);
		};

		Window.prototype.minimize = function (callback) {
			if (!this._ready) { throw "minimize can't be called on an unready window"; }

			callback = new SyncCallback(callback);
			for (let window of this._dockedGroup) {
				window._window.minimize(callback.ref());
			}
		};

		Window.prototype.maximize = function (callback) {
			if (!this._ready) { throw "maximize can't be called on an unready window"; }

			this._window.maximize(callback);
		};

		Window.prototype.show = function (callback) {
			if (!this._ready) { throw "show can't be called on an unready window"; }

			callback = new SyncCallback(callback);
			for (let window of this._dockedGroup) {
				window._window.show(callback.ref());
			}
		};

		Window.prototype.hide = function (callback) {
			if (!this._ready) { throw "hide can't be called on an unready window"; }

			callback = new SyncCallback(callback);
			for (let window of this._dockedGroup) {
				window._window.hide(callback.ref());
			}
		};

		Window.prototype.restore = function (callback) {
			if (!this._ready) { throw "restore can't be called on an unready window"; }

			callback = new SyncCallback(callback);
			for (let window of this._dockedGroup) {
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
			if (!this._ready) { throw "setMaxSize can't be called on an unready window"; }
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