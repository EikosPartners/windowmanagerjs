import BoundingBox from './BoundingBox';
import CollisionMesh from './CollisionMesh';

/**
 * A Vector class.
 */
class Vector {
    /**
     * @param {Number} left - The position of the vector's x-axis.
     * @param {Number} top - The position of the vector's y-axis.
     * @returns {Vector} An instance of Vector
     */
    constructor(left, top) {
        let obj = left;

        if (obj && obj.constructor !== Number) {
            // new Vector(obj)
            this.left = obj.left;
            this.top = obj.top;
        } else {
            // new Vector(left, top)
            this.left = left;
            this.top = top;
        }
    }

    /**
     * Clone the current vector to a new object.
     * @returns {Vector} A clone of this instance
     */
    clone() {
        return new Vector(this);
    }

    /**
     * Checks if any property on `this` is NaN.
     * @returns {Boolean}
     */
    isNaN() {
        return isNaN(this.left) || isNaN(this.top);
    }

    /**
     * Resolve this object down to a {@link Vector} instance.
     * Since this instance is already a vector, it returns itself.
     * @returns {Vector} self
     */
    getVector() {
        // We have this method, so any prototype in this script will return their position,
        // and if they are one it will return itself.
        // This simplifies code, and prevents having to do a ton of checks.
        return this;
    }

    /**
     * Returns a BoundingBox instance version of this vector similar to:<br>
     * ```javascript
     * new BoundingBox(Vector.left, Vector.top, Vector.left, Vector.top)
     * ```
     * @returns {BoundingBox}
     */
    getBoundingBox() {
        // We have this method, so any prototype in this script will return their position,
        // and if they are one it will return itself.
        // This simplifies code, and prevents having to do a ton of checks.
        return new BoundingBox(this.left, this.top, this.left, this.top);
    }

    /**
     * Returns a {@link CollisionMesh} instance version of this vector similar to:<br>
     * ```javascript
     * new CollisionMesh(Vector.getBoundingBox())
     * ```
     * @returns {CollisionMesh}
     */
    getCollisionMesh() {
        return new CollisionMesh(this.getBoundingBox());
    }

    /**
     * Returns the squared distance between `this` and `other`.
     * @param {Vector}
     * @returns {Number}
     */
    distanceSquared(other) {
        let diff = other.subtract(this);

        return diff.left * diff.left + diff.top * diff.top;
    }

    /**
     * Returns the distance between `this` and `other`.
     * @param {Vector}
     * @returns {Number}
     */
    distance(other) {
        return Math.sqrt(this.distanceSquared(other));
    }

    /**
     * Sets `this.left` to `other.left`, and sets `this.top` to `other.top`.
     * @param {Vector}
     * @returns {Vector} self
     */
    set(other) {
        if (!other) { throw new Error("set requires argument 'other'"); }
        other = other.getVector();

        this.left = other.left;
        this.top = other.top;
        return this;
    }

    /**
     * Move `this` to position at `left` and/or `top`.
     * @param {Number} [left=null]
     * @param {Number} [top=null]
     * @returns {Vector} self
     */
    moveTo(left, top) {
        if (left && left.constructor === Number) { this.left = left; }
        if (top && top.constructor === Number) { this.top = top; }
        return this;
    }

    /**
     * Move `this` relatively to position by `deltaLeft` and/or `deltaTop`.
     * @param {Number} [deltaLeft=null]
     * @param {Number} [deltaTop=null]
     * @returns {Vector} self
     */
    moveBy(deltaLeft, deltaTop) {
        if (deltaLeft && deltaLeft.constructor === Number) { this.left = deltaLeft; }
        if (deltaTop && deltaTop.constructor === Number) { this.top = deltaTop; }
        return this;
    }

    /**
     * Sets `this`'s properties if `other`'s is smaller.
     * @param {Vector}
     * @returns {Number}
     */
    setMin(other) {
        if (!other) { throw new Error("setMin requires argument 'other'"); }
        other = other.getVector();

        if (Math.abs(other.left) < Math.abs(this.left) || isNaN(this.left)) { this.left = other.left; }
        if (Math.abs(other.top) < Math.abs(this.top) || isNaN(this.top)) { this.top = other.top; }
    }

    /**
     * Sets `this`'s properties if `other`'s is larger.
     * @param {Vector}
     * @returns {Number}
     */
    setMax(other) {
        if (!other) { throw new Error("setMax requires argument 'other'"); }
        other = other.getVector();

        if (Math.abs(other.left) > Math.abs(this.left) || isNaN(this.left)) { this.left = other.left; }
        if (Math.abs(other.top) > Math.abs(this.top) || isNaN(this.top)) { this.top = other.top; }
    }

    /**
     * Add `other` to `this`.
     * @param {Vector}
     * @returns {Number}
     */
    add(other) {
        if (!other) { throw new Error("add requires argument 'other'"); }
        other = other.getVector();

        this.left += other.left;
        this.top += other.top;
        return this;
    };

    /**
     * Subtract `other` from `this`.
     * @param {Vector}
     * @returns {Number}
     */
    subtract(other) {
        if (!other) { throw new Error("subtract requires argument 'other'"); }
        other = other.getVector();

        this.left -= other.left;
        this.top -= other.top;
        return this;
    }
}

export default Vector;
