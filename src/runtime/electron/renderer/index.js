import windowmanager from '../global';
import readySync from '../../ready';
import Window from './Window';
import { CollisionMesh, BoundingBox } from '../../../geometry/index';
const { ipcRenderer, screen } = window.nodeRequire('electron');

windowmanager.monitors = new CollisionMesh([]);

function updateMonitors() {
    const displays = screen.getAllDisplays();
    let boxes = [];

    // Add monitors:
    (displays || []).forEach((display) => {
        boxes.push(new BoundingBox(display.bounds.x, display.bounds.y,
            display.bounds.x + display.bounds.width,
            display.bounds.y + display.bounds.height));
    });

    // Update monitors CollisionMesh:
    windowmanager.monitors.boxes = boxes;
}

// Set up system to update monitors:
updateMonitors();
screen.on('display-added', updateMonitors);
screen.on('display-removed', updateMonitors);
screen.on('display-metrics-changed', updateMonitors);

windowmanager.messagebus = (() => {
    // TODO: Optimize Electron's messagebus by keeping track of listeners
    //       in the main process for early termination.
    // TODO: Listener cleanup on this window, or other window close.
    // TODO: Use a custom eventName, so to not collide with current ones.
    let wrappedListeners = {};
    let windowWrappedListeners = {};

    function wrapListener(window, listener) {
        return (_, message) => {
            // If listener only listens from a specific window, check that this message is from that window:
            if (window && window._id !== message.winID) { return; }

            const fromWindow = windowmanager.Window.getByID(message.winID);

            // Don't execute listeners when the sender is the same as the listener:
            if (fromWindow._id === windowmanager.Window.current._id) { return; }

            listener.apply(fromWindow, message.args);
            // TODO: Send response if response is expected
        };
    }

    return {
        send: (eventName, ...args) => {
            const curWin = windowmanager.Window.current;
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

                window._window.webContents.send(eventName, message);
            } else {
                for (const window of windowmanager.Window.getAll()) {
                    if (window !== curWin) {
                        window._window.webContents.send(eventName, message);
                    }
                }
            }
        },
        on: (eventName, window, listener) => {
            if (listener === undefined) {
                listener = window;
                window = undefined;
            }

            const onMessage = wrapListener(window, listener);

            if (window !== undefined) {
                // Don't execute listeners when the sender is the same as the listener:
                if (window._id === windowmanager.Window.current._id) { return; }

                const winLisGroup = (windowWrappedListeners[window._id] = windowWrappedListeners[window._id] || {});

                winLisGroup[eventName] = winLisGroup[eventName] || new Map();
                winLisGroup[eventName].set(listener, onMessage);
                // TODO: On window close, clear subscriptions in windowWrappedListeners!
            } else {
                wrappedListeners[eventName] = wrappedListeners[eventName] || new Map();
                wrappedListeners[eventName].set(listener, onMessage);
            }
            ipcRenderer.on(eventName, onMessage);
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
                ipcRenderer.removeListener(eventName, winLisGroup[eventName].delete(listener));
            } else {
                wrappedListeners[eventName] = wrappedListeners[eventName] || new Set();
                // delete on a Map returns the deleted value (desired onMessage):
                ipcRenderer.removeListener(eventName, wrappedListeners[eventName].get(listener));
            }
        }
    };
})();

readySync._deref();
