/*global define, $ */
define([
    'sandbox!other',
    'app/other/viewmodels/otherViewModel',
    'views!other',
    'bindings!other'
], function (
    sandbox,
    otherViewModel,
    views,
    bindings
) {
    'use strict';

    return function other() {
        var // imports
            observable = sandbox.mvvm.observable,
            root = sandbox.mvvm.root,
            template = sandbox.mvvm.template,
            otherWindow = windowfactory.Window.getCurrent();

        var viewModel = otherViewModel(this, sandbox);

        root(template('other_template', viewModel));
    };
});
