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

            window.addEventListener("mousedown", function (e) {
                if (e.target.classList.contains("window-drag")) {
                    dragging = true;
                    wX = e.pageX;
                    wY = e.pageY;
                }
            });

            window.addEventListener("mousemove", function (e) {
                if (dragging) {
                    currentWindow.moveTo(e.screenX - wX, e.screenY - wY);
                }
            });

            window.addEventListener("mouseup", function () {
                dragging = false;
            });
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