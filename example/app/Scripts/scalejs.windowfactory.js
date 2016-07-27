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
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
            for (var _iterator = acceptedEventHandlers[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                var acceptedEventHandler = _step.value;

                this._eventListeners[acceptedEventHandler] = [];
            }
        } catch (err) {
            _didIteratorError = true;
            _iteratorError = err;
        } finally {
            try {
                if (!_iteratorNormalCompletion && _iterator.return) {
                    _iterator.return();
                }
            } finally {
                if (_didIteratorError) {
                    throw _iteratorError;
                }
            }
        }
    }

    /**
     * @method
     * @param {string}
     * @param {callback}
     */
    EventHandler.prototype.on = function (eventNames, eventListener) {
        eventNames = eventNames.toLowerCase().split(" ");

        var _iteratorNormalCompletion2 = true;
        var _didIteratorError2 = false;
        var _iteratorError2 = undefined;

        try {
            for (var _iterator2 = eventNames[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                var eventName = _step2.value;

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
        } catch (err) {
            _didIteratorError2 = true;
            _iteratorError2 = err;
        } finally {
            try {
                if (!_iteratorNormalCompletion2 && _iterator2.return) {
                    _iterator2.return();
                }
            } finally {
                if (_didIteratorError2) {
                    throw _iteratorError2;
                }
            }
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

        var _iteratorNormalCompletion3 = true;
        var _didIteratorError3 = false;
        var _iteratorError3 = undefined;

        try {
            for (var _iterator3 = eventNames[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
                var eventName = _step3.value;

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
        } catch (err) {
            _didIteratorError3 = true;
            _iteratorError3 = err;
        } finally {
            try {
                if (!_iteratorNormalCompletion3 && _iterator3.return) {
                    _iterator3.return();
                }
            } finally {
                if (_didIteratorError3) {
                    throw _iteratorError3;
                }
            }
        }
    };

    /**
     * @method
     * @param {string}
     */
    EventHandler.prototype.clearEvent = function (eventNames) {
        eventNames = eventNames.toLowerCase();

        var _iteratorNormalCompletion4 = true;
        var _didIteratorError4 = false;
        var _iteratorError4 = undefined;

        try {
            for (var _iterator4 = eventNames[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
                var eventName = _step4.value;

                // If event listeners don't exist, bail:
                if (this._eventListeners[eventName] === undefined) {
                    return;
                }

                this._eventListeners[eventName] = [];
            }
        } catch (err) {
            _didIteratorError4 = true;
            _iteratorError4 = err;
        } finally {
            try {
                if (!_iteratorNormalCompletion4 && _iterator4.return) {
                    _iterator4.return();
                }
            } finally {
                if (_didIteratorError4) {
                    throw _iteratorError4;
                }
            }
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
        var _iteratorNormalCompletion5 = true;
        var _didIteratorError5 = false;
        var _iteratorError5 = undefined;

        try {
            for (var _iterator5 = this._eventListeners[eventName][Symbol.iterator](), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
                var eventListener = _step5.value;

                // Call listener with the 'this' context as the current window:
                returnVal = returnVal && eventListener.apply(this, args) !== false;
            }
        } catch (err) {
            _didIteratorError5 = true;
            _iteratorError5 = err;
        } finally {
            try {
                if (!_iteratorNormalCompletion5 && _iterator5.return) {
                    _iterator5.return();
                }
            } finally {
                if (_didIteratorError5) {
                    throw _iteratorError5;
                }
            }
        }

        var _iteratorNormalCompletion6 = true;
        var _didIteratorError6 = false;
        var _iteratorError6 = undefined;

        try {
            for (var _iterator6 = this._eventPipes[Symbol.iterator](), _step6; !(_iteratorNormalCompletion6 = (_step6 = _iterator6.next()).done); _iteratorNormalCompletion6 = true) {
                var eventHandler = _step6.value;

                // Call handler with the 'this' context as the current window:
                returnVal = returnVal && eventHandler.emit.apply(eventHandler, arguments) !== false;
            }
        } catch (err) {
            _didIteratorError6 = true;
            _iteratorError6 = err;
        } finally {
            try {
                if (!_iteratorNormalCompletion6 && _iterator6.return) {
                    _iterator6.return();
                }
            } finally {
                if (_didIteratorError6) {
                    throw _iteratorError6;
                }
            }
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
    var windowfactory = new EventHandler(["window-create"]);
    windowfactory.isRenderer = false;
    windowfactory.isBackend = false;
    windowfactory.version = "0.6.0alpha";

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

    if (typeof global !== "undefined" && global) {
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
                    windowfactory._internalBus = new EventHandler(["window-create"]);
                    windowfactory._internalBus.addPipe(windowfactory);
                }

                // Call callbacks:
                var _iteratorNormalCompletion7 = true;
                var _didIteratorError7 = false;
                var _iteratorError7 = undefined;

                try {
                    for (var _iterator7 = openfinReadyCallbacks[Symbol.iterator](), _step7; !(_iteratorNormalCompletion7 = (_step7 = _iterator7.next()).done); _iteratorNormalCompletion7 = true) {
                        var callback = _step7.value;

                        callback();
                    }
                } catch (err) {
                    _didIteratorError7 = true;
                    _iteratorError7 = err;
                } finally {
                    try {
                        if (!_iteratorNormalCompletion7 && _iterator7.return) {
                            _iterator7.return();
                        }
                    } finally {
                        if (_didIteratorError7) {
                            throw _iteratorError7;
                        }
                    }
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
                windowfactory._internalBus = new EventHandler(["window-create"]);
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

                        this._minSize = new BoundingBox(config.minWidth, config.minHeight);
                        this._maxSize = new BoundingBox(config.maxWidth, config.maxHeight);
                        var newWindow = windowfactory._launcher.document.createElement("iframe");
                        newWindow.src = config.url;
                        newWindow.style.position = "absolute";
                        newWindow.style.left = (config.left || (windowfactory._launcher.innerWidth - config.width) / 2) + "px";
                        newWindow.style.top = (config.top || (windowfactory._launcher.innerHeight - config.height) / 2) + "px";
                        newWindow.style.width = config.width + "px";
                        newWindow.style.height = config.height + "px";
                        newWindow.style.minWidth = this._minSize.left + "px";
                        newWindow.style.minHeight = this._minSize.top + "px";
                        newWindow.style.maxWidth = this._maxSize.left + "px";
                        newWindow.style.maxHeight = this._maxSize.top + "px";
                        newWindow.style.margin = 0;
                        newWindow.style.padding = 0;
                        newWindow.style.border = 0;
                        windowfactory._launcher.document.body.appendChild(newWindow);

                        this._window = newWindow;
                        windowfactory._windows.push(this);
                        this._ready = true;
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
                    return this._window !== undefined;
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

                Window.prototype.close = function (callback) {
                    this._window.parentElement.removeChild(this._window);
                    var index = windowfactory._windows.indexOf(this);
                    if (index >= 0) {
                        windowfactory._windows.splice(index, 1);
                    }
                    this.undock();
                    this._isClosed = true;
                    if (callback) {
                        callback();
                    }
                    this.emit("close");
                };

                Window.prototype.minimize = function (callback) {
                    if (!this._ready) {
                        throw "minimize can't be called on an unready window";
                    }

                    // TODO: What do we do on minimize in this runtime?
                    var _iteratorNormalCompletion8 = true;
                    var _didIteratorError8 = false;
                    var _iteratorError8 = undefined;

                    try {
                        for (var _iterator8 = this._dockedGroup[Symbol.iterator](), _step8; !(_iteratorNormalCompletion8 = (_step8 = _iterator8.next()).done); _iteratorNormalCompletion8 = true) {
                            var _window = _step8.value;

                            _window.emit("minimize");
                        }
                    } catch (err) {
                        _didIteratorError8 = true;
                        _iteratorError8 = err;
                    } finally {
                        try {
                            if (!_iteratorNormalCompletion8 && _iterator8.return) {
                                _iterator8.return();
                            }
                        } finally {
                            if (_didIteratorError8) {
                                throw _iteratorError8;
                            }
                        }
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

                    var _iteratorNormalCompletion9 = true;
                    var _didIteratorError9 = false;
                    var _iteratorError9 = undefined;

                    try {
                        for (var _iterator9 = this._dockedGroup[Symbol.iterator](), _step9; !(_iteratorNormalCompletion9 = (_step9 = _iterator9.next()).done); _iteratorNormalCompletion9 = true) {
                            var _window2 = _step9.value;

                            _window2._window.style.display = "";
                        }
                    } catch (err) {
                        _didIteratorError9 = true;
                        _iteratorError9 = err;
                    } finally {
                        try {
                            if (!_iteratorNormalCompletion9 && _iterator9.return) {
                                _iterator9.return();
                            }
                        } finally {
                            if (_didIteratorError9) {
                                throw _iteratorError9;
                            }
                        }
                    }

                    if (callback) {
                        callback();
                    }
                };

                Window.prototype.hide = function (callback) {
                    if (!this._ready) {
                        throw "hide can't be called on an unready window";
                    }

                    var _iteratorNormalCompletion10 = true;
                    var _didIteratorError10 = false;
                    var _iteratorError10 = undefined;

                    try {
                        for (var _iterator10 = this._dockedGroup[Symbol.iterator](), _step10; !(_iteratorNormalCompletion10 = (_step10 = _iterator10.next()).done); _iteratorNormalCompletion10 = true) {
                            var _window3 = _step10.value;

                            _window3._window.style.display = "none";
                        }
                    } catch (err) {
                        _didIteratorError10 = true;
                        _iteratorError10 = err;
                    } finally {
                        try {
                            if (!_iteratorNormalCompletion10 && _iterator10.return) {
                                _iterator10.return();
                            }
                        } finally {
                            if (_didIteratorError10) {
                                throw _iteratorError10;
                            }
                        }
                    }

                    if (callback) {
                        callback();
                    }
                };

                Window.prototype.restore = function (callback) {
                    if (!this._ready) {
                        throw "restore can't be called on an unready window";
                    }

                    var _iteratorNormalCompletion11 = true;
                    var _didIteratorError11 = false;
                    var _iteratorError11 = undefined;

                    try {
                        for (var _iterator11 = this._dockedGroup[Symbol.iterator](), _step11; !(_iteratorNormalCompletion11 = (_step11 = _iterator11.next()).done); _iteratorNormalCompletion11 = true) {
                            var _window4 = _step11.value;

                            if (_window4._isMaximized) {
                                _window4._window.style.left = _window4._restoreBounds.left + "px";
                                _window4._window.style.top = _window4._restoreBounds.top + "px";
                                _window4._window.style.width = _window4._restoreBounds.getWidth() + "px";
                                _window4._window.style.height = _window4._restoreBounds.getHeight() + "px";
                                _window4._isMaximized = false;
                            }
                        }
                    } catch (err) {
                        _didIteratorError11 = true;
                        _iteratorError11 = err;
                    } finally {
                        try {
                            if (!_iteratorNormalCompletion11 && _iterator11.return) {
                                _iterator11.return();
                            }
                        } finally {
                            if (_didIteratorError11) {
                                throw _iteratorError11;
                            }
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

                    var _iteratorNormalCompletion12 = true;
                    var _didIteratorError12 = false;
                    var _iteratorError12 = undefined;

                    try {
                        for (var _iterator12 = this._dockedGroup[Symbol.iterator](), _step12; !(_iteratorNormalCompletion12 = (_step12 = _iterator12.next()).done); _iteratorNormalCompletion12 = true) {
                            var _window5 = _step12.value;

                            if (_window5 !== this) {
                                _window5._window.style["z-index"] = windowfactory._getNextZIndex();
                            }
                        }
                    } catch (err) {
                        _didIteratorError12 = true;
                        _iteratorError12 = err;
                    } finally {
                        try {
                            if (!_iteratorNormalCompletion12 && _iterator12.return) {
                                _iterator12.return();
                            }
                        } finally {
                            if (_didIteratorError12) {
                                throw _iteratorError12;
                            }
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

                    var _iteratorNormalCompletion13 = true;
                    var _didIteratorError13 = false;
                    var _iteratorError13 = undefined;

                    try {
                        for (var _iterator13 = this._dockedGroup[Symbol.iterator](), _step13; !(_iteratorNormalCompletion13 = (_step13 = _iterator13.next()).done); _iteratorNormalCompletion13 = true) {
                            var _window6 = _step13.value;

                            if (_window6 !== this) {
                                _window6._window.contentWindow.focus();
                            }
                        }
                    } catch (err) {
                        _didIteratorError13 = true;
                        _iteratorError13 = err;
                    } finally {
                        try {
                            if (!_iteratorNormalCompletion13 && _iterator13.return) {
                                _iterator13.return();
                            }
                        } finally {
                            if (_didIteratorError13) {
                                throw _iteratorError13;
                            }
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
                    this._window.width = size.left;
                    this._window.height = size.top;
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

                    var _iteratorNormalCompletion14 = true;
                    var _didIteratorError14 = false;
                    var _iteratorError14 = undefined;

                    try {
                        for (var _iterator14 = this._dockedGroup[Symbol.iterator](), _step14; !(_iteratorNormalCompletion14 = (_step14 = _iterator14.next()).done); _iteratorNormalCompletion14 = true) {
                            var _window7 = _step14.value;

                            var pos = _window7.getPosition().add(deltaPos);
                            _window7._window.style.left = pos.left + "px";
                            _window7._window.style.top = pos.top + "px";
                        }
                    } catch (err) {
                        _didIteratorError14 = true;
                        _iteratorError14 = err;
                    } finally {
                        try {
                            if (!_iteratorNormalCompletion14 && _iterator14.return) {
                                _iterator14.return();
                            }
                        } finally {
                            if (_didIteratorError14) {
                                throw _iteratorError14;
                            }
                        }
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

                    var _iteratorNormalCompletion15 = true;
                    var _didIteratorError15 = false;
                    var _iteratorError15 = undefined;

                    try {
                        for (var _iterator15 = this._dockedGroup[Symbol.iterator](), _step15; !(_iteratorNormalCompletion15 = (_step15 = _iterator15.next()).done); _iteratorNormalCompletion15 = true) {
                            var _window8 = _step15.value;

                            var pos = _window8.getPosition().add(deltaPos);
                            _window8._window.style.left = pos.left + "px";
                            _window8._window.style.top = pos.top + "px";
                        }
                    } catch (err) {
                        _didIteratorError15 = true;
                        _iteratorError15 = err;
                    } finally {
                        try {
                            if (!_iteratorNormalCompletion15 && _iterator15.return) {
                                _iterator15.return();
                            }
                        } finally {
                            if (_didIteratorError15) {
                                throw _iteratorError15;
                            }
                        }
                    }

                    if (callback) {
                        callback();
                    }
                    var _iteratorNormalCompletion16 = true;
                    var _didIteratorError16 = false;
                    var _iteratorError16 = undefined;

                    try {
                        for (var _iterator16 = this._dockedGroup[Symbol.iterator](), _step16; !(_iteratorNormalCompletion16 = (_step16 = _iterator16.next()).done); _iteratorNormalCompletion16 = true) {
                            var _window9 = _step16.value;

                            _window9.emit("move");
                        }
                    } catch (err) {
                        _didIteratorError16 = true;
                        _iteratorError16 = err;
                    } finally {
                        try {
                            if (!_iteratorNormalCompletion16 && _iterator16.return) {
                                _iterator16.return();
                            }
                        } finally {
                            if (_didIteratorError16) {
                                throw _iteratorError16;
                            }
                        }
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
                    this._window.width = Math.min(this._maxSize.left, Math.max(this._minSize.left, size.left)) + "px";
                    this._window.height = Math.min(this._maxSize.top, Math.max(this._minSize.top, size.top)) + "px";
                    // Clear transform:
                    var _iteratorNormalCompletion17 = true;
                    var _didIteratorError17 = false;
                    var _iteratorError17 = undefined;

                    try {
                        for (var _iterator17 = transformPropNames[Symbol.iterator](), _step17; !(_iteratorNormalCompletion17 = (_step17 = _iterator17.next()).done); _iteratorNormalCompletion17 = true) {
                            var transformPropName = _step17.value;

                            this._window.style[transformPropName] = "";
                        }
                    } catch (err) {
                        _didIteratorError17 = true;
                        _iteratorError17 = err;
                    } finally {
                        try {
                            if (!_iteratorNormalCompletion17 && _iterator17.return) {
                                _iterator17.return();
                            }
                        } finally {
                            if (_didIteratorError17) {
                                throw _iteratorError17;
                            }
                        }
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
                    var _iteratorNormalCompletion18 = true;
                    var _didIteratorError18 = false;
                    var _iteratorError18 = undefined;

                    try {
                        for (var _iterator18 = transformPropNames[Symbol.iterator](), _step18; !(_iteratorNormalCompletion18 = (_step18 = _iterator18.next()).done); _iteratorNormalCompletion18 = true) {
                            var transformPropName = _step18.value;

                            this._window.style[transformPropName] = "scale(" + transform + ")";
                        }
                    } catch (err) {
                        _didIteratorError18 = true;
                        _iteratorError18 = err;
                    } finally {
                        try {
                            if (!_iteratorNormalCompletion18 && _iterator18.return) {
                                _iterator18.return();
                            }
                        } finally {
                            if (_didIteratorError18) {
                                throw _iteratorError18;
                            }
                        }
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
                        var _iteratorNormalCompletion19 = true;
                        var _didIteratorError19 = false;
                        var _iteratorError19 = undefined;

                        try {
                            for (var _iterator19 = transformPropNames[Symbol.iterator](), _step19; !(_iteratorNormalCompletion19 = (_step19 = _iterator19.next()).done); _iteratorNormalCompletion19 = true) {
                                var transformPropName = _step19.value;

                                this._window.style[transformPropName] = "";
                            }
                        } catch (err) {
                            _didIteratorError19 = true;
                            _iteratorError19 = err;
                        } finally {
                            try {
                                if (!_iteratorNormalCompletion19 && _iterator19.return) {
                                    _iterator19.return();
                                }
                            } finally {
                                if (_didIteratorError19) {
                                    throw _iteratorError19;
                                }
                            }
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
                    var _iteratorNormalCompletion20 = true;
                    var _didIteratorError20 = false;
                    var _iteratorError20 = undefined;

                    try {
                        for (var _iterator20 = transformPropNames[Symbol.iterator](), _step20; !(_iteratorNormalCompletion20 = (_step20 = _iterator20.next()).done); _iteratorNormalCompletion20 = true) {
                            var transformPropName = _step20.value;

                            this._window.style[transformPropName] = "";
                        }
                        // TODO: Events
                    } catch (err) {
                        _didIteratorError20 = true;
                        _iteratorError20 = err;
                    } finally {
                        try {
                            if (!_iteratorNormalCompletion20 && _iterator20.return) {
                                _iterator20.return();
                            }
                        } finally {
                            if (_didIteratorError20) {
                                throw _iteratorError20;
                            }
                        }
                    }

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
                    var _iteratorNormalCompletion21 = true;
                    var _didIteratorError21 = false;
                    var _iteratorError21 = undefined;

                    try {
                        for (var _iterator21 = other._dockedGroup[Symbol.iterator](), _step21; !(_iteratorNormalCompletion21 = (_step21 = _iterator21.next()).done); _iteratorNormalCompletion21 = true) {
                            var _other = _step21.value;

                            this._dockedGroup.push(_other);
                            // Sharing the array between window objects makes it easier to manage:
                            _other._dockedGroup = this._dockedGroup;
                        }

                        //console.log("dock", thisWindow._dockedGroup);
                        // TODO: Check if otherGroup is touching
                    } catch (err) {
                        _didIteratorError21 = true;
                        _iteratorError21 = err;
                    } finally {
                        try {
                            if (!_iteratorNormalCompletion21 && _iterator21.return) {
                                _iterator21.return();
                            }
                        } finally {
                            if (_didIteratorError21) {
                                throw _iteratorError21;
                            }
                        }
                    }
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
                    var _iteratorNormalCompletion22 = true;
                    var _didIteratorError22 = false;
                    var _iteratorError22 = undefined;

                    try {
                        for (var _iterator22 = this._dockedGroup[Symbol.iterator](), _step22; !(_iteratorNormalCompletion22 = (_step22 = _iterator22.next()).done); _iteratorNormalCompletion22 = true) {
                            var _window10 = _step22.value;

                            _window10._dragStartPos = _window10.getPosition();
                        }
                    } catch (err) {
                        _didIteratorError22 = true;
                        _iteratorError22 = err;
                    } finally {
                        try {
                            if (!_iteratorNormalCompletion22 && _iterator22.return) {
                                _iterator22.return();
                            }
                        } finally {
                            if (_didIteratorError22) {
                                throw _iteratorError22;
                            }
                        }
                    }
                };

                Window.prototype._dragBy = function (deltaLeft, deltaTop) {
                    if (!this.emit("drag-before")) {
                        return;
                    } // Allow preventing drag
                    // Perform Snap:
                    var thisBounds = this.getBounds().moveTo(this._dragStartPos.left + deltaLeft, this._dragStartPos.top + deltaTop);
                    var snapDelta = new Vector(NaN, NaN);
                    var _iteratorNormalCompletion23 = true;
                    var _didIteratorError23 = false;
                    var _iteratorError23 = undefined;

                    try {
                        for (var _iterator23 = windowfactory._windows[Symbol.iterator](), _step23; !(_iteratorNormalCompletion23 = (_step23 = _iterator23.next()).done); _iteratorNormalCompletion23 = true) {
                            var other = _step23.value;

                            if (other._dockedGroup !== this._dockedGroup) {
                                snapDelta.setMin(thisBounds.getSnapDelta(other.getBounds()));
                            }
                        }
                    } catch (err) {
                        _didIteratorError23 = true;
                        _iteratorError23 = err;
                    } finally {
                        try {
                            if (!_iteratorNormalCompletion23 && _iterator23.return) {
                                _iterator23.return();
                            }
                        } finally {
                            if (_didIteratorError23) {
                                throw _iteratorError23;
                            }
                        }
                    }

                    deltaLeft += snapDelta.left || 0;
                    deltaTop += snapDelta.top || 0;

                    var _iteratorNormalCompletion24 = true;
                    var _didIteratorError24 = false;
                    var _iteratorError24 = undefined;

                    try {
                        for (var _iterator24 = this._dockedGroup[Symbol.iterator](), _step24; !(_iteratorNormalCompletion24 = (_step24 = _iterator24.next()).done); _iteratorNormalCompletion24 = true) {
                            var _other2 = _step24.value;

                            var pos = _other2._dragStartPos;

                            // If other doesn't have a drag position, start it:
                            if (pos === undefined) {
                                pos = _other2._dragStartPos = _other2.getPosition();
                                pos.left -= deltaLeft;
                                pos.top -= deltaTop;
                            }

                            _other2._window.style.left = pos.left + deltaLeft + "px";
                            _other2._window.style.top = pos.top + deltaTop + "px";
                            _other2.emit("move");
                        }
                    } catch (err) {
                        _didIteratorError24 = true;
                        _iteratorError24 = err;
                    } finally {
                        try {
                            if (!_iteratorNormalCompletion24 && _iterator24.return) {
                                _iterator24.return();
                            }
                        } finally {
                            if (_didIteratorError24) {
                                throw _iteratorError24;
                            }
                        }
                    }
                };

                Window.prototype._dragStop = function () {
                    // Dock to those it snapped to:
                    var thisBounds = this.getBounds();
                    var _iteratorNormalCompletion25 = true;
                    var _didIteratorError25 = false;
                    var _iteratorError25 = undefined;

                    try {
                        for (var _iterator25 = windowfactory._windows[Symbol.iterator](), _step25; !(_iteratorNormalCompletion25 = (_step25 = _iterator25.next()).done); _iteratorNormalCompletion25 = true) {
                            var other = _step25.value;

                            if (thisBounds.isTouching(other.getBounds())) {
                                this.dock(other);
                            }
                        }
                    } catch (err) {
                        _didIteratorError25 = true;
                        _iteratorError25 = err;
                    } finally {
                        try {
                            if (!_iteratorNormalCompletion25 && _iterator25.return) {
                                _iterator25.return();
                            }
                        } finally {
                            if (_didIteratorError25) {
                                throw _iteratorError25;
                            }
                        }
                    }

                    var _iteratorNormalCompletion26 = true;
                    var _didIteratorError26 = false;
                    var _iteratorError26 = undefined;

                    try {
                        for (var _iterator26 = this._dockedGroup[Symbol.iterator](), _step26; !(_iteratorNormalCompletion26 = (_step26 = _iterator26.next()).done); _iteratorNormalCompletion26 = true) {
                            var _window11 = _step26.value;

                            delete _window11._dragStartPos;
                        }
                    } catch (err) {
                        _didIteratorError26 = true;
                        _iteratorError26 = err;
                    } finally {
                        try {
                            if (!_iteratorNormalCompletion26 && _iterator26.return) {
                                _iterator26.return();
                            }
                        } finally {
                            if (_didIteratorError26) {
                                throw _iteratorError26;
                            }
                        }
                    }

                    this.emit("drag-stop");
                };

                // Handle current window in this context:
                Window.current = function () {
                    var _iteratorNormalCompletion27 = true;
                    var _didIteratorError27 = false;
                    var _iteratorError27 = undefined;

                    try {
                        for (var _iterator27 = windowfactory._windows[Symbol.iterator](), _step27; !(_iteratorNormalCompletion27 = (_step27 = _iterator27.next()).done); _iteratorNormalCompletion27 = true) {
                            var win = _step27.value;

                            if (win._window.contentWindow === window) {
                                return win;
                            }
                        }
                    } catch (err) {
                        _didIteratorError27 = true;
                        _iteratorError27 = err;
                    } finally {
                        try {
                            if (!_iteratorNormalCompletion27 && _iterator27.return) {
                                _iterator27.return();
                            }
                        } finally {
                            if (_didIteratorError27) {
                                throw _iteratorError27;
                            }
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
                 * @param  {string|null} error - String on error, or null if no error
                 */

                /**
                 * Closes the window instance.
                 * @method
                 * @param {callback=}
                 */
                Window.prototype.close = function (callback) {
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
                            var _iteratorNormalCompletion28 = true;
                            var _didIteratorError28 = false;
                            var _iteratorError28 = undefined;

                            try {
                                for (var _iterator28 = BrowserWindow.getAllWindows()[Symbol.iterator](), _step28; !(_iteratorNormalCompletion28 = (_step28 = _iterator28.next()).done); _iteratorNormalCompletion28 = true) {
                                    var other = _step28.value;

                                    other.webContents.send("window-create", other.id);
                                }
                            } catch (err) {
                                _didIteratorError28 = true;
                                _iteratorError28 = err;
                            } finally {
                                try {
                                    if (!_iteratorNormalCompletion28 && _iterator28.return) {
                                        _iterator28.return();
                                    }
                                } finally {
                                    if (_didIteratorError28) {
                                        throw _iteratorError28;
                                    }
                                }
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
                                        var _iteratorNormalCompletion29 = true;
                                        var _didIteratorError29 = false;
                                        var _iteratorError29 = undefined;

                                        try {
                                            for (var _iterator29 = this._dockedGroup[Symbol.iterator](), _step29; !(_iteratorNormalCompletion29 = (_step29 = _iterator29.next()).done); _iteratorNormalCompletion29 = true) {
                                                var other = _step29.value;

                                                if (other !== this) {
                                                    other.restore();
                                                }
                                            }
                                        } catch (err) {
                                            _didIteratorError29 = true;
                                            _iteratorError29 = err;
                                        } finally {
                                            try {
                                                if (!_iteratorNormalCompletion29 && _iterator29.return) {
                                                    _iterator29.return();
                                                }
                                            } finally {
                                                if (_didIteratorError29) {
                                                    throw _iteratorError29;
                                                }
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
                            var _iteratorNormalCompletion30 = true;
                            var _didIteratorError30 = false;
                            var _iteratorError30 = undefined;

                            try {
                                for (var _iterator30 = other._dockedGroup[Symbol.iterator](), _step30; !(_iteratorNormalCompletion30 = (_step30 = _iterator30.next()).done); _iteratorNormalCompletion30 = true) {
                                    var _other3 = _step30.value;

                                    this._dockedGroup.push(_other3);
                                    // Sharing the array between window objects makes it easier to manage:
                                    _other3._dockedGroup = this._dockedGroup;
                                }

                                //console.log("dock", this._dockedGroup);
                                // TODO: Check if otherGroup is touching
                            } catch (err) {
                                _didIteratorError30 = true;
                                _iteratorError30 = err;
                            } finally {
                                try {
                                    if (!_iteratorNormalCompletion30 && _iterator30.return) {
                                        _iterator30.return();
                                    }
                                } finally {
                                    if (_didIteratorError30) {
                                        throw _iteratorError30;
                                    }
                                }
                            }
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

                            var _iteratorNormalCompletion31 = true;
                            var _didIteratorError31 = false;
                            var _iteratorError31 = undefined;

                            try {
                                for (var _iterator31 = this._dockedGroup[Symbol.iterator](), _step31; !(_iteratorNormalCompletion31 = (_step31 = _iterator31.next()).done); _iteratorNormalCompletion31 = true) {
                                    var _window12 = _step31.value;

                                    if (_window12 !== this) {
                                        _window12.setAlwaysOnTop(true);
                                        _window12.setAlwaysOnTop(false);
                                    }
                                }
                            } catch (err) {
                                _didIteratorError31 = true;
                                _iteratorError31 = err;
                            } finally {
                                try {
                                    if (!_iteratorNormalCompletion31 && _iterator31.return) {
                                        _iterator31.return();
                                    }
                                } finally {
                                    if (_didIteratorError31) {
                                        throw _iteratorError31;
                                    }
                                }
                            }

                            this.setAlwaysOnTop(true);
                            this.setAlwaysOnTop(false);
                        };
                        BrowserWindow.prototype._dragStart = function () {
                            //if (!this.emit("drag-start")) { return; } // Allow preventing drag
                            this._ensureDockSystem();

                            this.restore();

                            var _iteratorNormalCompletion32 = true;
                            var _didIteratorError32 = false;
                            var _iteratorError32 = undefined;

                            try {
                                for (var _iterator32 = this._dockedGroup[Symbol.iterator](), _step32; !(_iteratorNormalCompletion32 = (_step32 = _iterator32.next()).done); _iteratorNormalCompletion32 = true) {
                                    var _window13 = _step32.value;

                                    _window13._dragStartPos = _window13.getPosition();
                                }
                            } catch (err) {
                                _didIteratorError32 = true;
                                _iteratorError32 = err;
                            } finally {
                                try {
                                    if (!_iteratorNormalCompletion32 && _iterator32.return) {
                                        _iterator32.return();
                                    }
                                } finally {
                                    if (_didIteratorError32) {
                                        throw _iteratorError32;
                                    }
                                }
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
                            var _iteratorNormalCompletion33 = true;
                            var _didIteratorError33 = false;
                            var _iteratorError33 = undefined;

                            try {
                                for (var _iterator33 = BrowserWindow.getAllWindows()[Symbol.iterator](), _step33; !(_iteratorNormalCompletion33 = (_step33 = _iterator33.next()).done); _iteratorNormalCompletion33 = true) {
                                    var other = _step33.value;

                                    if (other._dockedGroup !== this._dockedGroup) {
                                        snapDelta.setMin(thisBounds.getSnapDelta(other._getBounds()));
                                    }
                                }
                            } catch (err) {
                                _didIteratorError33 = true;
                                _iteratorError33 = err;
                            } finally {
                                try {
                                    if (!_iteratorNormalCompletion33 && _iterator33.return) {
                                        _iterator33.return();
                                    }
                                } finally {
                                    if (_didIteratorError33) {
                                        throw _iteratorError33;
                                    }
                                }
                            }

                            deltaLeft += snapDelta.left || 0;
                            deltaTop += snapDelta.top || 0;

                            var _iteratorNormalCompletion34 = true;
                            var _didIteratorError34 = false;
                            var _iteratorError34 = undefined;

                            try {
                                for (var _iterator34 = this._dockedGroup[Symbol.iterator](), _step34; !(_iteratorNormalCompletion34 = (_step34 = _iterator34.next()).done); _iteratorNormalCompletion34 = true) {
                                    var _other4 = _step34.value;

                                    var pos = _other4._dragStartPos;

                                    // If other doesn't have a drag position, start it:
                                    if (pos === undefined) {
                                        pos = _other4._dragStartPos = _other4.getPosition();
                                        pos[0] -= deltaLeft;
                                        pos[1] -= deltaTop;
                                    }

                                    _other4.setPosition(pos[0] + deltaLeft, pos[1] + deltaTop);
                                }
                            } catch (err) {
                                _didIteratorError34 = true;
                                _iteratorError34 = err;
                            } finally {
                                try {
                                    if (!_iteratorNormalCompletion34 && _iterator34.return) {
                                        _iterator34.return();
                                    }
                                } finally {
                                    if (_didIteratorError34) {
                                        throw _iteratorError34;
                                    }
                                }
                            }
                        };
                        BrowserWindow.prototype._dragStop = function () {
                            this._ensureDockSystem();

                            // Dock to those it snapped to:
                            var thisBounds = this._getBounds();
                            var _iteratorNormalCompletion35 = true;
                            var _didIteratorError35 = false;
                            var _iteratorError35 = undefined;

                            try {
                                for (var _iterator35 = BrowserWindow.getAllWindows()[Symbol.iterator](), _step35; !(_iteratorNormalCompletion35 = (_step35 = _iterator35.next()).done); _iteratorNormalCompletion35 = true) {
                                    var other = _step35.value;

                                    if (thisBounds.isTouching(other._getBounds())) {
                                        this.dock(other.id);
                                    }
                                }
                            } catch (err) {
                                _didIteratorError35 = true;
                                _iteratorError35 = err;
                            } finally {
                                try {
                                    if (!_iteratorNormalCompletion35 && _iterator35.return) {
                                        _iterator35.return();
                                    }
                                } finally {
                                    if (_didIteratorError35) {
                                        throw _iteratorError35;
                                    }
                                }
                            }

                            var _iteratorNormalCompletion36 = true;
                            var _didIteratorError36 = false;
                            var _iteratorError36 = undefined;

                            try {
                                for (var _iterator36 = this._dockedGroup[Symbol.iterator](), _step36; !(_iteratorNormalCompletion36 = (_step36 = _iterator36.next()).done); _iteratorNormalCompletion36 = true) {
                                    var _window14 = _step36.value;

                                    delete _window14._dragStartPos;
                                }
                            } catch (err) {
                                _didIteratorError36 = true;
                                _iteratorError36 = err;
                            } finally {
                                try {
                                    if (!_iteratorNormalCompletion36 && _iterator36.return) {
                                        _iterator36.return();
                                    }
                                } finally {
                                    if (_didIteratorError36) {
                                        throw _iteratorError36;
                                    }
                                }
                            }
                        };
                        BrowserWindow.prototype._dockMoveTo = function (left, top) {
                            this._ensureDockSystem();

                            var oldPos = this.getPosition();
                            var deltaLeft = left - oldPos[0];
                            var deltaTop = top - oldPos[1];

                            var _iteratorNormalCompletion37 = true;
                            var _didIteratorError37 = false;
                            var _iteratorError37 = undefined;

                            try {
                                for (var _iterator37 = this._dockedGroup[Symbol.iterator](), _step37; !(_iteratorNormalCompletion37 = (_step37 = _iterator37.next()).done); _iteratorNormalCompletion37 = true) {
                                    var other = _step37.value;

                                    var pos = other.getPosition();

                                    other.setPosition(pos[0] + deltaLeft, pos[1] + deltaTop);
                                }
                            } catch (err) {
                                _didIteratorError37 = true;
                                _iteratorError37 = err;
                            } finally {
                                try {
                                    if (!_iteratorNormalCompletion37 && _iterator37.return) {
                                        _iterator37.return();
                                    }
                                } finally {
                                    if (_didIteratorError37) {
                                        throw _iteratorError37;
                                    }
                                }
                            }
                        };
                        BrowserWindow.prototype._dockMinimize = function (left, top) {
                            this._ensureDockSystem();

                            var _iteratorNormalCompletion38 = true;
                            var _didIteratorError38 = false;
                            var _iteratorError38 = undefined;

                            try {
                                for (var _iterator38 = this._dockedGroup[Symbol.iterator](), _step38; !(_iteratorNormalCompletion38 = (_step38 = _iterator38.next()).done); _iteratorNormalCompletion38 = true) {
                                    var _window15 = _step38.value;

                                    _window15.minimize();
                                }
                            } catch (err) {
                                _didIteratorError38 = true;
                                _iteratorError38 = err;
                            } finally {
                                try {
                                    if (!_iteratorNormalCompletion38 && _iterator38.return) {
                                        _iterator38.return();
                                    }
                                } finally {
                                    if (_didIteratorError38) {
                                        throw _iteratorError38;
                                    }
                                }
                            }
                        };
                        BrowserWindow.prototype._dockHide = function (left, top) {
                            this._ensureDockSystem();

                            var _iteratorNormalCompletion39 = true;
                            var _didIteratorError39 = false;
                            var _iteratorError39 = undefined;

                            try {
                                for (var _iterator39 = this._dockedGroup[Symbol.iterator](), _step39; !(_iteratorNormalCompletion39 = (_step39 = _iterator39.next()).done); _iteratorNormalCompletion39 = true) {
                                    var _window16 = _step39.value;

                                    _window16.hide();
                                }
                            } catch (err) {
                                _didIteratorError39 = true;
                                _iteratorError39 = err;
                            } finally {
                                try {
                                    if (!_iteratorNormalCompletion39 && _iterator39.return) {
                                        _iterator39.return();
                                    }
                                } finally {
                                    if (_didIteratorError39) {
                                        throw _iteratorError39;
                                    }
                                }
                            }
                        };
                        BrowserWindow.prototype._dockShow = function (left, top) {
                            this._ensureDockSystem();

                            var _iteratorNormalCompletion40 = true;
                            var _didIteratorError40 = false;
                            var _iteratorError40 = undefined;

                            try {
                                for (var _iterator40 = this._dockedGroup[Symbol.iterator](), _step40; !(_iteratorNormalCompletion40 = (_step40 = _iterator40.next()).done); _iteratorNormalCompletion40 = true) {
                                    var _window17 = _step40.value;

                                    _window17.show();
                                }
                            } catch (err) {
                                _didIteratorError40 = true;
                                _iteratorError40 = err;
                            } finally {
                                try {
                                    if (!_iteratorNormalCompletion40 && _iterator40.return) {
                                        _iterator40.return();
                                    }
                                } finally {
                                    if (_didIteratorError40) {
                                        throw _iteratorError40;
                                    }
                                }
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
        var remote = nodeRequire("electron").remote;
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
                var acceptedEventHandlers = ["drag-start", "drag-before", "drag-stop", "dock-before", "move", "move-before", "resize-before", "close", "minimize"];

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
                    var isArgConfig = config["app_uuid"] === undefined;

                    // Call the parent constructor:
                    EventHandler.call(this, acceptedEventHandlers);
                    this._bounds = new BoundingBox();
                    this._ready = false;
                    this._isClosed = false;
                    this._dockedGroup = [this];

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
                };

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
                    if (!this._ready) {
                        throw "minimize can't be called on an unready window";
                    }

                    callback = new SyncCallback(callback);
                    var _iteratorNormalCompletion41 = true;
                    var _didIteratorError41 = false;
                    var _iteratorError41 = undefined;

                    try {
                        for (var _iterator41 = this._dockedGroup[Symbol.iterator](), _step41; !(_iteratorNormalCompletion41 = (_step41 = _iterator41.next()).done); _iteratorNormalCompletion41 = true) {
                            var _window18 = _step41.value;

                            _window18._window.minimize(callback.ref());
                        }
                    } catch (err) {
                        _didIteratorError41 = true;
                        _iteratorError41 = err;
                    } finally {
                        try {
                            if (!_iteratorNormalCompletion41 && _iterator41.return) {
                                _iterator41.return();
                            }
                        } finally {
                            if (_didIteratorError41) {
                                throw _iteratorError41;
                            }
                        }
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
                    var _iteratorNormalCompletion42 = true;
                    var _didIteratorError42 = false;
                    var _iteratorError42 = undefined;

                    try {
                        for (var _iterator42 = this._dockedGroup[Symbol.iterator](), _step42; !(_iteratorNormalCompletion42 = (_step42 = _iterator42.next()).done); _iteratorNormalCompletion42 = true) {
                            var _window19 = _step42.value;

                            _window19._window.show(callback.ref());
                        }
                    } catch (err) {
                        _didIteratorError42 = true;
                        _iteratorError42 = err;
                    } finally {
                        try {
                            if (!_iteratorNormalCompletion42 && _iterator42.return) {
                                _iterator42.return();
                            }
                        } finally {
                            if (_didIteratorError42) {
                                throw _iteratorError42;
                            }
                        }
                    }
                };

                Window.prototype.hide = function (callback) {
                    if (!this._ready) {
                        throw "hide can't be called on an unready window";
                    }

                    callback = new SyncCallback(callback);
                    var _iteratorNormalCompletion43 = true;
                    var _didIteratorError43 = false;
                    var _iteratorError43 = undefined;

                    try {
                        for (var _iterator43 = this._dockedGroup[Symbol.iterator](), _step43; !(_iteratorNormalCompletion43 = (_step43 = _iterator43.next()).done); _iteratorNormalCompletion43 = true) {
                            var _window20 = _step43.value;

                            _window20._window.hide(callback.ref());
                        }
                    } catch (err) {
                        _didIteratorError43 = true;
                        _iteratorError43 = err;
                    } finally {
                        try {
                            if (!_iteratorNormalCompletion43 && _iterator43.return) {
                                _iterator43.return();
                            }
                        } finally {
                            if (_didIteratorError43) {
                                throw _iteratorError43;
                            }
                        }
                    }
                };

                Window.prototype.restore = function (callback) {
                    if (!this._ready) {
                        throw "restore can't be called on an unready window";
                    }

                    callback = new SyncCallback(callback);
                    var _iteratorNormalCompletion44 = true;
                    var _didIteratorError44 = false;
                    var _iteratorError44 = undefined;

                    try {
                        for (var _iterator44 = this._dockedGroup[Symbol.iterator](), _step44; !(_iteratorNormalCompletion44 = (_step44 = _iterator44.next()).done); _iteratorNormalCompletion44 = true) {
                            var _window21 = _step44.value;

                            _window21._window.restore(callback.ref());
                        }
                    } catch (err) {
                        _didIteratorError44 = true;
                        _iteratorError44 = err;
                    } finally {
                        try {
                            if (!_iteratorNormalCompletion44 && _iterator44.return) {
                                _iterator44.return();
                            }
                        } finally {
                            if (_didIteratorError44) {
                                throw _iteratorError44;
                            }
                        }
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
                    var _iteratorNormalCompletion45 = true;
                    var _didIteratorError45 = false;
                    var _iteratorError45 = undefined;

                    try {
                        for (var _iterator45 = this._dockedGroup[Symbol.iterator](), _step45; !(_iteratorNormalCompletion45 = (_step45 = _iterator45.next()).done); _iteratorNormalCompletion45 = true) {
                            var _window22 = _step45.value;

                            if (_window22 !== this) {
                                _window22._window.bringToFront(beforeCallback.ref());
                            }
                        }
                    } catch (err) {
                        _didIteratorError45 = true;
                        _iteratorError45 = err;
                    } finally {
                        try {
                            if (!_iteratorNormalCompletion45 && _iterator45.return) {
                                _iterator45.return();
                            }
                        } finally {
                            if (_didIteratorError45) {
                                throw _iteratorError45;
                            }
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
                    var _iteratorNormalCompletion46 = true;
                    var _didIteratorError46 = false;
                    var _iteratorError46 = undefined;

                    try {
                        for (var _iterator46 = this._dockedGroup[Symbol.iterator](), _step46; !(_iteratorNormalCompletion46 = (_step46 = _iterator46.next()).done); _iteratorNormalCompletion46 = true) {
                            var _window23 = _step46.value;

                            if (_window23 !== this) {
                                _window23._window.focus(beforeCallback.ref());
                            }
                        }
                    } catch (err) {
                        _didIteratorError46 = true;
                        _iteratorError46 = err;
                    } finally {
                        try {
                            if (!_iteratorNormalCompletion46 && _iterator46.return) {
                                _iterator46.return();
                            }
                        } finally {
                            if (_didIteratorError46) {
                                throw _iteratorError46;
                            }
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
                    var _iteratorNormalCompletion47 = true;
                    var _didIteratorError47 = false;
                    var _iteratorError47 = undefined;

                    try {
                        for (var _iterator47 = this._dockedGroup[Symbol.iterator](), _step47; !(_iteratorNormalCompletion47 = (_step47 = _iterator47.next()).done); _iteratorNormalCompletion47 = true) {
                            var _window24 = _step47.value;

                            var pos = _window24.getPosition().add(deltaPos);
                            _window24._bounds.moveTo(pos);
                            _window24._window.moveTo(pos.left, pos.top, callback.ref());
                        }
                    } catch (err) {
                        _didIteratorError47 = true;
                        _iteratorError47 = err;
                    } finally {
                        try {
                            if (!_iteratorNormalCompletion47 && _iterator47.return) {
                                _iterator47.return();
                            }
                        } finally {
                            if (_didIteratorError47) {
                                throw _iteratorError47;
                            }
                        }
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
                    var _iteratorNormalCompletion48 = true;
                    var _didIteratorError48 = false;
                    var _iteratorError48 = undefined;

                    try {
                        for (var _iterator48 = this._dockedGroup[Symbol.iterator](), _step48; !(_iteratorNormalCompletion48 = (_step48 = _iterator48.next()).done); _iteratorNormalCompletion48 = true) {
                            var _window25 = _step48.value;

                            var pos = _window25.getPosition().add(deltaPos);
                            _window25._bounds.moveTo(pos);
                            _window25._window.moveTo(pos.left, pos.top, callback.ref());
                        }
                    } catch (err) {
                        _didIteratorError48 = true;
                        _iteratorError48 = err;
                    } finally {
                        try {
                            if (!_iteratorNormalCompletion48 && _iterator48.return) {
                                _iterator48.return();
                            }
                        } finally {
                            if (_didIteratorError48) {
                                throw _iteratorError48;
                            }
                        }
                    }
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
                    var _iteratorNormalCompletion49 = true;
                    var _didIteratorError49 = false;
                    var _iteratorError49 = undefined;

                    try {
                        for (var _iterator49 = other._dockedGroup[Symbol.iterator](), _step49; !(_iteratorNormalCompletion49 = (_step49 = _iterator49.next()).done); _iteratorNormalCompletion49 = true) {
                            var _other5 = _step49.value;

                            this._dockedGroup.push(_other5);
                            // Sharing the array between window objects makes it easier to manage:
                            _other5._dockedGroup = this._dockedGroup;
                        }

                        //console.log("dock", thisWindow._dockedGroup);
                        // TODO: Check if otherGroup is touching
                    } catch (err) {
                        _didIteratorError49 = true;
                        _iteratorError49 = err;
                    } finally {
                        try {
                            if (!_iteratorNormalCompletion49 && _iterator49.return) {
                                _iterator49.return();
                            }
                        } finally {
                            if (_didIteratorError49) {
                                throw _iteratorError49;
                            }
                        }
                    }
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
                    var _iteratorNormalCompletion50 = true;
                    var _didIteratorError50 = false;
                    var _iteratorError50 = undefined;

                    try {
                        for (var _iterator50 = this._dockedGroup[Symbol.iterator](), _step50; !(_iteratorNormalCompletion50 = (_step50 = _iterator50.next()).done); _iteratorNormalCompletion50 = true) {
                            var _window26 = _step50.value;

                            _window26._dragStartPos = _window26.getPosition();
                        }
                    } catch (err) {
                        _didIteratorError50 = true;
                        _iteratorError50 = err;
                    } finally {
                        try {
                            if (!_iteratorNormalCompletion50 && _iterator50.return) {
                                _iterator50.return();
                            }
                        } finally {
                            if (_didIteratorError50) {
                                throw _iteratorError50;
                            }
                        }
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

                    var _iteratorNormalCompletion51 = true;
                    var _didIteratorError51 = false;
                    var _iteratorError51 = undefined;

                    try {
                        for (var _iterator51 = this._dockedGroup[Symbol.iterator](), _step51; !(_iteratorNormalCompletion51 = (_step51 = _iterator51.next()).done); _iteratorNormalCompletion51 = true) {
                            var _other6 = _step51.value;

                            var pos = _other6._dragStartPos;

                            // If other doesn't have a drag position, start it:
                            if (pos === undefined) {
                                pos = _other6._dragStartPos = _other6.getPosition();
                                pos.left -= deltaLeft;
                                pos.top -= deltaTop;
                            }

                            _other6._window.moveTo(pos.left + deltaLeft, pos.top + deltaTop);
                        }
                    } catch (err) {
                        _didIteratorError51 = true;
                        _iteratorError51 = err;
                    } finally {
                        try {
                            if (!_iteratorNormalCompletion51 && _iterator51.return) {
                                _iterator51.return();
                            }
                        } finally {
                            if (_didIteratorError51) {
                                throw _iteratorError51;
                            }
                        }
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

                    var _iteratorNormalCompletion52 = true;
                    var _didIteratorError52 = false;
                    var _iteratorError52 = undefined;

                    try {
                        for (var _iterator52 = this._dockedGroup[Symbol.iterator](), _step52; !(_iteratorNormalCompletion52 = (_step52 = _iterator52.next()).done); _iteratorNormalCompletion52 = true) {
                            var _window27 = _step52.value;

                            delete _window27._dragStartPos;
                        }
                    } catch (err) {
                        _didIteratorError52 = true;
                        _iteratorError52 = err;
                    } finally {
                        try {
                            if (!_iteratorNormalCompletion52 && _iterator52.return) {
                                _iterator52.return();
                            }
                        } finally {
                            if (_didIteratorError52) {
                                throw _iteratorError52;
                            }
                        }
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
                var _iteratorNormalCompletion53 = true;
                var _didIteratorError53 = false;
                var _iteratorError53 = undefined;

                try {
                    for (var _iterator53 = Window.current._dockedGroup[Symbol.iterator](), _step53; !(_iteratorNormalCompletion53 = (_step53 = _iterator53.next()).done); _iteratorNormalCompletion53 = true) {
                        var other = _step53.value;

                        if (other !== Window.current) {
                            other._window.restore();
                        }
                    }
                } catch (err) {
                    _didIteratorError53 = true;
                    _iteratorError53 = err;
                } finally {
                    try {
                        if (!_iteratorNormalCompletion53 && _iterator53.return) {
                            _iterator53.return();
                        }
                    } finally {
                        if (_didIteratorError53) {
                            throw _iteratorError53;
                        }
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


    if (typeof define !== "undefined" && define && define.amd) {
        require(["scalejs.core"], function (core) {
            core.default.registerExtension({
                windowfactory: windowfactory
            });
        });
    }
});
