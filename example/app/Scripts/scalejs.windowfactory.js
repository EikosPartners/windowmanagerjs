
"use strict";
/**
 * This module handles various geometric shapes used in calculations for windowfactory.
 * @module geometry
 */
if (typeof define !== "undefined" && define) {
    define('scalejs.windowfactory/geometry',[
    ], function (
    ) {
        /**
         * A Vector object.
         * @memberof module:geometry
         * @constructor
         * @param {number} left - The position of the vector's x-axis.
         * @param {number} top - The position of the vector's y-axis.
         */
        function Vector(left, top) {
            if (!(this instanceof Vector)) { return new Vector(left, top); }

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
            // We have this method, so any prototype in this script will return their position, and if they are one it will return itself.
            // This simplifies code, and prevents having to do a ton of checks.
            return this;
        }

        /**
         * Returns a BoundingBox instance version of this vector similar to:
         * new BoundingBox(Vector.left, Vector.top, Vector.left, Vector.top)
         * @method
         * @returns {module:geometry.BoundingBox}
         */
        Vector.prototype.getBoundingBox = function () {
            // We have this method, so any prototype in this script will return their position, and if they are one it will return itself.
            // This simplifies code, and prevents having to do a ton of checks.
            return new BoundingBox(this.left, this.top, this.left, this.top);
        }

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
        }
        Vector.prototype.set = function (other) {
            if (!other) { throw "set requires argument 'other'"; }
            other = other.getVector();
            if (other.constructor !== Vector) { throw "set requires argument 'other' to resolve to type Vector"; }

            this.left = other.left;
            this.top = other.top;
            return this;
        };
        Vector.prototype.add = function (other) {
            if (!other) { throw "add requires argument 'other'"; }
            other = other.getVector();
            if (other.constructor !== Vector) { throw "add requires argument 'other' to resolve to type Vector"; }

            this.left += other.left;
            this.top += other.top;
            return this;
        };
        /*Vector.add = function (a, b) {
            return a.clone().add(b);
        };*/
        Vector.prototype.subtract = function (other) {
            if (!other) { throw "subtract requires argument 'other'"; }
            other = other.getVector();
            if (other.constructor !== Vector) { throw "subtract requires argument 'other' to resolve to type Vector"; }

            this.left -= other.left;
            this.top -= other.top;
            return this;
        };
        Vector.prototype.moveTo = function (left, top) {
            if (left && left.constructor === Number) { this.left = left; }
            if (top && top.constructor === Number) { this.top = top; }
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
            if (!(this instanceof BoundingBox)) { return new BoundingBox(left, top, right, bottom); }

            var obj = left;
            if (obj && obj.constructor !== Number) {
                if (obj.getBoundingBox) { obj = obj.getBoundingBox(); }
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
            // We have this method, so any prototype in this script will return their bounding box, and if they are one it will return itself.
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
            if (!other) { throw "difference requires argument 'other'"; }
            other = other.getBoundingBox();
            if (other.constructor !== BoundingBox) { throw "difference requires argument 'other' to resolve to type BoundingBox"; }

            return new BoundingBox(this.left - other.left, this.top - other.top, this.right - other.right, this.bottom - other.bottom);
        };
        BoundingBox.prototype.getCenteredOnPosition = function (other) {
            if (!other) { throw "getCenteredOnPosition requires argument 'other'"; }
            other = other.getBoundingBox();
            if (other.constructor !== BoundingBox) { throw "getCenteredOnPosition requires argument 'other' to resolve to type BoundingBox"; }

            return other.getCenterPosition().subtract(this.getCenterPosition().subtract(this.getPosition()));
        };
        BoundingBox.prototype.getIntersection = function (other) {
            if (!other) { throw "getIntersection requires argument 'other'"; }
            other = other.getBoundingBox();
            if (other.constructor !== BoundingBox) { throw "getIntersection requires argument 'other' to resolve to type BoundingBox"; }

            var left = Math.max(this.left, other.left),
                top = Math.max(this.top, other.top),
                right = Math.min(this.right, other.right),
                bottom = Math.min(this.bottom, other.bottom);

            if ((left < right && top < bottom) || (left === right && top < bottom) || (top === bottom && left < right)) {
                return new BoundingBox(left, top, right, bottom);
            } else if (left === right && top === bottom) {
                return new Position(left, top);
            }
        };
        BoundingBox.prototype.getDistanceSquaredToPoint = function (left, top) {
            var other = new Vector(left, top);
            var cLeft = (other.left <= this.left ? this.left : (other.left >= this.right ? this.right : other.left));
            var cTop = (other.top <= this.top ? this.top : (other.top >= this.bottom ? this.bottom : other.top));
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
            // NOTE: anchor also supports being passed as a position. Allowing the resize anchor to be anywhere other than the predefined strings.
            var curSize = this.getSize();
            var newSize = new Vector(width || curSize.left, height || curSize.top);
            anchor = anchor || "top-left";
            if (typeof anchor === "string" || anchor instanceof String) {
                var anchorStr = anchor;
                anchor = this.getPosition();
                if (anchorStr.indexOf("right") >= 0) { anchor.left += curSize.left; }
                if (anchorStr.indexOf("bottom") >= 0) { anchor.top += curSize.top; }
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
            if (!other) { throw "isContains requires argument 'other'"; }
            other = other.getBoundingBox();
            if (other.constructor !== BoundingBox) { throw "isContains requires argument 'other' to resolve to type BoundingBox"; }

            return other.left >= this.left && other.right <= this.right && other.top >= this.top && other.bottom <= this.bottom;
        };
        BoundingBox.prototype.someContains = function (others) {
            if (!others) { throw "someContains requires argument 'others'"; }
            if (others.constructor !== Array) { throw "someContains requires argument 'others' of type Array"; }

            for (var index = 0; index < others.length; index += 1) {
                if (this.isContains(others[index])) { return true; }
            }
            return false;
        };
        BoundingBox.prototype.isTouching = function (other) {
            if (!other) { throw "isTouching requires argument 'other'"; }
            other = other.getBoundingBox();
            if (other.constructor !== BoundingBox) { throw "isTouching requires argument 'other' to resolve to type BoundingBox"; }

            return ((this.top <= other.bottom && this.bottom >= other.top) && (this.left === other.right || this.right === other.left)) ||
                ((this.left <= other.right && this.right >= other.left) && (this.top === other.bottom || this.bottom === other.top));
        };
        BoundingBox.prototype.getEdgeTouching = function (others) {
            if (!others) { throw "getEdgeTouching requires argument 'others'"; }
            if (others.constructor !== Array) { others = [others]; }

            for (var index = 0; index < others.length; index += 1) {
                var other = others[index].getBoundingBox();
                if (this.top <= other.bottom && this.bottom >= other.top) {
                    if (this.left === other.right) { return "left"; }
                    if (this.right === other.left) { return "right"; }
                }
                if (this.left <= other.right && this.right >= other.left) {
                    if (this.top === other.bottom) { return "top"; }
                    if (this.bottom === other.top) { return "bottom"; }
                }
            }
        };
        BoundingBox.prototype.getOtherEdgeTouching = function (others) {
            if (!others) { throw "getOtherEdgeTouching requires argument 'others'"; }
            if (others.constructor !== Array) { others = [others]; }

            for (var index = 0; index < others.length; index += 1) {
                var other = others[index].getBoundingBox();
                if (this.top <= other.bottom && this.bottom >= other.top) {
                    if (this.left === other.right) { return "right"; }
                    if (this.right === other.left) { return "left"; }
                }
                if (this.left <= other.right && this.right >= other.left) {
                    if (this.top === other.bottom) { return "bottom"; }
                    if (this.bottom === other.top) { return "top"; }
                }
            }
        };
        BoundingBox.prototype.getEdgeClosestOrder = function (other) {
            if (!other) { throw "getEdgeClosest requires argument 'other'"; }
            other = other.getBoundingBox();
            if (other.constructor !== BoundingBox) { throw "getEdgeClosest requires argument 'other' to resolve to type BoundingBox"; }

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

            return dis.map(function (dis) { return dis.edge; });
        };
        BoundingBox.prototype.getEdgeClosest = function (other) {
            var edges = this.getEdgeClosestOrder(other);
            return edges[0];
        };
        BoundingBox.prototype.someTouching = function (others) {
            if (!others) { throw "someTouching requires argument 'others'"; }
            if (others.constructor !== Array) { throw "someTouching requires argument 'others' of type Array"; }

            for (var index = 0; index < others.length; index += 1) {
                if (this.isTouching(others[index])) { return true; }
            }
            return false;
        };
        BoundingBox.prototype.isColliding = function (other) {
            if (!other) { throw "isColliding requires argument 'other'"; }
            other = other.getBoundingBox();
            if (other.constructor !== BoundingBox) { throw "isColliding requires argument 'other' to resolve to type BoundingBox"; }

            return this.left < other.right && this.right > other.left && this.top < other.bottom && this.bottom > other.top;
        };
        BoundingBox.prototype.someColliding = function (others) {
            if (!others) { throw "someColliding requires argument 'others'"; }
            if (others.constructor !== Array) { throw "someColliding requires argument 'others' of type Array"; }

            for (var index = 0; index < others.length; index += 1) {
                if (this.isColliding(others[index])) { return true; }
            }
            return false;
        };
        BoundingBox.prototype.getColliding = function (others) {
            if (!others) { throw "getColliding requires argument 'others'"; }
            if (others.constructor !== Array) { throw "getColliding requires argument 'others' of type Array"; }

            for (var index = 0; index < others.length; index += 1) {
                if (this.isColliding(others[index])) { return others[index]; }
            }
        };
        BoundingBox.prototype.isTouchingEdge = function (other) {
            if (!other) { throw "isTouchingEdge requires argument 'other'"; }
            other = other.getBoundingBox();
            if (other.constructor !== BoundingBox) { throw "isTouchingEdge requires argument 'other' to resolve to type BoundingBox"; }

            return this.left === other.right || this.right === other.left || this.top === other.bottom || this.bottom === other.top;
        };
        /*BoundingBox.prototype.getXEdgeDistance = function (other) {
            if (!others) { throw "getColliding requires argument 'others'"; }
            if (others.constructor !== Array) { throw "getColliding requires argument 'others' of type Array"; }

            var distance = 1000000; // Arbitrary distance
            for (var index = 0; index < this.boxes.length; index += 1) {
                for (var j = 0; j < other.boxes.length; j += 1) {
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
            if (!(this instanceof CollisionMesh)) { return new CollisionMesh(boxes); }
            opts = opts || {};

            if (!boxes) { throw "CollisionMesh constructor requires argument 'boxes'"; }
            if (boxes.constructor !== Array) { boxes = [boxes]; }
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
            if (this.boxes.length === 0) { return 0; }

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
            if (this.boxes.length === 0) { return 0; }

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
            if (this.boxes.length === 0) { return 0; }

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
            if (!other) { throw "isContains requires argument 'other'"; }
            other = (other.constructor === Array ? new CollisionMesh(other) : other.getCollisionMesh());
            if (other.constructor !== CollisionMesh) { throw "isContains requires argument 'other' to resolve to type CollisionMesh"; }

            for (var index = 0; index < this.boxes.length; index += 1) {
                if (this.boxes[index].someContains(other.boxes)) { return true; }
            }
            return false;
        };
        CollisionMesh.prototype.someContains = function (other) {
            if (!other) { throw "someContains requires argument 'other'"; }
            other = (other.constructor === Array ? new CollisionMesh(other) : other.getCollisionMesh());
            if (other.constructor !== CollisionMesh) { throw "someContains requires argument 'other' to resolve to type CollisionMesh"; }

            for (var index = 0; index < this.boxes.length; index += 1) {
                if (this.boxes[index].someContains(other.boxes)) { return true; }
            }
            return false;
        };
        CollisionMesh.prototype.isTouching = function (other) {
            if (!other) { throw "isTouching requires argument 'other'"; }
            other = (other.constructor === Array ? new CollisionMesh(other) : other.getCollisionMesh());
            if (other.constructor !== CollisionMesh) { throw "isTouching requires argument 'other' to resolve to type CollisionMesh"; }

            for (var index = 0; index < this.boxes.length; index += 1) {
                if (this.boxes[index].someTouching(other.boxes)) { return true; }
            }
            return false;
        };
        CollisionMesh.prototype.someTouching = function (others) {
            if (!others) { throw "someTouching requires argument 'others'"; }
            if (others.constructor !== Array) { throw "someTouching requires argument 'others' to resolve to type Array"; }

            for (var index = 0; index < others.length; index += 1) {
                if (this.isTouching(others[index])) { return true; }
            }
            return false;
        };
        CollisionMesh.prototype.isColliding = function (other) {
            if (!other) { throw "isColliding requires argument 'other'"; }
            other = (other.constructor === Array ? new CollisionMesh(other) : other.getCollisionMesh());
            if (other.constructor !== CollisionMesh) { throw "isColliding requires argument 'other' to resolve to type CollisionMesh"; }

            for (var index = 0; index < this.boxes.length; index += 1) {
                if (this.boxes[index].someColliding(other.boxes)) { return true; }
            }
            return false;
        };
        CollisionMesh.prototype.someColliding = function (others) {
            if (!others) { throw "someColliding requires argument 'others'"; }
            if (others.constructor !== Array) { throw "someColliding requires argument 'others' to resolve to type Array"; }

            for (var i = 0; i < others.length; i += 1) {
                for (var j = 0; j < this.boxes.length; j += 1) {
                    if (this.boxes[j].isColliding(others[i])) { return true; }
                }
            }
            return false;
        };
        CollisionMesh.prototype.getColliding = function (other) {
            if (!other) { throw "getColliding requires argument 'other'"; }
            other = (other.constructor === Array ? new CollisionMesh(other) : other.getCollisionMesh());
            if (other.constructor !== CollisionMesh) { throw "getColliding requires argument 'other' to resolve to type CollisionMesh"; }

            for (var index = 0; index < this.boxes.length; index += 1) {
                var collided = this.boxes[index].getColliding(other.boxes);
                if (collided) { return collided; }
            }
        };
        /*CollisionMesh.prototype.getXEdgeDistance = function (other) {
            if (!other) { throw "isTouching requires argument 'other'"; }
            other = (other.constructor === Array ? new CollisionMesh(other) : other.getCollisionMesh());
            if (other.constructor !== CollisionMesh) { throw "isTouching requires argument 'other' to resolve to type CollisionMesh"; }

            var distance = 1000000; // Arbitrary distance
            for (var index = 0; index < this.boxes.length; index += 1) {
                for (var j = 0; j < other.boxes.length; j += 1) {
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
    });
};

/*global nodeRequire*/
if (typeof define !== "undefined" && define) {
	define('scalejs.windowfactory/electron/Window',[
		"../geometry"
	], function (
		geometry
	) {
        if (!(typeof nodeRequire !== "undefined" && nodeRequire && nodeRequire.electron)) { return; }

		var Vector = geometry.Vector,
			Position = geometry.Position,
			Size = geometry.Size,
			BoundingBox = geometry.BoundingBox;
		var remote = nodeRequire("electron").remote;
		var BrowseWindow = remote.BrowseWindow;
		var defaultConfig = {
			width: 600,
			height: 600,
			frame: false,
			resizable: false,
			hasShadow: false
			//transparent: true
		};
		defaultConfig.__proto__ = null;

		/**
		 * Wraps a window object.
		 * @constructor
		 * @alias Window
		 * @param {object} config - Configuration
		 */
		function Window(config) {
			if (!(this instanceof Window)) { return new Window(config); }

			config = config || {}; // If no arguments are passed, assume we are creating a default blank window
			var isArgConfig = (config.webContents === undefined);

			if (isArgConfig) {
				for (var prop in defaultConfig) {
					if (defaultConfig.hasOwnProperty(prop)) {
						config[prop] = config[prop] || defaultConfig[prop];
					}
				}

				this._window = new BrowseWindow(config);
				this._ready = true;
			} else {
				this._window = config;
				this._ready = true;
			}
		}

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
			if (callback) { callback(); }
		};

        /**
		 * Minimizes the window instance.
         * @method
		 * @param {callback=}
         */
		Window.prototype.minimize = function (callback) {
			if (!this._ready) { throw "minimize can't be called on an unready window"; }

			this._window.minimize();
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

			this._window.show();
			if (callback) { callback(); }
		};

        /**
		 * Hides the window instance.
         * @method
		 * @param {callback=}
         */
		Window.prototype.hide = function (callback) {
			if (!this._ready) { throw "hide can't be called on an unready window"; }

			this._window.hide();
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
			var size = new Position(width, height);

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
			var pos = new Position(left, top);

			this._window.setPosition(left, top);
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
			var bounds = this.getBounds();
			var deltaPos = new Position(deltaLeft, deltaTop);

			this._window.setPosition(bounds.left + deltaPos.left, bounds.top + deltaPos.top);
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
			var bounds = new BoundingBox(left, top, right, bottom);

			this._window.setSize({
				x: left,
				y: top,
				width: right - left,
				height: bottom - top
			});
			if (callback) { callback(); }
		};

		return Window;
	});
};

/*global nodeRequire*/
if (typeof define !== "undefined" && define) {
    define('scalejs.windowfactory/electron/windowfactory',[
        "./Window"
    ], function (
        Window
    ) {
        if (!(typeof nodeRequire !== "undefined" && nodeRequire && nodeRequire.electron)) { return; }

        var remote = nodeRequire("electron").remote;
        var readyCallbacks = [];
        var isReady = true;
        var currentWindow = new Window(remote.getCurrentWindow());

        // TODO: Window Manager, so instances are saved and returned, rather than making copies.
        // TODO: Make use the remote.getGlobal to share between renderers.

        function onReady(callback) {
            // Check if callback is not a function:
            if (!(callback && callback.constructor && callback.call && callback.apply)) { throw "onReady expects a function passed as the callback argument!"; }

            // Check if already ready:
            if (isReady) { callback(); }

            // Check to see if callback is already in readyCallbacks:
            if (readyCallbacks.indexOf(callback) >= 0) { return; }

            readyCallbacks.push(callback);
        }

        function getCurrentWindow() {
            return currentWindow;
        }

		// Setup handlers on this window:
		(function () {
            var wX = 0;
            var wY = 0;
            var dragging = false;
            //var titlebarEl = document.querySelector("titlebar");

            window.addEventListener("mousedown", function (event) {
                if (event.target.classList.contains("window-drag")) {
                    dragging = true;
                    wX = event.pageX;
                    wY = event.pageY;
                }
            });

            window.addEventListener("mousemove", function (event) {
                if (dragging) {
                    currentWindow.moveTo(event.screenX - wX, event.screenY - wY);
                }
            });

            window.addEventListener("mouseup", function () {
                dragging = false;
            });

            // Add context menu:
            var Menu = remote.Menu;
            var MenuItem = remote.MenuItem;

            var rightClickPosition = null;

            var menu = new Menu();
            menu.append(new MenuItem({
                label: "Reload",
                accelerator: "CmdOrCtrl+R",
                click: function () {
                    remote.getCurrentWindow().reload()
                }
            }));
            menu.append(new MenuItem({
                label: "Reload app and restart children",
                click: function () {
                    remote.app.relaunch();
                    remote.app.exit(0);
                }
            }));
            menu.append(new MenuItem({ type: "separator" }));
            menu.append(new MenuItem({
                label: "Inspect Element",
                accelerator: "CmdOrCtrl+Shift+I",
                click: function () {
                    remote.getCurrentWindow().inspectElement(rightClickPosition.x, rightClickPosition.y)
                }
            }));

            window.addEventListener("contextmenu", function (event) {
                event.preventDefault();
                rightClickPosition = {x: event.x, y: event.y};
                menu.popup(remote.getCurrentWindow());
            }, false);
		})();

        return {
            Window: Window,
            getCurrentWindow: getCurrentWindow,
            onReady: onReady,
            isReady: function () { return isReady; },
            runtime: "Electron",
            runtimeVersion: nodeRequire.electron
        };
    });
};

/*global fin*/
if (typeof define !== "undefined" && define) {
	define('scalejs.windowfactory/openfin/Window',[
		"../geometry"
	], function (
		geometry
	) {
        if (!(typeof fin !== "undefined" && fin && fin.desktop && fin.desktop.getVersion())) { return; }

		var Vector = geometry.Vector,
			Position = geometry.Position,
			Size = geometry.Size,
			BoundingBox = geometry.BoundingBox;
		var defaultConfig = {
			width: 600,
			height: 600,
			frame: false,
			resizable: false,
			saveWindowState: false
		};
		defaultConfig.__proto__ = null;
		var configMap = {
			width: "defaultWidth",
			height: "defaultHeight"
		};
		configMap.__proto__ = null;

		function setupDOM() {
			var thisWindow = this;

			this._window.getBounds(function (bounds) {
				thisWindow._bounds.set(bounds.left, bounds.top, bounds.left + bounds.width, bounds.top + bounds.height);
			});

			function onBoundsChange(bounds) {
				thisWindow._bounds.set(bounds.left, bounds.top, bounds.left + bounds.width, bounds.top + bounds.height);
			}
			this._window.addEventListener("bounds-changing", onBoundsChange);
			this._window.addEventListener("bounds-changed", onBoundsChange);

			this._ready = true;
			// Notify Subscribers
		}

		function Window(config) {
			if (!(this instanceof Window)) { return new Window(config); }

			config = config || {}; // If no arguments are passed, assume we are creating a default blank window
			var isArgConfig = (config["app_uuid"] === undefined);

			this._bounds = new BoundingBox();

			if (isArgConfig) {
				for (var prop in defaultConfig) {
					if (defaultConfig.hasOwnProperty(prop)) {
						config[prop] = config[prop] || defaultConfig[prop];
					}
				}
				for (prop in config) {
					if (config.hasOwnProperty(prop) && configMap[prop] !== undefined) {
						config[configMap[prop]] = config[prop];
						delete config[prop];
					}
				}

				this._window = new fin.desktop.Window(config, setupDOM.bind(this), function (err) {
					console.error(err, config);
				});
			} else {
				this._window = config;
				setupDOM.call(this);
			}
		}

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

			this._window.minimize(callback);
		};

		Window.prototype.maximize = function (callback) {
			if (!this._ready) { throw "maximize can't be called on an unready window"; }

			this._window.maximize(callback);
		};

		Window.prototype.show = function (callback) {
			if (!this._ready) { throw "show can't be called on an unready window"; }

			this._window.show(callback);
		};

		Window.prototype.hide = function (callback) {
			if (!this._ready) { throw "hide can't be called on an unready window"; }

			this._window.hide(callback);
		};

		Window.prototype.restore = function (callback) {
			if (!this._ready) { throw "restore can't be called on an unready window"; }

			this._window.restore(callback);
		};

		Window.prototype.bringToFront = function (callback) {
			if (!this._ready) { throw "bringToFront can't be called on an unready window"; }

			this._window.bringToFront(callback);
		};

		Window.prototype.focus = function (callback) {
			if (!this._ready) { throw "focus can't be called on an unready window"; }

			this._window.focus(callback);
		};

		Window.prototype.resizeTo = function (width, height, callback) {
			if (!this._ready) { throw "resizeTo can't be called on an unready window"; }
			var size = new Position(width, height);

			this._window.resizeTo(size.left, size.top, "top-left", callback);
		};

		Window.prototype.moveTo = function (left, top, callback) {
			if (!this._ready) { throw "moveTo can't be called on an unready window"; }
			var pos = new Position(left, top);

			this._window.moveTo(pos.left, pos.top, callback);
		};

		Window.prototype.moveBy = function (deltaLeft, deltaTop, callback) {
			if (!this._ready) { throw "moveBy can't be called on an unready window"; }
			var deltaPos = new Position(deltaLeft, deltaTop);

			this._window.moveBy(deltaPos.left, deltaPos.top, callback);
		};

		Window.prototype.setBounds = function (left, top, right, bottom, callback) {
			if (!this._ready) { throw "resizeTo can't be called on an unready window"; }
			var bounds = new BoundingBox(left, top, right, bottom);

			this._window.setBounds(bounds.left, bounds.top, bounds.right, bounds.bottom, callback);
		};

		return Window;
	});
};

/*global fin*/
if (typeof define !== "undefined" && define) {
    define('scalejs.windowfactory/openfin/windowfactory',[
        "./Window"
    ], function (
        Window
    ) {
        if (!(typeof fin !== "undefined" && fin && fin.desktop && fin.desktop.getVersion())) { return; }

        var readyCallbacks = [];
        var isReady = false;
        var currentWindow;

        function onReady(callback) {
            // Check if callback is not a function:
            if (!(callback && callback.constructor && callback.call && callback.apply)) { throw "onReady expects a function passed as the callback argument!"; }

            // Check if already ready:
            if (isReady) { callback(); }

            // Check to see if callback is already in readyCallbacks:
            if (readyCallbacks.indexOf(callback) >= 0) { return; }

            readyCallbacks.push(callback);
        }


        fin.desktop.main(function () {
            currentWindow = new Window(fin.desktop.Window.getCurrent());

            // Setup handlers on this window:
            (function () {
                var wX = 0;
                var wY = 0;
                var dragging = false;
                //var titlebarEl = document.querySelector("titlebar");

                window.addEventListener("mousedown", function (e) {
                    if (e.target.classList.contains("window-drag")) {
                        dragging = true;
                        wX = e.pageX;
                        wY = e.pageY;
                    }
                });

                window.addEventListener("mousemove", function (e) {
                    if (dragging) {
                        currentWindow.moveTo(e.screenX - wX, e.screenY - wY);
                    }
                });

                window.addEventListener("mouseup", function () {
                    dragging = false;
                });
            })();

            isReady = true;
            for (var index = 0; index < readyCallbacks.length; index += 1) {
                readyCallbacks[index]();
            }
            readyCallbacks = [];
        });

        return {
            Window: Window,
            getCurrentWindow: function () {
                return currentWindow;
            },
            onReady: onReady,
            isReady: function () {
                return isReady;
            },
            runtime: "OpenFin",
            runtimeVersion: fin.desktop.getVersion()
        };
    });
};

if (typeof define !== "undefined" && define) {
    define("scalejs.windowfactory",[
        "scalejs!core",
        "./scalejs.windowfactory/geometry",
        "./scalejs.windowfactory/electron/windowfactory",
        "./scalejs.windowfactory/openfin/windowfactory"
    ], function (
        core,
        geometry,
        electron,
        openfin
    ) {
        var windowfactory = electron || openfin;

        windowfactory.geometry = geometry;

        core.registerExtension({
            windowfactory: windowfactory
        });

        if (typeof window !== "undefined" && window) { window.windowfactory = windowfactory; }
        if (typeof global !== "undefined" && global) { global.windowfactory = windowfactory; }
        //if (typeof GLOBAL !== "undefined" && GLOBAL) GLOBAL.windowfactory = windowfactory;

        return windowfactory;
    });
} else {
    if (typeof process !== "undefined" && process) {
        require.electron = process.versions.electron;
        var _require = require;
        process.once("loaded", function () {
            global.nodeRequire = _require;
        });
    }
}
;
