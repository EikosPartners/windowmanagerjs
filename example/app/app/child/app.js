/*global require*/
define([
    'scalejs!application/child',
    'scalejs.windowfactory'
], function (
    application
) {
    'use strict';

    windowfactory.onReady(function () {
        application.run();
    });
});

