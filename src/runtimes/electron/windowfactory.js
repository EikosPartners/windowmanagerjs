/*global windowfactory,nodeRequire*/
(function () {
    if (!windowfactory.isRenderer || windowfactory.isBackend || !windowfactory.electronVersion) { return; }

    const Window = windowfactory.Window;
    const remote = nodeRequire("electron").remote;
    let readyCallbacks = [];
    let isReady = true;
    let allWindows = {};

    function registerWindow(window) {
        // Register window:
        allWindows[window.id] = window;

        // Generate function for onclose:
        function _removeWindowEvent() {
            delete allWindows[window.id];
        }

        // Register onclose event handler:
        window.on("close", _removeWindowEvent);

        // If currentWindow closes before the above handler is called, remove handler to prevent leak:
        Window.current._window.on("close", function () {
            window.off("close", _removeWindowEvent);
        });
    }

    //remote.BrowserWindow.getAllWindows().forEach(registerWindow);

    function _newWindowEvent(event, window) {
        registerWindow(window);
    }
    //remote.app.on("browser-window-created", _newWindowEvent);
    // If currentWindow closes before the above handler is called, remove handler to prevent leak:
    /*Window.current._window.on("close", function () {
        remote.app.off("browser-window-created", _newWindowEvent);
    });*/


    // TODO: Window Manager, so instances are saved and returned, rather than making copies.
    // TODO: Make use the remote.getGlobal to share between renderers.

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

    function getAllWindows() {
        let windows = [];
        for (let id in allWindows) {
            if (allWindows.hasOwnProperty(id)) {
                windows.push(allWindows[id]);
            }
        }

        return windows;
    }

    // Setup handlers on this window:
    let wX = 0;
    let wY = 0;
    let dragging = false;

    Window.current._window.on("focus", function () {
        Window.current._window._dockFocus();
    });

    window.addEventListener("mousedown", function (event) {
        if (event.target.classList.contains("window-drag")) {
            dragging = true;
            wX = event.screenX;
            wY = event.screenY;
            Window.current._window._dragStart();
        }
    });

    window.addEventListener("mousemove", function (event) {
        if (dragging) {
            //Window.current.moveTo(event.screenX - wX, event.screenY - wY);
            Window.current._window._dragBy(event.screenX - wX, event.screenY - wY);
        }
    });

    window.addEventListener("mouseup", function () {
        dragging = false;
        Window.current._window._dragStop();
    });

    // Add context menu:
    let Menu = remote.Menu;
    let MenuItem = remote.MenuItem;

    let rightClickPosition = null;

    let menu = new Menu();
    menu.append(new MenuItem({
        label: "Reload",
        accelerator: "CmdOrCtrl+R",
        click: function () {
            Window.current._window.reload();
        }
    }));
    menu.append(new MenuItem({
        label: "Reload app and restart children",
        click: function () {
            remote.app.relaunch();
            remote.app.exit(0);
        }
    }));
    menu.append(new MenuItem({ type: "separator" }));
    menu.append(new MenuItem({
        label: "Inspect Element",
        accelerator: "CmdOrCtrl+Shift+I",
        click: function () {
            Window.current._window.inspectElement(rightClickPosition.x, rightClickPosition.y);
        }
    }));

    window.addEventListener("contextmenu", function (event) {
        event.preventDefault();
        rightClickPosition = {x: event.x, y: event.y};
        menu.popup(Window.current._window);
    }, false);

    Object.assign(windowfactory, {
        onReady: onReady,
        isReady: function () { return isReady; },
        runtime: "Electron",
        runtimeVersion: windowfactory.electronVersion
    });
})();
// TODO: Make scalejs.windowfactory the main.js script for Electron. Load the config.json