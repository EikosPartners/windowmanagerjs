/*global define,$ */
define([ //array of strings or prequisites to execute function
    'sandbox!main' //loads sandbox, ! is a scalejs
], function (
    sandbox
) {
    'use strict';

    return function (modules, sandbox) {
        var // imports
            observable = sandbox.mvvm.observable,
            observableArray = sandbox.mvvm.observableArray,
            computed = sandbox.mvvm.computed,
            curWin = windowfactory.Window.getCurrent(),
            childWin;

        return {
            moveRandom: function () {
                curWin.moveTo(Math.round(Math.random()*500), Math.round(Math.random()*500));
            },
            maximize: function () {
                curWin.maximize();
            },
            minimize: function () {
                curWin.minimize();
            },
            close: function () {
                curWin.close();
            },
            undock: function () {
                curWin.undock();
            },
            hideShow: function () {
                curWin.hide();

                setTimeout(function () {
                    curWin.show();
                }, 1000);
            },
            openChild: function () {
                if (childWin && !childWin.isClosed()) {
                    childWin.focus();
                } else {
                    var mainWindowPosition = curWin.getBounds();
                    childWin = new windowfactory.Window({
                        url: "/index.html?child",
                        left: mainWindowPosition.left - 300,
                        top: mainWindowPosition.top,
                        width: 300,
                        height: 300,
                        minWidth: 300,
                        minHeight: 100,
                        maxWidth: 400,
                        maxHeight: 400
                    });
                    curWin.dock(childWin);
                    curWin.on("close", function () {
                        console.log("Window Closed:", this);
                    });
                }
            },
            newWindow: function () {
                var pos = new windowfactory.geometry.BoundingBox(0, 0, 200, 200).getCenteredOnPosition(curWin.getBounds());
                var newWin = new windowfactory.Window({
                    url: "/index.html?other",
                    left: pos.left,
                    top: pos.top,
                    width: 200,
                    height: 200,
                    minWidth: 200,
                    minHeight: 100,
                    maxWidth: 400,
                    maxHeight: 400
                });
            }
        };
    };
});
