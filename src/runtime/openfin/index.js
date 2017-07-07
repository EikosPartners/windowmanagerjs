/* global fin */
import windowmanager from './global';
import Window from './Window';
import { CollisionMesh, BoundingBox } from '../../geometry/index';

const APP_UUID = 'app_uuid';

windowmanager.monitors = new CollisionMesh([]);

function updateMonitors(monitorInfo) {
    let boxes = [];

    // Add the primary monitor:
    boxes.push(new BoundingBox(monitorInfo.primaryMonitor.monitorRect));

    // Add the secondary monitors:
    for (const monitor in monitorInfo.nonPrimaryMonitors) {
        boxes.push(new BoundingBox(monitor.monitorRect));
    }

    // Update monitors CollisionMesh:
    windowmanager.monitors.boxes = boxes;
}

// Set up system to update monitors:
fin.desktop.System.getMonitorInfo(updateMonitors);
fin.desktop.System.addEventListener('monitor-info-changed', updateMonitors);

windowmanager.messagebus = (() => {
    let wrappedListeners = {};
    let windowWrappedListeners = {};

    function wrapListener(listener) {
        return (message) => {
            const window = Window.getByID(message.winID);

            // Don't execute listeners when the sender is the same as the listener:
            if (window._id === Window.current._id) { return; }

            listener.apply(window, message.args);
            // TODO: Send response if response is expected
        };
    }

    return {
        send: (eventName, ...args) => {
            // TODO: Check if ready? Dunno if needed
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
                if (window._id === curWin._id) { return; }

                fin.desktop.InterApplicationBus.send(Window.current._window[APP_UUID], window._id,
                    eventName, message);
            } else {
                // TODO: Possibly switch the below out for a loop through all windows?
                fin.desktop.InterApplicationBus.send(Window.current._window[APP_UUID], eventName, message);
            }
        },
        on: (eventName, window, listener) => {
            if (listener === undefined) {
                listener = window;
                window = undefined;
            }

            const onMessage = wrapListener(listener);

            if (window !== undefined) {
                // Don't execute listeners when the sender is the same as the listener:
                if (window._id === Window.current._id) { return; }

                const winLisGroup = (windowWrappedListeners[window._id] = windowWrappedListeners[window._id] || {});

                winLisGroup[eventName] = winLisGroup[eventName] || new Map();
                winLisGroup[eventName].set(listener, onMessage);
                fin.desktop.InterApplicationBus.subscribe(Window.current._window[APP_UUID], window._id,
                    eventName, onMessage);
                // TODO: On window close, clear subscriptions in windowWrappedListeners!
            } else {
                wrappedListeners[eventName] = wrappedListeners[eventName] || new Map();
                wrappedListeners[eventName].set(listener, onMessage);
                fin.desktop.InterApplicationBus.subscribe(Window.current._window[APP_UUID], eventName, onMessage);
            }
        },
        off: (eventName, window, listener) => {
            if (listener === undefined) {
                listener = window;
                window = undefined;
            }

            if (window !== undefined) {
                const winLisGroup = (windowWrappedListeners[window._id] = windowWrappedListeners[window._id] || {});

                winLisGroup[eventName] = winLisGroup[eventName] || new Map();
                // delete on a Map returns the deleted value (desired onMessage):
                fin.desktop.InterApplicationBus.unsubscribe(Window.current._window[APP_UUID], window._window._id,
                    eventName, winLisGroup[eventName].delete(listener));
            } else {
                wrappedListeners[eventName] = wrappedListeners[eventName] || new Set();
                // delete on a Map returns the deleted value (desired onMessage):
                fin.desktop.InterApplicationBus.unsubscribe(Window.current._window[APP_UUID], eventName,
                    wrappedListeners[eventName].delete(listener));
            }
        }
    };
})();
