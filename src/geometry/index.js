// TODO: Rewrite in class form, so can make use of get/set, and private.
// TODO: Add asVector, asBoundingBox, asCollisionMesh to all classes (as a get),
//       to easily coerce types!
// TODO: Rewrite the classes to have more simplified functions (don't have complex
//       functions that have very specific purposes).
// TODO: Add proper argument checking! Not all methods have checks!
import Vector from './Vector';
import BoundingBox from './BoundingBox';
import CollisionMesh from './CollisionMesh';

/**
 * A library to handler geometry calculations.
 * @namespace
 * @alias geometry
 * @property {BoundingBox} - boundingbox class
 * @property {CollisionMesh} - collisionmesh class
 * @property {Position} - alias of Vector
 * @property {Size} - alias of Vector
 * @property {Vector} - vector class
 */
export default {
    BoundingBox,
    CollisionMesh,
    /**
     * A Position object. Alias of {@link Vector}.
     * @class
     * @alias Position
     * @see {@link Vector} for further information.
     */
    Position: Vector,
    /**
     * A Size object. Alias of {@link Vector}.
     * @class
     * @alias Size
     * @see {@link Vector} for further information.
     */
    Size: Vector,
    Vector
};
