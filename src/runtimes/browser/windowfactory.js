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

    let messagebus = {
        sendTo: (window, eventName, ...args) => {
            console.log(...args);
            window.sendTo(eventName, ...args);
        },
        sendToAll: (eventName, ...args) => {
            console.log(...args);
        },
        receive: (eventName, listener) => {
            console.log(eventName, listener);
        }
    };

    Object.assign(windowfactory, {
        onReady: onReady,
        isReady: () => { return isReady; },
        runtime: windowfactory.browserRuntime,
        runtimeVersion: windowfactory.browserVersion,
        messagebus: messagebus
    });
})();
