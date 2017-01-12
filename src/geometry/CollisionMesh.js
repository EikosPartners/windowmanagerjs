import Vector from './Vector';
import BoundingBox from './BoundingBox';

/**
 * A CollisionMesh class.
 */
class CollisionMesh {
    /**
     * @param {BoundingBox[]} boxes - An array of objects thatg resolve to BoundingBox.
     */
    constructor(boxes, opts = {}) {
        if (!boxes) { throw new Error('CollisionMesh constructor requires argument \'boxes\''); }
        if (boxes.constructor !== Array) { boxes = [boxes]; }
        this.boxes = [];

        for (let box of boxes) {
            if (box.constructor === BoundingBox) {
                this.boxes.push(box);
            } else if (box.constructor === CollisionMesh) {
                this.boxes = this.boxes.concat(box.boxes);
            } else {
                this.boxes = this.boxes.concat(box.getCollisionMesh(opts).boxes);
            }
        }
    }

    /**
     * Clone the current collisionmesh to a new object.
     * @returns {CollisionMesh} A clone of this instance
     */
    clone() {
        let boxes = new Array(this.boxes.length);

        for (let index = 0; index < this.boxes.length; index += 1) {
            boxes[index] = this.boxes[index].clone();
        }

        return new CollisionMesh(boxes);
    }

    /**
     * Returns the width of `this`.
     * @returns {Number} width
     */
    getWidth() {
        if (this.boxes.length === 0) { return 0; }
        let left = this.boxes[0].left;
        let right = this.boxes[0].right;

        for (let index = 1; index < this.boxes.length; index += 1) {
            // This assumes left is least, and right is most in terms of value:
            left = Math.min(left, this.boxes[index].left);
            right = Math.max(right, this.boxes[index].right);
        }

        return right - left;
    }

    /**
     * Returns the height of `this`.
     * @returns {Number} height
     */
    getHeight() {
        if (this.boxes.length === 0) { return 0; }

        let top = this.boxes[0].top;
        let bottom = this.boxes[0].bottom;

        for (let index = 1; index < this.boxes.length; index += 1) {
            // This assumes top is least, and bottom is most in terms of value:
            top = Math.min(top, this.boxes[index].top);
            bottom = Math.max(bottom, this.boxes[index].bottom);
        }

        return bottom - top;
    }

    /**
     * Returns the size of `this`.
     * @returns {Vector} size
     */
    getSize() {
        return this.getBoundingBox().getSize();
    }

    /**
     * Returns the position of `this`.
     * @returns {Vector} position
     */
    getPosition() {
        return this.getBoundingBox().getPosition();
    }

    /**
     * Returns a BoundingBox instance version of this collisionmesh, which encapsulates all of it's internal boxes.
     * @returns {BoundingBox}
     */
    getBoundingBox() {
        if (this.boxes.length === 0) { return new BoundingBox(NaN, NaN, NaN, NaN); }

        let box = this.boxes[0].clone();

        for (let index = 1; index < this.boxes.length; index += 1) {
            box.left = Math.min(box.left, this.boxes[index].left);
            box.top = Math.min(box.top, this.boxes[index].top);
            box.right = Math.max(box.right, this.boxes[index].right);
            box.bottom = Math.max(box.bottom, this.boxes[index].bottom);
        }

        return box;
    }

    /**
     * Resolve this object down to a {@link CollisionMesh} instance.
     * Since this instance is already a collisionmesh, it returns itself.
     * @returns {CollisionMesh} self
     */
    getCollisionMesh() {
        return this;
    }

    /**
     * Move `this` to position at `left` and/or `top`.
     * @param {Number} [left=null]
     * @param {Number} [top=null]
     * @returns {BoundingBox} self
     */
    moveTo(left, top) {
        let newPosition = new Vector(left, top);

        this.moveBy(newPosition.subtract(this.getPosition()));
        return this;
    }

    /**
     * Move `this` relatively to position by `deltaLeft` and/or `deltaTop`.
     * @param {Number} [deltaLeft=null]
     * @param {Number} [deltaTop=null]
     * @returns {BoundingBox} self
     */
    moveBy(left, top) {
        let newPosition = new Vector(left || 0, top || 0);

        for (let box of this.boxes) {
            box.moveBy(newPosition);
        }
        return this;
    }

    /**
     * Determines if `this` encapsulates all of `other`.
     * @param {CollisionMesh|BoundingBox[]}
     * @returns {Boolean}
     */
    isContains(other) {
        if (!other) { throw new Error('isContains requires argument \'other\''); }
        other = (other.constructor === Array ? new CollisionMesh(other) : other.getCollisionMesh());

        for (const otherBox of other.boxes) {
            let contained = false;

            for (const thisBox of this.boxes) {
                contained |= thisBox.isContains(otherBox);
            }

            if (!contained) { return false; }
        }

        return true;
    }

    /**
     * Determines if `this` encapsulates at least one of `other`.
     * @param {CollisionMesh|BoundingBox[]}
     * @returns {Boolean}
     */
    someContains(other) {
        if (!other) { throw new Error('someContains requires argument \'other\''); }
        other = (other.constructor === Array ? new CollisionMesh(other) : other.getCollisionMesh());

        for (const box of this.boxes) {
            if (box.someContains(other.boxes)) { return true; }
        }
        return false;
    }

    /**
     * Determines if `this` touches an edge of `other`, but does not intersect area.
     * @param {CollisionMesh|BoundingBox[]}
     * @returns {Boolean}
     */
    isTouching(other) {
        if (!other) { throw new Error('isTouching requires argument \'other\''); }
        other = (other.constructor === Array ? new CollisionMesh(other) : other.getCollisionMesh());

        for (const box of this.boxes) {
            if (box.someTouching(other.boxes)) { return true; }
        }
        return false;
    }

    /**
     * Determines if `this` touches an edge of one of `others`, but does not intersect area.
     * @param {CollisionMesh[]}
     * @returns {Boolean}
     */
    someTouching(others) {
        if (!others) { throw new Error('someTouching requires argument \'others\''); }
        if (others.constructor !== Array) {
            throw new Error('someTouching requires argument \'others\' to resolve to type Array');
        }

        for (const other of others) {
            if (this.isTouching(other)) { return true; }
        }
        return false;
    }

    /**
     * Determines if `this` intersects an area of `other`, not an edge.
     * @param {CollisionMesh|BoundingBox[]}
     * @returns {Boolean}
     */
    isColliding(other) {
        if (!other) { throw new Error('isColliding requires argument \'other\''); }
        other = (other.constructor === Array ? new CollisionMesh(other) : other.getCollisionMesh());

        for (const box of this.boxes) {
            if (box.someColliding(other.boxes)) { return true; }
        }
        return false;
    }

    /**
     * Determines if `this` intersects an area of one of `others`, not an edge.
     * @param {CollisionMesh[]}
     * @returns {Boolean}
     */
    someColliding(others) {
        if (!others) { throw new Error('someColliding requires argument \'others\''); }
        if (others.constructor !== Array) {
            throw new Error('someColliding requires argument \'others\' to resolve to type Array');
        }

        for (const other of others) {
            for (const box of this.boxes) {
                if (box.isColliding(other)) { return true; }
            }
        }
        return false;
    }

    /**
     * Returns which box of `other` that `this` intersects an area of, not an edge.
     * @param {CollisionMesh|BoundingBox[]}
     * @returns {BoundingBox|undefined}
     */
    getColliding(other) {
        if (!other) { throw new Error('getColliding requires argument \'other\''); }
        other = (other.constructor === Array ? new CollisionMesh(other) : other.getCollisionMesh());

        for (let box of this.boxes) {
            let collided = box.getColliding(other.boxes);

            if (collided) { return collided; }
        }
    }
}

export default CollisionMesh;
