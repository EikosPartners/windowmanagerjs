/*global define, $ */
define([
    'sandbox!child',
    'app/child/viewmodels/childViewModel',
    'views!child',
    'bindings!child'
], function (
    sandbox,
    childViewModel,
    views,
    bindings
) {
    'use strict';

    return function child() {
        var // imports
            observable = sandbox.mvvm.observable,
            root = sandbox.mvvm.root,
            template = sandbox.mvvm.template,
            childWindow = windowfactory.Window.getCurrent();

        var viewModel = childViewModel(this, sandbox);

        root(template('child_template', viewModel));
    };
});
