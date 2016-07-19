/*global windowfactory,fin,SyncCallback*/
/*jshint bitwise: false*/
(function () {
    if (windowfactory.isRenderer && !windowfactory.isBackend && windowfactory.browserVersion) {
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
			url: "."
		};
		const configMap = {
		};
        const acceptedEventHandlers = ["move", "close"];

		const Window = function (config) {
			if (!(this instanceof Window)) { return new Window(config); }

			config = config || {}; // If no arguments are passed, assume we are creating a default blank window
			const isArgConfig = !(config instanceof window.Window);

            this._ready = false;
            this._isClosed = false;
			this._isMaximized = false;
			this._dockedGroup = [this];
            // Setup handlers:
            // TODO: Look into making these special properties that can't be deleted?
            this._eventListeners = {};
            for (let index = 0; index < acceptedEventHandlers.length; index += 1) {
                this._eventListeners[acceptedEventHandlers[index]] = [];
            }

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

				let newWindow = windowfactory._launcher.document.createElement("iframe");
				newWindow.src = config.url;
				newWindow.style.position = "absolute";
				newWindow.style.left = (config.left || ((windowfactory._launcher.innerWidth - config.width)/2)) + "px";
				newWindow.style.top = (config.top || ((windowfactory._launcher.innerHeight - config.height)/2)) + "px";
				newWindow.style.width = config.width + "px";
				newWindow.style.height = config.height + "px";
				newWindow.style.margin = 0;
				newWindow.style.padding = 0;
				newWindow.style.border = 0;
				windowfactory._launcher.document.body.appendChild(newWindow);

				this._window = newWindow;
				this._ready = true;
				this.bringToFront();
				this.focus();
			} else {
				this._window = config;
				this._ready = true;
				//this._setupDOM();
			}
			windowfactory._windows.push(this);

			// TODO: Ensure docking system
		}

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

        /*Window.prototype.on = function (eventName, eventListener) {
            // TODO: Don't allow if window is closed!
            eventName = eventName.toLowerCase();

            // Check if this event can be subscribed to via this function:
            if (this._eventListeners[eventName] === undefined) { return; }

            // Check if eventListener is a function:
            if (!eventListener || eventListener.constructor !== Function) {
                throw "on requires argument 'eventListener' of type Function";
            }

            // Check if eventListener is already added:
            if (this._eventListeners[eventName].indexOf(eventListener) >= 0) { return; }

            // Add event listener:
            this._eventListeners[eventName].push(eventListener);
        };

        Window.prototype.once = function (eventName, eventListener) {
            function onceListener() {
                this.off(eventName, onceListener);
                eventListener.apply(this, arguments);
            }
            this.on(eventName, onceListener);
        };

        Window.prototype.off = function (eventName, eventListener) {
            eventName = eventName.toLowerCase();

            // If event listeners don't exist, bail:
            if (this._eventListeners[eventName] === undefined) { return; }

            // Check if eventListener is a function:
            if (!eventListener || eventListener.constructor !== Function) {
                throw "off requires argument 'eventListener' of type Function";
            }

            // Remove event listener, if exists:
            const index = this._eventListeners[eventName].indexOf(eventListener);
            if (index >= 0) { this._eventListeners[eventName].splice(index, 1); }
        };

        Window.prototype.clearEvent = function (eventName) {
            eventName = eventName.toLowerCase();

            // If event listeners don't exist, bail:
            if (this._eventListeners[eventName] === undefined) { return; }

            this._eventListeners[eventName] = [];
        };

        Window.prototype.emit = function (eventName) {
            eventName = eventName.toLowerCase();

            // If event listeners don't exist, bail:
            if (this._eventListeners[eventName] === undefined) { return; }

            // Get arguments:
            let args = new Array(arguments.length - 1);
            for (let index = 1; index < arguments.length; index += 1) {
                args[index - 1] = arguments[index];
            }

            for (let index = 0; index < this._eventListeners[eventName].length; index += 1) {
                // Call listener with the 'this' context as the current window:
                this._eventListeners[eventName][index].apply(this, args);
            }
        };*/

        Window.prototype.isReady = function () {
            return this._window !== undefined;
        };

        Window.prototype.isClosed = function () {
            return this._isClosed;
        };

		Window.prototype.getPosition = function () {
			return new Position(this._window.getBoundingClientRect());
		};

		Window.prototype.getWidth = function () {
			return this._window.getBoundingClientRect().width;
		};

		Window.prototype.getHeight = function () {
			return this._window.getBoundingClientRect().height;
		};

		Window.prototype.getSize = function () {
			let box = this._window.getBoundingClientRect();
			return new Size(box.width, box.height);
		};

		Window.prototype.getBounds = function () {
			return new BoundingBox(this._window.getBoundingClientRect());
		};




		Window.prototype.close = function (callback) {
			this._window.parentElement.removeChild(this._window);
			let index = windowfactory._windows.indexOf(this);
			if (index >= 0) { windowfactory._windows.splice(index, 1); }
			this._isClosed = true;
			if (callback) { callback(); }
		};

		/*Window.prototype.minimize = function (callback) {
			if (!this._ready) { throw "minimize can't be called on an unready window"; }

			callback = new SyncCallback(callback);
			for (let window of this._dockedGroup) {
				window._window.minimize(callback.ref());
			}
		};*/

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
			}
			if (callback) { callback(); }
		};

		Window.prototype.hide = function (callback) {
			if (!this._ready) { throw "hide can't be called on an unready window"; }

			for (let window of this._dockedGroup) {
				window._window.style.display = "none";
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
			let size = new Position(width, height);

			this.undock();
			this._window.width = size.left;
			this._window.height = size.top;
			if (callback) { callback(); }
		};

		Window.prototype.moveTo = function (left, top, callback) {
			if (!this._ready) { throw "moveTo can't be called on an unready window"; }
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
			let deltaPos = new Position(deltaLeft, deltaTop);

			for (let window of this._dockedGroup) {
				let pos = window.getPosition().add(deltaPos);
				window._window.style.left = pos.left + "px";
				window._window.style.top = pos.top + "px";
			}
			if (callback) { callback(); }
		};

		Window.prototype.setBounds = function (left, top, right, bottom, callback) {
			if (!this._ready) { throw "resizeTo can't be called on an unready window"; }
			let bounds = new BoundingBox(left, top, right, bottom);

			this.undock();
			this._window.style.left = bounds.left + "px";
			this._window.style.top = bounds.top + "px";
			this._window.style.width = bounds.getWidth() + "px";
			this._window.style.height = bounds.getHeight() + "px";
			if (callback) { callback(); }
		};

		Window.prototype.dock = function (other) {
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
			this.restore();
			for (let window of this._dockedGroup) {
				window._dragStartPos = window.getPosition();
			}
		};

		Window.prototype._dragBy = function (deltaLeft, deltaTop) {
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
		};

        // Handle current window in this context:
		Window.current = (function () {
			for (let win of windowfactory._windows) {
				if (win._window.contentWindow === window) { return win; }
			}
		})();

        Object.assign(windowfactory, {
            Window: Window
        });
	}
})();