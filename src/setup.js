/* global fin,EventHandler*/
let windowfactoryEventNames = ["window-create", "window-close"];

/**
 * A global variable exposed on windows to access the windowfactory-related API.
 * @namespace
 * @property {string} version - version of windowfactory
 * @property {object} runtime - contains runtime-specific info
 * @property {string} runtime.name - name of runtime (ie. Chrome, IE, OpenFin, Electron, ect)
 * @property {string} runtime.version
 * @property {boolean} runtime.isBrowser
 * @property {boolean} runtime.isElectron
 * @property {boolean} runtime.isOpenFin
 * @property {boolean} isDesktop - is this a desktop OS
 * @property {boolean} isMobile - is this a mobile OS
 * @property {boolean} isLauncher - (only available on Browser runtime) is main/launcher window
 * @property {Window} Window
 * @property {module:geometry} geometry
 * @property {function} isReady - returns if windowfactory is ready for use
 * @property {function} onReady - accepts a callback which is called when isReady() is true
 */
let windowfactory = new EventHandler(windowfactoryEventNames);
windowfactory._isRenderer = false;
windowfactory._isBackend = false;
windowfactory.version = "0.7.8";
windowfactory.runtime = {
    name: undefined,
    version: undefined,
    isBrowser: false,
    isElectron: false,
    isOpenFin: false
};

// Credit: http://stackoverflow.com/a/11381730
if (typeof navigator !== "undefined") {
    /* jshint -W101 */
    windowfactory.isMobile = (function (a) { return /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4)); })(navigator.userAgent || navigator.vendor || window.opera);
    /* jshint +W101 */
    windowfactory.isDesktop = !windowfactory.isMobile;
}

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
    windowfactory._isBackend = true;
    if (typeof require === "function" && require.main && require.main.filename) {
        // We are running in an Electron Window Backend's Runtime:
        const path = require("path");
        let _require = require;
        let _workingDir = path.dirname(require.main.filename);
        _require.windowfactoryPath = __filename; // Used so new windows know where to load windowfactory from.
        global.nodeRequire = _require; // Used so windowfactory in a window can access electron.
        global.workingDir = _workingDir;//global.nodeRequire("path").dirname(global.nodeRequire.main.filename);

        process.once("loaded", function () {
            global.nodeRequire = _require;
            global.workingDir = _workingDir;//nodeRequire.main.filename;
        });
    }
} else if (typeof window !== "undefined" && window) {
    windowfactory._isRenderer = true;
    if (window.nodeRequire !== undefined) {
        // We are running in an Electron Window's Runtime:
        windowfactory.runtime = window.nodeRequire.runtime;

        const ipcRenderer = window.nodeRequire("electron").ipcRenderer;
        ipcRenderer.on("window-create", function (event, otherID) {
            windowfactory.emit("window-create", windowfactory._resolveWindowWithID(otherID));
        });
    }
}

if (typeof process !== "undefined" && process && process.versions && process.versions.electron) {
    // We are running in an Electron Runtime:
    windowfactory.runtime.name = "Electron";
    windowfactory.runtime.isElectron = true;
    windowfactory.runtime.version = global.process.versions.electron;
    global.nodeRequire.runtime = windowfactory.runtime;
} else if (typeof fin !== "undefined" && fin && fin.desktop && fin.desktop.main) {
    // We are running in OpenFin Runtime:
    windowfactory.runtime.name = "OpenFin";
    windowfactory.runtime.isOpenFin = true;
    windowfactory.runtime.version = undefined;

    let openfinReadyCallbacks = [];
    windowfactory._openfinOnReady = function (callback) {
        // Check if ready:
        if (windowfactory.runtime.version !== undefined) {
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
        fin.desktop.System.getVersion(function (version) {
            windowfactory.runtime.version = version;
        }); // TODO: Handle errorCallback

        let app = fin.desktop.Application.getCurrent();
        let mainWindow = app.getWindow().contentWindow;

        if (mainWindow === window) {
            windowfactory._windows = {};
            windowfactory._internalBus = new EventHandler(windowfactoryEventNames);
        } else {
            windowfactory._internalBus = window.parent.windowfactory._internalBus;
        }

        windowfactory._internalBus.addPipe(windowfactory);

        // Call callbacks:
        for (let callback of openfinReadyCallbacks) {
            callback();
        }
        openfinReadyCallbacks = undefined;
    });
} else if (window.nodeRequire === undefined) {
    // We are running in Browser Runtime:
    let browser = getBrowserInfo();
    let parentInaccessible = (window.parent === window);
    windowfactory.runtime.name = browser.name;
    windowfactory.runtime.isBrowser = true;
    windowfactory.runtime.version = browser.version;

    try {
        window.parent.document;
    } catch (e) {
        // If the above access errors out, it's due to CORS violation.
        // So assume this JavaScript window is the top-level window:
        parentInaccessible = true;
    }

    if (parentInaccessible) {
        // This is the root window:
        // TODO: What happens if a website uses an iframe to a site that has an app with this extension?
        windowfactory._windows = [];
        windowfactory._launcher = window;
        windowfactory._internalBus = new EventHandler(windowfactoryEventNames);
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

/*jshint bitwise: false*/
const genUIDE7 = (() => {
    let lut = [];
    for (let i = 0; i < 256; i += 1) { lut[i] = (i < 16 ? "0" : "") + (i).toString(16); }

    return () => {
        let d0 = Math.random() * 0xffffffff | 0;
        let d1 = Math.random() * 0xffffffff | 0;
        let d2 = Math.random() * 0xffffffff | 0;
        let d3 = Math.random() * 0xffffffff | 0;
        return lut[d0 & 0xff] + lut[d0 >> 8 & 0xff] + lut[d0 >> 16 & 0xff] + lut[d0 >> 24 & 0xff] + "-" +
            lut[d1 & 0xff] + lut[d1 >> 8 & 0xff] + "-" + lut[d1 >> 16 & 0x0f | 0x40] + lut[d1 >> 24 & 0xff] + "-" +
            lut[d2 & 0x3f | 0x80] + lut[d2 >> 8 & 0xff] + "-" + lut[d2 >> 16 & 0xff] + lut[d2 >> 24 & 0xff] +
            lut[d3 & 0xff] + lut[d3 >> 8 & 0xff] + lut[d3 >> 16 & 0xff] + lut[d3 >> 24 & 0xff];
    };
})();
windowfactory.getUniqueWindowName = function () {
    return "window" + genUIDE7() + (new Date()).getTime();
};

function SyncCallback(callback) {
	if (!(this instanceof SyncCallback)) { return new SyncCallback(callback); }
    let thisObj = this;

    this._deref = function () {
        thisObj.count -= 1;
        if (thisObj.count <= 0) { callback(); }
    };

    this.count = 0;
}
SyncCallback.prototype.ref = function (callback) {
    this.count += 1;
    return function () {
        if (callback) { callback.apply(null, arguments); }
        this._deref();
    };
};

// Runtimes are stitched in after this line.

// After the runtimes, the scalejs.windowfactory.js script is stitched in.
