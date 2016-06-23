"use strict";
if (typeof define !== "undefined" && define) {
    define("scalejs.windowfactory",[
        "scalejs!core",
        "./scalejs.windowfactory/geometry",
        "./scalejs.windowfactory/electron/windowfactory",
        "./scalejs.windowfactory/openfin/windowfactory"
    ], function (
        core,
        geometry,
        electron,
        openfin
    ) {
        var windowfactory = electron || openfin;

        windowfactory.geometry = geometry;

        core.registerExtension({
            windowfactory: windowfactory
        });

        if (typeof window !== "undefined" && window) { window.windowfactory = windowfactory; }
        if (typeof global !== "undefined" && global) { global.windowfactory = windowfactory; }
        //if (typeof GLOBAL !== "undefined" && GLOBAL) GLOBAL.windowfactory = windowfactory;

        return windowfactory;
    });
} else {
    if (typeof process !== "undefined" && process) {
        require.electron = process.versions.electron;
        var _require = require;
        process.once("loaded", function () {
            global.nodeRequire = _require;
        });
    }
}
