import readySync from '../../ready';
import nodeRequire from '../require';
import './Window'; // Setup window backend
const { app, BrowserWindow, dialog } = nodeRequire('electron');
const http = nodeRequire('http');
const https = nodeRequire('https');
const url = nodeRequire('url');

// TODO: Add support for an app.json packaged with this script.
// TODO: Add support for local file loading for window url.

// Determine the endpoint:
const epArg = process.argv.find(arg => arg.indexOf('--endpoint') >= 0);
const ep = epArg ? epArg.substr(epArg.indexOf('=') + 1) : nodeRequire('./package.json').endPoint;
const configUrl = url.resolve(ep, 'app.json');
// Setup defaults (similar to OpenFin):
const defaultConfig = {
    url: ep,
    width: 800,
    height: 500,
    frame: true,
    resizable: true,
    show: false,
    hasShadow: false,
    icon: 'favicon.ico',
    webPreferences: {
        nodeIntegration: false,
        // Windowmanager path should be absolute:
        preload: __filename
    }
};
// Setup openfin to electron mappings:
const configMap = {
    name: 'title',
    autoShow: 'show',
    defaultLeft: 'x',
    defaultTop: 'y',
    defaultWidth: 'width',
    defaultHeight: 'height'
};
let mainWindow;

function createWindow() {
    function _start(config) {
        let _url = config.url;

        delete config.url;

        // Start main window:
        mainWindow = new BrowserWindow(config);
        config.title = config.title == null ? mainWindow.id : config.title;

        // load the index.html of the app:
        mainWindow.loadURL(_url);
        mainWindow.setTitle(config.title);

        mainWindow.on('closed', function () {
            mainWindow = null;
            app.quit();
        });

        // Open the DevTools.
        // mainWindow.webContents.openDevTools();

        // Notify windowmanager is setup:
        readySync._deref();
    }

    function _response(res) {
        let json = '';

        res.setEncoding('utf8');
        res.on('data', (chunk) => {
            json += chunk;
        });
        res.on('end', () => {
            if (res.statusCode === 200) {
                let config;

                try {
                    config = JSON.parse(json).startup_app || {};
                } catch (e) {
                    const err = `Server failed to parse app.json (${configUrl}).`;

                    dialog.showErrorBox('ERROR', err);
                    return app.quit();
                }

                // Map options to electron options:
                for (const prop in config) {
                    if (config.hasOwnProperty(prop) && configMap[prop] !== undefined) {
                        config[configMap[prop]] = config[prop];
                        delete config[prop];
                    }
                }
                // Set defaults:
                for (const prop in defaultConfig) {
                    if (defaultConfig.hasOwnProperty(prop)) {
                        config[prop] = config[prop] || defaultConfig[prop];
                    }
                }

                // Start main window:
                _start(config);
            } else {
                const err = `Server failed to load app.json (${configUrl}). Status code: ${res.statusCode}`;

                dialog.showErrorBox('ERROR', err);
                app.quit();
            }
        });
    }

    // Get app.json:
    if (configUrl == null) {
        // Load defaults:
        // _start(defaultConfig);
        const err = 'No endpoint provided to start the app.';

        dialog.showErrorBox('ERROR', err);
        app.quit();
    } else if (configUrl.indexOf('https') === 0) {
        https.get(configUrl, _response);
    } else if (configUrl.indexOf('http') === 0) {
        http.get(configUrl, _response);
    } else {
        const err = `Server doesn't support endpoint for app.json (${configUrl}).`;

        dialog.showErrorBox('ERROR', err);
        app.quit();
    }
}

// When app starts, load main window:
app.on('ready', createWindow);

// When app closes all windows, end app:
app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', function () {
    if (mainWindow === null) {
        createWindow();
    }
});
