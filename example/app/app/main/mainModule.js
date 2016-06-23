/*global define, $ */
define([
    'sandbox!main',
    'app/main/viewmodels/mainViewModel',
    'views!main',
    'bindings!main'
], function (
    sandbox,
    mainViewModel,
    views,
    bindings
) {
    'use strict';

    return function main() {
        var // imports
            observable = sandbox.mvvm.observable,
            root = sandbox.mvvm.root,
            template = sandbox.mvvm.template,
            mainWindow = windowfactory.getCurrentWindow();

        var viewModel = mainViewModel(this, sandbox);

        root(template('main_template', viewModel));
    };
});
