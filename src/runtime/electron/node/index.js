import readySync from '../../ready';
import nodeRequire from '../require';
import './Window'; // Setup window backend
const { app, BrowserWindow } = nodeRequire('electron');
const http = nodeRequire('http');
const url = nodeRequire('url');

// TODO: Add support for an app.json packaged with this script.
// TODO: Add support for local file loading for window url.

// Determine the endpoint:
const epArg = process.argv.find(arg => arg.indexOf('--endpoint') >= 0);
const ep = epArg ? epArg.substr(epArg.indexOf('=') + 1) : nodeRequire('./package.json').endPoint;
const configUrl = url.resolve(ep, 'app.json');
// Setup defaults:
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
    // Get app.json:
    http.get(configUrl, function (res) {
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
                    console.error('ERROR: Failed to parse json from', configUrl);
                    config = {};
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
            } else {
                console.error('ERROR: Server returned code', res.statusCode);
                app.quit();
            }
        });
    });
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
