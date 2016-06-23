"use strict";
/*global fin*/
if (typeof define !== "undefined" && define) {
    define([
        "./Window"
    ], function (
        Window
    ) {
        if (!(typeof fin !== "undefined" && fin && fin.desktop && fin.desktop.getVersion())) { return; }

        var readyCallbacks = [];
        var isReady = false;
        var currentWindow;

        function onReady(callback) {
            // Check if callback is not a function:
            if (!(callback && callback.constructor && callback.call && callback.apply)) { throw "onReady expects a function passed as the callback argument!"; }

            // Check if already ready:
            if (isReady) { callback(); }

            // Check to see if callback is already in readyCallbacks:
            if (readyCallbacks.indexOf(callback) >= 0) { return; }

            readyCallbacks.push(callback);
        }


        fin.desktop.main(function () {
            currentWindow = new Window(fin.desktop.Window.getCurrent());

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

            isReady = true;
            for (var index = 0; index < readyCallbacks.length; index += 1) {
                readyCallbacks[index]();
            }
            readyCallbacks = [];
        });

        return {
            Window: Window,
            getCurrentWindow: function () {
                return currentWindow;
            },
            onReady: onReady,
            isReady: function () {
                return isReady;
            },
            runtime: "OpenFin",
            runtimeVersion: fin.desktop.getVersion()
        };
    });
}