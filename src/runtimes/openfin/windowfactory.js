/*global windowfactory,fin*/
(function () {
    if (!windowfactory._isRenderer || windowfactory._isBackend || !windowfactory.runtime.isOpenFin) { return; }

    const Window = windowfactory.Window;
    const APP_UUID = "app_uuid";
    let readyCallbacks = [];
    let isReady = false;

    function onReady(callback) {
        // Check if callback is not a function:
        if (!(callback && callback.constructor && callback.call && callback.apply)) {
            throw "onReady expects a function passed as the callback argument!";
        }

        // Check if already ready:
        if (isReady) { callback(); }

        // Check to see if callback is already in readyCallbacks:
        if (readyCallbacks.indexOf(callback) >= 0) { return; }

        readyCallbacks.push(callback);
    }

    function ready() {
        Window.current._window.addEventListener("focused", function () {
            Window.current.bringToFront();
        });
        Window.current._window.addEventListener("restored", function () {
            for (let other of Window.current._dockedGroup) {
                if (other !== Window.current) {
                    other._window.restore();
                }
            }
        });

        isReady = true;
        for (let index = 0; index < readyCallbacks.length; index += 1) {
            readyCallbacks[index]();
        }
        readyCallbacks = [];
    }

    windowfactory._openfinOnReady(function () {
        // Setup handlers on this window:
        let wX = 0;
        let wY = 0;
        let dragging = false;
        //let titlebarEl = document.querySelector("titlebar");

        window.addEventListener("mousedown", function (event) {
            if (event.target.classList && event.target.classList.contains("window-drag")) {
                dragging = true;
                wX = event.screenX;
                wY = event.screenY;
                Window.current._dragStart();
            }
        });

        window.addEventListener("mousemove", function (event) {
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
        const checkReadyInterval = setInterval(function () {
            if (Window.current && windowfactory.runtime.version !== undefined) {
                clearInterval(checkReadyInterval);
                ready();
            }
        }, 5);
    });

    const messagebus = (() => {
        let wrappedListeners = {};
        let windowWrappedListeners = {};

        function wrapListener(listener) {
            return (message) => {
                const window = windowfactory.Window.getByID(message.winID);
                const response = listener.apply(window, message.args);
                // TODO: Send response if response is expected
            };
        }

        return {
            send: (eventName, ...args) => {
                // TODO: Check if ready? Dunno if needed
                const curWin = windowfactory.Window.current;
                const message = {
                    id: 0, // TODO: Randomly generate a unique id to avoid collision!
                    winID: curWin._id,
                    event: eventName,
                    args: args // If the first arg is a window, it gets removed later.
                };
                if (args.length > 0 && args[0] instanceof Window) {
                    // Remove window from args in message:
                    const window = args.shift(); // args is by reference in message currently
                    fin.desktop.InterApplicationBus.send(Window.current._window[APP_UUID], window._id,
                                                         eventName, message);
                } else {
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

    Object.assign(windowfactory, {
        onReady: onReady,
        isReady: () => { return isReady; },
        messagebus: messagebus
    });
})();
