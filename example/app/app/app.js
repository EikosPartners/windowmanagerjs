/*global require*/
define([
    'scalejs!application/' + (location.search.replace(/^\?/, "") || "main"),
    'scalejs.windowfactory'
], function (
    application
) {
    'use strict';

    windowfactory.onReady(function () {
        application.run();
    });
});

