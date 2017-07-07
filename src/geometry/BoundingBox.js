// TODO: Utilize ES6 features (like for loops)
import Vector from './Vector';
import CollisionMesh from './CollisionMesh';

// Utility functions:
function minAbs(min, ...vals) {
    let minAbs = Math.abs(min);

    for (const val of vals) {
        let argAbs = Math.abs(val);

        if (argAbs < minAbs) {
            min = val;
            minAbs = argAbs;
        }
    }

    return {
        min: min,
        abs: minAbs
    };
}

/**
 * A BoundingBox class.
 */
class BoundingBox {
    /**
     * @param {Number} left - The left position of x-axis.
     * @param {Number} top - The top position of y-axis.
     * @param {Number} right - The right position of x-axis.
     * @param {Number} bottom - The bottom position of y-axis.
     */
    constructor(left, top, right, bottom) {
        let obj = left;

        if (obj && obj.constructor !== Number) {
            if (obj.getBoundingBox) { obj = obj.getBoundingBox(); }
            // new BoundingBox(obj)
            this.left = obj.left;
            this.top = obj.top;
            this.right = obj.right;
            this.bottom = obj.bottom;
        } else {
            // new BoundingBox(left, top, right, bottom)
            this.left = left;
            this.top = top;
            this.right = right;
            this.bottom = bottom;
        }
    }

    /**
     * Clone the current boundingbox to a new object.
     * @returns {BoundingBox} A clone of this instance
     */
    clone() {
        return new BoundingBox(this);
    }

    /**
     * Checks if any property on `this` is NaN.
     * @returns {Boolean}
     */
    isNaN() {
        return isNaN(this.left) || isNaN(this.top) || isNaN(this.right) || isNaN(this.bottom);
    }

    /**
     * Returns the width of `this`.
     * @returns {Number} width
     */
    getWidth() {
        return Math.abs(this.right - this.left);
    }

    /**
     * Returns the height of `this`.
     * @returns {Number} height
     */
    getHeight() {
        return Math.abs(this.bottom - this.top);
    }

    /**
     * Returns the size of `this`.
     * @returns {Vector} size
     */
    getSize() {
        return new Vector(this.getWidth(), this.getHeight());
    }

    /**
     * Returns the area of `this`.
     * @returns {Number} area
     */
    getArea() {
        return this.getWidth() * this.getHeight();
    }

    /**
     * Returns the position of `this`.
     * @returns {Vector} position
     */
    getPosition() {
        return new Vector(this.left, this.top);
    }

    /**
     * Resolve this object down to a {@link BoundingBox} instance.
     * Since this instance is already a boundingbox, it returns itself.
     * @returns {BoundingBox} self
     */
    getBoundingBox() {
        // We have this method, so any prototype in this script will return their bounding box,
        // and if they are one it will return itself.
        // This simplifies code, and prevents having to do a ton of checks.
        return this;
    }

    /**
     * Returns a {@link CollisionMesh} instance version of this boundingbox similar to:<br>
     * ```javascript
     * new CollisionMesh(BoundingBox)
     * ```
     * @returns {CollisionMesh}
     */
    getCollisionMesh() {
        return new CollisionMesh(this);
    }

    /**
     * Returns the center position of `this`.
     * @returns {Vector} position
     */
    getCenterPosition() {
        return new Vector(this.left + this.getWidth() / 2, this.top + this.getHeight() / 2);
    }

    /**
     * Returns `this` subtract `other`.
     * @param {BoundingBox}
     * @returns {Vector} position
     */
    difference(other) {
        if (!other) { throw new Error("difference requires argument 'other'"); }
        other = other.getBoundingBox();

        return new BoundingBox(this.left - other.left, this.top - other.top,
            this.right - other.right, this.bottom - other.bottom);
    }

    /**
     * Returns a position, which if `this` is set to, `this` will be centered on `other`.
     * @param {BoundingBox}
     * @returns {Vector} position
     */
    getCenteredOnPosition(other) {
        if (!other) { throw new Error("getCenteredOnPosition requires argument 'other'"); }
        other = other.getBoundingBox();

        return other.getCenterPosition().subtract(this.getCenterPosition().subtract(this.getPosition()));
    }

    /**
     * Returns the intersection between `this` and `other`.
     * This will return a {@link Vector} if they only intersect at a point.
     * This will return a {@link BoundingBox} if they intersect over an area or line.
     * This will return a undefined if they do not intersect.
     * @param {BoundingBox}
     * @returns {Vector|BoundingBox|undefined} intersection object
     */
    getIntersection(other) {
        if (!other) { throw new Error("getIntersection requires argument 'other'"); }
        other = other.getBoundingBox();

        let left = Math.max(this.left, other.left);
        let top = Math.max(this.top, other.top);
        let right = Math.min(this.right, other.right);
        let bottom = Math.min(this.bottom, other.bottom);

        if (left === right && top === bottom) {
            return new Vector(left, top);
        } else if (left <= right && top <= bottom) {
            return new BoundingBox(left, top, right, bottom);
        }
    }

    /**
     * Returns the squared distance between `this` and `other`.
     * @param {Vector}
     * @returns {Number} squared distance
     */
    getDistanceSquaredToPoint(other) {
        other = other.getVector();
        let cLeft = (other.left <= this.left ? this.left : (other.left >= this.right ? this.right : other.left));
        let cTop = (other.top <= this.top ? this.top : (other.top >= this.bottom ? this.bottom : other.top));
        let cPos = new Vector(cLeft, cTop);

        return cPos.distanceSquared(other);
    }

    /**
     * Returns the distance between `this` and `other`.
     * @param {Vector}
     * @returns {Number} distance
     */
    getDistanceToPoint(other) {
        return Math.sqrt(this.getDistanceSquaredToPoint(other));
    }

    /**
     * Sets `this`'s properties to `other`'s properties.
     * @param {BoundingBox}
     * @returns {BoundingBox} self
     */
    set(other) {
        if (!other) { throw new Error("set requires argument 'other'"); }
        other = other.getBoundingBox();

        this.left = other.left;
        this.top = other.top;
        this.right = other.right;
        this.bottom = other.bottom;
        return this;
    }

    /**
     * Move `this` to position at `left` and/or `top`.
     * @param {Number} [left=null]
     * @param {Number} [top=null]
     * @returns {BoundingBox} self
     */
    moveTo(left, top) {
        if (left && left.constructor === Number) {
            this.right = left + (this.right - this.left);
            this.left = left;
        }
        if (top && top.constructor === Number) {
            this.bottom = top + (this.bottom - this.top);
            this.top = top;
        }
        return this;
    }

    /**
     * Move `this` relatively to position by `deltaLeft` and/or `deltaTop`.
     * @param {Number} [deltaLeft=null]
     * @param {Number} [deltaTop=null]
     * @returns {BoundingBox} self
     */
    moveBy(deltaLeft, deltaTop) {
        if (deltaLeft && deltaLeft.constructor === Number) {
            this.left += deltaLeft;
            this.right += deltaLeft;
        }
        if (deltaTop && deltaTop.constructor === Number) {
            this.top += deltaTop;
            this.bottom += deltaTop;
        }
        return this;
    }

    /**
     * Resize `this` to size `width` and/or `height`, anchored at `anchor`.
     * @param {Number} [width=null]
     * @param {Number} [height=null]
     * @param {String} [anchor='top-left'] supports "top-left", "top-right", "bottom-left", or "bottom-right"
     * @returns {BoundingBox} self
     */
    resizeTo(width, height, anchor) {
        // NOTE: anchor supports "top-left", "top-right", "bottom-left", or "bottom-right". By default it is "top-left".
        // NOTE: anchor also supports being passed as a position. Allowing the resize anchor to be anywhere other than
        //       the predefined strings.
        let curSize = this.getSize();
        let newSize = new Vector(width || curSize.left, height || curSize.top);

        anchor = anchor || 'top-left';
        if (typeof anchor === 'string' || anchor instanceof String) {
            let anchorStr = anchor;

            anchor = this.getPosition();
            if (anchorStr.indexOf('right') >= 0) { anchor.left += curSize.left; }
            if (anchorStr.indexOf('bottom') >= 0) { anchor.top += curSize.top; }
        }

        this.left += (anchor.left - this.left) * (curSize.left - newSize.left) / curSize.left;
        this.right += (anchor.left - this.right) * (curSize.left - newSize.left) / curSize.left;
        this.top += (anchor.top - this.top) * (curSize.top - newSize.top) / curSize.top;
        this.bottom += (anchor.top - this.bottom) * (curSize.top - newSize.top) / curSize.top;
        return this;
    }

    /**
     * Determines if `this` encapsulates `other`.
     * @param {BoundingBox}
     * @returns {Boolean}
     */
    isContains(other) {
        if (!other) { throw new Error("isContains requires argument 'other'"); }
        other = other.getBoundingBox();

        return other.left >= this.left && other.right <= this.right &&
            other.top >= this.top && other.bottom <= this.bottom;
    }

    /**
     * Determines if `this` encapsulates at least one of `others`.
     * @param {BoundingBox[]}
     * @returns {Boolean}
     */
    someContains(others) {
        if (!others) { throw new Error("someContains requires argument 'others'"); }
        if (others.constructor !== Array) { throw new Error("someContains requires argument 'others' of type Array"); }

        for (let index = 0; index < others.length; index += 1) {
            if (this.isContains(others[index])) { return true; }
        }
        return false;
    }

    /**
     * Determines if `this` touches an edge of `other`, but does not intersect area.
     * @param {BoundingBox}
     * @returns {Boolean}
     */
    isTouching(other) {
        if (!other) { throw new Error("isTouching requires argument 'other'"); }
        other = other.getBoundingBox();

        return ((this.top <= other.bottom && this.bottom >= other.top) &&
                (this.left === other.right || this.right === other.left)) ||
                ((this.left <= other.right && this.right >= other.left) &&
                (this.top === other.bottom || this.bottom === other.top));
    }

    /**
     * If `this` touches one of `others`, but does not intersect area, then this returns the `this` edge name.
     * @param {BoundingBox[]}
     * @returns {String|undefined} edge name
     */
    getEdgeTouching(others) {
        if (!others) { throw new Error("getEdgeTouching requires argument 'others'"); }
        if (others.constructor !== Array) { others = [others]; }

        for (let index = 0; index < others.length; index += 1) {
            let other = others[index].getBoundingBox();

            if (this.top <= other.bottom && this.bottom >= other.top) {
                if (this.left === other.right) { return 'left'; }
                if (this.right === other.left) { return 'right'; }
            }
            if (this.left <= other.right && this.right >= other.left) {
                if (this.top === other.bottom) { return 'top'; }
                if (this.bottom === other.top) { return 'bottom'; }
            }
        }
    }

    /**
     * If `this` touches one of `others`, but does not intersect area, then this returns the `other` edge name.
     * @param {BoundingBox[]}
     * @returns {String|undefined} edge name
     */
    getOtherEdgeTouching(others) {
        if (!others) { throw new Error("getOtherEdgeTouching requires argument 'others'"); }
        if (others.constructor !== Array) { others = [others]; }

        for (let index = 0; index < others.length; index += 1) {
            let other = others[index].getBoundingBox();

            if (this.top <= other.bottom && this.bottom >= other.top) {
                if (this.left === other.right) { return 'right'; }
                if (this.right === other.left) { return 'left'; }
            }
            if (this.left <= other.right && this.right >= other.left) {
                if (this.top === other.bottom) { return 'bottom'; }
                if (this.bottom === other.top) { return 'top'; }
            }
        }
    }

    /**
     * Determines which edges of `this` is closest to `other`, returns all edges in sorted order by distance.
     * @param {BoundingBox}
     * @returns {String[]} edge names sorted from closest to furthest
     */
    getEdgeClosestOrder(other) {
        if (!other) { throw new Error("getEdgeClosest requires argument 'other'"); }
        other = other.getBoundingBox();
        let centerPos = this.getCenterPosition();
        let dis = [];

        dis.push({
            'edge': 'left',
            dis: other.getDistanceSquaredToPoint(this.left, centerPos.top)
        });
        dis.push({
            'edge': 'top',
            dis: other.getDistanceSquaredToPoint(centerPos.left, this.top)
        });
        dis.push({
            'edge': 'right',
            dis: other.getDistanceSquaredToPoint(this.right, centerPos.top)
        });
        dis.push({
            'edge': 'bottom',
            dis: other.getDistanceSquaredToPoint(centerPos.left, this.bottom)
        });
        dis.sort(function (a, b) {
            return a.dis - b.dis;
        });

        return dis.map(function (dis) { return dis.edge; });
    }

    /**
     * Determines which `this` edge is closest to `other`.
     * @param {BoundingBox}
     * @returns {String} edge name
     */
    getEdgeClosest(other) {
        let edges = this.getEdgeClosestOrder(other);

        return edges[0];
    }

    /**
     * Returns a vector representing the delta position to add to `this` to snap to `other`.<br>
     * Note: `snapDelta` may contain `NaN` for `left` or `right`
     * @param {BoundingBox}
     * @param {Number} [snapDistance=5] max distance to move `this`
     * @returns {Vector} snapDelta
     */
    getSnapDelta(other, snapDistance) {
        if (!other) { throw new Error("getSnapDelta requires argument 'other'"); }
        other = other.getBoundingBox();
        snapDistance = snapDistance || 5;

        let snapDelta = new Vector(NaN, NaN);

        if (this.top <= other.bottom && this.bottom >= other.top) {
            // Handle x-snap:
            const leftRightDis = minAbs(other.left - this.right, other.right - this.left);

            if (leftRightDis.abs <= snapDistance) { // this.LeftRightSnapTo(other)
                snapDelta.left = leftRightDis.min;

                // Handle y-subsnap:
                const topBottomDis = minAbs(other.top - this.top, other.bottom - this.bottom);

                if (topBottomDis.abs <= snapDistance) { // this.TopBottomSubSnapTo(other)
                    snapDelta.top = topBottomDis.min;
                }
            }
        } else if (this.left <= other.right && this.right >= other.left) {
            // Handle y-snap:
            const topBottomDis = minAbs(other.top - this.bottom, other.bottom - this.top);

            if (topBottomDis.abs <= snapDistance) { // this.TopBottomSnapTo(other)
                snapDelta.top = topBottomDis.min;

                // Handle x-subsnap:
                const leftRightDis = minAbs(other.left - this.left, other.right - this.right);

                if (leftRightDis.abs <= snapDistance) { // this.LeftRightSubSnapTo(other)
                    snapDelta.left = leftRightDis.min;
                }
            }
        }

        return snapDelta;
    }

    /**
     * Determines if `this` touches an edge of one of `others`, but does not intersect area.
     * @param {BoundingBox[]}
     * @returns {Boolean}
     */
    someTouching(others) {
        if (!others) { throw new Error("someTouching requires argument 'others'"); }
        if (others.constructor !== Array) { throw new Error("someTouching requires argument 'others' of type Array"); }

        for (let index = 0; index < others.length; index += 1) {
            if (this.isTouching(others[index])) { return true; }
        }
        return false;
    }

    /**
     * Determines if `this` intersects an area of `others`, not an edge.
     * @param {BoundingBox}
     * @returns {Boolean}
     */
    isColliding(other) {
        if (!other) { throw new Error("isColliding requires argument 'other'"); }
        other = other.getBoundingBox();

        return this.left < other.right && this.right > other.left && this.top < other.bottom && this.bottom > other.top;
    }

    /**
     * Determines if `this` intersects an area of one of `others`, not an edge.
     * @param {BoundingBox[]}
     * @returns {Boolean}
     */
    someColliding(others) {
        if (!others) { throw new Error("someColliding requires argument 'others'"); }
        if (others.constructor !== Array) { throw new Error("someColliding requires argument 'others' of type Array"); }

        for (let index = 0; index < others.length; index += 1) {
            if (this.isColliding(others[index])) { return true; }
        }
        return false;
    }

    /**
     * Returns which of `other` that `this` intersects an area of, not an edge.
     * @param {BoundingBox[]}
     * @returns {BoundingBox|undefined}
     */
    getColliding(others) {
        if (!others) { throw new Error("getColliding requires argument 'others'"); }
        if (others.constructor !== Array) { throw new Error("getColliding requires argument 'others' of type Array"); }

        for (let index = 0; index < others.length; index += 1) {
            if (this.isColliding(others[index])) { return others[index]; }
        }
    }
}

export default BoundingBox;
