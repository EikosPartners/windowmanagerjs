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

    /* global fin*/
    var windowfactory = {
        isRenderer: false,
        isBackend: false,
        version: "0.1.0alpha"
    };

    if (typeof global !== "undefined" && global) {
        windowfactory.isBackend = true;
        if (typeof require !== "undefined") {
            var _require = require;
            global.nodeRequire = _require;
            _require.windowfactoryPath = __filename;
            var path = _require("path");
            global.workingDir = path.dirname(_require.main.filename);
            process.once("loaded", function () {
                //global.nodeRequire = _require;
                //global.workingDir = nodeRequire.main.filename;
            });
        }
    }
    if (typeof window !== "undefined" && window) {
        windowfactory.isRenderer = true;
        if (window.nodeRequire !== undefined) {
            windowfactory.electronVersion = window.nodeRequire.electronVersion;
            windowfactory.nodeVersion = window.nodeRequire.nodeVersion;
        }
    }
    if (typeof process !== "undefined" && process && process.versions) {
        global.nodeRequire.electronVersion = windowfactory.electronVersion = global.process.versions.electron;
        global.nodeRequire.nodeVersion = windowfactory.nodeVersion = global.process.versions.node;
    }
    if (typeof fin !== "undefined" && fin && fin.desktop && fin.desktop.System) {
        windowfactory.openfinVersion = "pending";
        fin.desktop.System.getVersion(function (version) {
            windowfactory.openfinVersion = version;
        }); // TODO: Handle errorCallback
        var app = fin.desktop.Application.getCurrent();
        if (app.getWindow().contentWindow === window) {
            windowfactory._windows = {};
        }
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

        this.callback = function () {
            thisObj.count -= 1;
            if (thisObj.count <= 0) {
                callback();
            }
        };

        this.count = 0;
    }
    SyncCallback.prototype.ref = function () {
        this.count += 1;
        return this.callback;
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
            if (other.constructor !== Vector) {
                throw "set requires argument 'other' to resolve to type Vector";
            }

            this.left = other.left;
            this.top = other.top;
            return this;
        };
        Vector.prototype.setMin = function (other) {
            if (!other) {
                throw "setMin requires argument 'other'";
            }
            other = other.getVector();
            if (other.constructor !== Vector) {
                throw "setMin requires argument 'other' to resolve to type Vector";
            }

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
            if (other.constructor !== Vector) {
                throw "add requires argument 'other' to resolve to type Vector";
            }

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
            if (other.constructor !== Vector) {
                throw "subtract requires argument 'other' to resolve to type Vector";
            }

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
            if (other.constructor !== BoundingBox) {
                throw "difference requires argument 'other' to resolve to type BoundingBox";
            }

            return new BoundingBox(this.left - other.left, this.top - other.top, this.right - other.right, this.bottom - other.bottom);
        };
        BoundingBox.prototype.getCenteredOnPosition = function (other) {
            if (!other) {
                throw "getCenteredOnPosition requires argument 'other'";
            }
            other = other.getBoundingBox();
            if (other.constructor !== BoundingBox) {
                throw "getCenteredOnPosition requires argument 'other' to resolve to type BoundingBox";
            }

            return other.getCenterPosition().subtract(this.getCenterPosition().subtract(this.getPosition()));
        };
        BoundingBox.prototype.getIntersection = function (other) {
            if (!other) {
                throw "getIntersection requires argument 'other'";
            }
            other = other.getBoundingBox();
            if (other.constructor !== BoundingBox) {
                throw "getIntersection requires argument 'other' to resolve to type BoundingBox";
            }

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
            if (other.constructor !== BoundingBox) {
                throw "isContains requires argument 'other' to resolve to type BoundingBox";
            }

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
            if (other.constructor !== BoundingBox) {
                throw "isTouching requires argument 'other' to resolve to type BoundingBox";
            }

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
            if (other.constructor !== BoundingBox) {
                throw "getEdgeClosest requires argument 'other' to resolve to type BoundingBox";
            }

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
            if (other.constructor !== BoundingBox) {
                throw "getSnapDelta requires argument 'other' to resolve to type BoundingBox";
            }

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
            if (other.constructor !== BoundingBox) {
                throw "isColliding requires argument 'other' to resolve to type BoundingBox";
            }

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
            if (other.constructor !== BoundingBox) {
                throw "isTouchingEdge requires argument 'other' to resolve to type BoundingBox";
            }

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
            if (other.constructor !== CollisionMesh) {
                throw "isContains requires argument 'other' to resolve to type CollisionMesh";
            }

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
            if (other.constructor !== CollisionMesh) {
                throw "someContains requires argument 'other' to resolve to type CollisionMesh";
            }

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
            if (other.constructor !== CollisionMesh) {
                throw "isTouching requires argument 'other' to resolve to type CollisionMesh";
            }

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
            if (other.constructor !== CollisionMesh) {
                throw "isColliding requires argument 'other' to resolve to type CollisionMesh";
            }

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
            if (other.constructor !== CollisionMesh) {
                throw "getColliding requires argument 'other' to resolve to type CollisionMesh";
            }

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

    /*global windowfactory,nodeRequire*/
    (function () {
        if (windowfactory.isRenderer && windowfactory.electronVersion) {
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
                var acceptedEventHandlers = ["move", "close"];

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
                        var url = config.url;
                        delete config.url;

                        this._window = new BrowserWindow(config);
                        this._window.loadURL(url[0] !== "/" ? url : path.join(remote.getGlobal("workingDir"), url));
                        this._ready = true;
                    } else {
                        this._window = config;
                        this._ready = true;
                    }
                    this._window._ensureDockSystem();

                    // Setup handlers:
                    // TODO: Look into making these special properties that can't be deleted?
                    this._eventListeners = {};
                    for (var index = 0; index < acceptedEventHandlers.length; index += 1) {
                        this._eventListeners[acceptedEventHandlers[index]] = [];
                    }

                    // Setup _window event listeners:
                    // TODO: look into moving these elsewhere, might not work if currentWin is closed, and thisWindow is not.
                    var thisWindow = this;
                    function _onmove() {
                        thisWindow.emit("move"); // TODO: Pass what position it is at.
                    }
                    this._window.on("move", _onmove);

                    function _onclose() {
                        thisWindow._isClosed = true;
                        thisWindow.emit("close");
                        thisWindow._window = undefined;
                        // TODO: Clean up ALL listeners
                    }
                    this._isClosed = false;
                    this._window.on("close", _onclose);

                    currentWin.on("close", function () {
                        thisWindow.off("move", _onmove);
                        thisWindow.off("close", _onclose);
                    });
                };

                /**
                 * @static
                 * @returns {Window}
                 */
                Window.getCurrent = function () {
                    return Window.current;
                };

                /**
                 * @method
                 * @param {string}
                 * @param {callback}
                 */
                Window.prototype.on = function (eventName, eventListener) {
                    // TODO: Don't allow if window is closed!
                    eventName = eventName.toLowerCase();

                    // Check if this event can be subscribed to via this function:
                    if (this._eventListeners[eventName] === undefined) {
                        return;
                    }

                    // Check if eventListener is a function:
                    if (!eventListener || eventListener.constructor !== Function) {
                        throw "on requires argument 'eventListener' of type Function";
                    }

                    // Check if eventListener is already added:
                    if (this._eventListeners[eventName].indexOf(eventListener) >= 0) {
                        return;
                    }

                    // Add event listener:
                    this._eventListeners[eventName].push(eventListener);
                };

                /**
                 * @method
                 * @param {string}
                 * @param {callback}
                 */
                Window.prototype.once = function (eventName, eventListener) {
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
                Window.prototype.off = function (eventName, eventListener) {
                    eventName = eventName.toLowerCase();

                    // If event listeners don't exist, bail:
                    if (this._eventListeners[eventName] === undefined) {
                        return;
                    }

                    // Check if eventListener is a function:
                    if (!eventListener || eventListener.constructor !== Function) {
                        throw "off requires argument 'eventListener' of type Function";
                    }

                    // Remove event listener, if exists:
                    var index = this._eventListeners[eventName].indexOf(eventListener);
                    if (index >= 0) {
                        this._eventListeners[eventName].splice(index, 1);
                    }
                };

                /**
                 * @method
                 * @param {string}
                 */
                Window.prototype.clearEvent = function (eventName) {
                    eventName = eventName.toLowerCase();

                    // If event listeners don't exist, bail:
                    if (this._eventListeners[eventName] === undefined) {
                        return;
                    }

                    this._eventListeners[eventName] = [];
                };

                /**
                 * @method
                 * @param {string}
                 */
                Window.prototype.emit = function (eventName) {
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

                    for (var _index = 0; _index < this._eventListeners[eventName].length; _index += 1) {
                        // Call listener with the 'this' context as the current window:
                        this._eventListeners[eventName][_index].apply(this, args);
                    }
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

                _extends(windowfactory, {
                    Window: Window
                });
            })();
        } else if (windowfactory.isBackend) {
            (function () {
                var _global$nodeRequire = global.nodeRequire("electron");

                var BrowserWindow = _global$nodeRequire.BrowserWindow;


                if (BrowserWindow) {
                    (function () {
                        var _windowfactory$geomet = windowfactory.geometry;
                        var Vector = _windowfactory$geomet.Vector;
                        var BoundingBox = _windowfactory$geomet.BoundingBox;

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
                                        this.undock();
                                    });
                                    _this.on("minimize", function () {
                                        this._dockMinimize();
                                    });

                                    _this.on("restore", function () {
                                        var _iteratorNormalCompletion = true;
                                        var _didIteratorError = false;
                                        var _iteratorError = undefined;

                                        try {
                                            for (var _iterator = this._dockedGroup[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                                                var other = _step.value;

                                                if (other !== this) {
                                                    other.restore();
                                                }
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
                                            this.undock();
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
                            var _iteratorNormalCompletion2 = true;
                            var _didIteratorError2 = false;
                            var _iteratorError2 = undefined;

                            try {
                                for (var _iterator2 = other._dockedGroup[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                                    var _other = _step2.value;

                                    this._dockedGroup.push(_other);
                                    // Sharing the array between window objects makes it easier to manage:
                                    _other._dockedGroup = this._dockedGroup;
                                }

                                //console.log("dock", this._dockedGroup);
                                // TODO: Check if otherGroup is touching
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

                            var _iteratorNormalCompletion3 = true;
                            var _didIteratorError3 = false;
                            var _iteratorError3 = undefined;

                            try {
                                for (var _iterator3 = this._dockedGroup[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
                                    var _window = _step3.value;

                                    if (_window !== this) {
                                        _window.setAlwaysOnTop(true);
                                        _window.setAlwaysOnTop(false);
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

                            this.setAlwaysOnTop(true);
                            this.setAlwaysOnTop(false);
                        };
                        BrowserWindow.prototype._dragStart = function () {
                            this._ensureDockSystem();

                            var _iteratorNormalCompletion4 = true;
                            var _didIteratorError4 = false;
                            var _iteratorError4 = undefined;

                            try {
                                for (var _iterator4 = this._dockedGroup[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
                                    var _window2 = _step4.value;

                                    _window2._dragStartPos = _window2.getPosition();
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
                        BrowserWindow.prototype._getBounds = function () {
                            var bounds = this.getBounds();
                            return new BoundingBox(bounds.x, bounds.y, bounds.x + bounds.width, bounds.y + bounds.height);
                        };
                        BrowserWindow.prototype._dragBy = function (deltaLeft, deltaTop) {
                            this._ensureDockSystem();

                            // Perform Snap:
                            var thisBounds = this._getBounds().moveTo(this._dragStartPos[0] + deltaLeft, this._dragStartPos[1] + deltaTop);
                            var snapDelta = new Vector(NaN, NaN);
                            var _iteratorNormalCompletion5 = true;
                            var _didIteratorError5 = false;
                            var _iteratorError5 = undefined;

                            try {
                                for (var _iterator5 = BrowserWindow.getAllWindows()[Symbol.iterator](), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
                                    var other = _step5.value;

                                    if (other._dockedGroup !== this._dockedGroup) {
                                        snapDelta.setMin(thisBounds.getSnapDelta(other._getBounds()));
                                    }
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

                            deltaLeft += snapDelta.left || 0;
                            deltaTop += snapDelta.top || 0;

                            var _iteratorNormalCompletion6 = true;
                            var _didIteratorError6 = false;
                            var _iteratorError6 = undefined;

                            try {
                                for (var _iterator6 = this._dockedGroup[Symbol.iterator](), _step6; !(_iteratorNormalCompletion6 = (_step6 = _iterator6.next()).done); _iteratorNormalCompletion6 = true) {
                                    var _other2 = _step6.value;

                                    var pos = _other2._dragStartPos;

                                    // If other doesn't have a drag position, start it:
                                    if (pos === undefined) {
                                        pos = _other2._dragStartPos = _other2.getPosition();
                                        pos[0] -= deltaLeft;
                                        pos[1] -= deltaTop;
                                    }

                                    _other2.setPosition(pos[0] + deltaLeft, pos[1] + deltaTop);
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
                        };
                        BrowserWindow.prototype._dragStop = function () {
                            this._ensureDockSystem();

                            // Dock to those it snapped to:
                            var thisBounds = this._getBounds();
                            var _iteratorNormalCompletion7 = true;
                            var _didIteratorError7 = false;
                            var _iteratorError7 = undefined;

                            try {
                                for (var _iterator7 = BrowserWindow.getAllWindows()[Symbol.iterator](), _step7; !(_iteratorNormalCompletion7 = (_step7 = _iterator7.next()).done); _iteratorNormalCompletion7 = true) {
                                    var other = _step7.value;

                                    if (thisBounds.isTouching(other._getBounds())) {
                                        this.dock(other.id);
                                    }
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

                            var _iteratorNormalCompletion8 = true;
                            var _didIteratorError8 = false;
                            var _iteratorError8 = undefined;

                            try {
                                for (var _iterator8 = this._dockedGroup[Symbol.iterator](), _step8; !(_iteratorNormalCompletion8 = (_step8 = _iterator8.next()).done); _iteratorNormalCompletion8 = true) {
                                    var _window3 = _step8.value;

                                    delete _window3._dragStartPos;
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
                        BrowserWindow.prototype._dockMoveTo = function (left, top) {
                            this._ensureDockSystem();

                            var oldPos = this.getPosition();
                            var deltaLeft = left - oldPos[0];
                            var deltaTop = top - oldPos[1];

                            var _iteratorNormalCompletion9 = true;
                            var _didIteratorError9 = false;
                            var _iteratorError9 = undefined;

                            try {
                                for (var _iterator9 = this._dockedGroup[Symbol.iterator](), _step9; !(_iteratorNormalCompletion9 = (_step9 = _iterator9.next()).done); _iteratorNormalCompletion9 = true) {
                                    var other = _step9.value;

                                    var pos = other.getPosition();

                                    other.setPosition(pos[0] + deltaLeft, pos[1] + deltaTop);
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
                        };
                        BrowserWindow.prototype._dockMinimize = function (left, top) {
                            this._ensureDockSystem();

                            var _iteratorNormalCompletion10 = true;
                            var _didIteratorError10 = false;
                            var _iteratorError10 = undefined;

                            try {
                                for (var _iterator10 = this._dockedGroup[Symbol.iterator](), _step10; !(_iteratorNormalCompletion10 = (_step10 = _iterator10.next()).done); _iteratorNormalCompletion10 = true) {
                                    var _window4 = _step10.value;

                                    _window4.minimize();
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
                        };
                        BrowserWindow.prototype._dockHide = function (left, top) {
                            this._ensureDockSystem();

                            var _iteratorNormalCompletion11 = true;
                            var _didIteratorError11 = false;
                            var _iteratorError11 = undefined;

                            try {
                                for (var _iterator11 = this._dockedGroup[Symbol.iterator](), _step11; !(_iteratorNormalCompletion11 = (_step11 = _iterator11.next()).done); _iteratorNormalCompletion11 = true) {
                                    var _window5 = _step11.value;

                                    _window5.hide();
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
                        };
                        BrowserWindow.prototype._dockShow = function (left, top) {
                            this._ensureDockSystem();

                            var _iteratorNormalCompletion12 = true;
                            var _didIteratorError12 = false;
                            var _iteratorError12 = undefined;

                            try {
                                for (var _iterator12 = this._dockedGroup[Symbol.iterator](), _step12; !(_iteratorNormalCompletion12 = (_step12 = _iterator12.next()).done); _iteratorNormalCompletion12 = true) {
                                    var _window6 = _step12.value;

                                    _window6.show();
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
                        };
                    })();
                }
            })();
        }
    })();
    /*global windowfactory,nodeRequire*/
    (function () {
        if (!windowfactory.isRenderer || !windowfactory.electronVersion) {
            return;
        }

        var Window = windowfactory.Window;
        var remote = nodeRequire("electron").remote;
        var readyCallbacks = [];
        var _isReady = true;
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
            if (_isReady) {
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
        (function () {
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
        })();

        _extends(windowfactory, {
            onReady: onReady,
            isReady: function isReady() {
                return _isReady;
            },
            runtime: "Electron",
            runtimeVersion: windowfactory.electronVersion
        });
    })();
    // TODO: Make scalejs.windowfactory the main.js script for Electron. Load the config.json

    /*global windowfactory,fin,SyncCallback*/
    /*jshint bitwise: false*/
    (function () {
        if (windowfactory.isRenderer && windowfactory.openfinVersion) {
            (function () {
                var geometry = windowfactory.geometry;
                var Vector = geometry.Vector;
                var Position = geometry.Position;
                var Size = geometry.Size;
                var BoundingBox = geometry.BoundingBox;
                var currentWin = fin.desktop.Window.getCurrent();
                var mainWindow = fin.desktop.Application.getCurrent().getWindow();
                var defaultConfig = {
                    width: 600,
                    height: 600,
                    frame: false,
                    resizable: true,
                    saveWindowState: false,
                    autoShow: true
                };
                var configMap = {
                    left: "defaultLeft",
                    top: "defaultTop",
                    width: "defaultWidth",
                    height: "defaultHeight"
                };
                var acceptedEventHandlers = ["move", "close"];

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

                    this._bounds = new BoundingBox();
                    this._ready = false;
                    this._isClosed = false;
                    this._dockedGroup = [this];
                    // Setup handlers:
                    // TODO: Look into making these special properties that can't be deleted?
                    this._eventListeners = {};
                    for (var index = 0; index < acceptedEventHandlers.length; index += 1) {
                        this._eventListeners[acceptedEventHandlers[index]] = [];
                    }

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

                Window.prototype._setupDOM = function () {
                    var thisWindow = this;
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
                };

                Window.getCurrent = function () {
                    return Window.current;
                };

                Window.prototype.on = function (eventName, eventListener) {
                    // TODO: Don't allow if window is closed!
                    eventName = eventName.toLowerCase();

                    // Check if this event can be subscribed to via this function:
                    if (this._eventListeners[eventName] === undefined) {
                        return;
                    }

                    // Check if eventListener is a function:
                    if (!eventListener || eventListener.constructor !== Function) {
                        throw "on requires argument 'eventListener' of type Function";
                    }

                    // Check if eventListener is already added:
                    if (this._eventListeners[eventName].indexOf(eventListener) >= 0) {
                        return;
                    }

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
                    if (this._eventListeners[eventName] === undefined) {
                        return;
                    }

                    // Check if eventListener is a function:
                    if (!eventListener || eventListener.constructor !== Function) {
                        throw "off requires argument 'eventListener' of type Function";
                    }

                    // Remove event listener, if exists:
                    var index = this._eventListeners[eventName].indexOf(eventListener);
                    if (index >= 0) {
                        this._eventListeners[eventName].splice(index, 1);
                    }
                };

                Window.prototype.clearEvent = function (eventName) {
                    eventName = eventName.toLowerCase();

                    // If event listeners don't exist, bail:
                    if (this._eventListeners[eventName] === undefined) {
                        return;
                    }

                    this._eventListeners[eventName] = [];
                };

                Window.prototype.emit = function (eventName) {
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

                    for (var _index2 = 0; _index2 < this._eventListeners[eventName].length; _index2 += 1) {
                        // Call listener with the 'this' context as the current window:
                        this._eventListeners[eventName][_index2].apply(this, args);
                    }
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
                    var _iteratorNormalCompletion13 = true;
                    var _didIteratorError13 = false;
                    var _iteratorError13 = undefined;

                    try {
                        for (var _iterator13 = this._dockedGroup[Symbol.iterator](), _step13; !(_iteratorNormalCompletion13 = (_step13 = _iterator13.next()).done); _iteratorNormalCompletion13 = true) {
                            var _window7 = _step13.value;

                            _window7._window.minimize(callback.ref());
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
                    var _iteratorNormalCompletion14 = true;
                    var _didIteratorError14 = false;
                    var _iteratorError14 = undefined;

                    try {
                        for (var _iterator14 = this._dockedGroup[Symbol.iterator](), _step14; !(_iteratorNormalCompletion14 = (_step14 = _iterator14.next()).done); _iteratorNormalCompletion14 = true) {
                            var _window8 = _step14.value;

                            _window8._window.show(callback.ref());
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
                };

                Window.prototype.hide = function (callback) {
                    if (!this._ready) {
                        throw "hide can't be called on an unready window";
                    }

                    callback = new SyncCallback(callback);
                    var _iteratorNormalCompletion15 = true;
                    var _didIteratorError15 = false;
                    var _iteratorError15 = undefined;

                    try {
                        for (var _iterator15 = this._dockedGroup[Symbol.iterator](), _step15; !(_iteratorNormalCompletion15 = (_step15 = _iterator15.next()).done); _iteratorNormalCompletion15 = true) {
                            var _window9 = _step15.value;

                            _window9._window.hide(callback.ref());
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
                };

                Window.prototype.restore = function (callback) {
                    if (!this._ready) {
                        throw "restore can't be called on an unready window";
                    }

                    callback = new SyncCallback(callback);
                    var _iteratorNormalCompletion16 = true;
                    var _didIteratorError16 = false;
                    var _iteratorError16 = undefined;

                    try {
                        for (var _iterator16 = this._dockedGroup[Symbol.iterator](), _step16; !(_iteratorNormalCompletion16 = (_step16 = _iterator16.next()).done); _iteratorNormalCompletion16 = true) {
                            var _window10 = _step16.value;

                            _window10._window.restore(callback.ref());
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

                Window.prototype.bringToFront = function (callback) {
                    if (!this._ready) {
                        throw "bringToFront can't be called on an unready window";
                    }
                    var thisWindow = this;

                    var beforeCallback = new SyncCallback(function () {
                        thisWindow._window.bringToFront(callback);
                    });
                    var _iteratorNormalCompletion17 = true;
                    var _didIteratorError17 = false;
                    var _iteratorError17 = undefined;

                    try {
                        for (var _iterator17 = this._dockedGroup[Symbol.iterator](), _step17; !(_iteratorNormalCompletion17 = (_step17 = _iterator17.next()).done); _iteratorNormalCompletion17 = true) {
                            var _window11 = _step17.value;

                            if (_window11 !== this) {
                                _window11._window.bringToFront(beforeCallback.ref());
                            }
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
                };

                Window.prototype.focus = function (callback) {
                    if (!this._ready) {
                        throw "focus can't be called on an unready window";
                    }
                    var thisWindow = this;

                    var beforeCallback = new SyncCallback(function () {
                        thisWindow._window.focus(callback);
                    });
                    var _iteratorNormalCompletion18 = true;
                    var _didIteratorError18 = false;
                    var _iteratorError18 = undefined;

                    try {
                        for (var _iterator18 = this._dockedGroup[Symbol.iterator](), _step18; !(_iteratorNormalCompletion18 = (_step18 = _iterator18.next()).done); _iteratorNormalCompletion18 = true) {
                            var _window12 = _step18.value;

                            if (_window12 !== this) {
                                _window12._window.focus(beforeCallback.ref());
                            }
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
                };

                Window.prototype.resizeTo = function (width, height, callback) {
                    if (!this._ready) {
                        throw "resizeTo can't be called on an unready window";
                    }
                    var size = new Position(width, height);

                    this._window.resizeTo(size.left, size.top, "top-left", callback);
                };

                Window.prototype.moveTo = function (left, top, callback) {
                    if (!this._ready) {
                        throw "moveTo can't be called on an unready window";
                    }
                    var deltaPos = new Position(left, top).subtract(this.getPosition());

                    callback = new SyncCallback(callback);
                    var _iteratorNormalCompletion19 = true;
                    var _didIteratorError19 = false;
                    var _iteratorError19 = undefined;

                    try {
                        for (var _iterator19 = this._dockedGroup[Symbol.iterator](), _step19; !(_iteratorNormalCompletion19 = (_step19 = _iterator19.next()).done); _iteratorNormalCompletion19 = true) {
                            var _window13 = _step19.value;

                            var pos = _window13.getPosition().add(deltaPos);
                            _window13._bounds.moveTo(pos);
                            _window13._window.moveTo(pos.left, pos.top, callback.ref());
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
                };

                Window.prototype.moveBy = function (deltaLeft, deltaTop, callback) {
                    if (!this._ready) {
                        throw "moveBy can't be called on an unready window";
                    }
                    var deltaPos = new Position(deltaLeft, deltaTop);

                    callback = new SyncCallback(callback);
                    var _iteratorNormalCompletion20 = true;
                    var _didIteratorError20 = false;
                    var _iteratorError20 = undefined;

                    try {
                        for (var _iterator20 = this._dockedGroup[Symbol.iterator](), _step20; !(_iteratorNormalCompletion20 = (_step20 = _iterator20.next()).done); _iteratorNormalCompletion20 = true) {
                            var _window14 = _step20.value;

                            var pos = _window14.getPosition().add(deltaPos);
                            _window14._bounds.moveTo(pos);
                            _window14._window.moveTo(pos.left, pos.top, callback.ref());
                        }
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
                };

                Window.prototype.setBounds = function (left, top, right, bottom, callback) {
                    if (!this._ready) {
                        throw "resizeTo can't be called on an unready window";
                    }
                    var bounds = new BoundingBox(left, top, right, bottom);

                    this._window.setBounds(bounds.left, bounds.top, bounds.right, bounds.bottom, callback);
                };

                Window.prototype.dock = function (other) {
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
                            var _other3 = _step21.value;

                            this._dockedGroup.push(_other3);
                            // Sharing the array between window objects makes it easier to manage:
                            _other3._dockedGroup = this._dockedGroup;
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
                    var thisWindowName = this._window.name;
                    this._dockedGroup.splice(this._dockedGroup.indexOf(this), 1);
                    this._dockedGroup = [this];

                    //console.log("undock", this._dockedGroup);
                    // TODO: Redock those still touching, EXCEPT 'this'.
                };

                Window.prototype._dragStart = function () {
                    var _iteratorNormalCompletion22 = true;
                    var _didIteratorError22 = false;
                    var _iteratorError22 = undefined;

                    try {
                        for (var _iterator22 = this._dockedGroup[Symbol.iterator](), _step22; !(_iteratorNormalCompletion22 = (_step22 = _iterator22.next()).done); _iteratorNormalCompletion22 = true) {
                            var _window15 = _step22.value;

                            _window15._dragStartPos = _window15.getPosition();
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

                    var _iteratorNormalCompletion23 = true;
                    var _didIteratorError23 = false;
                    var _iteratorError23 = undefined;

                    try {
                        for (var _iterator23 = this._dockedGroup[Symbol.iterator](), _step23; !(_iteratorNormalCompletion23 = (_step23 = _iterator23.next()).done); _iteratorNormalCompletion23 = true) {
                            var _other4 = _step23.value;

                            var pos = _other4._dragStartPos;

                            // If other doesn't have a drag position, start it:
                            if (pos === undefined) {
                                pos = _other4._dragStartPos = _other4.getPosition();
                                pos.left -= deltaLeft;
                                pos.top -= deltaTop;
                            }

                            _other4._window.moveTo(pos.left + deltaLeft, pos.top + deltaTop);
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

                    var _iteratorNormalCompletion24 = true;
                    var _didIteratorError24 = false;
                    var _iteratorError24 = undefined;

                    try {
                        for (var _iterator24 = this._dockedGroup[Symbol.iterator](), _step24; !(_iteratorNormalCompletion24 = (_step24 = _iterator24.next()).done); _iteratorNormalCompletion24 = true) {
                            var _window16 = _step24.value;

                            delete _window16._dragStartPos;
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

                // Handle current window in this context:
                // TODO: Rewrite to remove setTimeout for the following:
                var getCurrent = function getCurrent() {
                    if (windowfactory._windows) {
                        Window.current = windowfactory._windows[currentWin.name] || new Window(currentWin);
                    } else {
                        setTimeout(getCurrent, 5);
                    }
                };
                getCurrent();

                _extends(windowfactory, {
                    Window: Window
                });
            })();
        }
    })();
    /*global windowfactory,fin*/
    (function () {
        if (!windowfactory.isRenderer || !windowfactory.openfinVersion) {
            return;
        }

        var Window = windowfactory.Window;
        var readyCallbacks = [];
        var _isReady2 = false;
        var currentWindow = void 0;

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

        function ready() {
            Window.current._window.addEventListener("focused", function () {
                Window.current.bringToFront();
            });
            Window.current._window.addEventListener("restored", function () {
                var _iteratorNormalCompletion25 = true;
                var _didIteratorError25 = false;
                var _iteratorError25 = undefined;

                try {
                    for (var _iterator25 = Window.current._dockedGroup[Symbol.iterator](), _step25; !(_iteratorNormalCompletion25 = (_step25 = _iterator25.next()).done); _iteratorNormalCompletion25 = true) {
                        var other = _step25.value;

                        if (other !== Window.current) {
                            other._window.restore();
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
            });

            _isReady2 = true;
            for (var index = 0; index < readyCallbacks.length; index += 1) {
                readyCallbacks[index]();
            }
            readyCallbacks = [];
        }

        fin.desktop.main(function () {
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
                return _isReady2;
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
        require(["scalejs!core"], function (core) {
            core.registerExtension({
                windowfactory: windowfactory
            });
        });
    }
});
