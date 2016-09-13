/*global windowfactory,fin*/
(function () {
    if (!windowfactory.isRenderer || windowfactory.isBackend || !windowfactory.browserVersion) { return; }

    const Window = windowfactory.Window;
    let readyCallbacks = [];
    let isReady = true;

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
        isReady = true;
        for (let index = 0; index < readyCallbacks.length; index += 1) {
            readyCallbacks[index]();
        }
        readyCallbacks = [];
    }

    if (!windowfactory.isLauncher) {
        // Setup handlers on this window:
        let wX = 0;
        let wY = 0;
        let dragging = false;

        window.addEventListener("focus", function () {
            Window.current.bringToFront();
        });

        window.addEventListener("mousedown", function (e) {
            if (e.target.classList.contains("window-drag")) {
                dragging = true;
                wX = event.screenX;
                wY = event.screenY;
                Window.current._dragStart();
            }
        });

        window.addEventListener("mousemove", function (e) {
            if (dragging) {
                //Window.current.moveTo(event.screenX - wX, event.screenY - wY);
                Window.current._dragBy(event.screenX - wX, event.screenY - wY);
            }
        });

        window.addEventListener("mouseup", function () {
            dragging = false;
            Window.current._dragStop();
        });
    }

    const messagebus = (() => {
        // TODO: Utilize iframe communication? Or use messagebus that is currently shared in setup.js?
        let wrappedListeners = {};
        let windowWrappedListeners = {};

        function wrapListener(listener) {
            return (message) => {
                // TODO: Determine who sent it
                const window = null;
                message = JSON.parse(message); // TODO: Should this be in a try/except?
                const response = listener.apply(window, message.data);
                // TODO: Send response if response is expected
            };
        }

        return {
            send: (eventName, ...args) => {
                // TODO: Check if ready? Dunno if needed
                // TODO: Do we need to add a way to identify if a return is needed?
                if (args.length > 0 && args[0] instanceof Window) {
                    const window = args.unshift();
                    const message = {
                        id: 0, // TODO: Randomly generate a unique id to avoid collision!
                        event: eventName,
                        // TODO: Add way for receiver to know what window sent this
                        data: args
                    };
                    // TODO: Save the id of message so we can get the response
                    window._window.contentWindow.postMessage(message, "*");
                } else {
                    const message = {
                        event: eventName,
                        // TODO: Add way for receiver to know what window sent this
                        data: args
                    };

                    for (const window of windowfactory._windows) {
                        window._window.contentWindow.postMessage(message, "*");
                    }
                }
            },
            on: (eventName, window, listener) => {
                if (listener === undefined) {
                    listener = window;
                    window = undefined;
                }

                const onMessage = wrapListener(listener);

                if (window !== undefined) {
                    // Replace window.name with some way to identify the unique window
                    const winLisGroup = (windowWrappedListeners[window.name] = windowWrappedListeners[window.name] || {});
                    winLisGroup[eventName] = winLisGroup[eventName] || new Set();
                    winLisGroup[eventName].add(listener);
                    // TODO: On window close, clear subscriptions in windowWrappedListeners!
                } else {
                    wrappedListeners[eventName] = wrappedListeners[eventName] || new Set();
                    wrappedListeners[eventName].add(listener);
                }
            },
            off: (eventName, window, listener) => {
            }
        };
    })();

    Object.assign(windowfactory, {
        onReady: onReady,
        isReady: () => { return isReady; },
        runtime: windowfactory.browserRuntime,
        runtimeVersion: windowfactory.browserVersion,
        //messagebus: messagebus
    });
})();
