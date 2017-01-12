import windowmanager from '../global';
import { SyncCallback } from '../utils/index';

let callbacks = [];
let isReady = false;

/**
 * Executes callback when windowmanager is ready.
 * @memberof windowmanager
 * @method
 * @param {callback}
 */
windowmanager.onReady = function (callback) {
    // Check if callback is not a function:
    if (!(callback && callback.constructor && callback.call && callback.apply)) {
        throw new Error('onReady expects a function passed as the callback argument!');
    }

    // Check if already ready:
    if (isReady) { callback(); }

    // Check to see if callback is already in callbacks:
    if (callbacks.indexOf(callback) >= 0) { return; }

    callbacks.push(callback);
};

/**
 * Returns if windowmanager is ready.
 * @memberof windowmanager
 * @method
 * @returns {Boolean}
 */
windowmanager.isReady = () => {
    return isReady;
};

export default new SyncCallback(function () {
    isReady = true;
    for (const callback of callbacks) { callback(); }
    callbacks = [];
});
