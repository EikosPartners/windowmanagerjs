(function (global, factory) {
    if (typeof define === "function" && define.amd) {
        define(["exports"], factory);
    } else if (typeof exports !== "undefined") {
        factory(exports);
    } else {
        var mod = {
            exports: {}
        };
        factory(mod.exports);
        global.scalejsWindowfactory = mod.exports;
    }
})(this, function (exports) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    var _extends = Object.assign || function (target) {
        for (var i = 1; i < arguments.length; i++) {
            var source = arguments[i];

            for (var key in source) {
                if (Object.prototype.hasOwnProperty.call(source, key)) {
                    target[key] = source[key];
                }
            }
        }

        return target;
    };

    /**
     * An EventHandler
     * @constructor
     * @alias EventHandler
     * @param {string[]} [acceptedEventHandlers=[]] - String of allowed events.
     */
    function EventHandler() {
        var acceptedEventHandlers = arguments.length <= 0 || arguments[0] === undefined ? [] : arguments[0];

        this._eventListeners = {};
        this._eventPipes = [];
        // TODO: Look into making these special properties that can't be deleted?
        for (var _iterator = acceptedEventHandlers, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
            var _ref;

            if (_isArray) {
                if (_i >= _iterator.length) break;
                _ref = _iterator[_i++];
            } else {
                _i = _iterator.next();
                if (_i.done) break;
                _ref = _i.value;
            }

            var acceptedEventHandler = _ref;

            this._eventListeners[acceptedEventHandler] = [];
        }
    }

    /**
     * @method
     * @param {string}
     * @param {callback}
     */
    EventHandler.prototype.on = function (eventNames, eventListener) {
        eventNames = eventNames.toLowerCase().split(" ");

        for (var _iterator2 = eventNames, _isArray2 = Array.isArray(_iterator2), _i2 = 0, _iterator2 = _isArray2 ? _iterator2 : _iterator2[Symbol.iterator]();;) {
            var _ref2;

            if (_isArray2) {
                if (_i2 >= _iterator2.length) break;
                _ref2 = _iterator2[_i2++];
            } else {
                _i2 = _iterator2.next();
                if (_i2.done) break;
                _ref2 = _i2.value;
            }

            var eventName = _ref2;

            // Check if this event can be subscribed to via this function:
            if (this._eventListeners[eventName] === undefined) {
                continue;
            }

            // Check if eventListener is a function:
            if (!eventListener || typeof eventListener.constructor !== "function") {
                throw "on requires argument 'eventListener' of type Function";
            }

            // Check if eventListener is already added:
            if (this._eventListeners[eventName].indexOf(eventListener) >= 0) {
                continue;
            }

            // Add event listener:
            this._eventListeners[eventName].push(eventListener);
        }
    };

    /**
     * @method
     * @param {string}
     * @param {callback}
     */
    EventHandler.prototype.once = function (eventName, eventListener) {
        function onceListener() {
            this.off(eventName, onceListener);
            eventListener.apply(this, arguments);
        }
        this.on(eventName, onceListener);
    };

    /**
     * @method
     * @param {string}
     * @param {callback}
     */
    EventHandler.prototype.off = function (eventNames, eventListener) {
        eventNames = eventNames.toLowerCase().split(" ");

        for (var _iterator3 = eventNames, _isArray3 = Array.isArray(_iterator3), _i3 = 0, _iterator3 = _isArray3 ? _iterator3 : _iterator3[Symbol.iterator]();;) {
            var _ref3;

            if (_isArray3) {
                if (_i3 >= _iterator3.length) break;
                _ref3 = _iterator3[_i3++];
            } else {
                _i3 = _iterator3.next();
                if (_i3.done) break;
                _ref3 = _i3.value;
            }

            var eventName = _ref3;

            // If event listeners don't exist, bail:
            if (this._eventListeners[eventName] === undefined) {
                return;
            }

            // Check if eventListener is a function:
            if (!eventListener || typeof eventListener.constructor !== "function") {
                throw "off requires argument 'eventListener' of type Function";
            }

            // Remove event listener, if exists:
            var index = this._eventListeners[eventName].indexOf(eventListener);
            if (index >= 0) {
                this._eventListeners[eventName].splice(index, 1);
            }
        }
    };

    /**
     * @method
     * @param {string}
     */
    EventHandler.prototype.clearEvent = function (eventNames) {
        eventNames = eventNames.toLowerCase();

        for (var _iterator4 = eventNames, _isArray4 = Array.isArray(_iterator4), _i4 = 0, _iterator4 = _isArray4 ? _iterator4 : _iterator4[Symbol.iterator]();;) {
            var _ref4;

            if (_isArray4) {
                if (_i4 >= _iterator4.length) break;
                _ref4 = _iterator4[_i4++];
            } else {
                _i4 = _iterator4.next();
                if (_i4.done) break;
                _ref4 = _i4.value;
            }

            var eventName = _ref4;

            // If event listeners don't exist, bail:
            if (this._eventListeners[eventName] === undefined) {
                return;
            }

            this._eventListeners[eventName] = [];
        }
    };

    /**
     * @method
     * @param {string}
     * @param {...*} args - Arguments to pass to listeners
     */
    EventHandler.prototype.emit = function (eventName) {
        eventName = eventName.toLowerCase();

        // If event listeners don't exist, bail:
        if (this._eventListeners[eventName] === undefined) {
            return;
        }

        // Get arguments:
        var args = new Array(arguments.length - 1);
        for (var index = 1; index < arguments.length; index += 1) {
            args[index - 1] = arguments[index];
        }

        var returnVal = true;
        for (var _iterator5 = this._eventListeners[eventName], _isArray5 = Array.isArray(_iterator5), _i5 = 0, _iterator5 = _isArray5 ? _iterator5 : _iterator5[Symbol.iterator]();;) {
            var _ref5;

            if (_isArray5) {
                if (_i5 >= _iterator5.length) break;
                _ref5 = _iterator5[_i5++];
            } else {
                _i5 = _iterator5.next();
                if (_i5.done) break;
                _ref5 = _i5.value;
            }

            var eventListener = _ref5;

            // Call listener with the 'this' context as the current window:
            returnVal = returnVal && eventListener.apply(this, args) !== false;
        }

        for (var _iterator6 = this._eventPipes, _isArray6 = Array.isArray(_iterator6), _i6 = 0, _iterator6 = _isArray6 ? _iterator6 : _iterator6[Symbol.iterator]();;) {
            var _ref6;

            if (_isArray6) {
                if (_i6 >= _iterator6.length) break;
                _ref6 = _iterator6[_i6++];
            } else {
                _i6 = _iterator6.next();
                if (_i6.done) break;
                _ref6 = _i6.value;
            }

            var eventHandler = _ref6;

            // Call handler with the 'this' context as the current window:
            returnVal = returnVal && eventHandler.emit.apply(eventHandler, arguments) !== false;
        }

        return returnVal;
    };

    /**
     * @method
     * @param {EventHandler}
     */
    EventHandler.prototype.addPipe = function (eventHandler) {
        // Check if eventHandler is a EventHandler:
        if (!eventHandler || !eventHandler.emit) {
            throw "addPipe requires argument 'eventHandler' of type EventHandler";
        }

        // Check if eventHandler is already added:
        if (this._eventPipes.indexOf(eventHandler) >= 0) {
            return;
        }

        // Add event handler:
        this._eventPipes.push(eventHandler);
    };

    /**
     * @method
     * @param {EventHandler}
     */
    EventHandler.prototype.removePipe = function (eventHandler) {
        // Check if eventHandler is a EventHandler:
        if (!eventHandler || !eventHandler.emit) {
            throw "removePipe requires argument 'eventHandler' of type EventHandler";
        }

        // Check if eventHandler is already added:
        if (this._eventPipes.indexOf(eventHandler) >= 0) {
            return;
        }

        // Remove eventHandler, if exists:
        var index = this._eventPipes.indexOf(eventHandler);
        if (index >= 0) {
            this._eventPipes.splice(index, 1);
        }
    };
    /* global fin,EventHandler*/
    var windowfactoryEventNames = ["window-create", "window-close"];
    var windowfactory = new EventHandler(windowfactoryEventNames);
    windowfactory.isRenderer = false;
    windowfactory.isBackend = false;
    windowfactory.version = "0.6.5";

    function getBrowserInfo() {
        // Credit: http://www.gregoryvarghese.com/how-to-get-browser-name-and-version-via-javascript/
        var ua = navigator.userAgent,
            tem = void 0,
            M = ua.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || [];
        if (/trident/i.test(M[1])) {
            tem = /\brv[ :]+(\d+)/g.exec(ua) || [];
            return { name: "IE ", version: tem[1] || "" };
        }
        if (M[1] === "Chrome") {
            tem = ua.match(/\bOPR\/(\d+)/);
            if (tem !== null) {
                return { name: "Opera", version: tem[1] };
            }
        }
        M = M[2] ? [M[1], M[2]] : [navigator.appName, navigator.appVersion, "-?"];
        if ((tem = ua.match(/version\/(\d+)/i)) !== null) {
            M.splice(1, 1, tem[1]);
        }
        return {
            name: M[0],
            version: M[1]
        };
    }

    if (typeof window === "undefined" && typeof global !== "undefined" && global) {
        windowfactory.isBackend = true;
        if (typeof require === "function" && require.main && require.main.filename) {
            // We are running in an Electron Window Backend's Runtime:
            global.nodeRequire = require;
            global.nodeRequire.windowfactoryPath = __filename;
            global.workingDir = global.nodeRequire("path").dirname(global.nodeRequire.main.filename);
            //process.once("loaded", function () {
            //global.nodeRequire = _require;
            //global.workingDir = nodeRequire.main.filename;
            //});
        }
    } else if (typeof window !== "undefined" && window) {
        windowfactory.isRenderer = true;
        if (window.nodeRequire !== undefined) {
            // We are running in an Electron Window's Runtime:
            windowfactory.electronVersion = window.nodeRequire.electronVersion;
            windowfactory.nodeVersion = window.nodeRequire.nodeVersion;

            var ipcRenderer = window.nodeRequire("electron").ipcRenderer;
            ipcRenderer.on("window-create", function (event, otherID) {
                windowfactory.emit("window-create", windowfactory._resolveWindowWithID(otherID));
            });
        }
    }

    if (typeof process !== "undefined" && process && process.versions && process.versions.electron) {
        // We are running in an Electron Runtime:
        global.nodeRequire.electronVersion = windowfactory.electronVersion = global.process.versions.electron;
        global.nodeRequire.nodeVersion = windowfactory.nodeVersion = global.process.versions.node;
    } else if (typeof fin !== "undefined" && fin && fin.desktop && fin.desktop.main) {
        (function () {
            // We are running in OpenFin Runtime:
            windowfactory.openfinVersion = "startup";

            var openfinReadyCallbacks = [];
            windowfactory._openfinOnReady = function (callback) {
                // Check if ready:
                if (windowfactory.openfinVersion !== "startup") {
                    return callback();
                }

                // Check if eventListener is a function:
                if (!callback || callback.constructor !== Function) {
                    throw "on requires argument 'eventListener' of type Function";
                }

                // Check if eventListener is already added:
                if (openfinReadyCallbacks.indexOf(callback) >= 0) {
                    return;
                }

                // Add event listener:
                openfinReadyCallbacks.push(callback);
            };

            fin.desktop.main(function () {
                windowfactory.openfinVersion = "pending";
                fin.desktop.System.getVersion(function (version) {
                    windowfactory.openfinVersion = version;
                }); // TODO: Handle errorCallback

                var app = fin.desktop.Application.getCurrent();
                var mainWindow = app.getWindow().contentWindow;

                if (mainWindow === window) {
                    windowfactory._windows = {};
                    windowfactory._internalBus = new EventHandler(windowfactoryEventNames);
                } else {
                    windowfactory._internalBus = window.parent.windowfactory._internalBus;
                }

                windowfactory._internalBus.addPipe(windowfactory);

                // Call callbacks:
                for (var _iterator7 = openfinReadyCallbacks, _isArray7 = Array.isArray(_iterator7), _i7 = 0, _iterator7 = _isArray7 ? _iterator7 : _iterator7[Symbol.iterator]();;) {
                    var _ref7;

                    if (_isArray7) {
                        if (_i7 >= _iterator7.length) break;
                        _ref7 = _iterator7[_i7++];
                    } else {
                        _i7 = _iterator7.next();
                        if (_i7.done) break;
                        _ref7 = _i7.value;
                    }

                    var callback = _ref7;

                    callback();
                }
                openfinReadyCallbacks = undefined;
            });
        })();
    } else if (window.nodeRequire === undefined) {
        // We are running in Browser Runtime:
        var browser = getBrowserInfo();
        windowfactory.browserVersion = browser.version;
        windowfactory.browserRuntime = browser.name;
        if (window.parent === window) {
            (function () {
                // This is the root window:
                // TODO: What happens if a website uses an iframe to a site that has an app with this extension?
                windowfactory._windows = [];
                windowfactory._launcher = window;
                windowfactory._internalBus = new EventHandler(windowfactoryEventNames);
                var nextZIndex = 1000; // TODO: Recycle Z-Indexes! In case of a (probably never) overflow!
                windowfactory._getNextZIndex = function () {
                    nextZIndex += 1;
                    return nextZIndex;
                };
                windowfactory.isLauncher = true;

                /*document.body.innerHTML = "Test";
                let stylesheet = document.createElement("style");
                stylesheet.innerHTML = "html,body{margin:0;padding:0;background:black;color:white}";
                document.head.appendChild(stylesheet);*/
            })();
        } else {
            windowfactory._windows = window.parent.windowfactory._windows;
            windowfactory._launcher = window.parent.windowfactory._launcher || window.parent;
            windowfactory._internalBus = window.parent.windowfactory._internalBus;
            windowfactory._getNextZIndex = window.parent.windowfactory._getNextZIndex;
            windowfactory.isLauncher = false;
        }

        windowfactory._internalBus.addPipe(windowfactory);
    }

    if (typeof global !== "undefined" && global) {
        global.windowfactory = windowfactory;
    }
    if (typeof window !== "undefined" && window) {
        window.windowfactory = windowfactory;
    }

    function SyncCallback(callback) {
        if (!(this instanceof SyncCallback)) {
            return new SyncCallback(callback);
        }
        var thisObj = this;

        this._deref = function () {
            thisObj.count -= 1;
            if (thisObj.count <= 0) {
                callback();
            }
        };

        this.count = 0;
    }
    SyncCallback.prototype.ref = function (callback) {
        this.count += 1;
        return function () {
            if (callback) {
                callback.apply(null, arguments);
            }
            this._deref();
        };
    };

    // Runtimes are stitched in after this line.

    // After the runtimes, the scalejs.windowfactory.js script is stitched in.

    /**
     * This module handles various geometric shapes used in calculations for windowfactory.
     * @module geometry
     */
    // TODO: Heavy refactor! Need to clean up all of these random functions. Make a simple library.
    //       And no more resolving things down! It hurts performance in some cases,
    //       and can make code unreadable, and hard to manage.

    /*global windowfactory*/
    windowfactory.geometry = function () {
        // Utility functions:
        function minAbs() {
            var min = arguments[0];
            var minAbs = Math.abs(min);

            for (var index = 1; index < arguments.length; index += 1) {
                var argAbs = Math.abs(arguments[index]);
                if (argAbs < minAbs) {
                    min = arguments[index];
                    minAbs = argAbs;
                }
            }

            return {
                min: min,
                abs: minAbs
            };
        }

        /**
         * A Vector object.
         * @memberof module:geometry
         * @constructor
         * @param {number} left - The position of the vector's x-axis.
         * @param {number} top - The position of the vector's y-axis.
         */
        function Vector(left, top) {
            if (!(this instanceof Vector)) {
                return new Vector(left, top);
            }

            var obj = left;
            if (obj && obj.constructor !== Number) {
                //new Vector(obj)
                this.left = obj.left;
                this.top = obj.top;
            } else {
                //new Vector(left, top)
                this.left = left;
                this.top = top;
            }
        }

        /**
         * Clone the current vector to a new object.
         * @method
         * @returns {module:geometry.Vector} A clone of this instance
         */
        Vector.prototype.clone = function () {
            return new Vector(this);
        };

        /**
         * Resolve this object down to a {@link module:geometry.Vector|Vector} instance.
         * Since this instance is already a vector, it returns itself.
         * @method
         * @returns {module:geometry.Vector} self
         */
        Vector.prototype.getVector = function () {
            // We have this method, so any prototype in this script will return their position,
            // and if they are one it will return itself.
            // This simplifies code, and prevents having to do a ton of checks.
            return this;
        };

        /**
         * Returns a BoundingBox instance version of this vector similar to:
         * new BoundingBox(Vector.left, Vector.top, Vector.left, Vector.top)
         * @method
         * @returns {module:geometry.BoundingBox}
         */
        Vector.prototype.getBoundingBox = function () {
            // We have this method, so any prototype in this script will return their position,
            // and if they are one it will return itself.
            // This simplifies code, and prevents having to do a ton of checks.
            return new BoundingBox(this.left, this.top, this.left, this.top);
        };

        /**
         * Returns a CollisionMesh instance version of this vector similar to:
         * new CollisionMesh(Vector.getBoundingBox())
         * @method
         * @returns {module:geometry.CollisionMesh}
         */
        Vector.prototype.getCollisionMesh = function () {
            return new CollisionMesh(this.getBoundingBox());
        };

        Vector.prototype.distanceSquared = function (left, top) {
            var other = new Vector(left, top);
            var diff = other.subtract(this);

            return diff.left * diff.left + diff.top * diff.top;
        };
        Vector.prototype.distance = function (left, top) {
            return Math.sqrt(this.distanceSquared(left, top));
        };
        Vector.prototype.set = function (other) {
            if (!other) {
                throw "set requires argument 'other'";
            }
            other = other.getVector();
            //if (other.constructor !== Vector) { throw "set requires argument 'other' to resolve to type Vector"; }

            this.left = other.left;
            this.top = other.top;
            return this;
        };
        Vector.prototype.setMin = function (other) {
            if (!other) {
                throw "setMin requires argument 'other'";
            }
            other = other.getVector();
            //if (other.constructor !== Vector) { throw "setMin requires argument 'other' to resolve to type Vector"; }

            if (Math.abs(other.left) < Math.abs(this.left) || isNaN(this.left)) {
                this.left = other.left;
            }
            if (Math.abs(other.top) < Math.abs(this.top) || isNaN(this.top)) {
                this.top = other.top;
            }
        };
        Vector.prototype.add = function (other) {
            if (!other) {
                throw "add requires argument 'other'";
            }
            other = other.getVector();
            //if (other.constructor !== Vector) { throw "add requires argument 'other' to resolve to type Vector"; }

            this.left += other.left;
            this.top += other.top;
            return this;
        };
        /*Vector.add = function (a, b) {
            return a.clone().add(b);
        };*/
        Vector.prototype.subtract = function (other) {
            if (!other) {
                throw "subtract requires argument 'other'";
            }
            other = other.getVector();
            //if (other.constructor !== Vector) { throw "subtract requires argument 'other' to resolve to type Vector"; }

            this.left -= other.left;
            this.top -= other.top;
            return this;
        };
        Vector.prototype.moveTo = function (left, top) {
            if (left && left.constructor === Number) {
                this.left = left;
            }
            if (top && top.constructor === Number) {
                this.top = top;
            }
            return this;
        };

        /**
         * A BoundingBox object.
         * @memberof module:geometry
         * @constructor
         * @param {number} left - The left position of the vector's x-axis.
         * @param {number} top - The top position of the vector's y-axis.
         * @param {number} right - The right position of the vector's x-axis.
         * @param {number} bottom - The bottom position of the vector's y-axis.
         */
        function BoundingBox(left, top, right, bottom) {
            if (!(this instanceof BoundingBox)) {
                return new BoundingBox(left, top, right, bottom);
            }

            var obj = left;
            if (obj && obj.constructor !== Number) {
                if (obj.getBoundingBox) {
                    obj = obj.getBoundingBox();
                }
                //new BoundingBox(obj)
                this.left = obj.left;
                this.top = obj.top;
                this.right = obj.right;
                this.bottom = obj.bottom;
            } else {
                //new BoundingBox(left, top, right, bottom)
                this.left = left;
                this.top = top;
                this.right = right;
                this.bottom = bottom;
            }
        }
        BoundingBox.prototype.clone = function () {
            return new BoundingBox(this);
        };
        BoundingBox.prototype.isNaN = function () {
            return isNaN(this.left) || isNaN(this.top) || isNaN(this.right) || isNaN(this.bottom);
        };
        BoundingBox.prototype.getWidth = function () {
            return Math.abs(this.right - this.left);
        };
        BoundingBox.prototype.getHeight = function () {
            return Math.abs(this.bottom - this.top);
        };
        BoundingBox.prototype.getSize = function () {
            return new Vector(this.getWidth(), this.getHeight());
        };
        BoundingBox.prototype.getArea = function () {
            return this.getWidth() * this.getHeight();
        };
        BoundingBox.prototype.getPosition = function () {
            return new Vector(this.left, this.top);
        };
        BoundingBox.prototype.getBoundingBox = function () {
            // We have this method, so any prototype in this script will return their bounding box,
            // and if they are one it will return itself.
            // This simplifies code, and prevents having to do a ton of checks.
            return this;
        };
        BoundingBox.prototype.getCollisionMesh = function () {
            return new CollisionMesh(this);
        };
        BoundingBox.prototype.getCenterPosition = function () {
            return new Vector(this.left + this.getWidth() / 2, this.top + this.getHeight() / 2);
        };
        BoundingBox.prototype.difference = function (other) {
            if (!other) {
                throw "difference requires argument 'other'";
            }
            other = other.getBoundingBox();
            /*if (other.constructor !== BoundingBox) {
                throw "difference requires argument 'other' to resolve to type BoundingBox";
            }*/

            return new BoundingBox(this.left - other.left, this.top - other.top, this.right - other.right, this.bottom - other.bottom);
        };
        BoundingBox.prototype.getCenteredOnPosition = function (other) {
            if (!other) {
                throw "getCenteredOnPosition requires argument 'other'";
            }
            other = other.getBoundingBox();
            /*if (other.constructor !== BoundingBox) {
                throw "getCenteredOnPosition requires argument 'other' to resolve to type BoundingBox";
            }*/

            return other.getCenterPosition().subtract(this.getCenterPosition().subtract(this.getPosition()));
        };
        BoundingBox.prototype.getIntersection = function (other) {
            if (!other) {
                throw "getIntersection requires argument 'other'";
            }
            other = other.getBoundingBox();
            /*if (other.constructor !== BoundingBox) {
                throw "getIntersection requires argument 'other' to resolve to type BoundingBox";
            }*/

            var left = Math.max(this.left, other.left),
                top = Math.max(this.top, other.top),
                right = Math.min(this.right, other.right),
                bottom = Math.min(this.bottom, other.bottom);

            if (left < right && top < bottom || left === right && top < bottom || top === bottom && left < right) {
                return new BoundingBox(left, top, right, bottom);
            } else if (left === right && top === bottom) {
                return new Vector(left, top);
            }
        };
        BoundingBox.prototype.getDistanceSquaredToPoint = function (left, top) {
            var other = new Vector(left, top);
            var cLeft = other.left <= this.left ? this.left : other.left >= this.right ? this.right : other.left;
            var cTop = other.top <= this.top ? this.top : other.top >= this.bottom ? this.bottom : other.top;
            var cPos = new Vector(cLeft, cTop);

            return cPos.distanceSquared(other);
        };
        BoundingBox.prototype.getDistanceToPoint = function (left, top) {
            return Math.sqrt(this.getDistanceSquaredToPoint(left, top));
        };
        BoundingBox.prototype.set = function (left, top, right, bottom) {
            var newBounds = new BoundingBox(left, top, right, bottom);
            this.left = newBounds.left;
            this.top = newBounds.top;
            this.right = newBounds.right;
            this.bottom = newBounds.bottom;
            return this;
        };
        BoundingBox.prototype.moveTo = function (left, top) {
            var newPosition = new Vector(left, top);
            this.right = newPosition.left + (this.right - this.left);
            this.left = newPosition.left;
            this.bottom = newPosition.top + (this.bottom - this.top);
            this.top = newPosition.top;
            return this;
        };
        BoundingBox.prototype.moveBy = function (left, top) {
            var newPosition = new Vector(left, top);
            this.left += newPosition.left;
            this.right += newPosition.left;
            this.top += newPosition.top;
            this.bottom += newPosition.top;
            return this;
        };
        BoundingBox.prototype.resizeTo = function (width, height, anchor) {
            // NOTE: anchor supports "top-left", "top-right", "bottom-left", or "bottom-right". By default it is "top-left".
            // NOTE: anchor also supports being passed as a position. Allowing the resize anchor to be anywhere other than
            //       the predefined strings.
            var curSize = this.getSize();
            var newSize = new Vector(width || curSize.left, height || curSize.top);
            anchor = anchor || "top-left";
            if (typeof anchor === "string" || anchor instanceof String) {
                var anchorStr = anchor;
                anchor = this.getPosition();
                if (anchorStr.indexOf("right") >= 0) {
                    anchor.left += curSize.left;
                }
                if (anchorStr.indexOf("bottom") >= 0) {
                    anchor.top += curSize.top;
                }
            }

            this.left += (anchor.left - this.left) * (curSize.left - newSize.left) / curSize.left;
            this.right += (anchor.left - this.right) * (curSize.left - newSize.left) / curSize.left;
            this.top += (anchor.top - this.top) * (curSize.top - newSize.top) / curSize.top;
            this.bottom += (anchor.top - this.bottom) * (curSize.top - newSize.top) / curSize.top;
            //this.left += (this.left - anchor.left) / curSize.left * newSize.left;
            //this.right += (this.right - anchor.left) / curSize.left * newSize.left;
            //this.top += (this.top - anchor.top) / curSize.top * newSize.top;
            //this.bottom += (this.bottom - anchor.top) / curSize.top * newSize.top;
            return this;
        };
        BoundingBox.prototype.isContains = function (other) {
            if (!other) {
                throw "isContains requires argument 'other'";
            }
            other = other.getBoundingBox();
            /*if (other.constructor !== BoundingBox) {
                throw "isContains requires argument 'other' to resolve to type BoundingBox";
            }*/

            return other.left >= this.left && other.right <= this.right && other.top >= this.top && other.bottom <= this.bottom;
        };
        BoundingBox.prototype.someContains = function (others) {
            if (!others) {
                throw "someContains requires argument 'others'";
            }
            if (others.constructor !== Array) {
                throw "someContains requires argument 'others' of type Array";
            }

            for (var index = 0; index < others.length; index += 1) {
                if (this.isContains(others[index])) {
                    return true;
                }
            }
            return false;
        };
        BoundingBox.prototype.isTouching = function (other) {
            if (!other) {
                throw "isTouching requires argument 'other'";
            }
            other = other.getBoundingBox();
            /*if (other.constructor !== BoundingBox) {
                throw "isTouching requires argument 'other' to resolve to type BoundingBox";
            }*/

            return this.top <= other.bottom && this.bottom >= other.top && (this.left === other.right || this.right === other.left) || this.left <= other.right && this.right >= other.left && (this.top === other.bottom || this.bottom === other.top);
        };
        BoundingBox.prototype.getEdgeTouching = function (others) {
            if (!others) {
                throw "getEdgeTouching requires argument 'others'";
            }
            if (others.constructor !== Array) {
                others = [others];
            }

            for (var index = 0; index < others.length; index += 1) {
                var other = others[index].getBoundingBox();
                if (this.top <= other.bottom && this.bottom >= other.top) {
                    if (this.left === other.right) {
                        return "left";
                    }
                    if (this.right === other.left) {
                        return "right";
                    }
                }
                if (this.left <= other.right && this.right >= other.left) {
                    if (this.top === other.bottom) {
                        return "top";
                    }
                    if (this.bottom === other.top) {
                        return "bottom";
                    }
                }
            }
        };
        BoundingBox.prototype.getOtherEdgeTouching = function (others) {
            if (!others) {
                throw "getOtherEdgeTouching requires argument 'others'";
            }
            if (others.constructor !== Array) {
                others = [others];
            }

            for (var index = 0; index < others.length; index += 1) {
                var other = others[index].getBoundingBox();
                if (this.top <= other.bottom && this.bottom >= other.top) {
                    if (this.left === other.right) {
                        return "right";
                    }
                    if (this.right === other.left) {
                        return "left";
                    }
                }
                if (this.left <= other.right && this.right >= other.left) {
                    if (this.top === other.bottom) {
                        return "bottom";
                    }
                    if (this.bottom === other.top) {
                        return "top";
                    }
                }
            }
        };
        BoundingBox.prototype.getEdgeClosestOrder = function (other) {
            if (!other) {
                throw "getEdgeClosest requires argument 'other'";
            }
            other = other.getBoundingBox();
            /*if (other.constructor !== BoundingBox) {
                throw "getEdgeClosest requires argument 'other' to resolve to type BoundingBox";
            }*/

            var centerPos = this.getCenterPosition();
            var dis = [];
            dis.push({
                "edge": "left",
                dis: other.getDistanceSquaredToPoint(this.left, centerPos.top)
            });
            dis.push({
                "edge": "top",
                dis: other.getDistanceSquaredToPoint(centerPos.left, this.top)
            });
            dis.push({
                "edge": "right",
                dis: other.getDistanceSquaredToPoint(this.right, centerPos.top)
            });
            dis.push({
                "edge": "bottom",
                dis: other.getDistanceSquaredToPoint(centerPos.left, this.bottom)
            });
            dis.sort(function (a, b) {
                return a.dis - b.dis;
            });

            return dis.map(function (dis) {
                return dis.edge;
            });
        };
        BoundingBox.prototype.getEdgeClosest = function (other) {
            var edges = this.getEdgeClosestOrder(other);
            return edges[0];
        };
        BoundingBox.prototype.getSnapDelta = function (other, snapDistance) {
            if (!other) {
                throw "getSnapDelta requires argument 'other'";
            }
            other = other.getBoundingBox();
            snapDistance = snapDistance || 5;
            /*if (other.constructor !== BoundingBox) {
                throw "getSnapDelta requires argument 'other' to resolve to type BoundingBox";
            }*/

            var snapDelta = new Vector(NaN, NaN);

            if (this.top <= other.bottom && this.bottom >= other.top) {
                // Handle x-snap:
                var leftRightDis = minAbs(other.left - this.right, other.right - this.left);
                if (leftRightDis.abs <= snapDistance) {
                    // this.LeftRightSnapTo(other)
                    snapDelta.left = leftRightDis.min;

                    // Handle y-subsnap:
                    var topBottomDis = minAbs(other.top - this.top, other.bottom - this.bottom);
                    if (topBottomDis.abs <= snapDistance) {
                        // this.TopBottomSubSnapTo(other)
                        snapDelta.top = topBottomDis.min;
                    }
                }
            } else if (this.left <= other.right && this.right >= other.left) {
                // Handle y-snap:
                var _topBottomDis = minAbs(other.top - this.bottom, other.bottom - this.top);
                if (_topBottomDis.abs <= snapDistance) {
                    // this.TopBottomSnapTo(other)
                    snapDelta.top = _topBottomDis.min;

                    // Handle x-subsnap:
                    var _leftRightDis = minAbs(other.left - this.left, other.right - this.right);
                    if (_leftRightDis.abs <= snapDistance) {
                        // this.LeftRightSubSnapTo(other)
                        snapDelta.left = _leftRightDis.min;
                    }
                }
            }

            return snapDelta;
        };
        BoundingBox.prototype.someTouching = function (others) {
            if (!others) {
                throw "someTouching requires argument 'others'";
            }
            if (others.constructor !== Array) {
                throw "someTouching requires argument 'others' of type Array";
            }

            for (var index = 0; index < others.length; index += 1) {
                if (this.isTouching(others[index])) {
                    return true;
                }
            }
            return false;
        };
        BoundingBox.prototype.isColliding = function (other) {
            if (!other) {
                throw "isColliding requires argument 'other'";
            }
            other = other.getBoundingBox();
            /*if (other.constructor !== BoundingBox) {
                throw "isColliding requires argument 'other' to resolve to type BoundingBox";
            }*/

            return this.left < other.right && this.right > other.left && this.top < other.bottom && this.bottom > other.top;
        };
        BoundingBox.prototype.someColliding = function (others) {
            if (!others) {
                throw "someColliding requires argument 'others'";
            }
            if (others.constructor !== Array) {
                throw "someColliding requires argument 'others' of type Array";
            }

            for (var index = 0; index < others.length; index += 1) {
                if (this.isColliding(others[index])) {
                    return true;
                }
            }
            return false;
        };
        BoundingBox.prototype.getColliding = function (others) {
            if (!others) {
                throw "getColliding requires argument 'others'";
            }
            if (others.constructor !== Array) {
                throw "getColliding requires argument 'others' of type Array";
            }

            for (var index = 0; index < others.length; index += 1) {
                if (this.isColliding(others[index])) {
                    return others[index];
                }
            }
        };
        BoundingBox.prototype.isTouchingEdge = function (other) {
            if (!other) {
                throw "isTouchingEdge requires argument 'other'";
            }
            other = other.getBoundingBox();
            /*if (other.constructor !== BoundingBox) {
                throw "isTouchingEdge requires argument 'other' to resolve to type BoundingBox";
            }*/

            return this.left === other.right || this.right === other.left || this.top === other.bottom || this.bottom === other.top;
        };
        /*BoundingBox.prototype.getXEdgeDistance = function (other) {
            if (!others) { throw "getColliding requires argument 'others'"; }
            if (others.constructor !== Array) { throw "getColliding requires argument 'others' of type Array"; }
              let distance = 1000000; // Arbitrary distance
            for (let index = 0; index < this.boxes.length; index += 1) {
                for (let j = 0; j < other.boxes.length; j += 1) {
                    distance = Math.min(distance, this.boxes[index].getXEdgeDistance(other.boxes[j]));
                }
            }
            return distance;
        };*/

        /**
         * A CollisionMesh object.
         * @memberof module:geometry
         * @constructor
         * @param {module:geometry.BoundingBox[]} boxes - An array of objects thatg resolve to BoundingBox.
         */
        function CollisionMesh(boxes, opts) {
            if (!(this instanceof CollisionMesh)) {
                return new CollisionMesh(boxes);
            }
            opts = opts || {};

            if (!boxes) {
                throw "CollisionMesh constructor requires argument 'boxes'";
            }
            if (boxes.constructor !== Array) {
                boxes = [boxes];
            }
            this.boxes = [];
            for (var index = 0; index < boxes.length; index += 1) {
                if (boxes[index].constructor === BoundingBox) {
                    this.boxes.push(boxes[index]);
                } else if (boxes[index].constructor === CollisionMesh) {
                    this.boxes = this.boxes.concat(boxes[index].boxes);
                } else {
                    this.boxes = this.boxes.concat(boxes[index].getCollisionMesh(opts).boxes);
                }
            }
        }
        CollisionMesh.prototype.clone = function () {
            var boxes = [];
            for (var index = 0; index < this.boxes; index += 1) {
                boxes[index] = this.boxes[index].clone();
            }
            return new CollisionMesh(boxes);
        };
        CollisionMesh.prototype.getWidth = function () {
            if (this.boxes.length === 0) {
                return 0;
            }

            var left = this.boxes[0].left,
                right = this.boxes[0].right;

            for (var index = 1; index < this.boxes.length; index += 1) {
                // This assumes left is least, and right is most in terms of value:
                left = Math.min(left, this.boxes[index].left);
                right = Math.max(right, this.boxes[index].right);
            }

            return right - left;
        };
        CollisionMesh.prototype.getHeight = function () {
            if (this.boxes.length === 0) {
                return 0;
            }

            var top = this.boxes[0].top,
                bottom = this.boxes[0].bottom;

            for (var index = 1; index < this.boxes.length; index += 1) {
                // This assumes top is least, and bottom is most in terms of value:
                top = Math.min(top, this.boxes[index].top);
                bottom = Math.max(bottom, this.boxes[index].bottom);
            }

            return bottom - top;
        };
        CollisionMesh.prototype.getSize = function () {
            return new Vector(this.getWidth(), this.getHeight());
        };
        CollisionMesh.prototype.getPosition = function () {
            return new Vector(this.getBoundingBox());
        };
        CollisionMesh.prototype.getBoundingBox = function () {
            if (this.boxes.length === 0) {
                return 0;
            }

            var left = this.boxes[0].left,
                top = this.boxes[0].top,
                right = this.boxes[0].right,
                bottom = this.boxes[0].bottom;

            for (var index = 1; index < this.boxes.length; index += 1) {
                left = Math.min(left, this.boxes[index].left);
                top = Math.min(top, this.boxes[index].top);
                right = Math.max(right, this.boxes[index].right);
                bottom = Math.max(bottom, this.boxes[index].bottom);
            }

            return new BoundingBox(left, top, right, bottom);
        };
        CollisionMesh.prototype.getCollisionMesh = function () {
            return this;
        };
        CollisionMesh.prototype.moveTo = function (left, top) {
            var newPosition = new Vector(left, top);
            this.moveBy(newPosition.subtract(this.getPosition()));
            return this;
        };
        CollisionMesh.prototype.moveBy = function (left, top) {
            var newPosition = new Vector(left || 0, top || 0);
            for (var index = 0; index < this.boxes.length; index += 1) {
                this.boxes[index].moveBy(newPosition);
            }
            return this;
        };
        CollisionMesh.prototype.isContains = function (other) {
            // TODO: Needs to check that all of other's boxes are contained by this's boxes. NOT check if only one is!
            if (!other) {
                throw "isContains requires argument 'other'";
            }
            other = other.constructor === Array ? new CollisionMesh(other) : other.getCollisionMesh();
            /*if (other.constructor !== CollisionMesh) {
                throw "isContains requires argument 'other' to resolve to type CollisionMesh";
            }*/

            for (var index = 0; index < this.boxes.length; index += 1) {
                if (this.boxes[index].someContains(other.boxes)) {
                    return true;
                }
            }
            return false;
        };
        CollisionMesh.prototype.someContains = function (other) {
            if (!other) {
                throw "someContains requires argument 'other'";
            }
            other = other.constructor === Array ? new CollisionMesh(other) : other.getCollisionMesh();
            /*if (other.constructor !== CollisionMesh) {
                throw "someContains requires argument 'other' to resolve to type CollisionMesh";
            }*/

            for (var index = 0; index < this.boxes.length; index += 1) {
                if (this.boxes[index].someContains(other.boxes)) {
                    return true;
                }
            }
            return false;
        };
        CollisionMesh.prototype.isTouching = function (other) {
            if (!other) {
                throw "isTouching requires argument 'other'";
            }
            other = other.constructor === Array ? new CollisionMesh(other) : other.getCollisionMesh();
            /*if (other.constructor !== CollisionMesh) {
                throw "isTouching requires argument 'other' to resolve to type CollisionMesh";
            }*/

            for (var index = 0; index < this.boxes.length; index += 1) {
                if (this.boxes[index].someTouching(other.boxes)) {
                    return true;
                }
            }
            return false;
        };
        CollisionMesh.prototype.someTouching = function (others) {
            if (!others) {
                throw "someTouching requires argument 'others'";
            }
            if (others.constructor !== Array) {
                throw "someTouching requires argument 'others' to resolve to type Array";
            }

            for (var index = 0; index < others.length; index += 1) {
                if (this.isTouching(others[index])) {
                    return true;
                }
            }
            return false;
        };
        CollisionMesh.prototype.isColliding = function (other) {
            if (!other) {
                throw "isColliding requires argument 'other'";
            }
            other = other.constructor === Array ? new CollisionMesh(other) : other.getCollisionMesh();
            /*if (other.constructor !== CollisionMesh) {
                throw "isColliding requires argument 'other' to resolve to type CollisionMesh";
            }*/

            for (var index = 0; index < this.boxes.length; index += 1) {
                if (this.boxes[index].someColliding(other.boxes)) {
                    return true;
                }
            }
            return false;
        };
        CollisionMesh.prototype.someColliding = function (others) {
            if (!others) {
                throw "someColliding requires argument 'others'";
            }
            if (others.constructor !== Array) {
                throw "someColliding requires argument 'others' to resolve to type Array";
            }

            for (var i = 0; i < others.length; i += 1) {
                for (var j = 0; j < this.boxes.length; j += 1) {
                    if (this.boxes[j].isColliding(others[i])) {
                        return true;
                    }
                }
            }
            return false;
        };
        CollisionMesh.prototype.getColliding = function (other) {
            if (!other) {
                throw "getColliding requires argument 'other'";
            }
            other = other.constructor === Array ? new CollisionMesh(other) : other.getCollisionMesh();
            /*if (other.constructor !== CollisionMesh) {
                throw "getColliding requires argument 'other' to resolve to type CollisionMesh";
            }*/

            for (var index = 0; index < this.boxes.length; index += 1) {
                var collided = this.boxes[index].getColliding(other.boxes);
                if (collided) {
                    return collided;
                }
            }
        };
        /*CollisionMesh.prototype.getXEdgeDistance = function (other) {
            if (!other) { throw "isTouching requires argument 'other'"; }
            other = (other.constructor === Array ? new CollisionMesh(other) : other.getCollisionMesh());
            if (other.constructor !== CollisionMesh) {
                throw "isTouching requires argument 'other' to resolve to type CollisionMesh";
            }
              let distance = 1000000; // Arbitrary distance
            for (let index = 0; index < this.boxes.length; index += 1) {
                for (let j = 0; j < other.boxes.length; j += 1) {
                    distance = Math.min(distance, this.boxes[index].getXEdgeDistance(other.boxes[j]));
                }
            }
            return distance;
        };*/

        return {
            Vector: Vector,
            /**
             * A Position object.
             * @memberof module:geometry
             * @constructor
             * @param {number} left - The position of the vector's x-axis.
             * @param {number} top - The position of the vector's y-axis.
             * @see {@link module:geometry.Vector|Vector} for further information.
             */
            Position: Vector,
            /**
             * A Size object.
             * @memberof module:geometry
             * @constructor
             * @param {number} left - The position of the vector's x-axis.
             * @param {number} top - The position of the vector's y-axis.
             * @see {@link module:geometry.Vector|Vector} for further information.
             */
            Size: Vector,
            BoundingBox: BoundingBox,
            CollisionMesh: CollisionMesh
        };
    }();

    /*global windowfactory,fin,SyncCallback,EventHandler*/
    /*jshint bitwise: false*/
    (function () {
        if (windowfactory.isRenderer && !windowfactory.isBackend && windowfactory.browserVersion) {
            (function () {
                var geometry = windowfactory.geometry;
                var Vector = geometry.Vector;
                var Position = geometry.Position;
                var Size = geometry.Size;
                var BoundingBox = geometry.BoundingBox;
                var currentWin = window;
                var defaultConfig = {
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
                var configMap = {};
                var acceptedEventHandlers = ["drag-start", "drag-before", "drag-stop", "dock-before", "move", "move-before", "resize-before", "close", "minimize"];
                var transformPropNames = ["-ms-transform", "-moz-transform", "-o-transform", "-webkit-transform", "transform"];

                var Window = function Window(config) {
                    if (!(this instanceof Window)) {
                        return new Window(config);
                    }

                    config = config || {}; // If no arguments are passed, assume we are creating a default blank window
                    var isArgConfig = !(config instanceof window.Window);

                    // Call the parent constructor:
                    EventHandler.call(this, acceptedEventHandlers);
                    this._ready = false;
                    this._isClosed = false;
                    this._isMaximized = false;
                    this._dockedGroup = [this];
                    this._children = []; // TODO: Add way to remove or change heirarchy.
                    this._parent = undefined;

                    if (isArgConfig) {
                        for (var prop in config) {
                            if (config.hasOwnProperty(prop) && configMap[prop] !== undefined) {
                                config[configMap[prop]] = config[prop];
                                delete config[prop];
                            }
                        }
                        for (var _prop in defaultConfig) {
                            if (defaultConfig.hasOwnProperty(_prop)) {
                                config[_prop] = config[_prop] || defaultConfig[_prop];
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
                        var newWindow = windowfactory._launcher.document.createElement("iframe");
                        newWindow.src = config.url;
                        newWindow.style.position = "absolute";
                        if (!Number.isFinite(config.left)) {
                            config.left = (windowfactory._launcher.innerWidth - config.width) / 2;
                        }
                        newWindow.style.left = config.left + "px";
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
                    if (this.isClosed()) {
                        throw "onReady can't be called on a closed window";
                    }
                    if (this.isReady()) {
                        return callback.call(this);
                    }

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
                    var box = this._window.getBoundingClientRect();
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

                    if (parent === this._parent) {
                        return;
                    }

                    if (this._parent) {
                        var index = this._parent._children.indexOf(this);
                        if (index >= 0) {
                            this._parent._children.splice(index, 1);
                        }
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

                Window.prototype.close = function (callback) {
                    if (this.isClosed()) {
                        return callback && callback();
                    }

                    this._window.parentElement.removeChild(this._window);
                    var index = windowfactory._windows.indexOf(this);
                    if (index >= 0) {
                        windowfactory._windows.splice(index, 1);
                    }

                    // Undock:
                    this.undock();

                    // Move children to parent:
                    var parent = this.getParent();
                    for (var _iterator8 = this.getChildren(), _isArray8 = Array.isArray(_iterator8), _i8 = 0, _iterator8 = _isArray8 ? _iterator8 : _iterator8[Symbol.iterator]();;) {
                        var _ref8;

                        if (_isArray8) {
                            if (_i8 >= _iterator8.length) break;
                            _ref8 = _iterator8[_i8++];
                        } else {
                            _i8 = _iterator8.next();
                            if (_i8.done) break;
                            _ref8 = _i8.value;
                        }

                        var child = _ref8;

                        // We use getChildren to have a copy of the list, so child.setParent doesn't modify this loop's list!
                        // TODO: Optimize this loop, by not making a copy of children, and not executing splice in each setParent!
                        child.setParent(parent);
                    }
                    this.setParent(undefined); // Remove from parent

                    this._isClosed = true;
                    if (callback) {
                        callback();
                    }
                    this.emit("close");
                    windowfactory._internalBus.emit("window-close", this);
                };

                Window.prototype.minimize = function (callback) {
                    if (!this._ready) {
                        throw "minimize can't be called on an unready window";
                    }

                    // TODO: What do we do on minimize in this runtime?
                    for (var _iterator9 = this._dockedGroup, _isArray9 = Array.isArray(_iterator9), _i9 = 0, _iterator9 = _isArray9 ? _iterator9 : _iterator9[Symbol.iterator]();;) {
                        var _ref9;

                        if (_isArray9) {
                            if (_i9 >= _iterator9.length) break;
                            _ref9 = _iterator9[_i9++];
                        } else {
                            _i9 = _iterator9.next();
                            if (_i9.done) break;
                            _ref9 = _i9.value;
                        }

                        var _window = _ref9;

                        _window.emit("minimize");
                    }
                };

                Window.prototype.maximize = function (callback) {
                    if (!this._ready) {
                        throw "maximize can't be called on an unready window";
                    }

                    this._restoreBounds = this.getBounds();
                    this._window.style.left = 0;
                    this._window.style.top = 0;
                    this._window.style.width = "100%";
                    this._window.style.height = "100%";
                    this._isMaximized = true;
                    if (callback) {
                        callback();
                    }
                };

                Window.prototype.show = function (callback) {
                    if (!this._ready) {
                        throw "show can't be called on an unready window";
                    }

                    for (var _iterator10 = this._dockedGroup, _isArray10 = Array.isArray(_iterator10), _i10 = 0, _iterator10 = _isArray10 ? _iterator10 : _iterator10[Symbol.iterator]();;) {
                        var _ref10;

                        if (_isArray10) {
                            if (_i10 >= _iterator10.length) break;
                            _ref10 = _iterator10[_i10++];
                        } else {
                            _i10 = _iterator10.next();
                            if (_i10.done) break;
                            _ref10 = _i10.value;
                        }

                        var _window2 = _ref10;

                        _window2._window.style.display = "";
                    }
                    if (callback) {
                        callback();
                    }
                };

                Window.prototype.hide = function (callback) {
                    if (!this._ready) {
                        throw "hide can't be called on an unready window";
                    }

                    for (var _iterator11 = this._dockedGroup, _isArray11 = Array.isArray(_iterator11), _i11 = 0, _iterator11 = _isArray11 ? _iterator11 : _iterator11[Symbol.iterator]();;) {
                        var _ref11;

                        if (_isArray11) {
                            if (_i11 >= _iterator11.length) break;
                            _ref11 = _iterator11[_i11++];
                        } else {
                            _i11 = _iterator11.next();
                            if (_i11.done) break;
                            _ref11 = _i11.value;
                        }

                        var _window3 = _ref11;

                        _window3._window.style.display = "none";
                    }
                    if (callback) {
                        callback();
                    }
                };

                Window.prototype.restore = function (callback) {
                    if (!this._ready) {
                        throw "restore can't be called on an unready window";
                    }

                    for (var _iterator12 = this._dockedGroup, _isArray12 = Array.isArray(_iterator12), _i12 = 0, _iterator12 = _isArray12 ? _iterator12 : _iterator12[Symbol.iterator]();;) {
                        var _ref12;

                        if (_isArray12) {
                            if (_i12 >= _iterator12.length) break;
                            _ref12 = _iterator12[_i12++];
                        } else {
                            _i12 = _iterator12.next();
                            if (_i12.done) break;
                            _ref12 = _i12.value;
                        }

                        var _window4 = _ref12;

                        if (_window4._isMaximized) {
                            _window4._window.style.left = _window4._restoreBounds.left + "px";
                            _window4._window.style.top = _window4._restoreBounds.top + "px";
                            _window4._window.style.width = _window4._restoreBounds.getWidth() + "px";
                            _window4._window.style.height = _window4._restoreBounds.getHeight() + "px";
                            _window4._isMaximized = false;
                        }
                    }
                    if (callback) {
                        callback();
                    }
                };

                Window.prototype.bringToFront = function (callback) {
                    if (!this._ready) {
                        throw "bringToFront can't be called on an unready window";
                    }

                    for (var _iterator13 = this._dockedGroup, _isArray13 = Array.isArray(_iterator13), _i13 = 0, _iterator13 = _isArray13 ? _iterator13 : _iterator13[Symbol.iterator]();;) {
                        var _ref13;

                        if (_isArray13) {
                            if (_i13 >= _iterator13.length) break;
                            _ref13 = _iterator13[_i13++];
                        } else {
                            _i13 = _iterator13.next();
                            if (_i13.done) break;
                            _ref13 = _i13.value;
                        }

                        var _window5 = _ref13;

                        if (_window5 !== this) {
                            _window5._window.style["z-index"] = windowfactory._getNextZIndex();
                        }
                    }
                    this._window.style["z-index"] = windowfactory._getNextZIndex();
                    if (callback) {
                        callback();
                    }
                };

                Window.prototype.focus = function (callback) {
                    if (!this._ready) {
                        throw "focus can't be called on an unready window";
                    }

                    for (var _iterator14 = this._dockedGroup, _isArray14 = Array.isArray(_iterator14), _i14 = 0, _iterator14 = _isArray14 ? _iterator14 : _iterator14[Symbol.iterator]();;) {
                        var _ref14;

                        if (_isArray14) {
                            if (_i14 >= _iterator14.length) break;
                            _ref14 = _iterator14[_i14++];
                        } else {
                            _i14 = _iterator14.next();
                            if (_i14.done) break;
                            _ref14 = _i14.value;
                        }

                        var _window6 = _ref14;

                        if (_window6 !== this) {
                            _window6._window.contentWindow.focus();
                        }
                    }
                    this._window.contentWindow.focus();
                    if (callback) {
                        callback();
                    }
                };

                Window.prototype.resizeTo = function (width, height, callback) {
                    if (!this._ready) {
                        throw "resizeTo can't be called on an unready window";
                    }
                    if (!this.emit("resize-before")) {
                        return;
                    } // Allow preventing resize
                    var size = new Position(width, height);

                    this.undock();
                    this._window.width = size.left + "px";
                    this._window.height = size.top + "px";
                    if (callback) {
                        callback();
                    }
                };

                Window.prototype.moveTo = function (left, top, callback) {
                    if (!this._ready) {
                        throw "moveTo can't be called on an unready window";
                    }
                    if (!this.emit("move-before")) {
                        return;
                    } // Allow preventing move
                    var deltaPos = new Position(left, top).subtract(this.getPosition());

                    for (var _iterator15 = this._dockedGroup, _isArray15 = Array.isArray(_iterator15), _i15 = 0, _iterator15 = _isArray15 ? _iterator15 : _iterator15[Symbol.iterator]();;) {
                        var _ref15;

                        if (_isArray15) {
                            if (_i15 >= _iterator15.length) break;
                            _ref15 = _iterator15[_i15++];
                        } else {
                            _i15 = _iterator15.next();
                            if (_i15.done) break;
                            _ref15 = _i15.value;
                        }

                        var _window7 = _ref15;

                        var pos = _window7.getPosition().add(deltaPos);
                        _window7._window.style.left = pos.left + "px";
                        _window7._window.style.top = pos.top + "px";
                    }
                    if (callback) {
                        callback();
                    }
                };

                Window.prototype.moveBy = function (deltaLeft, deltaTop, callback) {
                    if (!this._ready) {
                        throw "moveBy can't be called on an unready window";
                    }
                    if (!this.emit("move-before")) {
                        return;
                    } // Allow preventing move
                    var deltaPos = new Position(deltaLeft, deltaTop);

                    for (var _iterator16 = this._dockedGroup, _isArray16 = Array.isArray(_iterator16), _i16 = 0, _iterator16 = _isArray16 ? _iterator16 : _iterator16[Symbol.iterator]();;) {
                        var _ref16;

                        if (_isArray16) {
                            if (_i16 >= _iterator16.length) break;
                            _ref16 = _iterator16[_i16++];
                        } else {
                            _i16 = _iterator16.next();
                            if (_i16.done) break;
                            _ref16 = _i16.value;
                        }

                        var _window8 = _ref16;

                        var pos = _window8.getPosition().add(deltaPos);
                        _window8._window.style.left = pos.left + "px";
                        _window8._window.style.top = pos.top + "px";
                    }
                    if (callback) {
                        callback();
                    }
                    for (var _iterator17 = this._dockedGroup, _isArray17 = Array.isArray(_iterator17), _i17 = 0, _iterator17 = _isArray17 ? _iterator17 : _iterator17[Symbol.iterator]();;) {
                        var _ref17;

                        if (_isArray17) {
                            if (_i17 >= _iterator17.length) break;
                            _ref17 = _iterator17[_i17++];
                        } else {
                            _i17 = _iterator17.next();
                            if (_i17.done) break;
                            _ref17 = _i17.value;
                        }

                        var _window9 = _ref17;

                        _window9.emit("move");
                    }
                };

                Window.prototype.setMinSize = function (width, height, callback) {
                    if (!this._ready) {
                        throw "setMinSize can't be called on an unready window";
                    }
                    var size = new Size(width, height);

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
                        if (callback) {
                            callback();
                        }
                        this.emit("resize");
                    } else {
                        if (callback) {
                            callback();
                        }
                    }
                };
                Window.prototype.setSize = function (width, height, callback) {
                    if (!this._ready) {
                        throw "setMaxSize can't be called on an unready window";
                    }
                    var size = new Size(width, height);

                    this.undock(); // TODO: Support changing size when docked.
                    this._window.style.width = Math.min(this._maxSize.left, Math.max(this._minSize.left, size.left)) + "px";
                    this._window.style.height = Math.min(this._maxSize.top, Math.max(this._minSize.top, size.top)) + "px";
                    // Clear transform:
                    for (var _iterator18 = transformPropNames, _isArray18 = Array.isArray(_iterator18), _i18 = 0, _iterator18 = _isArray18 ? _iterator18 : _iterator18[Symbol.iterator]();;) {
                        var _ref18;

                        if (_isArray18) {
                            if (_i18 >= _iterator18.length) break;
                            _ref18 = _iterator18[_i18++];
                        } else {
                            _i18 = _iterator18.next();
                            if (_i18.done) break;
                            _ref18 = _i18.value;
                        }

                        var transformPropName = _ref18;

                        this._window.style[transformPropName] = "";
                    }
                    if (callback) {
                        callback();
                    }
                    this.emit("resize");
                };
                Window.prototype.forceScaledSize = function (width, height, callback) {
                    if (!this._ready) {
                        throw "setMaxSize can't be called on an unready window";
                    }
                    var size = new Size(Math.min(this._maxSize.left, Math.max(this._minSize.left, width)), Math.min(this._maxSize.top, Math.max(this._minSize.top, height)));

                    this.undock(); // TODO: Support changing size when docked.
                    this._window.style.width = size.left + "px";
                    this._window.style.height = size.top + "px";
                    // TODO: Calc transform:
                    var transform = Math.min(width / size.left, height / size.top);
                    for (var _iterator19 = transformPropNames, _isArray19 = Array.isArray(_iterator19), _i19 = 0, _iterator19 = _isArray19 ? _iterator19 : _iterator19[Symbol.iterator]();;) {
                        var _ref19;

                        if (_isArray19) {
                            if (_i19 >= _iterator19.length) break;
                            _ref19 = _iterator19[_i19++];
                        } else {
                            _i19 = _iterator19.next();
                            if (_i19.done) break;
                            _ref19 = _i19.value;
                        }

                        var transformPropName = _ref19;

                        this._window.style[transformPropName] = "scale(" + transform + ")";
                    }
                    if (callback) {
                        callback();
                    }
                    this.emit("resize");
                };
                Window.prototype.setMaxSize = function (width, height, callback) {
                    if (!this._ready) {
                        throw "setMaxSize can't be called on an unready window";
                    }
                    var size = new Size(width, height);

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
                        for (var _iterator20 = transformPropNames, _isArray20 = Array.isArray(_iterator20), _i20 = 0, _iterator20 = _isArray20 ? _iterator20 : _iterator20[Symbol.iterator]();;) {
                            var _ref20;

                            if (_isArray20) {
                                if (_i20 >= _iterator20.length) break;
                                _ref20 = _iterator20[_i20++];
                            } else {
                                _i20 = _iterator20.next();
                                if (_i20.done) break;
                                _ref20 = _i20.value;
                            }

                            var transformPropName = _ref20;

                            this._window.style[transformPropName] = "";
                        }
                        if (callback) {
                            callback();
                        }
                        this.emit("resize");
                    } else {
                        if (callback) {
                            callback();
                        }
                    }
                };

                Window.prototype.setBounds = function (left, top, right, bottom, callback) {
                    if (!this._ready) {
                        throw "resizeTo can't be called on an unready window";
                    }
                    var bounds = new BoundingBox(left, top, right, bottom);

                    this.undock(); // TODO: Support changing size when docked.
                    this._window.style.left = bounds.left + "px";
                    this._window.style.top = bounds.top + "px";
                    // TODO: Take into account transform?
                    this._window.style.width = Math.min(this._maxSize.left, Math.max(this._minSize.left, bounds.getWidth())) + "px";
                    this._window.style.height = Math.min(this._maxSize.top, Math.max(this._minSize.top, bounds.getHeight())) + "px";
                    // Clear transform:
                    for (var _iterator21 = transformPropNames, _isArray21 = Array.isArray(_iterator21), _i21 = 0, _iterator21 = _isArray21 ? _iterator21 : _iterator21[Symbol.iterator]();;) {
                        var _ref21;

                        if (_isArray21) {
                            if (_i21 >= _iterator21.length) break;
                            _ref21 = _iterator21[_i21++];
                        } else {
                            _i21 = _iterator21.next();
                            if (_i21.done) break;
                            _ref21 = _i21.value;
                        }

                        var transformPropName = _ref21;

                        this._window.style[transformPropName] = "";
                    }
                    // TODO: Events
                    if (callback) {
                        callback();
                    }
                };

                Window.prototype.dock = function (other) {
                    if (!this.emit("dock-before")) {
                        return;
                    } // Allow preventing dock
                    if (other === undefined) {
                        return;
                    } // Failed to find other. TODO: Return error

                    // If other is already in the group, return:
                    if (this._dockedGroup.indexOf(other) >= 0) {
                        return;
                    }

                    // Loop through all windows in otherGroup and add them to this's group:
                    for (var _iterator22 = other._dockedGroup, _isArray22 = Array.isArray(_iterator22), _i22 = 0, _iterator22 = _isArray22 ? _iterator22 : _iterator22[Symbol.iterator]();;) {
                        var _ref22;

                        if (_isArray22) {
                            if (_i22 >= _iterator22.length) break;
                            _ref22 = _iterator22[_i22++];
                        } else {
                            _i22 = _iterator22.next();
                            if (_i22.done) break;
                            _ref22 = _i22.value;
                        }

                        var _other = _ref22;

                        this._dockedGroup.push(_other);
                        // Sharing the array between window objects makes it easier to manage:
                        _other._dockedGroup = this._dockedGroup;
                    }

                    //console.log("dock", thisWindow._dockedGroup);
                    // TODO: Check if otherGroup is touching
                };
                Window.prototype.undock = function (other) {
                    // Check to see if window is already undocked:
                    if (this._dockedGroup.length === 1) {
                        return;
                    }

                    // Undock this:
                    this._dockedGroup.splice(this._dockedGroup.indexOf(this), 1);
                    this._dockedGroup = [this];

                    //console.log("undock", this._dockedGroup);
                    // TODO: Redock those still touching, EXCEPT 'this'.
                };

                Window.prototype._dragStart = function () {
                    if (!this.emit("drag-start")) {
                        return;
                    } // Allow preventing drag
                    this.restore();
                    for (var _iterator23 = this._dockedGroup, _isArray23 = Array.isArray(_iterator23), _i23 = 0, _iterator23 = _isArray23 ? _iterator23 : _iterator23[Symbol.iterator]();;) {
                        var _ref23;

                        if (_isArray23) {
                            if (_i23 >= _iterator23.length) break;
                            _ref23 = _iterator23[_i23++];
                        } else {
                            _i23 = _iterator23.next();
                            if (_i23.done) break;
                            _ref23 = _i23.value;
                        }

                        var _window10 = _ref23;

                        _window10._dragStartPos = _window10.getPosition();
                    }
                };

                Window.prototype._dragBy = function (deltaLeft, deltaTop) {
                    if (!this.emit("drag-before")) {
                        return;
                    } // Allow preventing drag
                    // Perform Snap:
                    var thisBounds = this.getBounds().moveTo(this._dragStartPos.left + deltaLeft, this._dragStartPos.top + deltaTop);
                    var snapDelta = new Vector(NaN, NaN);
                    for (var _iterator24 = windowfactory._windows, _isArray24 = Array.isArray(_iterator24), _i24 = 0, _iterator24 = _isArray24 ? _iterator24 : _iterator24[Symbol.iterator]();;) {
                        var _ref24;

                        if (_isArray24) {
                            if (_i24 >= _iterator24.length) break;
                            _ref24 = _iterator24[_i24++];
                        } else {
                            _i24 = _iterator24.next();
                            if (_i24.done) break;
                            _ref24 = _i24.value;
                        }

                        var other = _ref24;

                        if (other._dockedGroup !== this._dockedGroup) {
                            snapDelta.setMin(thisBounds.getSnapDelta(other.getBounds()));
                        }
                    }
                    deltaLeft += snapDelta.left || 0;
                    deltaTop += snapDelta.top || 0;

                    for (var _iterator25 = this._dockedGroup, _isArray25 = Array.isArray(_iterator25), _i25 = 0, _iterator25 = _isArray25 ? _iterator25 : _iterator25[Symbol.iterator]();;) {
                        var _ref25;

                        if (_isArray25) {
                            if (_i25 >= _iterator25.length) break;
                            _ref25 = _iterator25[_i25++];
                        } else {
                            _i25 = _iterator25.next();
                            if (_i25.done) break;
                            _ref25 = _i25.value;
                        }

                        var _other2 = _ref25;

                        var pos = _other2._dragStartPos;

                        // If other doesn't have a drag position, start it:
                        if (pos === undefined) {
                            pos = _other2._dragStartPos = _other2.getPosition();
                            pos.left -= deltaLeft;
                            pos.top -= deltaTop;
                        }

                        _other2._window.style.left = pos.left + deltaLeft + "px";
                        _other2._window.style.top = pos.top + deltaTop + "px";
                        //let transformMatrix = [1, 0, 0, 1, pos.left + deltaLeft, pos.top + deltaTop];
                        //other._window.style.transform = "matrix(" + transformMatrix.join() + ")";
                        //other._window.style.transform = "translate(" + (pos.left + deltaLeft) + "px," + (pos.top + deltaTop) + "px)";
                        _other2.emit("move");
                    }
                };

                Window.prototype._dragStop = function () {
                    // Dock to those it snapped to:
                    var thisBounds = this.getBounds();
                    for (var _iterator26 = windowfactory._windows, _isArray26 = Array.isArray(_iterator26), _i26 = 0, _iterator26 = _isArray26 ? _iterator26 : _iterator26[Symbol.iterator]();;) {
                        var _ref26;

                        if (_isArray26) {
                            if (_i26 >= _iterator26.length) break;
                            _ref26 = _iterator26[_i26++];
                        } else {
                            _i26 = _iterator26.next();
                            if (_i26.done) break;
                            _ref26 = _i26.value;
                        }

                        var other = _ref26;

                        if (thisBounds.isTouching(other.getBounds())) {
                            this.dock(other);
                        }
                    }

                    for (var _iterator27 = this._dockedGroup, _isArray27 = Array.isArray(_iterator27), _i27 = 0, _iterator27 = _isArray27 ? _iterator27 : _iterator27[Symbol.iterator]();;) {
                        var _ref27;

                        if (_isArray27) {
                            if (_i27 >= _iterator27.length) break;
                            _ref27 = _iterator27[_i27++];
                        } else {
                            _i27 = _iterator27.next();
                            if (_i27.done) break;
                            _ref27 = _i27.value;
                        }

                        var _window11 = _ref27;

                        delete _window11._dragStartPos;
                    }

                    this.emit("drag-stop");
                };

                // Handle current window in this context:
                Window.current = function () {
                    for (var _iterator28 = windowfactory._windows, _isArray28 = Array.isArray(_iterator28), _i28 = 0, _iterator28 = _isArray28 ? _iterator28 : _iterator28[Symbol.iterator]();;) {
                        var _ref28;

                        if (_isArray28) {
                            if (_i28 >= _iterator28.length) break;
                            _ref28 = _iterator28[_i28++];
                        } else {
                            _i28 = _iterator28.next();
                            if (_i28.done) break;
                            _ref28 = _i28.value;
                        }

                        var win = _ref28;

                        if (win._window.contentWindow === window) {
                            return win;
                        }
                    }
                }();

                Window.getAll = function () {
                    return windowfactory._windows.splice();
                };

                _extends(windowfactory, {
                    Window: Window
                });
            })();
        }
    })();
    /*global windowfactory,fin*/
    (function () {
        if (!windowfactory.isRenderer || windowfactory.isBackend || !windowfactory.browserVersion) {
            return;
        }

        var Window = windowfactory.Window;
        var readyCallbacks = [];
        var _isReady = true;

        function onReady(callback) {
            // Check if callback is not a function:
            if (!(callback && callback.constructor && callback.call && callback.apply)) {
                throw "onReady expects a function passed as the callback argument!";
            }

            // Check if already ready:
            if (_isReady) {
                callback();
            }

            // Check to see if callback is already in readyCallbacks:
            if (readyCallbacks.indexOf(callback) >= 0) {
                return;
            }

            readyCallbacks.push(callback);
        }

        function ready() {
            _isReady = true;
            for (var index = 0; index < readyCallbacks.length; index += 1) {
                readyCallbacks[index]();
            }
            readyCallbacks = [];
        }

        if (!windowfactory.isLauncher) {
            (function () {
                // Setup handlers on this window:
                var wX = 0;
                var wY = 0;
                var dragging = false;

                window.addEventListener("focus", function () {
                    Window.current.bringToFront();
                });

                window.addEventListener("mousedown", function (e) {
                    if (e.target.classList.contains("window-drag")) {
                        dragging = true;
                        wX = event.screenX;
                        wY = event.screenY;
                        Window.current._dragStart();
                    }
                });

                window.addEventListener("mousemove", function (e) {
                    if (dragging) {
                        //Window.current.moveTo(event.screenX - wX, event.screenY - wY);
                        Window.current._dragBy(event.screenX - wX, event.screenY - wY);
                    }
                });

                window.addEventListener("mouseup", function () {
                    dragging = false;
                    Window.current._dragStop();
                });
            })();
        }

        var messagebus = function () {
            // TODO: Utilize iframe communication? Or use messagebus that is currently shared in setup.js?
            var wrappedListeners = {};
            var windowWrappedListeners = {};

            function wrapListener(listener) {
                return function (message) {
                    // TODO: Determine who sent it
                    var window = null;
                    message = JSON.parse(message); // TODO: Should this be in a try/except?
                    var response = listener.apply(window, message.data);
                    // TODO: Send response if response is expected
                };
            }

            return {
                send: function send(eventName) {
                    for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
                        args[_key - 1] = arguments[_key];
                    }

                    // TODO: Check if ready? Dunno if needed
                    // TODO: Do we need to add a way to identify if a return is needed?
                    if (args.length > 0 && args[0] instanceof Window) {
                        var _window12 = args.unshift();
                        var message = {
                            id: 0, // TODO: Randomly generate a unique id to avoid collision!
                            event: eventName,
                            // TODO: Add way for receiver to know what window sent this
                            data: args
                        };
                        // TODO: Save the id of message so we can get the response
                        _window12._window.contentWindow.postMessage(message, "*");
                    } else {
                        var _message = {
                            event: eventName,
                            // TODO: Add way for receiver to know what window sent this
                            data: args
                        };

                        for (var _iterator29 = windowfactory._windows, _isArray29 = Array.isArray(_iterator29), _i29 = 0, _iterator29 = _isArray29 ? _iterator29 : _iterator29[Symbol.iterator]();;) {
                            var _ref29;

                            if (_isArray29) {
                                if (_i29 >= _iterator29.length) break;
                                _ref29 = _iterator29[_i29++];
                            } else {
                                _i29 = _iterator29.next();
                                if (_i29.done) break;
                                _ref29 = _i29.value;
                            }

                            var _window13 = _ref29;

                            _window13._window.contentWindow.postMessage(_message, "*");
                        }
                    }
                },
                on: function on(eventName, window, listener) {
                    if (listener === undefined) {
                        listener = window;
                        window = undefined;
                    }

                    var onMessage = wrapListener(listener);

                    if (window !== undefined) {
                        // Replace window.name with some way to identify the unique window
                        var winLisGroup = windowWrappedListeners[window.name] = windowWrappedListeners[window.name] || {};
                        winLisGroup[eventName] = winLisGroup[eventName] || new Set();
                        winLisGroup[eventName].add(listener);
                        // TODO: On window close, clear subscriptions in windowWrappedListeners!
                    } else {
                        wrappedListeners[eventName] = wrappedListeners[eventName] || new Set();
                        wrappedListeners[eventName].add(listener);
                    }
                },
                off: function off(eventName, window, listener) {}
            };
        }();

        _extends(windowfactory, {
            onReady: onReady,
            isReady: function isReady() {
                return _isReady;
            },
            runtime: windowfactory.browserRuntime,
            runtimeVersion: windowfactory.browserVersion
        });
    })();

    /*global windowfactory,nodeRequire,EventHandler*/
    (function () {
        if (!windowfactory.electronVersion) {
            return;
        }
        if (windowfactory.isRenderer) {
            (function () {
                var geometry = windowfactory.geometry;
                var Vector = geometry.Vector,
                    Position = geometry.Position,
                    Size = geometry.Size,
                    BoundingBox = geometry.BoundingBox;
                var remote = nodeRequire("electron").remote;
                var path = nodeRequire("path");
                var BrowserWindow = remote.BrowserWindow;
                var currentWin = remote.getCurrentWindow();
                var defaultConfig = {
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
                var configMap = {
                    left: "x",
                    top: "y"
                };
                var acceptedEventHandlers = ["drag-start", "drag-before", "drag-stop", "dock-before", "move", "move-before", "resize-before", "close", "minimize"];
                var windows = {};

                /**
                 * Wraps a window object.
                 * @constructor
                 * @alias Window
                 * @param {object} config - Configuration
                 */
                var Window = function Window(config) {
                    if (!(this instanceof Window)) {
                        return new Window(config);
                    }

                    config = config || {}; // If no arguments are passed, assume we are creating a default blank window
                    var isArgConfig = config.webContents === undefined; // TODO: Improve checking of arguments.

                    // Call the parent constructor:
                    EventHandler.call(this, acceptedEventHandlers);
                    if (isArgConfig) {
                        for (var prop in config) {
                            if (config.hasOwnProperty(prop) && configMap[prop] !== undefined) {
                                config[configMap[prop]] = config[prop];
                                delete config[prop];
                            }
                        }
                        for (var _prop2 in defaultConfig) {
                            if (defaultConfig.hasOwnProperty(_prop2)) {
                                config[_prop2] = config[_prop2] || defaultConfig[_prop2];
                            }
                        }
                        var url = config.url;
                        delete config.url;

                        this._window = new BrowserWindow(config);
                        this._window.loadURL(url[0] !== "/" ? url : path.join(remote.getGlobal("workingDir"), url));
                    } else {
                        this._window = config;
                    }
                    windows[this._window.id] = this;
                    this._window._ensureDockSystem();

                    // Setup _window event listeners:
                    // TODO: look into moving these elsewhere, might not work if currentWin is closed, and thisWindow is not.
                    var thisWindow = this;
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
                    this._window.on("close", _onclose);

                    currentWin.on("close", function () {
                        delete windows[this._window.id];
                        thisWindow.off("move", _onmove);
                        thisWindow.off("close", _onclose);
                        thisWindow.off("minimize", _onminimize);
                    });

                    this._ready = true;
                    if (isArgConfig) {
                        this._window._notifyReady();
                    }
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
                    var pos = this._window.getPosition();

                    return new Position(pos[0], pos[1]);
                };

                /**
                 * @method
                 * @returns {number}
                 */
                Window.prototype.getWidth = function () {
                    var size = this._window.getSize();

                    return size[0];
                };

                /**
                 * @method
                 * @returns {number}
                 */
                Window.prototype.getHeight = function () {
                    var size = this._window.getSize();

                    return size[1];
                };

                /**
                 * @method
                 * @returns {module:geometry.Position}
                 */
                Window.prototype.getSize = function () {
                    var size = this._window.getSize();

                    return new Position(size[0], size[1]);
                };

                /**
                 * @method
                 * @returns {module:geometry.BoundingBox}
                 */
                Window.prototype.getBounds = function () {
                    var bounds = this._window.getBounds();

                    return new BoundingBox(bounds.x, bounds.y, bounds.x + bounds.width, bounds.y + bounds.height);
                };

                /**
                 * @callback callback
                 * @param {string|null} error - String on error, or null if no error
                 * @param {object|null} result - Object on success, or null if error
                 */

                /**
                 * Closes the window instance.
                 * @method
                 * @param {callback=}
                 */
                Window.prototype.close = function (callback) {
                    if (this.isClosed()) {
                        return callback && callback();
                    }

                    this._window.close();
                    if (callback) {
                        callback();
                    }
                };

                /**
                 * Minimizes the window instance.
                 * @method
                 * @param {callback=}
                 */
                Window.prototype.minimize = function (callback) {
                    if (!this._ready) {
                        throw "minimize can't be called on an unready window";
                    }

                    this._window._dockMinimize();
                    if (callback) {
                        callback();
                    }
                };

                /**
                 * Maximizes the window instance.
                 * @method
                 * @param {callback=}
                 */
                Window.prototype.maximize = function (callback) {
                    if (!this._ready) {
                        throw "maximize can't be called on an unready window";
                    }

                    this._window.maximize();
                    if (callback) {
                        callback();
                    }
                };

                /**
                 * Unhides the window instance.
                 * @method
                 * @param {callback=}
                 */
                Window.prototype.show = function (callback) {
                    if (!this._ready) {
                        throw "show can't be called on an unready window";
                    }

                    this._window._dockShow();
                    if (callback) {
                        callback();
                    }
                };

                /**
                 * Hides the window instance.
                 * @method
                 * @param {callback=}
                 */
                Window.prototype.hide = function (callback) {
                    if (!this._ready) {
                        throw "hide can't be called on an unready window";
                    }

                    this._window._dockHide();
                    if (callback) {
                        callback();
                    }
                };

                /**
                 * Restores the window instance from the minimized or maximized states.
                 * @method
                 * @param {callback=}
                 */
                Window.prototype.restore = function (callback) {
                    if (!this._ready) {
                        throw "restore can't be called on an unready window";
                    }

                    this._window.restore();
                    if (callback) {
                        callback();
                    }
                };

                /**
                 * Brings the window instance to the front of all windows.
                 * @method
                 * @param {callback=}
                 */
                Window.prototype.bringToFront = function (callback) {
                    if (!this._ready) {
                        throw "bringToFront can't be called on an unready window";
                    }

                    this._window.setAlwaysOnTop(true);
                    this._window.setAlwaysOnTop(false);
                    if (callback) {
                        callback();
                    }
                };

                /**
                 * Sets focus to the window instance.
                 * @method
                 * @param {callback=}
                 */
                Window.prototype.focus = function (callback) {
                    if (!this._ready) {
                        throw "focus can't be called on an unready window";
                    }

                    this._window.focus();
                    if (callback) {
                        callback();
                    }
                };

                /**
                 * Resizes the window instance.
                 * @method
                 * @param {number} width
                 * @param {number} height
                 * @param {callback=}
                 */
                Window.prototype.resizeTo = function (width, height, callback) {
                    if (!this._ready) {
                        throw "resizeTo can't be called on an unready window";
                    }
                    var size = new Position(width, height);

                    this._window.setSize(size.left, size.top);
                    if (callback) {
                        callback();
                    }
                };

                /**
                 * Moves the window instance.
                 * @method
                 * @param {number} left
                 * @param {number} top
                 * @param {callback=}
                 */
                Window.prototype.moveTo = function (left, top, callback) {
                    if (!this._ready) {
                        throw "moveTo can't be called on an unready window";
                    }
                    var pos = new Position(left, top);

                    this._window._dockMoveTo(left, top);
                    //this._window.setPosition(left, top);
                    if (callback) {
                        callback();
                    }
                };

                /**
                 * Moves the window instance relative to its current position.
                 * @method
                 * @param {number} deltaLeft
                 * @param {number} deltaTop
                 * @param {callback=}
                 */
                Window.prototype.moveBy = function (deltaLeft, deltaTop, callback) {
                    if (!this._ready) {
                        throw "moveBy can't be called on an unready window";
                    }
                    var bounds = this.getBounds();
                    var deltaPos = new Position(deltaLeft, deltaTop);

                    this._window._dockMoveTo(bounds.left + deltaPos.left, bounds.top + deltaPos.top);
                    //this._window.setPosition(bounds.left + deltaPos.left, bounds.top + deltaPos.top);
                    if (callback) {
                        callback();
                    }
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
                    if (!this._ready) {
                        throw "resizeTo can't be called on an unready window";
                    }
                    var bounds = new BoundingBox(left, top, right, bottom);

                    this._window.setSize({
                        x: left,
                        y: top,
                        width: right - left,
                        height: bottom - top
                    });
                    if (callback) {
                        callback();
                    }
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
                    // TODO: Finish
                    //return windowfactory._windows.splice();
                };

                _extends(windowfactory, {
                    Window: Window,
                    _resolveWindowWithID: function _resolveWindowWithID(id) {
                        return windows[id] || new Window(BrowserWindow.fromId(id));
                    }
                });
            })();
        } else if (windowfactory.isBackend) {
            (function () {
                var _global$nodeRequire = global.nodeRequire("electron");

                var BrowserWindow = _global$nodeRequire.BrowserWindow;
                var ipcMain = _global$nodeRequire.ipcMain;


                if (BrowserWindow) {
                    (function () {
                        var _windowfactory$geomet = windowfactory.geometry;
                        var Vector = _windowfactory$geomet.Vector;
                        var BoundingBox = _windowfactory$geomet.BoundingBox;

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
                            for (var _iterator30 = BrowserWindow.getAllWindows(), _isArray30 = Array.isArray(_iterator30), _i30 = 0, _iterator30 = _isArray30 ? _iterator30 : _iterator30[Symbol.iterator]();;) {
                                var _ref30;

                                if (_isArray30) {
                                    if (_i30 >= _iterator30.length) break;
                                    _ref30 = _iterator30[_i30++];
                                } else {
                                    _i30 = _iterator30.next();
                                    if (_i30.done) break;
                                    _ref30 = _i30.value;
                                }

                                var other = _ref30;

                                other.webContents.send("window-create", other.id);
                            }
                        };
                        BrowserWindow.prototype._ensureDockSystem = function () {
                            var _this = this;

                            // Make sure docked group exists:
                            if (this._dockedGroup === undefined) {
                                (function () {
                                    _this._dockedGroup = [_this];

                                    _this.on("closed", function () {
                                        // Clean up the dock system when this window closes:
                                        this.undock();
                                    });

                                    _this.on("maximize", function () {
                                        this.undock(); // TODO: Support changing size when docked.
                                    });
                                    _this.on("minimize", function () {
                                        this._dockMinimize();
                                    });

                                    _this.on("restore", function () {
                                        for (var _iterator31 = this._dockedGroup, _isArray31 = Array.isArray(_iterator31), _i31 = 0, _iterator31 = _isArray31 ? _iterator31 : _iterator31[Symbol.iterator]();;) {
                                            var _ref31;

                                            if (_isArray31) {
                                                if (_i31 >= _iterator31.length) break;
                                                _ref31 = _iterator31[_i31++];
                                            } else {
                                                _i31 = _iterator31.next();
                                                if (_i31.done) break;
                                                _ref31 = _i31.value;
                                            }

                                            var other = _ref31;

                                            if (other !== this) {
                                                other.restore();
                                            }
                                        }
                                    });

                                    var lastBounds = _this.getBounds();
                                    _this.on("move", function () {
                                        var newBounds = this.getBounds();
                                        //this._dockMoveTo(newBounds.x, newBounds.y, [lastBounds.x, lastBounds.y]);
                                        lastBounds = newBounds;
                                    });
                                    _this.on("resize", function () {
                                        var newBounds = this.getBounds();

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
                                })();
                            }
                        };
                        BrowserWindow.prototype.dock = function (otherID) {
                            this._ensureDockSystem();

                            // Resolve otherID, and fail if otherID doesn't exist.
                            var other = BrowserWindow.fromId(otherID);
                            if (other === undefined) {
                                return;
                            } // Failed to find other. TODO: Return error

                            // If other is already in the group, return:
                            if (this._dockedGroup.indexOf(other) >= 0) {
                                return;
                            }

                            // Make sure docked group exists:
                            other._ensureDockSystem();

                            // Loop through all windows in otherGroup and add them to this's group:
                            for (var _iterator32 = other._dockedGroup, _isArray32 = Array.isArray(_iterator32), _i32 = 0, _iterator32 = _isArray32 ? _iterator32 : _iterator32[Symbol.iterator]();;) {
                                var _ref32;

                                if (_isArray32) {
                                    if (_i32 >= _iterator32.length) break;
                                    _ref32 = _iterator32[_i32++];
                                } else {
                                    _i32 = _iterator32.next();
                                    if (_i32.done) break;
                                    _ref32 = _i32.value;
                                }

                                var _other3 = _ref32;

                                this._dockedGroup.push(_other3);
                                // Sharing the array between window objects makes it easier to manage:
                                _other3._dockedGroup = this._dockedGroup;
                            }

                            //console.log("dock", this._dockedGroup);
                            // TODO: Check if otherGroup is touching
                        };
                        BrowserWindow.prototype.undock = function () {
                            this._ensureDockSystem();

                            // Check to see if window is already undocked:
                            if (this._dockedGroup.length === 1) {
                                return;
                            }

                            // Undock this:
                            this._dockedGroup.splice(this._dockedGroup.indexOf(this), 1);
                            this._dockedGroup = [this];

                            //console.log("undock", this._dockedGroup);
                            // TODO: Redock those still touching, EXCEPT 'this'.
                        };
                        BrowserWindow.prototype._dockFocus = function () {
                            this._ensureDockSystem();

                            for (var _iterator33 = this._dockedGroup, _isArray33 = Array.isArray(_iterator33), _i33 = 0, _iterator33 = _isArray33 ? _iterator33 : _iterator33[Symbol.iterator]();;) {
                                var _ref33;

                                if (_isArray33) {
                                    if (_i33 >= _iterator33.length) break;
                                    _ref33 = _iterator33[_i33++];
                                } else {
                                    _i33 = _iterator33.next();
                                    if (_i33.done) break;
                                    _ref33 = _i33.value;
                                }

                                var _window14 = _ref33;

                                if (_window14 !== this) {
                                    _window14.setAlwaysOnTop(true);
                                    _window14.setAlwaysOnTop(false);
                                }
                            }
                            this.setAlwaysOnTop(true);
                            this.setAlwaysOnTop(false);
                        };
                        BrowserWindow.prototype._dragStart = function () {
                            //if (!this.emit("drag-start")) { return; } // Allow preventing drag
                            this._ensureDockSystem();

                            this.restore();

                            for (var _iterator34 = this._dockedGroup, _isArray34 = Array.isArray(_iterator34), _i34 = 0, _iterator34 = _isArray34 ? _iterator34 : _iterator34[Symbol.iterator]();;) {
                                var _ref34;

                                if (_isArray34) {
                                    if (_i34 >= _iterator34.length) break;
                                    _ref34 = _iterator34[_i34++];
                                } else {
                                    _i34 = _iterator34.next();
                                    if (_i34.done) break;
                                    _ref34 = _i34.value;
                                }

                                var _window15 = _ref34;

                                _window15._dragStartPos = _window15.getPosition();
                            }
                        };
                        BrowserWindow.prototype._getBounds = function () {
                            var bounds = this.getBounds();
                            return new BoundingBox(bounds.x, bounds.y, bounds.x + bounds.width, bounds.y + bounds.height);
                        };
                        BrowserWindow.prototype._dragBy = function (deltaLeft, deltaTop) {
                            this._ensureDockSystem();

                            // Perform Snap:
                            var thisBounds = this._getBounds().moveTo(this._dragStartPos[0] + deltaLeft, this._dragStartPos[1] + deltaTop);
                            var snapDelta = new Vector(NaN, NaN);
                            for (var _iterator35 = BrowserWindow.getAllWindows(), _isArray35 = Array.isArray(_iterator35), _i35 = 0, _iterator35 = _isArray35 ? _iterator35 : _iterator35[Symbol.iterator]();;) {
                                var _ref35;

                                if (_isArray35) {
                                    if (_i35 >= _iterator35.length) break;
                                    _ref35 = _iterator35[_i35++];
                                } else {
                                    _i35 = _iterator35.next();
                                    if (_i35.done) break;
                                    _ref35 = _i35.value;
                                }

                                var other = _ref35;

                                if (other._dockedGroup !== this._dockedGroup) {
                                    snapDelta.setMin(thisBounds.getSnapDelta(other._getBounds()));
                                }
                            }
                            deltaLeft += snapDelta.left || 0;
                            deltaTop += snapDelta.top || 0;

                            for (var _iterator36 = this._dockedGroup, _isArray36 = Array.isArray(_iterator36), _i36 = 0, _iterator36 = _isArray36 ? _iterator36 : _iterator36[Symbol.iterator]();;) {
                                var _ref36;

                                if (_isArray36) {
                                    if (_i36 >= _iterator36.length) break;
                                    _ref36 = _iterator36[_i36++];
                                } else {
                                    _i36 = _iterator36.next();
                                    if (_i36.done) break;
                                    _ref36 = _i36.value;
                                }

                                var _other4 = _ref36;

                                var pos = _other4._dragStartPos;

                                // If other doesn't have a drag position, start it:
                                if (pos === undefined) {
                                    pos = _other4._dragStartPos = _other4.getPosition();
                                    pos[0] -= deltaLeft;
                                    pos[1] -= deltaTop;
                                }

                                _other4.setPosition(pos[0] + deltaLeft, pos[1] + deltaTop);
                            }
                        };
                        BrowserWindow.prototype._dragStop = function () {
                            this._ensureDockSystem();

                            // Dock to those it snapped to:
                            var thisBounds = this._getBounds();
                            for (var _iterator37 = BrowserWindow.getAllWindows(), _isArray37 = Array.isArray(_iterator37), _i37 = 0, _iterator37 = _isArray37 ? _iterator37 : _iterator37[Symbol.iterator]();;) {
                                var _ref37;

                                if (_isArray37) {
                                    if (_i37 >= _iterator37.length) break;
                                    _ref37 = _iterator37[_i37++];
                                } else {
                                    _i37 = _iterator37.next();
                                    if (_i37.done) break;
                                    _ref37 = _i37.value;
                                }

                                var other = _ref37;

                                if (thisBounds.isTouching(other._getBounds())) {
                                    this.dock(other.id);
                                }
                            }

                            for (var _iterator38 = this._dockedGroup, _isArray38 = Array.isArray(_iterator38), _i38 = 0, _iterator38 = _isArray38 ? _iterator38 : _iterator38[Symbol.iterator]();;) {
                                var _ref38;

                                if (_isArray38) {
                                    if (_i38 >= _iterator38.length) break;
                                    _ref38 = _iterator38[_i38++];
                                } else {
                                    _i38 = _iterator38.next();
                                    if (_i38.done) break;
                                    _ref38 = _i38.value;
                                }

                                var _window16 = _ref38;

                                delete _window16._dragStartPos;
                            }
                        };
                        BrowserWindow.prototype._dockMoveTo = function (left, top) {
                            this._ensureDockSystem();

                            var oldPos = this.getPosition();
                            var deltaLeft = left - oldPos[0];
                            var deltaTop = top - oldPos[1];

                            for (var _iterator39 = this._dockedGroup, _isArray39 = Array.isArray(_iterator39), _i39 = 0, _iterator39 = _isArray39 ? _iterator39 : _iterator39[Symbol.iterator]();;) {
                                var _ref39;

                                if (_isArray39) {
                                    if (_i39 >= _iterator39.length) break;
                                    _ref39 = _iterator39[_i39++];
                                } else {
                                    _i39 = _iterator39.next();
                                    if (_i39.done) break;
                                    _ref39 = _i39.value;
                                }

                                var other = _ref39;

                                var pos = other.getPosition();

                                other.setPosition(pos[0] + deltaLeft, pos[1] + deltaTop);
                            }
                        };
                        BrowserWindow.prototype._dockMinimize = function (left, top) {
                            this._ensureDockSystem();

                            for (var _iterator40 = this._dockedGroup, _isArray40 = Array.isArray(_iterator40), _i40 = 0, _iterator40 = _isArray40 ? _iterator40 : _iterator40[Symbol.iterator]();;) {
                                var _ref40;

                                if (_isArray40) {
                                    if (_i40 >= _iterator40.length) break;
                                    _ref40 = _iterator40[_i40++];
                                } else {
                                    _i40 = _iterator40.next();
                                    if (_i40.done) break;
                                    _ref40 = _i40.value;
                                }

                                var _window17 = _ref40;

                                _window17.minimize();
                            }
                        };
                        BrowserWindow.prototype._dockHide = function (left, top) {
                            this._ensureDockSystem();

                            for (var _iterator41 = this._dockedGroup, _isArray41 = Array.isArray(_iterator41), _i41 = 0, _iterator41 = _isArray41 ? _iterator41 : _iterator41[Symbol.iterator]();;) {
                                var _ref41;

                                if (_isArray41) {
                                    if (_i41 >= _iterator41.length) break;
                                    _ref41 = _iterator41[_i41++];
                                } else {
                                    _i41 = _iterator41.next();
                                    if (_i41.done) break;
                                    _ref41 = _i41.value;
                                }

                                var _window18 = _ref41;

                                _window18.hide();
                            }
                        };
                        BrowserWindow.prototype._dockShow = function (left, top) {
                            this._ensureDockSystem();

                            for (var _iterator42 = this._dockedGroup, _isArray42 = Array.isArray(_iterator42), _i42 = 0, _iterator42 = _isArray42 ? _iterator42 : _iterator42[Symbol.iterator]();;) {
                                var _ref42;

                                if (_isArray42) {
                                    if (_i42 >= _iterator42.length) break;
                                    _ref42 = _iterator42[_i42++];
                                } else {
                                    _i42 = _iterator42.next();
                                    if (_i42.done) break;
                                    _ref42 = _i42.value;
                                }

                                var _window19 = _ref42;

                                _window19.show();
                            }
                        };
                    })();
                }
            })();
        }
    })();
    /*global windowfactory,nodeRequire*/
    (function () {
        if (!windowfactory.isRenderer || windowfactory.isBackend || !windowfactory.electronVersion) {
            return;
        }

        var Window = windowfactory.Window;

        var _nodeRequire = nodeRequire("electron");

        var remote = _nodeRequire.remote;
        var ipcRenderer = _nodeRequire.ipcRenderer;

        var readyCallbacks = [];
        var _isReady2 = true;
        var allWindows = {};

        function registerWindow(window) {
            // Register window:
            allWindows[window.id] = window;

            // Generate function for onclose:
            function _removeWindowEvent() {
                delete allWindows[window.id];
            }

            // Register onclose event handler:
            window.on("close", _removeWindowEvent);

            // If currentWindow closes before the above handler is called, remove handler to prevent leak:
            Window.current._window.on("close", function () {
                window.off("close", _removeWindowEvent);
            });
        }

        //remote.BrowserWindow.getAllWindows().forEach(registerWindow);

        function _newWindowEvent(event, window) {
            registerWindow(window);
        }
        //remote.app.on("browser-window-created", _newWindowEvent);
        // If currentWindow closes before the above handler is called, remove handler to prevent leak:
        /*Window.current._window.on("close", function () {
            remote.app.off("browser-window-created", _newWindowEvent);
        });*/

        // TODO: Window Manager, so instances are saved and returned, rather than making copies.
        // TODO: Make use the remote.getGlobal to share between renderers.

        function onReady(callback) {
            // Check if callback is not a function:
            if (!(callback && callback.constructor && callback.call && callback.apply)) {
                throw "onReady expects a function passed as the callback argument!";
            }

            // Check if already ready:
            if (_isReady2) {
                callback();
            }

            // Check to see if callback is already in readyCallbacks:
            if (readyCallbacks.indexOf(callback) >= 0) {
                return;
            }

            readyCallbacks.push(callback);
        }

        function getAllWindows() {
            var windows = [];
            for (var id in allWindows) {
                if (allWindows.hasOwnProperty(id)) {
                    windows.push(allWindows[id]);
                }
            }

            return windows;
        }

        // Setup handlers on this window:
        var wX = 0;
        var wY = 0;
        var dragging = false;

        Window.current._window.on("focus", function () {
            Window.current._window._dockFocus();
        });

        window.addEventListener("mousedown", function (event) {
            if (event.target.classList.contains("window-drag")) {
                dragging = true;
                wX = event.screenX;
                wY = event.screenY;
                Window.current._window._dragStart();
            }
        });

        window.addEventListener("mousemove", function (event) {
            if (dragging) {
                //Window.current.moveTo(event.screenX - wX, event.screenY - wY);
                Window.current._window._dragBy(event.screenX - wX, event.screenY - wY);
            }
        });

        window.addEventListener("mouseup", function () {
            dragging = false;
            Window.current._window._dragStop();
        });

        // Add context menu:
        var Menu = remote.Menu;
        var MenuItem = remote.MenuItem;

        var rightClickPosition = null;

        var menu = new Menu();
        menu.append(new MenuItem({
            label: "Reload",
            accelerator: "CmdOrCtrl+R",
            click: function click() {
                Window.current._window.reload();
            }
        }));
        menu.append(new MenuItem({
            label: "Reload app and restart children",
            click: function click() {
                remote.app.relaunch();
                remote.app.exit(0);
            }
        }));
        menu.append(new MenuItem({ type: "separator" }));
        menu.append(new MenuItem({
            label: "Inspect Element",
            accelerator: "CmdOrCtrl+Shift+I",
            click: function click() {
                Window.current._window.inspectElement(rightClickPosition.x, rightClickPosition.y);
            }
        }));

        window.addEventListener("contextmenu", function (event) {
            event.preventDefault();
            rightClickPosition = { x: event.x, y: event.y };
            menu.popup(Window.current._window);
        }, false);

        _extends(windowfactory, {
            onReady: onReady,
            isReady: function isReady() {
                return _isReady2;
            },
            runtime: "Electron",
            runtimeVersion: windowfactory.electronVersion
        });
    })();
    // TODO: Make scalejs.windowfactory the main.js script for Electron. Load the config.json

    /*global windowfactory,fin,SyncCallback,EventHandler*/
    /*jshint bitwise: false*/
    (function () {
        if (windowfactory.isRenderer && !windowfactory.isBackend && windowfactory.openfinVersion) {
            (function () {
                var geometry = windowfactory.geometry;
                var Vector = geometry.Vector;
                var Position = geometry.Position;
                var Size = geometry.Size;
                var BoundingBox = geometry.BoundingBox;
                var currentWin = void 0; // = fin.desktop.Window.getCurrent();
                var defaultConfig = {
                    defaultWidth: 600,
                    defaultHeight: 600,
                    frame: false,
                    resizable: true,
                    saveWindowState: false,
                    autoShow: true,
                    icon: location.href + "favicon.ico"
                };
                var configMap = {
                    left: "defaultLeft",
                    top: "defaultTop",
                    width: "defaultWidth",
                    height: "defaultHeight"
                };
                var acceptedEventHandlers = ["ready", "drag-start", "drag-before", "drag-stop", "dock-before", "move", "move-before", "resize-before", "close", "minimize"];

                var lut = [];
                for (var i = 0; i < 256; i += 1) {
                    lut[i] = (i < 16 ? "0" : "") + i.toString(16);
                }
                var genUIDE7 = function genUIDE7() {
                    var d0 = Math.random() * 0xffffffff | 0;
                    var d1 = Math.random() * 0xffffffff | 0;
                    var d2 = Math.random() * 0xffffffff | 0;
                    var d3 = Math.random() * 0xffffffff | 0;
                    return lut[d0 & 0xff] + lut[d0 >> 8 & 0xff] + lut[d0 >> 16 & 0xff] + lut[d0 >> 24 & 0xff] + "-" + lut[d1 & 0xff] + lut[d1 >> 8 & 0xff] + "-" + lut[d1 >> 16 & 0x0f | 0x40] + lut[d1 >> 24 & 0xff] + "-" + lut[d2 & 0x3f | 0x80] + lut[d2 >> 8 & 0xff] + "-" + lut[d2 >> 16 & 0xff] + lut[d2 >> 24 & 0xff] + lut[d3 & 0xff] + lut[d3 >> 8 & 0xff] + lut[d3 >> 16 & 0xff] + lut[d3 >> 24 & 0xff];
                };
                var getUniqueWindowName = function getUniqueWindowName() {
                    return "window" + genUIDE7() + new Date().getTime();
                };

                var Window = function Window(config) {
                    if (!(this instanceof Window)) {
                        return new Window(config);
                    }

                    config = config || {}; // If no arguments are passed, assume we are creating a default blank window
                    var isArgConfig = /*jshint camelcase: false*/config.app_uuid /*jshint camelcase: true*/ === undefined;

                    // Call the parent constructor:
                    EventHandler.call(this, acceptedEventHandlers);
                    this._bounds = new BoundingBox();
                    this._ready = false;
                    this._isClosed = false;
                    this._dockedGroup = [this];
                    this._children = [];
                    this._parent = undefined;

                    if (isArgConfig) {
                        for (var prop in config) {
                            if (config.hasOwnProperty(prop) && configMap[prop] !== undefined) {
                                config[configMap[prop]] = config[prop];
                                delete config[prop];
                            }
                        }
                        for (var _prop3 in defaultConfig) {
                            if (defaultConfig.hasOwnProperty(_prop3)) {
                                config[_prop3] = config[_prop3] || defaultConfig[_prop3];
                            }
                        }
                        config.name = getUniqueWindowName();

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
                    var thisWindow = this;
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
                        var parent = thisWindow.getParent();
                        for (var _iterator43 = thisWindow.getChildren(), _isArray43 = Array.isArray(_iterator43), _i43 = 0, _iterator43 = _isArray43 ? _iterator43 : _iterator43[Symbol.iterator]();;) {
                            var _ref43;

                            if (_isArray43) {
                                if (_i43 >= _iterator43.length) break;
                                _ref43 = _iterator43[_i43++];
                            } else {
                                _i43 = _iterator43.next();
                                if (_i43.done) break;
                                _ref43 = _i43.value;
                            }

                            var child = _ref43;

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
                    if (this.isClosed()) {
                        throw "onReady can't be called on a closed window";
                    }
                    if (this.isReady()) {
                        return callback.call(this);
                    }

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

                    if (parent === this._parent) {
                        return;
                    }

                    if (this._parent) {
                        var index = this._parent._children.indexOf(this);
                        if (index >= 0) {
                            this._parent._children.splice(index, 1);
                        }
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

                Window.prototype.close = function (callback) {
                    if (this.isClosed()) {
                        return callback && callback();
                    }
                    this._window.close(callback);
                };

                Window.prototype.minimize = function (callback) {
                    if (!this._ready) {
                        throw "minimize can't be called on an unready window";
                    }

                    callback = new SyncCallback(callback);
                    for (var _iterator44 = this._dockedGroup, _isArray44 = Array.isArray(_iterator44), _i44 = 0, _iterator44 = _isArray44 ? _iterator44 : _iterator44[Symbol.iterator]();;) {
                        var _ref44;

                        if (_isArray44) {
                            if (_i44 >= _iterator44.length) break;
                            _ref44 = _iterator44[_i44++];
                        } else {
                            _i44 = _iterator44.next();
                            if (_i44.done) break;
                            _ref44 = _i44.value;
                        }

                        var _window20 = _ref44;

                        _window20._window.minimize(callback.ref());
                    }
                };

                Window.prototype.maximize = function (callback) {
                    if (!this._ready) {
                        throw "maximize can't be called on an unready window";
                    }

                    this._window.maximize(callback);
                };

                Window.prototype.show = function (callback) {
                    if (!this._ready) {
                        throw "show can't be called on an unready window";
                    }

                    callback = new SyncCallback(callback);
                    for (var _iterator45 = this._dockedGroup, _isArray45 = Array.isArray(_iterator45), _i45 = 0, _iterator45 = _isArray45 ? _iterator45 : _iterator45[Symbol.iterator]();;) {
                        var _ref45;

                        if (_isArray45) {
                            if (_i45 >= _iterator45.length) break;
                            _ref45 = _iterator45[_i45++];
                        } else {
                            _i45 = _iterator45.next();
                            if (_i45.done) break;
                            _ref45 = _i45.value;
                        }

                        var _window21 = _ref45;

                        _window21._window.show(callback.ref());
                    }
                };

                Window.prototype.hide = function (callback) {
                    if (!this._ready) {
                        throw "hide can't be called on an unready window";
                    }

                    callback = new SyncCallback(callback);
                    for (var _iterator46 = this._dockedGroup, _isArray46 = Array.isArray(_iterator46), _i46 = 0, _iterator46 = _isArray46 ? _iterator46 : _iterator46[Symbol.iterator]();;) {
                        var _ref46;

                        if (_isArray46) {
                            if (_i46 >= _iterator46.length) break;
                            _ref46 = _iterator46[_i46++];
                        } else {
                            _i46 = _iterator46.next();
                            if (_i46.done) break;
                            _ref46 = _i46.value;
                        }

                        var _window22 = _ref46;

                        _window22._window.hide(callback.ref());
                    }
                };

                Window.prototype.restore = function (callback) {
                    if (!this._ready) {
                        throw "restore can't be called on an unready window";
                    }

                    callback = new SyncCallback(callback);
                    for (var _iterator47 = this._dockedGroup, _isArray47 = Array.isArray(_iterator47), _i47 = 0, _iterator47 = _isArray47 ? _iterator47 : _iterator47[Symbol.iterator]();;) {
                        var _ref47;

                        if (_isArray47) {
                            if (_i47 >= _iterator47.length) break;
                            _ref47 = _iterator47[_i47++];
                        } else {
                            _i47 = _iterator47.next();
                            if (_i47.done) break;
                            _ref47 = _i47.value;
                        }

                        var _window23 = _ref47;

                        _window23._window.restore(callback.ref());
                    }
                };

                Window.prototype.bringToFront = function (callback) {
                    if (!this._ready) {
                        throw "bringToFront can't be called on an unready window";
                    }
                    var thisWindow = this;

                    var beforeCallback = new SyncCallback(function () {
                        thisWindow._window.bringToFront(callback);
                    });
                    for (var _iterator48 = this._dockedGroup, _isArray48 = Array.isArray(_iterator48), _i48 = 0, _iterator48 = _isArray48 ? _iterator48 : _iterator48[Symbol.iterator]();;) {
                        var _ref48;

                        if (_isArray48) {
                            if (_i48 >= _iterator48.length) break;
                            _ref48 = _iterator48[_i48++];
                        } else {
                            _i48 = _iterator48.next();
                            if (_i48.done) break;
                            _ref48 = _i48.value;
                        }

                        var _window24 = _ref48;

                        if (_window24 !== this) {
                            _window24._window.bringToFront(beforeCallback.ref());
                        }
                    }
                };

                Window.prototype.focus = function (callback) {
                    if (!this._ready) {
                        throw "focus can't be called on an unready window";
                    }
                    var thisWindow = this;

                    var beforeCallback = new SyncCallback(function () {
                        thisWindow._window.focus(callback);
                    });
                    for (var _iterator49 = this._dockedGroup, _isArray49 = Array.isArray(_iterator49), _i49 = 0, _iterator49 = _isArray49 ? _iterator49 : _iterator49[Symbol.iterator]();;) {
                        var _ref49;

                        if (_isArray49) {
                            if (_i49 >= _iterator49.length) break;
                            _ref49 = _iterator49[_i49++];
                        } else {
                            _i49 = _iterator49.next();
                            if (_i49.done) break;
                            _ref49 = _i49.value;
                        }

                        var _window25 = _ref49;

                        if (_window25 !== this) {
                            _window25._window.focus(beforeCallback.ref());
                        }
                    }
                };

                Window.prototype.resizeTo = function (width, height, callback) {
                    if (!this._ready) {
                        throw "resizeTo can't be called on an unready window";
                    }
                    if (!this.emit("resize-before")) {
                        return;
                    } // Allow preventing resize
                    var size = new Position(width, height);

                    this._window.resizeTo(size.left, size.top, "top-left", callback);
                };

                Window.prototype.moveTo = function (left, top, callback) {
                    if (!this._ready) {
                        throw "moveTo can't be called on an unready window";
                    }
                    if (!this.emit("move-before")) {
                        return;
                    } // Allow preventing move
                    var deltaPos = new Position(left, top).subtract(this.getPosition());

                    callback = new SyncCallback(callback);
                    for (var _iterator50 = this._dockedGroup, _isArray50 = Array.isArray(_iterator50), _i50 = 0, _iterator50 = _isArray50 ? _iterator50 : _iterator50[Symbol.iterator]();;) {
                        var _ref50;

                        if (_isArray50) {
                            if (_i50 >= _iterator50.length) break;
                            _ref50 = _iterator50[_i50++];
                        } else {
                            _i50 = _iterator50.next();
                            if (_i50.done) break;
                            _ref50 = _i50.value;
                        }

                        var _window26 = _ref50;

                        var pos = _window26.getPosition().add(deltaPos);
                        _window26._bounds.moveTo(pos);
                        _window26._window.moveTo(pos.left, pos.top, callback.ref());
                    }
                };

                Window.prototype.moveBy = function (deltaLeft, deltaTop, callback) {
                    if (!this._ready) {
                        throw "moveBy can't be called on an unready window";
                    }
                    if (!this.emit("move-before")) {
                        return;
                    } // Allow preventing move
                    var deltaPos = new Position(deltaLeft, deltaTop);

                    callback = new SyncCallback(callback);
                    for (var _iterator51 = this._dockedGroup, _isArray51 = Array.isArray(_iterator51), _i51 = 0, _iterator51 = _isArray51 ? _iterator51 : _iterator51[Symbol.iterator]();;) {
                        var _ref51;

                        if (_isArray51) {
                            if (_i51 >= _iterator51.length) break;
                            _ref51 = _iterator51[_i51++];
                        } else {
                            _i51 = _iterator51.next();
                            if (_i51.done) break;
                            _ref51 = _i51.value;
                        }

                        var _window27 = _ref51;

                        var pos = _window27.getPosition().add(deltaPos);
                        _window27._bounds.moveTo(pos);
                        _window27._window.moveTo(pos.left, pos.top, callback.ref());
                    }
                };

                Window.prototype.setSize = function (width, height, callback) {
                    if (!this._ready) {
                        throw "setSize can't be called on an unready window";
                    }
                    var size = new Size(width, height);

                    this._window.resizeTo(size.left, size.top, "top-left", callback);
                };

                Window.prototype.setBounds = function (left, top, right, bottom, callback) {
                    if (!this._ready) {
                        throw "resizeTo can't be called on an unready window";
                    }
                    var bounds = new BoundingBox(left, top, right, bottom);

                    this._window.setBounds(bounds.left, bounds.top, bounds.right, bounds.bottom, callback);
                };

                Window.prototype.dock = function (other) {
                    if (!this.emit("dock-before")) {
                        return;
                    } // Allow preventing dock
                    if (other === undefined) {
                        return;
                    } // Failed to find other. TODO: Return error

                    // If other is already in the group, return:
                    if (this._dockedGroup.indexOf(other) >= 0) {
                        return;
                    }

                    // Loop through all windows in otherGroup and add them to this's group:
                    for (var _iterator52 = other._dockedGroup, _isArray52 = Array.isArray(_iterator52), _i52 = 0, _iterator52 = _isArray52 ? _iterator52 : _iterator52[Symbol.iterator]();;) {
                        var _ref52;

                        if (_isArray52) {
                            if (_i52 >= _iterator52.length) break;
                            _ref52 = _iterator52[_i52++];
                        } else {
                            _i52 = _iterator52.next();
                            if (_i52.done) break;
                            _ref52 = _i52.value;
                        }

                        var _other5 = _ref52;

                        this._dockedGroup.push(_other5);
                        // Sharing the array between window objects makes it easier to manage:
                        _other5._dockedGroup = this._dockedGroup;
                    }

                    //console.log("dock", thisWindow._dockedGroup);
                    // TODO: Check if otherGroup is touching
                };
                Window.prototype.undock = function (other) {
                    // Check to see if window is already undocked:
                    if (this._dockedGroup.length === 1) {
                        return;
                    }

                    // Undock this:
                    this._dockedGroup.splice(this._dockedGroup.indexOf(this), 1);
                    this._dockedGroup = [this];

                    //console.log("undock", this._dockedGroup);
                    // TODO: Redock those still touching, EXCEPT 'this'.
                };

                Window.prototype._dragStart = function () {
                    if (!this.emit("drag-start")) {
                        return;
                    } // Allow preventing drag
                    for (var _iterator53 = this._dockedGroup, _isArray53 = Array.isArray(_iterator53), _i53 = 0, _iterator53 = _isArray53 ? _iterator53 : _iterator53[Symbol.iterator]();;) {
                        var _ref53;

                        if (_isArray53) {
                            if (_i53 >= _iterator53.length) break;
                            _ref53 = _iterator53[_i53++];
                        } else {
                            _i53 = _iterator53.next();
                            if (_i53.done) break;
                            _ref53 = _i53.value;
                        }

                        var _window28 = _ref53;

                        _window28._dragStartPos = _window28.getPosition();
                    }
                };

                Window.prototype._dragBy = function (deltaLeft, deltaTop) {
                    if (!this.emit("drag-before")) {
                        return;
                    } // Allow preventing drag
                    // Perform Snap:
                    var thisBounds = this.getBounds().moveTo(this._dragStartPos.left + deltaLeft, this._dragStartPos.top + deltaTop);
                    var snapDelta = new Vector(NaN, NaN);
                    for (var otherID in windowfactory._windows) {
                        if (windowfactory._windows.hasOwnProperty(otherID)) {
                            var other = windowfactory._windows[otherID];
                            if (other._dockedGroup !== this._dockedGroup) {
                                snapDelta.setMin(thisBounds.getSnapDelta(other.getBounds()));
                            }
                        }
                    }
                    deltaLeft += snapDelta.left || 0;
                    deltaTop += snapDelta.top || 0;

                    for (var _iterator54 = this._dockedGroup, _isArray54 = Array.isArray(_iterator54), _i54 = 0, _iterator54 = _isArray54 ? _iterator54 : _iterator54[Symbol.iterator]();;) {
                        var _ref54;

                        if (_isArray54) {
                            if (_i54 >= _iterator54.length) break;
                            _ref54 = _iterator54[_i54++];
                        } else {
                            _i54 = _iterator54.next();
                            if (_i54.done) break;
                            _ref54 = _i54.value;
                        }

                        var _other6 = _ref54;

                        var pos = _other6._dragStartPos;

                        // If other doesn't have a drag position, start it:
                        if (pos === undefined) {
                            pos = _other6._dragStartPos = _other6.getPosition();
                            pos.left -= deltaLeft;
                            pos.top -= deltaTop;
                        }

                        _other6._window.moveTo(pos.left + deltaLeft, pos.top + deltaTop);
                    }
                };

                Window.prototype._dragStop = function () {
                    // Dock to those it snapped to:
                    var thisBounds = this.getBounds();
                    for (var otherID in windowfactory._windows) {
                        if (windowfactory._windows.hasOwnProperty(otherID)) {
                            var other = windowfactory._windows[otherID];
                            if (thisBounds.isTouching(other.getBounds())) {
                                this.dock(other);
                            }
                        }
                    }

                    for (var _iterator55 = this._dockedGroup, _isArray55 = Array.isArray(_iterator55), _i55 = 0, _iterator55 = _isArray55 ? _iterator55 : _iterator55[Symbol.iterator]();;) {
                        var _ref55;

                        if (_isArray55) {
                            if (_i55 >= _iterator55.length) break;
                            _ref55 = _iterator55[_i55++];
                        } else {
                            _i55 = _iterator55.next();
                            if (_i55.done) break;
                            _ref55 = _i55.value;
                        }

                        var _window29 = _ref55;

                        delete _window29._dragStartPos;
                    }

                    this.emit("drag-stop");
                };

                // Handle current window in this context:
                // TODO: Rewrite to remove setTimeout for the following:
                fin.desktop.main(function () {
                    currentWin = fin.desktop.Window.getCurrent();
                    var getCurrent = function getCurrent() {
                        if (windowfactory._windows) {
                            Window.current = windowfactory._windows[currentWin.name] || new Window(currentWin);
                        } else {
                            setTimeout(getCurrent, 5);
                        }
                    };
                    getCurrent();
                });

                Window.getAll = function () {
                    return Object.keys(windowfactory._windows).map(function (name) {
                        return windowfactory._windows[name];
                    });
                };

                _extends(windowfactory, {
                    Window: Window
                });
            })();
        }
    })();
    /*global windowfactory,fin*/
    (function () {
        if (!windowfactory.isRenderer || windowfactory.isBackend || !windowfactory.openfinVersion) {
            return;
        }

        var Window = windowfactory.Window;
        var APP_UUID = "app_uuid";
        var readyCallbacks = [];
        var _isReady3 = false;

        function onReady(callback) {
            // Check if callback is not a function:
            if (!(callback && callback.constructor && callback.call && callback.apply)) {
                throw "onReady expects a function passed as the callback argument!";
            }

            // Check if already ready:
            if (_isReady3) {
                callback();
            }

            // Check to see if callback is already in readyCallbacks:
            if (readyCallbacks.indexOf(callback) >= 0) {
                return;
            }

            readyCallbacks.push(callback);
        }

        function ready() {
            Window.current._window.addEventListener("focused", function () {
                Window.current.bringToFront();
            });
            Window.current._window.addEventListener("restored", function () {
                for (var _iterator56 = Window.current._dockedGroup, _isArray56 = Array.isArray(_iterator56), _i56 = 0, _iterator56 = _isArray56 ? _iterator56 : _iterator56[Symbol.iterator]();;) {
                    var _ref56;

                    if (_isArray56) {
                        if (_i56 >= _iterator56.length) break;
                        _ref56 = _iterator56[_i56++];
                    } else {
                        _i56 = _iterator56.next();
                        if (_i56.done) break;
                        _ref56 = _i56.value;
                    }

                    var other = _ref56;

                    if (other !== Window.current) {
                        other._window.restore();
                    }
                }
            });

            _isReady3 = true;
            for (var index = 0; index < readyCallbacks.length; index += 1) {
                readyCallbacks[index]();
            }
            readyCallbacks = [];
        }

        windowfactory._openfinOnReady(function () {
            // Setup handlers on this window:
            var wX = 0;
            var wY = 0;
            var dragging = false;
            //let titlebarEl = document.querySelector("titlebar");

            window.addEventListener("mousedown", function (e) {
                if (e.target.classList.contains("window-drag")) {
                    dragging = true;
                    wX = event.screenX;
                    wY = event.screenY;
                    Window.current._dragStart();
                }
            });

            window.addEventListener("mousemove", function (e) {
                if (dragging) {
                    //Window.current.moveTo(event.screenX - wX, event.screenY - wY);
                    Window.current._dragBy(event.screenX - wX, event.screenY - wY);
                }
            });

            window.addEventListener("mouseup", function () {
                dragging = false;
                Window.current._dragStop();
            });

            // TODO: Rewrite to remove setTimeout for the following:
            function checkReady() {
                if (Window.current && windowfactory.openfinVersion !== "pending") {
                    windowfactory.runtimeVersion = windowfactory.openfinVersion;
                    ready();
                } else {
                    setTimeout(checkReady, 5);
                }
            }
            checkReady();
        });

        var messagebus = function () {
            var wrappedListeners = new Map();
            var windowWrappedListeners = new Map();

            function wrapListener(listener) {
                return function (message) {
                    // TODO: Determine who sent it
                    var window = null;
                    var response = listener.apply(window, JSON.parse(message));
                    // TODO: Send response if response is expected
                };
            }

            return {
                send: function send(eventName) {
                    for (var _len2 = arguments.length, args = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
                        args[_key2 - 1] = arguments[_key2];
                    }

                    // TODO: Check if ready? Dunno if needed
                    if (args.length > 0 && args[0] instanceof Window) {
                        var _window30 = args.unshift();
                        fin.desktop.InterApplicationBus.send(Window.current._window[APP_UUID], _window30._window.name, eventName, JSON.stringify(args));
                    } else {
                        fin.desktop.InterApplicationBus.send(Window.current._window[APP_UUID], eventName, JSON.stringify(args));
                    }
                },
                on: function on(eventName, window, listener) {
                    if (listener === undefined) {
                        listener = window;
                        window = undefined;
                    }

                    var onMessage = wrapListener(listener);

                    if (window !== undefined) {
                        windowWrappedListeners[window._window.name].add(listener, onMessage);
                        fin.desktop.InterApplicationBus.subscribe(Window.current._window[APP_UUID], window._window.name, eventName, onMessage);
                        // TODO: On window close, clear subscriptions in windowWrappedListeners!
                    } else {
                        wrappedListeners.add(listener, onMessage);
                        fin.desktop.InterApplicationBus.subscribe(Window.current._window[APP_UUID], eventName, onMessage);
                    }
                },
                off: function off(eventName, window, listener) {
                    if (listener === undefined) {
                        listener = window;
                        window = undefined;
                    }

                    if (window !== undefined) {
                        fin.desktop.InterApplicationBus.unsubscribe(Window.current._window[APP_UUID], window._window.name, eventName, windowWrappedListeners[window._window.name].get(listener));
                    } else {
                        fin.desktop.InterApplicationBus.unsubscribe(Window.current._window[APP_UUID], eventName, wrappedListeners.get(listener));
                    }
                }
            };
        }();

        _extends(windowfactory, {
            onReady: onReady,
            isReady: function isReady() {
                return _isReady3;
            },
            runtime: "OpenFin",
            runtimeVersion: windowfactory.openfinVersion
        });
    })();

    // TODO: Support UMD (CommonJS, AMD), Nodejs, and ES6 module loading.
    //       Do this by stitching all scripts together, and wrap it in a define or something else.
    //       Maybe after stitching, make it export windowfactory, and use babel-umd to compile to UMD?
    // TODO: Offer a compilation output without ScaleJS. (To support non-ScaleJS applications)

    /*global windowfactory*/
    exports.default = windowfactory;


    function registerOnCore(core) {
        core.registerExtension({
            windowfactory: windowfactory
        });
    }

    if (typeof define !== "undefined" && define && define.amd) {
        // Scalejs 1.0
        if (require.defined("scalejs!core")) {
            require(["scalejs!core"], registerOnCore);
        }
        // Scalejs 2.0
        if (require.defined("scalejs.core")) {
            require(["scalejs.core"], registerOnCore);
        }
    }
});
