
define('Window',[
], function (
) {
    "use strict";

	function Window() {
		
	}
	
	return Window;
});

/*global define*/
define('scalejs.windowfactory',[
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


