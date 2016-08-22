/*global define,$ */
define([ //array of strings or prequisites to execute function
    'sandbox!other' //loads sandbox, ! is a scalejs
], function (
    sandbox
) {
    'use strict';

    return function (modules, sandbox) {
        var // imports
            observable = sandbox.mvvm.observable,
            observableArray = sandbox.mvvm.observableArray,
            computed = sandbox.mvvm.computed,
            curWin = windowfactory.Window.getCurrent();

        return {
            maximize: function () {
                curWin.maximize();
            },
            close: function () {
                curWin.close();
            },
            undock: function () {
                curWin.undock();
            },
            title: document.querySelector("title").innerText
        };
    };
});
