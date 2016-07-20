/* global fin,EventHandler*/
let windowfactory = new EventHandler(["window-create"]);
windowfactory.isRenderer = false;
windowfactory.isBackend = false;
windowfactory.version = "0.4.0alpha";

function getBrowserInfo() {
    // Credit: http://www.gregoryvarghese.com/how-to-get-browser-name-and-version-via-javascript/
    let ua = navigator.userAgent,
        tem,
        M = ua.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || [];
    if (/trident/i.test(M[1])) {
        tem = /\brv[ :]+(\d+)/g.exec(ua) || [];
        return { name: "IE ", version: (tem[1] || "") };
    }
    if (M[1] === "Chrome") {
        tem = ua.match(/\bOPR\/(\d+)/);
        if (tem !== null) { return { name: "Opera", version: tem[1] }; }
    }
    M = M[2] ? [M[1], M[2]] : [navigator.appName, navigator.appVersion, "-?"];
    if ((tem = ua.match(/version\/(\d+)/i)) !== null) { M.splice(1, 1, tem[1]); }
    return {
        name: M[0],
        version: M[1]
    };
}


if (typeof global !== "undefined" && global) {
    windowfactory.isBackend = true;
    if (typeof require !== "undefined") {
        // We are running in an Electron Window Backend's Runtime:
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
        // We are running in an Electron Window's Runtime:
        windowfactory.electronVersion = window.nodeRequire.electronVersion;
        windowfactory.nodeVersion = window.nodeRequire.nodeVersion;

        const ipcRenderer = window.nodeRequire("electron").ipcRenderer;
        ipcRenderer.on("window-create", function (event, otherID) {
            windowfactory.emit("window-create", windowfactory._resolveWindowWithID(otherID));
        });
    }
}

if (typeof process !== "undefined" && process && process.versions) {
    // We are running in an Electron Runtime:
    global.nodeRequire.electronVersion = windowfactory.electronVersion = global.process.versions.electron;
    global.nodeRequire.nodeVersion = windowfactory.nodeVersion = global.process.versions.node;
} else if (typeof fin !== "undefined" && fin && fin.desktop && fin.desktop.System) {
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
        let mainWindow = app.getWindow().contentWindow;

        if (mainWindow === window) {
            windowfactory._windows = {};
            windowfactory._internalBus = new EventHandler(["window-create"]);
            windowfactory._internalBus.addPipe(windowfactory);
        }

        // Call callbacks:
        for (let callback of openfinReadyCallbacks) {
            callback();
        }
        openfinReadyCallbacks = undefined;
    });
} else {
    // We are running in Browser Runtime:
    let browser = getBrowserInfo();
    windowfactory.browserVersion = browser.version;
    windowfactory.browserRuntime = browser.name;
    if (window.parent === window) {
        // This is the root window:
        // TODO: What happens if a website uses an iframe to a site that has an app with this extension?
        windowfactory._windows = [];
        windowfactory._launcher = window;
        windowfactory._internalBus = new EventHandler(["window-create"]);
        let nextZIndex = 1000; // TODO: Recycle Z-Indexes! In case of a (probably never) overflow!
        windowfactory._getNextZIndex = function () {
            nextZIndex += 1;
            return nextZIndex;
        };
        windowfactory.isLauncher = true;

        /*document.body.innerHTML = "Test";
        let stylesheet = document.createElement("style");
        stylesheet.innerHTML = "html,body{margin:0;padding:0;background:black;color:white}";
        document.head.appendChild(stylesheet);*/
    } else {
        windowfactory._windows = window.parent.windowfactory._windows;
        windowfactory._launcher = window.parent.windowfactory._launcher || window.parent;
        windowfactory._internalBus = window.parent.windowfactory._internalBus;
        windowfactory._getNextZIndex = window.parent.windowfactory._getNextZIndex;
        windowfactory.isLauncher = false;
    }

    windowfactory._internalBus.addPipe(windowfactory);
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
