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
            curWin = windowfactory.getCurrentWindow();

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
            }
        };
    };
});
