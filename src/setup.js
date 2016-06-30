let windowfactory = {
    isRenderer: false,
    isBackend: false
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
}
if (typeof process !== "undefined" && process && process.versions) {
    windowfactory.electronVersion = global.process.versions.electron;
    windowfactory.nodeVersion = global.process.versions.node;
}
