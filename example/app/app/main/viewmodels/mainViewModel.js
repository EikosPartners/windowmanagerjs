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
                        height: 300
                    });
                    curWin.dock(childWin);
                }
            }
        };
    };
});
