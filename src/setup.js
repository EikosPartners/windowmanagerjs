/* global fin*/
let windowfactory = {
    isRenderer: false,
    isBackend: false,
    version: "0.2.1alpha"
};

if (typeof global !== "undefined" && global) {
    windowfactory.isBackend = true;
    if (typeof require !== "undefined") {
        let _require = require;
        global.nodeRequire = _require;
        _require.windowfactoryPath = __filename;
        const path = _require("path");
        global.workingDir = path.dirname(_require.main.filename);
        process.once("loaded", function () {
            //global.nodeRequire = _require;
            //global.workingDir = nodeRequire.main.filename;
        });
    }
}

if (typeof window !== "undefined" && window) {
    windowfactory.isRenderer = true;
    if (window.nodeRequire !== undefined) {
        windowfactory.electronVersion = window.nodeRequire.electronVersion;
        windowfactory.nodeVersion = window.nodeRequire.nodeVersion;
    }
}

if (typeof process !== "undefined" && process && process.versions) {
    // We are running in Electron Runtime:
    global.nodeRequire.electronVersion = windowfactory.electronVersion = global.process.versions.electron;
    global.nodeRequire.nodeVersion = windowfactory.nodeVersion = global.process.versions.node;
}

if (typeof fin !== "undefined" && fin && fin.desktop && fin.desktop.System) {
    // We are running in OpenFin Runtime:
    windowfactory.openfinVersion = "startup";

    let openfinReadyCallbacks = [];
    windowfactory._openfinOnReady = function (callback) {
        // Check if ready:
        if (windowfactory.openfinVersion !== "startup") {
            return callback();
        }

        // Check if eventListener is a function:
        if (!callback || callback.constructor !== Function) {
            throw "on requires argument 'eventListener' of type Function";
        }

        // Check if eventListener is already added:
        if (openfinReadyCallbacks.indexOf(callback) >= 0) { return; }

        // Add event listener:
        openfinReadyCallbacks.push(callback);
    };

    fin.desktop.main(function () {
        windowfactory.openfinVersion = "pending";
        fin.desktop.System.getVersion(function (version) {
            windowfactory.openfinVersion = version;
        }); // TODO: Handle errorCallback
        let app = fin.desktop.Application.getCurrent();
        console.log(app.getWindow(), window);
        if (app.getWindow().contentWindow === window) {
            windowfactory._windows = {};
        }

        // Call callbacks:
        for (let callback of openfinReadyCallbacks) {
            callback();
        }
        openfinReadyCallbacks = undefined;
    });
}


if (typeof global !== "undefined" && global) { global.windowfactory = windowfactory; }
if (typeof window !== "undefined" && window) { window.windowfactory = windowfactory; }

function SyncCallback(callback) {
	if (!(this instanceof SyncCallback)) { return new SyncCallback(callback); }
    let thisObj = this;

    this.callback = function () {
        thisObj.count -= 1;
        if (thisObj.count <= 0) { callback(); }
    };

    this.count = 0;
}
SyncCallback.prototype.ref = function () {
    this.count += 1;
    return this.callback;
};

// Runtimes are stitched in after this line.

// After the runtimes, the scalejs.windowfactory.js script is stitched in.