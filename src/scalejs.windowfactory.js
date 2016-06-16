/*global define*/
define([
    'scalejs!core',
    './Window'
], function (
	Window
) {
    'use strict';
	
	var windowFactory = {
		Window: Window
	};
	
    core.registerExtension({
        windowfactory: windowFactory
    });
	
	return windowFactory;
});

