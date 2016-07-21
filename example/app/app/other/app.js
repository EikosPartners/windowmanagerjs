/*global require*/
define([
    'scalejs!application/other',
    'scalejs.windowfactory'
], function (
    application
) {
    'use strict';
    document.querySelector("title").innerText = "New Window " + location.search.replace("?", "");

    windowfactory.onReady(function () {
        application.run();
    });
});

