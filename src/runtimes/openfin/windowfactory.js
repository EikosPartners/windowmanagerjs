/*global windowfactory,fin*/
(function () {
    if (!windowfactory.isRenderer || windowfactory.isBackend || !windowfactory.openfinVersion) { return; }

    const Window = windowfactory.Window;
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

        // TODO: Rewrite to remove setTimeout for the following:
        function checkReady() {
            if (Window.current && windowfactory.openfinVersion !== "pending") {
                windowfactory.runtimeVersion = windowfactory.openfinVersion;
                ready();
            } else {
                setTimeout(checkReady, 5);
            }
        }
        checkReady();
    });

    const messagebus = (() => {
        let wrappedListeners = new Map();

        function wrapListener(listener) {
            return (message) => {
                // TODO: Determine who sent it
                const window = null;
                const response = listener.apply(window, JSON.parse(message));
                // TODO: Send response if response is expected
            };
        }

        return {
            send: (eventName, ...args) => {
                // TODO: Check if ready? Dunno if needed
                if (args.length > 0 && args[0] instanceof Window) {
                    const window = args.unshift();
                    fin.desktop.InterApplicationBus.send(Window.current._window.app_uuid, window._window.name, eventName, JSON.stringify(args));
                } else {
                    fin.desktop.InterApplicationBus.send(Window.current._window.app_uuid, eventName, JSON.stringify(args));
                }
            },
            on: (eventName, window, listener) => {
                if (listener == null) {
                    listener = window;
                    window = undefined;
                }

                if (window != null) {
                    fin.desktop.InterApplicationBus.subscribe(Window.current._window.app_uuid, window._window.name, eventName, onMessage);
                } else {
                    fin.desktop.InterApplicationBus.subscribe(Window.current._window.app_uuid, eventName, onMessage);
                }
            },
            once: (eventName, listener) => {
                fin.desktop.InterApplicationBus.subscribe(Window.current._window.app_uuid, eventName, function (message) {
                    const window = null; // TODO: Get the window who sent this
                    const response = listener(window, ...JSON.parse(message));
                });
            }
        };
    })();

    Object.assign(windowfactory, {
        onReady: onReady,
        isReady: () => { return isReady; },
        runtime: "OpenFin",
        runtimeVersion: windowfactory.openfinVersion,
        messagebus: messagebus
    });
})();
