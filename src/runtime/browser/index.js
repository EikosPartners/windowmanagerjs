import windowmanager from './global';
import readySync from '../ready';
import Window from './Window';
import { CollisionMesh, BoundingBox } from '../../geometry/index';
import Layout from './Layout/Layout';

/**
 * Contains the monitor space.
 * @type {CollisionMesh}
 */
windowmanager.monitors = new CollisionMesh([]);

function updateMonitors() {
    // Update monitors CollisionMesh with the primary "fake" monitor:
    windowmanager.monitors.boxes = [new BoundingBox(0, 0,
        Math.max(document.documentElement.clientWidth, window.innerWidth || 0),
        Math.max(document.documentElement.clientHeight, window.innerHeight || 0))];
}

// Set up system to update monitors:
updateMonitors();
window.addEventListener('resize', updateMonitors);

/**
 * Add layout to windowmanager object.
 */
windowmanager.Layout = Layout;

/**
 * Message bus for application.
 * @namespace
 * @alias messagebus
 */
windowmanager.messagebus = (() => {
    // TODO: Utilize iframe communication? Or use messagebus that is currently shared in setup.js?
    let wrappedListeners = {};
    let windowWrappedListeners = {};

    window.addEventListener('message', function (event) {
        const message = event.data;
        const win = Window.getByID(message.winID);

        // Don't execute listeners when the sender is the same as the listener:
        if (win && win._id === Window.current._id) { return; }

        if (windowWrappedListeners[message.event] != null) {
            // Check to see if the called window is being listened to directly:
            if (windowWrappedListeners[message.event][message.winID] != null) {
                for (const listener of windowWrappedListeners[message.event][message.winID]) {
                    listener.apply(win, message.args); // TODO: Make apply's this point to window who sent messsage
                }
            }
        }
        if (wrappedListeners[message.event] != null) {
            for (const listener of wrappedListeners[message.event]) {
                listener.apply(win, message.args); // TODO: Make apply's this point to window who sent messsage
            }
        }
    }, false);

    return {
        /**
         * @method
         * @alias messagebus.send
         * @param {String} eventName - the event to send to
         * @param {Window} [window=undefined] - the target window to send to (if not specified, sends to all windows)
         * @param {...*} args Arguments to send to listeners
         */
        send: (eventName, ...args) => {
            // TODO: Check if ready? Dunno if needed
            // TODO: Do we need to add a way to identify if a return is needed?
            const curWin = Window.current;
            const message = {
                id: 0, // TODO: Randomly generate a unique id to avoid collision!
                winID: curWin._id,
                event: eventName,
                args: args // If the first arg is a window, it gets removed later.
            };

            if (args.length > 0 && args[0] instanceof Window) {
                // Remove window from args in message:
                const window = args.shift(); // args is by reference in message currently

                // Don't execute listeners when the sender is the same as the listener:
                if (window && window._id === curWin._id) { return; }
                // TODO: Save the id of message so we can get the response
                window._window.contentWindow.postMessage(message, '*');
            } else {
                for (const window of windowmanager._windows.values()) {
                    if (curWin !== window) { // Don't send to current window
                        window._window.contentWindow.postMessage(message, '*');
                    }
                }
            }
        },
        /**
         * @method
         * @alias messagebus.on
         * @param {String} eventName - the event to listen to
         * @param {Window} [window=undefined] - the window to listen to events from (if null, listens to all windows)
         * @param {Function} listener - the callback function to call when event is triggered for this window
         */
        on: (eventName, window, listener) => {
            if (listener === undefined) {
                listener = window;
                window = undefined;
            }

            if (window !== undefined) {
                // Don't execute listeners when the sender is the same as the listener:
                if (window._id === Window.current._id) { return; }
                // Replace window.name with some way to identify the unique window
                const winLisGroup = (windowWrappedListeners[window._id] = windowWrappedListeners[window._id] || {});

                winLisGroup[eventName] = winLisGroup[eventName] || new Set();
                winLisGroup[eventName].add(listener);
                // TODO: On window close, clear subscriptions in windowWrappedListeners!
            } else {
                wrappedListeners[eventName] = wrappedListeners[eventName] || new Set();
                wrappedListeners[eventName].add(listener);
            }
        },
        /**
         * @method
         * @alias messagebus.off
         * @param {String} eventName - the event to remove listener from
         * @param {Window} [window=undefined] - the window to listen to events from (if null, listens to all windows)
         * @param {Function} listener - the callback function to call when event is triggered for this window
         */
        off: (eventName, window, listener) => {
            if (listener === undefined) {
                listener = window;
                window = undefined;
            }

            if (window !== undefined) {
                // Replace window.name with some way to identify the unique window
                const winLisGroup = (windowWrappedListeners[window._id] = windowWrappedListeners[window._id] || {});

                winLisGroup[eventName] = winLisGroup[eventName] || new Set();
                winLisGroup[eventName].delete(listener);
            } else {
                wrappedListeners[eventName] = wrappedListeners[eventName] || new Set();
                wrappedListeners[eventName].delete(listener);
            }
        }
    };
})();

// Notify everyone that windowmanager is setup for this window:
readySync._deref();
