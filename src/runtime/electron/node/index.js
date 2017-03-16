import readySync from '../../ready';
import nodeRequire from '../require';
import windowmanager from '../global';
import './Window'; // Setup window backend
const { app, BrowserWindow, dialog } = nodeRequire('electron');
const http = nodeRequire('http');
const https = nodeRequire('https');
const path = nodeRequire('path');
const url = nodeRequire('url');

// TODO: Add support for local file loading for window url.

function getArg(argName) {
    return global.__windowmanagerConfig[argName] || process.argv.find(arg => arg.indexOf(`--${argName}`) >= 0);
}

function extractArg(argName) {
    const arg = getArg(argName);

    if (arg) {
        const index = arg.indexOf('=') + 1;

        if (index < arg.length) { return arg.substr(index); }
    }
    // Return falsey value
}

// Determine the endpoint:
const packageJson = (() => {
    const packagePath = path.resolve(path.dirname(nodeRequire.main.filename), 'package.json');

    try {
        return nodeRequire(packagePath).windowmanager || global.__windowmanagerConfig || {};
    } catch (err) {
        return {};
    }
})();
const endpoint = extractArg('endpoint') || packageJson.endpoint;
const configPath = extractArg('config') || packageJson.config;
// If configPath is null, url.resolve doesn't execute:
const configUrl = configPath && url.resolve(endpoint, configPath);
// Setup defaults (similar to OpenFin):
const defaultConfig = {
    url: endpoint,
    width: 800,
    height: 500,
    frame: true,
    resizable: true,
    show: true,
    hasShadow: false,
    autoHideMenuBar: true,
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
        config.title = config.title == null ? String(mainWindow.id) : config.title;

        // load the index.html of the app:
        mainWindow._setFrameInit(config.frame);
        mainWindow.loadURL(_url);
        mainWindow.setTitle(config.title);

        mainWindow.webContents.on('did-fail-load', () => {
            // Failed to load url, close window:
            mainWindow.close();
        });

        mainWindow.on('closed', () => {
            mainWindow = null;
            app.quit();
        });

        // Store this as the main window:
        windowmanager._launcher = mainWindow;

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
        res.on('error', (error) => {
            // Had error, handle it:
            const err = `Server failed to load app.json (${configUrl}). Error: ${error}`;

            dialog.showErrorBox('ERROR', err);
            app.quit();
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
                        config[prop] = (config[prop] != null ? config[prop] : defaultConfig[prop]);
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
    if (configUrl != null) {
        if (configUrl.indexOf('https') === 0) {
            // Use https to load app.json:
            https.get(configUrl, _response).on('error', (error) => {
                // Had error, handle it:
                const err = `Server failed to load app.json (${configUrl}). Error: ${error}`;

                dialog.showErrorBox('ERROR', err);
                app.quit();
            });
        } else if (configUrl.indexOf('http') === 0) {
            // Use http to load app.json:
            http.get(configUrl, _response).on('error', (error) => {
                // Had error, handle it:
                const err = `Server failed to load app.json (${configUrl}). Error: ${error}`;

                dialog.showErrorBox('ERROR', err);
                app.quit();
            });
        } else {
            // Unsupported protocol:
            const err = `Server doesn't support endpoint for app.json (${configUrl}).`;

            dialog.showErrorBox('ERROR', err);
            app.quit();
        }
    } else if (endpoint != null) {
        // Load defaults:
        _start(defaultConfig);
    } else {
        const err = 'No endpoint provided to start the app.';

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
