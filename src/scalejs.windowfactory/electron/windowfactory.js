"use strict";
/*global nodeRequire*/
if (typeof define !== "undefined" && define) {
    define([
        "./Window"
    ], function (
        Window
    ) {
        if (!(typeof nodeRequire !== "undefined" && nodeRequire && nodeRequire.electron)) { return; }

        var remote = nodeRequire("electron").remote;
        var readyCallbacks = [];
        var isReady = true;
        var currentWindow = new Window(remote.getCurrentWindow());

        // TODO: Window Manager, so instances are saved and returned, rather than making copies.
        // TODO: Make use the remote.getGlobal to share between renderers.

        function onReady(callback) {
            // Check if callback is not a function:
            if (!(callback && callback.constructor && callback.call && callback.apply)) { throw "onReady expects a function passed as the callback argument!"; }

            // Check if already ready:
            if (isReady) { callback(); }

            // Check to see if callback is already in readyCallbacks:
            if (readyCallbacks.indexOf(callback) >= 0) { return; }

            readyCallbacks.push(callback);
        }

        function getCurrentWindow() {
            return currentWindow;
        }

		// Setup handlers on this window:
		(function () {
            var wX = 0;
            var wY = 0;
            var dragging = false;
            //var titlebarEl = document.querySelector("titlebar");

            window.addEventListener("mousedown", function (event) {
                if (event.target.classList.contains("window-drag")) {
                    dragging = true;
                    wX = event.pageX;
                    wY = event.pageY;
                }
            });

            window.addEventListener("mousemove", function (event) {
                if (dragging) {
                    currentWindow.moveTo(event.screenX - wX, event.screenY - wY);
                }
            });

            window.addEventListener("mouseup", function () {
                dragging = false;
            });

            // Add context menu:
            var Menu = remote.Menu;
            var MenuItem = remote.MenuItem;

            var rightClickPosition = null;

            var menu = new Menu();
            menu.append(new MenuItem({
                label: "Reload",
                accelerator: "CmdOrCtrl+R",
                click: function () {
                    remote.getCurrentWindow().reload()
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
                    remote.getCurrentWindow().inspectElement(rightClickPosition.x, rightClickPosition.y)
                }
            }));

            window.addEventListener("contextmenu", function (event) {
                event.preventDefault();
                rightClickPosition = {x: event.x, y: event.y};
                menu.popup(remote.getCurrentWindow());
            }, false);
		})();

        return {
            Window: Window,
            getCurrentWindow: getCurrentWindow,
            onReady: onReady,
            isReady: function () { return isReady; },
            runtime: "Electron",
            runtimeVersion: nodeRequire.electron
        };
    });
}