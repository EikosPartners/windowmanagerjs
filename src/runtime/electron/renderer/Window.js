import windowmanager from '../global';
import { EventHandler } from '../../../utils/index';
import { BoundingBox, Position, Size } from '../../../geometry/index';
const { ipcRenderer, remote } = window.nodeRequire('electron');
const url = window.nodeRequire('url');
const BrowserWindow = remote.BrowserWindow;

const currentWin = remote.getCurrentWindow();
const defaultConfig = {
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
        preload: window.nodeRequire.windowmanagerPath
    }
};
const configMap = {
    left: 'x',
    top: 'y'
};
const acceptedEventHandlers = [
    'ready',
    'drag-start', 'drag-before', 'drag-stop',
    'dock-before',
    'move', 'move-before',
    'resize-before',
    'close',
    'show', 'hide', 'restore', 'minimize', 'maximize',
    'focus', 'blur'];

class Window extends EventHandler {
    constructor(config) {
        // Call the parent constructor:
        super(acceptedEventHandlers);

        config = config || {}; // If no arguments are passed, assume we are creating a default blank window
        const isArgConfig = (config.webContents === undefined); // TODO: Improve checking of arguments.

        if (isArgConfig) {
            for (const prop in config) {
                if (config.hasOwnProperty(prop) && configMap[prop] !== undefined) {
                    config[configMap[prop]] = config[prop];
                    delete config[prop];
                }
            }
            for (const prop in defaultConfig) {
                if (defaultConfig.hasOwnProperty(prop)) {
                    config[prop] = (config[prop] != null ? config[prop] : defaultConfig[prop]);
                }
            }
            let _url = config.url;

            delete config.url;

            this._window = new BrowserWindow(config);
            this._id = this._window.id;
            config.title = config.title == null ? String(this._id) : config.title;
            // The following logic works like (in logical if-order):
            //       1. If url has 'http' or 'file' at start, then use url, no modification.
            //       2. If url has no '/', take location.href and remove all stuff up till last /, then append url.
            //       3. If url has '/':
            //          a. If location.href has 'http', extract the root url (domain) and append url.
            //          b. If location.href has 'file', take remote.getGlobal('workingDir'), and then append url.
            // Resolve url:
            if (!/^(file|http)/i.test(_url)) {
                if (_url[0] !== '/') {
                    _url = url.resolve(location.href, _url); // TODO: Is this unsafe with '..'?
                } else if (/^http/i.test(location.href)) {
                    _url = location.origin + _url; // TODO: Safe?
                } else if (/^file/i.test(location.href)) {
                    _url = remote.getGlobal('workingDir') + _url; // TODO: Safe?
                }
                // If can\'t determine url to load, then attempt to just load the url.
            }
            this._window._setFrameInit(config.frame);
            this._window.loadURL(_url);
            this._window.setTitle(config.title);
        } else {
            this._window = config;
            this._id = this._window.id;
        }
        windowmanager._windows.set(this._id, this);

        // Setup _window event listeners:
        // TODO: look into moving these elsewhere, might not work if currentWin is closed, and thisWindow is not.
        const thisWindow = this;

        function _onmove() {
            thisWindow.emit('move'); // TODO: Pass what position it is at.
        }
        this._window.on('move', _onmove);

        function _onminimize() {
            thisWindow.emit('minimize'); // TODO: Pass what position it is at.
        }
        this._window.on('minimize', _onminimize);

        function _onclose() {
            window.removeEventListener('beforeunload', _oncurrclose); // eslint-disable-line no-use-before-define
            windowmanager._windows.delete(thisWindow._id);
            thisWindow._isClosed = true;
            thisWindow.emit('close');
            thisWindow._window = undefined;
            // TODO: Clean up ALL listeners
        }

        function _oncurrclose() {
            windowmanager._windows.delete(thisWindow._id);
            thisWindow._window.removeListener('move', _onmove);
            thisWindow._window.removeListener('close', _onclose);
            thisWindow._window.removeListener('minimize', _onminimize);
        }

        // Register _oncurrclose when page changes or window closes to clean up listeners:
        window.addEventListener('beforeunload', _oncurrclose);

        // If window isn't currentWin, execute local event listeners:
        if (this._window !== currentWin) {
            this._window.on('close', _onclose);
        }

        // Setup event listeners:
        this._window.on('show', () => {
            thisWindow.emit('show');
        });
        this._window.on('hide', () => {
            thisWindow.emit('hide');
        });
        this._window.on('restore', () => {
            thisWindow.emit('restore');
        });
        this._window.on('minimize', () => {
            thisWindow.emit('minimize');
        });
        this._window.on('maximize', () => {
            thisWindow.emit('maximize');
        });
        this._window.on('focus', () => {
            thisWindow.emit('focus');
        });
        this._window.on('blur', () => {
            thisWindow.emit('blur');
        });

        this._isClosed = false;
        this._ready = true;
        if (isArgConfig) { this._window._notifyReady(); }
    }

    isReady() {
        return this._window !== undefined && !this._isClosed();
    }

    onReady(callback) {
        if (this.isClosed()) { throw new Error('onReady can\'t be called on a closed window'); }
        if (this.isReady()) { return callback.call(this); }

        this.once('ready', callback);
    }

    isClosed() {
        return this._isClosed;
    }

    getPosition() {
        const pos = this._window.getPosition();

        return new Position(pos[0], pos[1]);
    }

    getWidth() {
        const size = this._window.getSize();

        return size[0];
    }

    getHeight() {
        const size = this._window.getSize();

        return size[1];
    }

    getSize() {
        const size = this._window.getSize();

        return new Position(size[0], size[1]);
    }

    getBounds() {
        const bounds = this._window.getBounds();

        return new BoundingBox(bounds.x, bounds.y, bounds.x + bounds.width, bounds.y + bounds.height);
    }

    getTitle() {
        return this._window.getTitle();
    }

    setTitle(newTitle) {
        if (!newTitle) { throw new Error('setTitle requires one argument of type String'); }
        this._window.setTitle(newTitle);
    }

    isHidden() {
        return !this.isShown();
    }

    isShown() {
        return this._window.isVisible();
    }

    isMinimized() {
        return this._window.isMinimized();
    }

    isMaximized() {
        return this._window.isMaximized();
    }

    isRestored() {
        return this.isShown() && !this.isMinimized() && !this.isMaximized();
    }

    close(callback) {
        if (this.isClosed()) { return callback && callback(); }

        this._window.close();
        if (callback) { callback(); }
    }

    minimize(callback) {
        if (!this._ready) { throw new Error('minimize can\'t be called on an unready window'); }

        this._window._dockMinimize();
        if (callback) { callback(); }
    }

    maximize(callback) {
        if (!this._ready) { throw new Error('maximize can\'t be called on an unready window'); }

        this._window.maximize();
        if (callback) { callback(); }
    }

    show(callback) {
        if (!this._ready) { throw new Error('show can\'t be called on an unready window'); }

        this._window._dockShow();
        if (callback) { callback(); }
    }

    hide(callback) {
        if (!this._ready) { throw new Error('hide can\'t be called on an unready window'); }

        this._window._dockHide();
        if (callback) { callback(); }
    }

    restore(callback) {
        if (!this._ready) { throw new Error('restore can\'t be called on an unready window'); }

        this._window.restore();
        if (callback) { callback(); }
    }

    resizable(resizable, callback) {
        if (!this._ready) { throw new Error('restore can\'t be called on an unready window'); }

        this._window.setResizable();
        if (callback) { callback(); }
    }

    bringToFront(callback) {
        if (!this._ready) { throw new Error('bringToFront can\'t be called on an unready window'); }

        this._window._dockFocus();
        if (callback) { callback(); }
    }

    focus(callback) {
        if (!this._ready) { throw new Error('focus can\'t be called on an unready window'); }

        this._window.focus();
        if (callback) { callback(); }
    }

    resizeTo(width, height, callback) {
        if (!this._ready) { throw new Error('resizeTo can\'t be called on an unready window'); }
        const size = new Position(width, height);

        this._window.setSize(size.left, size.top);
        if (callback) { callback(); }
    }

    moveTo(left, top, callback) {
        if (!this._ready) { throw new Error('moveTo can\'t be called on an unready window'); }
        const pos = new Position(left, top);

        this._window._dockMoveTo(pos.left, pos.top);
        if (callback) { callback(); }
    }

    moveBy(deltaLeft, deltaTop, callback) {
        if (!this._ready) { throw new Error('moveBy can\'t be called on an unready window'); }
        const bounds = this.getBounds();
        const deltaPos = new Position(deltaLeft, deltaTop);

        this._window._dockMoveTo(bounds.left + deltaPos.left, bounds.top + deltaPos.top);
        if (callback) { callback(); }
    }

    setSize(width, height, callback) {
        if (!this._ready) { throw new Error('setSize can\'t be called on an unready window'); }
        const size = new Size(width, height);

        this._window.setSize(size.left, size.top);
        if (callback) { callback(); }
    }

    setBounds(left, top, right, bottom, callback) {
        if (!this._ready) { throw new Error('resizeTo can\'t be called on an unready window'); }
        const bounds = new BoundingBox(left, top, right, bottom);

        this._window.setBounds({
            x: bounds.left,
            y: bounds.top,
            width: bounds.getWidth(),
            height: bounds.getHeight()
        });
        if (callback) { callback(); }
    }

    dock(other) {
        this._window.dock(other._window.id);
    }

    undock() {
        this._window.undock();
    }

    static getAll() {
        return Array.from(windowmanager._windows.values());
    }

    static getByID(id) {
        return windowmanager._windows.get(id);
    }

    static getMain(id) {
        return windowmanager._windows.get(BrowserWindow._getMainID());
    }

    static getCurrent() {
        return Window.current;
    }
}

// Handle current window in this context:
Window.current = new Window(currentWin);

(function () {
    // Setup handlers on this window:
    let wX = 0;
    let wY = 0;
    let dragging = false;

    window.addEventListener('focus', function () {
        Window.current.bringToFront();
    });

    window.addEventListener('mousedown', function onDragStart(event) {
        if (event.target.classList && event.target.classList.contains('window-drag')) {
            dragging = true;
            wX = event.screenX;
            wY = event.screenY;
            Window.current._window._dragStart();
        }
    });

    window.addEventListener('touchstart', function (event) {
        if (event.target.classList && event.target.classList.contains('window-drag')) {
            event.preventDefault();
            dragging = true;
            wX = event.touches[0].screenX;
            wY = event.touches[0].screenY;
            Window.current._window._dragStart();
        }
    });

    window.addEventListener('mousemove', function (event) {
        if (dragging) {
            // Stop text selection:
            window.getSelection().removeAllRanges();
            // Drag:
            Window.current._window._dragBy(event.screenX - wX, event.screenY - wY);
        }
    });

    window.addEventListener('touchmove', function (event) {
        if (dragging) {
            event.preventDefault();
            // Stop text selection:
            window.getSelection().removeAllRanges();
            // Drag:
            Window.current._window._dragBy(event.touches[0].screenX - wX, event.touches[0].screenY - wY);
        }
    });

    window.addEventListener('mouseup', function (event) {
        if (dragging) {
            dragging = false;
            Window.current._window._dragStop();
        }
    });

    window.addEventListener('touchend', function (event) {
        if (dragging) {
            event.preventDefault();
            dragging = false;
            Window.current._window._dragStop();
        }
    });

    // Add context menu:
    let Menu = remote.Menu;
    let MenuItem = remote.MenuItem;
    let rightClickPosition = null;
    let menu = new Menu();

    menu.append(new MenuItem({
        label: 'Reload',
        accelerator: 'CmdOrCtrl+R',
        click: function () {
            Window.current._window.reload();
        }
    }));
    menu.append(new MenuItem({
        label: 'Reload app and restart children',
        click: function () {
            // Close ALL windows:
            for (const window of windowmanager._windows.values()) {
                window.close();
            }
            // Relaunch app:
            remote.app.relaunch();
            remote.app.exit(0);
        }
    }));
    menu.append(new MenuItem({ type: 'separator' }));
    menu.append(new MenuItem({
        label: 'Inspect Element',
        accelerator: 'CmdOrCtrl+Shift+I',
        click: function () {
            Window.current._window.inspectElement(rightClickPosition.x, rightClickPosition.y);
        }
    }));

    window.addEventListener('contextmenu', function (event) {
        event.preventDefault();
        rightClickPosition = { x: event.x, y: event.y };
        menu.popup(Window.current._window);
    }, false);
})();

function resolveWindowWithID(id) {
    let window = windowmanager._windows.get(id);

    if (window) return window;

    // Window isn't registered yet in windowmanager, so do so:
    let electronWin = BrowserWindow.fromId(id);

    if (electronWin !== null) {
        return new Window(electronWin);
    }
}

// Add other browser windows to global windows:
for (let other of BrowserWindow.getAllWindows()) {
    resolveWindowWithID(other.id);
}

ipcRenderer.on('window-create', function (event, otherID) {
    windowmanager.emit('window-create', resolveWindowWithID(otherID));
});

windowmanager.Window = Window;
export default Window;
