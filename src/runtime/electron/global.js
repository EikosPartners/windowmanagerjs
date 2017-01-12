import windowmanager from '../../global';
import nodeRequire from './require';

windowmanager._isNode = false;
windowmanager._isStartup = false;
windowmanager._isRenderer = false;
windowmanager.runtime.name = 'Electron';
windowmanager.runtime.version = undefined;
windowmanager.runtime.isElectron = true;

// Determine if this is node or renderer:
// TODO: Clean up the following code to clearly identify the three potential states: node, startup, renderer
if (typeof global !== 'undefined' && global) {
    // We are running in an Electron Window Backend's Runtime:
    const { BrowserWindow } = nodeRequire('electron');

    // The following check works because BrowserWindow is not exposed to the window scripts:
    windowmanager._isNode = (BrowserWindow != null);
    windowmanager._isStartup = !windowmanager._isNode;
    windowmanager.runtime.version = global.process.versions.electron;

    // If is a window startup script:
    if (windowmanager._isStartup) {
        let _require = nodeRequire;

        _require.runtime = windowmanager.runtime;
        _require.workingDir = _require('path').dirname(_require.main.filename);
        _require.windowmanagerPath = __filename; // Used so new windows know where to load windowmanager from.
        global.nodeRequire = _require; // Used so windowmanager in a window can access electron.
        // TODO: Determine if window can be set directly here.

        process.once('loaded', function () {
            // TODO: Is this needed?
            global.nodeRequire = _require;
        });
    }
} else if (typeof window !== 'undefined' && window) {
    windowmanager._isRenderer = true;

    if (window.nodeRequire != null) {
        // We are running in an Electron Window's Runtime:
        windowmanager.runtime = window.nodeRequire.runtime;
        windowmanager._windows = new Map();
    }
}

// This is used to store info across windows:
// Everything on here gets exported as windowmanager.
export default windowmanager;
