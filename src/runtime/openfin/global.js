/* global fin */
import windowmanager from '../../global';
import readySync from '../ready';
import { EventHandler } from '../../utils/index';

windowmanager.runtime.name = 'OpenFin';
windowmanager.runtime.version = undefined;
windowmanager.runtime.isOpenFin = true;

let setVersion = readySync.ref(function (version) {
    windowmanager.runtime.version = version;
});

fin.desktop.main(readySync.ref(function () {
    fin.desktop.System.getVersion(setVersion); // TODO: Handle errorCallback

    let app = fin.desktop.Application.getCurrent();
    let mainWindow = app.getWindow().contentWindow;

    if (mainWindow === window) {
        windowmanager.runtime.isMain = true;
        windowmanager._launcher = mainWindow;
        windowmanager._windows = new Map();
        windowmanager._internalBus = new EventHandler(Object.keys(windowmanager._eventListeners));
    } // children get the above in the constructor of the Window.

    // Wire the internal bus to emit events on windowmanager:
    windowmanager._internalBus.addPipe(windowmanager);
}));

// This is used to store info across windows:
// Everything on here gets exported as windowmanager.
export default windowmanager;
