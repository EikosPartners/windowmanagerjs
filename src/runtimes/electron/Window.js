/*global windowfactory,nodeRequire,EventHandler*/
/*jshint eqnull: true*/
(function () {
    if (!windowfactory.runtime.isElectron) { return; }
    if (windowfactory._isRenderer) {
        const geometry = windowfactory.geometry;
        const Vector = geometry.Vector,
            Position = geometry.Position,
            Size = geometry.Size,
            BoundingBox = geometry.BoundingBox;
        const remote = nodeRequire("electron").remote;
        const path = nodeRequire("path");
        const url = nodeRequire("url");
        const BrowserWindow = remote.BrowserWindow;
        const currentWin = remote.getCurrentWindow();
        const defaultConfig = {
            width: 600,
            height: 600,
            frame: false,
            resizable: true,
            hasShadow: false,
            icon: "favicon.ico",
            webPreferences: {
                nodeIntegration: false,
                preload: nodeRequire.windowfactoryPath
            }
            //transparent: true
        };
        const configMap = {
            left: "x",
            top: "y"
        };
        const acceptedEventHandlers = [
			"drag-start", "drag-before", "drag-stop",
			"dock-before",
			"move", "move-before",
			"resize-before", "close", "minimize"];

        /**
         * @callback callback
         * @param {string|null} error - String on error, or null if no error
         * @param {object|null} result - Object on success, or null if error
         */

        /**
         * Wraps a window object.
         * @constructor
         * @alias Window
         * @param {object} config - Configuration
         */
        const Window = function (config) {
            if (!(this instanceof Window)) { return new Window(config); }

            config = config || {}; // If no arguments are passed, assume we are creating a default blank window
            const isArgConfig = (config.webContents === undefined); // TODO: Improve checking of arguments.

			// Call the parent constructor:
			EventHandler.call(this, acceptedEventHandlers);
            //this._id = windowfactory.getUniqueWindowName();

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
                let _url = config.url;
                delete config.url;

                this._window = new BrowserWindow(config);
                this._id = this._window.id;
				config.title = config.title == null ? this._id : config.title;
                // The following logic works like (in logical if-order):
                //       1. If url has "http" or "file" at start, then use url, no modification.
                //       2. If url has no "/", take location.href and remove all stuff up till last /, then append url.
                //       3. If url has "/":
                //          a. If location.href has "http", extract the root url (domain) and append url.
                //          b. If location.href has "file", take remote.getGlobal("workingDir"), and then append url.
                // Resolve url:
                if (!/^(file|http)/i.test(_url)) {
                    if (_url[0] !== "/") {
                        _url = url.resolve(location.href, _url); // TODO: Is this unsafe with ".."?
                    } else if (/^http/i.test(location.href)) {
                        _url = location.origin + _url; // TODO: Safe?
                    } else if (/^file/i.test(location.href)) {
                        _url = remote.getGlobal("workingDir") + _url; // TODO: Safe?
                    }
                    // If can't determine url to load, then attempt to just load the url.
                }
                this._window.loadURL(_url);
                this._window.setTitle(config.title);
                //this._window.loadURL(url[0] !== "/" ? url : path.join(remote.getGlobal("workingDir"), url));
            } else {
                this._window = config;
                this._id = this._window.id;
            }
            windowfactory._windows[this._id] = this;
            this._window._ensureDockSystem();

            // Setup _window event listeners:
            // TODO: look into moving these elsewhere, might not work if currentWin is closed, and thisWindow is not.
            const thisWindow = this;
            function _onmove() {
                thisWindow.emit("move"); // TODO: Pass what position it is at.
            }
            this._window.on("move", _onmove);

            function _onminimize() {
                thisWindow.emit("minimize"); // TODO: Pass what position it is at.
            }
            this._window.on("minimize", _onmove);

            function _onclose() {
                thisWindow._isClosed = true;
                thisWindow.emit("close");
                thisWindow._window = undefined;
                // TODO: Clean up ALL listeners
            }
            this._isClosed = false;
            this._isHidden = false;
            this._isMinimized = false;
            this._isMaximized = false;
            this._window.on("close", _onclose);

            currentWin.on("close", function () {
                delete windowfactory._windows[this._window.id];
                thisWindow.off("move", _onmove);
                thisWindow.off("close", _onclose);
                thisWindow.off("minimize", _onminimize);
            });


            this._ready = true;
            if (isArgConfig) { this._window._notifyReady(); }
        };
		// Inherit EventHandler
		Window.prototype = Object.create(EventHandler.prototype);
		// Correct the constructor pointer because it points to EventHandler:
        Window.prototype.constructor = Window;

        /**
         * @static
         * @returns {Window}
         */
        Window.getCurrent = function () {
            return Window.current;
        };

        /**
         * Calls a callback when window is ready and setup.
         * @method
         * @param {callback=}
         */
		Window.prototype.onReady = function (callback) {
			if (this.isClosed()) { throw "onReady can't be called on a closed window"; }
			if (this.isReady()) { return callback.call(this); }

			this.once("ready", callback);
		};

        /**
         * @method
         * @returns {bool}
         */
        Window.prototype.isReady = function () {
            return this._window !== undefined;
        };

        /**
         * @method
         * @returns {bool}
         */
        Window.prototype.isClosed = function () {
            return this._isClosed;
        };

        /**
         * @method
         * @returns {module:geometry.Vector}
         */
        Window.prototype.getPosition = function () {
            const pos = this._window.getPosition();

            return new Position(pos[0], pos[1]);
        };

        /**
         * @method
         * @returns {number}
         */
        Window.prototype.getWidth = function () {
            const size = this._window.getSize();

            return size[0];
        };

        /**
         * @method
         * @returns {number}
         */
        Window.prototype.getHeight = function () {
            const size = this._window.getSize();

            return size[1];
        };

        /**
         * @method
         * @returns {module:geometry.Position}
         */
        Window.prototype.getSize = function () {
            const size = this._window.getSize();

            return new Position(size[0], size[1]);
        };

        /**
         * @method
         * @returns {module:geometry.BoundingBox}
         */
        Window.prototype.getBounds = function () {
            const bounds = this._window.getBounds();

            return new BoundingBox(bounds.x, bounds.y, bounds.x + bounds.width, bounds.y + bounds.height);
        };

        /**
         * @method
         * @returns {String}
         */
		Window.prototype.getTitle = function () {
            return this._window.getTitle();
        };

        /**
         * @method
         * @param {String}
         */
		Window.prototype.setTitle = function (newTitle) {
            if (!newTitle) { throw "setTitle requires one argument of type String"; }
			this._window.setTitle(newTitle);
		};

        /**
         * @method
         * @returns {Boolean}
         */
		Window.prototype.isHidden = function () {
			return this._isHidden;
		};
        /**
         * @method
         * @returns {Boolean}
         */
		Window.prototype.isShown = function () {
			return !this._isHidden;
		};

        /**
         * @method
         * @returns {Boolean}
         */
		Window.prototype.isMinimized = function () {
			return this._isMinimized;
		};
        /** Similar to: isShown() && !isMinimized() && isMaximized()
         * @method
         * @returns {Boolean}
         */
		Window.prototype.isRestored = function () {
			return this.isShown() && !this.isMinimized() && !this.isMaximized();
		};
        /**
         * @method
         * @returns {Boolean}
         */
		Window.prototype.isMaximized = function () {
			return this._isMaximized;
		};




        /**
         * Closes the window instance.
         * @method
         * @param {callback=}
         */
        Window.prototype.close = function (callback) {
            if (this.isClosed()) { return callback && callback(); }

            this._window.close();
            if (callback) { callback(); }
        };

        /**
         * Minimizes the window instance.
         * @method
         * @param {callback=}
         */
        Window.prototype.minimize = function (callback) {
            if (!this._ready) { throw "minimize can't be called on an unready window"; }

            this._window._dockMinimize();
            if (callback) { callback(); }
        };

        /**
         * Maximizes the window instance.
         * @method
         * @param {callback=}
         */
        Window.prototype.maximize = function (callback) {
            if (!this._ready) { throw "maximize can't be called on an unready window"; }

            this._window.maximize();
            if (callback) { callback(); }
        };

        /**
         * Unhides the window instance.
         * @method
         * @param {callback=}
         */
        Window.prototype.show = function (callback) {
            if (!this._ready) { throw "show can't be called on an unready window"; }

            this._window._dockShow();
            if (callback) { callback(); }
        };

        /**
         * Hides the window instance.
         * @method
         * @param {callback=}
         */
        Window.prototype.hide = function (callback) {
            if (!this._ready) { throw "hide can't be called on an unready window"; }

            this._window._dockHide();
            if (callback) { callback(); }
        };

        /**
         * Restores the window instance from the minimized or maximized states.
         * @method
         * @param {callback=}
         */
        Window.prototype.restore = function (callback) {
            if (!this._ready) { throw "restore can't be called on an unready window"; }

            this._window.restore();
            if (callback) { callback(); }
        };

        /**
         * Brings the window instance to the front of all windows.
         * @method
         * @param {callback=}
         */
        Window.prototype.bringToFront = function (callback) {
            if (!this._ready) { throw "bringToFront can't be called on an unready window"; }

            this._window.setAlwaysOnTop(true);
            this._window.setAlwaysOnTop(false);
            if (callback) { callback(); }
        };

        /**
         * Sets focus to the window instance.
         * @method
         * @param {callback=}
         */
        Window.prototype.focus = function (callback) {
            if (!this._ready) { throw "focus can't be called on an unready window"; }

            this._window.focus();
            if (callback) { callback(); }
        };

        /**
         * Resizes the window instance.
         * @method
         * @param {number} width
         * @param {number} height
         * @param {callback=}
         */
        Window.prototype.resizeTo = function (width, height, callback) {
            if (!this._ready) { throw "resizeTo can't be called on an unready window"; }
            const size = new Position(width, height);

            this._window.setSize(size.left, size.top);
            if (callback) { callback(); }
        };

        /**
         * Moves the window instance.
         * @method
         * @param {number} left
         * @param {number} top
         * @param {callback=}
         */
        Window.prototype.moveTo = function (left, top, callback) {
            if (!this._ready) { throw "moveTo can't be called on an unready window"; }
            const pos = new Position(left, top);

            this._window._dockMoveTo(left, top);
            //this._window.setPosition(left, top);
            if (callback) { callback(); }
        };

        /**
         * Moves the window instance relative to its current position.
         * @method
         * @param {number} deltaLeft
         * @param {number} deltaTop
         * @param {callback=}
         */
        Window.prototype.moveBy = function (deltaLeft, deltaTop, callback) {
            if (!this._ready) { throw "moveBy can't be called on an unready window"; }
            const bounds = this.getBounds();
            const deltaPos = new Position(deltaLeft, deltaTop);

            this._window._dockMoveTo(bounds.left + deltaPos.left, bounds.top + deltaPos.top);
            //this._window.setPosition(bounds.left + deltaPos.left, bounds.top + deltaPos.top);
            if (callback) { callback(); }
        };

        /**
         * Sets the bounds of the window instance.
         * @method
         * @param {number} left
         * @param {number} top
         * @param {number} right
         * @param {number} bottom
         * @param {callback=}
         */
        Window.prototype.setBounds = function (left, top, right, bottom, callback) {
            if (!this._ready) { throw "resizeTo can't be called on an unready window"; }
            const bounds = new BoundingBox(left, top, right, bottom);

            this._window.setSize({
                x: left,
                y: top,
                width: right - left,
                height: bottom - top
            });
            if (callback) { callback(); }
        };

        Window.prototype.dock = function (other) {
            this._window.dock(other._window.id);
        };

        Window.prototype.undock = function () {
            this._window.undock();
        };



        // Handle current window in this context:
        Window.current = new Window(currentWin);

        Window.getAll = function () {
			return Object.keys(windowfactory._windows).map(function (name) { return windowfactory._windows[name]; });
        };

        Window.getByID = (id) => {
			return windowfactory._windows[id];
        };

        Object.assign(windowfactory, {
            Window: Window,
            _resolveWindowWithID: function (id) {
                return windowfactory._windows[id] || new Window(BrowserWindow.fromId(id));
            }
        });
    } else if (windowfactory._isBackend) {
        // This is Electron's main process:
        const {BrowserWindow, ipcMain} = global.nodeRequire("electron");

        if (BrowserWindow) {
            const {Vector, BoundingBox} = windowfactory.geometry;
            /*let nextMessageID = 0;
            BrowserWindow.prototype._emit = function (event, args, _callback) {
                let retVal = true;
                let callback = new SyncCallback(function () {
                    if (retVal) { _callback(); }
                });
                for (const other of BrowserWindow.getAllWindows()) {
                    ipcMain.once("_emit" + nextMessageID, callback.ref(function (val) {
                        retVal &= val;
                    }));
                    other.webContents.send("_emit" + nextMessageID, ...args);
                    nextMessageID += 1;
                }
            };*/
            // TODO: Solve event syncing between windows
            BrowserWindow.prototype._notifyReady = function () {
                for (let other of BrowserWindow.getAllWindows()) {
                    other.webContents.send("window-create", other.id);
                }
            };
            BrowserWindow.prototype._ensureDockSystem = function () {
                // Make sure docked group exists:
                if (this._dockedGroup === undefined) {
                    this._dockedGroup = [this];

                    this.on("closed", function () {
                        // Clean up the dock system when this window closes:
                        this.undock();
                    });

                    this.on("maximize", function () {
				        this.undock(); // TODO: Support changing size when docked.
                    });
                    this.on("minimize", function () {
                        this._dockMinimize();
                    });


                    this.on("restore", function () {
                        for (let other of this._dockedGroup) {
                            if (other !== this) {
                                other.restore();
                            }
                        }
                    });

                    let lastBounds = this.getBounds();
                    this.on("move", function () {
                        const newBounds = this.getBounds();
                        //this._dockMoveTo(newBounds.x, newBounds.y, [lastBounds.x, lastBounds.y]);
                        lastBounds = newBounds;
                    });
                    this.on("resize", function () {
                        const newBounds = this.getBounds();

                        if (newBounds.width !== lastBounds.width || newBounds.height !== lastBounds.height) {
				            this.undock(); // TODO: Support changing size when docked.
                        }
                        // TODO: Handle resize positions of other docked windows
                        //       This requires reworking how windows are docked/connected
                        //       (they must be docked to edges of windows, not the windows themselves)
                        /*for (let index = 0; index < this._dockedGroup.length; index += 1) {
                            const other = this._dockedGroup[index];

                            if (other !== this) {
                                other.setPosition()
                            }
                        }*/

                        lastBounds = newBounds;
                    });
                }
            };
            BrowserWindow.prototype.dock = function (otherID) {
                this._ensureDockSystem();

                // Resolve otherID, and fail if otherID doesn't exist.
                const other = BrowserWindow.fromId(otherID);
                if (other === undefined) { return; } // Failed to find other. TODO: Return error

                // If other is already in the group, return:
                if (this._dockedGroup.indexOf(other) >= 0) { return; }

                // Make sure docked group exists:
                other._ensureDockSystem();

                // Loop through all windows in otherGroup and add them to this's group:
                for (let other of other._dockedGroup) {
                    this._dockedGroup.push(other);
                    // Sharing the array between window objects makes it easier to manage:
                    other._dockedGroup = this._dockedGroup;
                }

                //console.log("dock", this._dockedGroup);
                // TODO: Check if otherGroup is touching
            };
            BrowserWindow.prototype.undock = function () {
                this._ensureDockSystem();

                // Check to see if window is already undocked:
                if (this._dockedGroup.length === 1) { return; }

                // Undock this:
                this._dockedGroup.splice(this._dockedGroup.indexOf(this), 1);
                this._dockedGroup = [this];

                //console.log("undock", this._dockedGroup);
                // TODO: Redock those still touching, EXCEPT 'this'.
            };
            BrowserWindow.prototype._dockFocus = function () {
                this._ensureDockSystem();

                for (let window of this._dockedGroup) {
                    if (window !== this) {
                        window.setAlwaysOnTop(true);
                        window.setAlwaysOnTop(false);
                    }
                }
                this.setAlwaysOnTop(true);
                this.setAlwaysOnTop(false);
            };
            BrowserWindow.prototype._dragStart = function () {
			    //if (!this.emit("drag-start")) { return; } // Allow preventing drag
                this._ensureDockSystem();

                this.restore();

                for (let window of this._dockedGroup) {
                    window._dragStartPos = window.getPosition();
                }
            };
            BrowserWindow.prototype._getBounds = function () {
                const bounds = this.getBounds();
                return new BoundingBox(bounds.x, bounds.y, bounds.x + bounds.width, bounds.y + bounds.height);
            };
            BrowserWindow.prototype._dragBy = function (deltaLeft, deltaTop) {
                this._ensureDockSystem();

                // Perform Snap:
                const thisBounds = this._getBounds().moveTo(this._dragStartPos[0] + deltaLeft,
                                                            this._dragStartPos[1] + deltaTop);
                let snapDelta = new Vector(NaN, NaN);
                for (let other of BrowserWindow.getAllWindows()) {
                    if (other._dockedGroup !== this._dockedGroup) {
                        snapDelta.setMin(thisBounds.getSnapDelta(other._getBounds()));
                    }
                }
                deltaLeft += snapDelta.left || 0;
                deltaTop += snapDelta.top || 0;

			    for (let other of this._dockedGroup) {
                    let pos = other._dragStartPos;

                    // If other doesn't have a drag position, start it:
                    if (pos === undefined) {
                        pos = other._dragStartPos = other.getPosition();
                        pos[0] -= deltaLeft;
                        pos[1] -= deltaTop;
                    }

                    other.setPosition(pos[0] + deltaLeft, pos[1] + deltaTop);
                }
            };
            BrowserWindow.prototype._dragStop = function () {
                this._ensureDockSystem();

                // Dock to those it snapped to:
                const thisBounds = this._getBounds();
                for (let other of BrowserWindow.getAllWindows()) {
                    if (thisBounds.isTouching(other._getBounds())) {
                        this.dock(other.id);
                    }
                }

                for (let window of this._dockedGroup) {
                    delete window._dragStartPos;
                }
            };
            BrowserWindow.prototype._dockMoveTo = function (left, top) {
                this._ensureDockSystem();

                const oldPos = this.getPosition();
                const deltaLeft = left - oldPos[0];
                const deltaTop = top - oldPos[1];

                for (let other of this._dockedGroup) {
                    const pos = other.getPosition();

                    other.setPosition(pos[0] + deltaLeft, pos[1] + deltaTop);
                }
            };
            BrowserWindow.prototype._dockMinimize = function (left, top) {
                this._ensureDockSystem();

                for (let window of this._dockedGroup) {
                    window.minimize();
                }
            };
            BrowserWindow.prototype._dockHide = function (left, top) {
                this._ensureDockSystem();

                for (let window of this._dockedGroup) {
                    window.hide();
                }
            };
            BrowserWindow.prototype._dockShow = function (left, top) {
                this._ensureDockSystem();

                for (let window of this._dockedGroup) {
                    window.show();
                }
            };
        }
    }
})();