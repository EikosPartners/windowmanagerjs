/* global fin */
import windowmanager from './global';
import readySync from '../ready';
import { EventHandler, getUniqueWindowName, SyncCallback } from '../../utils/index';
import { BoundingBox, Position, Size, Vector } from '../../geometry/index';

const defaultConfig = {
    defaultWidth: 600,
    defaultHeight: 600,
    frame: false,
    resizable: true,
    saveWindowState: false,
    autoShow: true,
    icon: location.href + 'favicon.ico'
};
const configMap = {
    title: 'name',
    left: 'defaultLeft',
    top: 'defaultTop',
    width: 'defaultWidth',
    height: 'defaultHeight'
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
let currentWin;

function _setupDOM(config) {
    let thisWindow = this;

    // TODO: Rewrite to remove setTimeout for the following:
    function setWindows() {
        if (thisWindow._window.contentWindow.windowmanager) {
            thisWindow._window.contentWindow.windowmanager._launcher = windowmanager._launcher;
            thisWindow._window.contentWindow.windowmanager._windows = windowmanager._windows;
            thisWindow._window.contentWindow.windowmanager._internalBus = windowmanager._internalBus;
        } else {
            setTimeout(setWindows, 5);
        }
    }
    setWindows();

    this._window.getBounds(function (bounds) {
        bounds.right = bounds.left + bounds.width;
        bounds.bottom = bounds.top + bounds.height;
        thisWindow._bounds.set(new BoundingBox(bounds));
    });

    // Setup _window event listeners:
    // TODO: look into moving these elsewhere, might not work if currentWin is closed, and thisWindow is not.
    function onBoundsChange(event) {
        event.right = event.left + event.width;
        event.bottom = event.top + event.height;
        thisWindow._bounds.set(new BoundingBox(event));

        if (event.changeType !== 0) {
            thisWindow.undock(); // Undock on resize. TODO: Allow resize with docking
        }
        if (event.changeType !== 1) {
            thisWindow.emit('move'); // TODO: Pass what position it is at.
        }
    }
    this._window.addEventListener('bounds-changing', onBoundsChange);
    this._window.addEventListener('bounds-changed', onBoundsChange);

    function onClose() {
        // TODO: Is it possible that onClose might not be called when the window is closed?
        //       What if this event is set up on a window that has closed already, and then this window closes?
        thisWindow._isClosed = true;
        windowmanager._windows.delete(thisWindow._id);

        // Undock:
        thisWindow.undock();

        // Move children to parent:
        const parent = thisWindow.getParent();

        for (const child of thisWindow.getChildren()) {
            // We use getChildren to have a copy of the list, so child.setParent doesn't modify this loop's list!
            // TODO: Optimize this loop, by not making a copy of children, and not executing splice in each setParent!
            child.setParent(parent);
        }
        thisWindow.setParent(undefined); // Remove from parent

        thisWindow.emit('close');
        windowmanager._internalBus.emit('window-close', thisWindow);
        thisWindow._window = undefined;
        // TODO: Clean up ALL listeners
    }
    this._window.addEventListener('closed', onClose);

    // Setup event listeners:
    this._window.addEventListener('shown', () => {
        thisWindow.emit('show');
    });
    this._window.addEventListener('hidden', () => {
        thisWindow.emit('hide');
    });
    this._window.addEventListener('restored', () => {
        thisWindow.emit('restore');
    });
    this._window.addEventListener('minimized', () => {
        thisWindow.emit('minimize');
    });
    this._window.addEventListener('maximized', () => {
        thisWindow.emit('maximize');
    });
    this._window.addEventListener('focused', () => {
        thisWindow.emit('focus');
    });
    this._window.addEventListener('blurred', () => {
        thisWindow.emit('blur');
    });

    // Setup title element:
    this._titleEl = this._window.contentWindow.document.createElement('title');
    this._titleEl.innerText = this._title;
    this._window.contentWindow.document.head.appendChild(this._titleEl);

    this._isFramed = config.frame;
    this._ready = true;
    this.emit('ready');
    windowmanager._internalBus.emit('window-create', this);
};

class Window extends EventHandler {
    constructor(config) {
        // Call the parent constructor:
        super(acceptedEventHandlers);

        config = config || {}; // If no arguments are passed, assume we are creating a default blank window
        const isArgConfig = (config.app_uuid === undefined);

        // Setup private variables:
        this._bounds = new BoundingBox();
        this._ready = false;
        // TODO: Identify current states.
        this._isClosed = false;
        this._isHidden = false;
        this._isMinimized = false;
        this._isMaximized = false;
        this._dockedGroup = [this];
        this._children = [];
        this._parent = undefined;
        this._title = undefined;

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
            this._id = getUniqueWindowName();
            this._title = config.name == null ? this._id : config.name;
            config.name = this._id; // Need name to be unique

            if (config.parent) {
                config.parent._children.push(this);
                this._parent = config.parent;
                // TODO: Emit event 'child-added' on parent
                delete config.parent;
            }

            windowmanager._windows.set(this._id, this);
            this._window = new fin.desktop.Window(config, _setupDOM.bind(this, config), function (err) {
                console.error(err, config);
            });
        } else {
            this._id = config._id || config.name;
            this._title = this._id;
            this._window = config;
            windowmanager._windows.set(this._id, this);
            this._window.getOptions(_setupDOM.bind(this), function (err) {
                console.error(err);
            });
        }

        // TODO: Ensure docking system
    }

    isReady() {
        return this._ready;
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
        return this._bounds.getPosition();
    }

    getWidth() {
        return this._bounds.getWidth();
    }

    getHeight() {
        return this._bounds.getHeight();
    }

    getSize() {
        return this._bounds.getSize();
    }

    getBounds() {
        return this._bounds.clone();
    }

    getParent() {
        return this._parent;
    }

    setParent(parent) {
        // TODO: Execute appropriate checks (if not closed, and is this new parent a window)

        if (parent === this._parent) { return; }

        if (this._parent) {
            const index = this._parent._children.indexOf(this);

            if (index >= 0) { this._parent._children.splice(index, 1); }
            // TODO: Emit event 'child-removed' on current parent.
        }

        if (parent) {
            this._parent = parent;
            this._parent._children.push(this);
            // TODO: Emit event 'child-added on parent'.
        }
    }

    getChildren() {
        return this._children.slice();
    }

    addChild(child) {
        child.setParent(this);
    }

    getTitle() {
        return this._title;
    }

    setTitle(newTitle) {
        if (!newTitle) { throw new Error('setTitle requires one argument of type String'); }
        this._titleEl.innerText = this._title = newTitle;
    }

    isHidden() {
        return this._isHidden;
    }

    isShown() {
        return !this._isHidden;
    }

    isMinimized() {
        return this._isMinimized;
    }

    isMaximized() {
        return this._isMaximized;
    }

    isRestored() {
        return this.isShown() && !this.isMinimized() && !this.isMaximized();
    }

    close(callback) {
        if (this.isClosed()) { return callback && callback(); }
        this._window.close(callback);
    }

    minimize(callback) {
        if (!this._ready) { throw new Error('minimize can\'t be called on an unready window'); }

        callback = new SyncCallback(callback);
        for (let window of this._dockedGroup) {
            window._isMinimized = true;
            window._window.minimize(callback.ref());
        }
    }

    maximize(callback) {
        if (!this._ready) { throw new Error('maximize can\'t be called on an unready window'); }

        this._isMaximized = true;
        this._window.maximize(callback);
    }

    show(callback) {
        if (!this._ready) { throw new Error('show can\'t be called on an unready window'); }

        callback = new SyncCallback(callback);
        for (let window of this._dockedGroup) {
            window._isHidden = false;
            window._window.show(callback.ref());
        }
    }

    hide(callback) {
        if (!this._ready) { throw new Error('hide can\'t be called on an unready window'); }

        callback = new SyncCallback(callback);
        for (let window of this._dockedGroup) {
            window._isHidden = true;
            window._window.hide(callback.ref());
        }
    }

    restore(callback) {
        if (!this._ready) { throw new Error('restore can\'t be called on an unready window'); }

        callback = new SyncCallback(callback);
        for (let window of this._dockedGroup) {
            window._isHidden = false;
            window._isMinimized = false;
            window._isMaximized = false;
            window._window.restore(callback.ref());
        }
    }

    resizable(resizable, callback) {
        if (!this._ready) { throw new Error('restore can\'t be called on an unready window'); }

        this._window.updateOptions({
            resizable: resizable
        }, callback);
    }

    bringToFront(callback) {
        if (!this._ready) { throw new Error('bringToFront can\'t be called on an unready window'); }
        let thisWindow = this;

        let beforeCallback = new SyncCallback(function () {
            thisWindow._window.bringToFront(callback);
        });

        for (let window of this._dockedGroup) {
            if (window !== this) {
                window._window.bringToFront(beforeCallback.ref());
            }
        }
    }

    focus(callback) {
        if (!this._ready) { throw new Error('focus can\'t be called on an unready window'); }
        let thisWindow = this;

        let beforeCallback = new SyncCallback(function () {
            thisWindow._window.focus(callback);
        });

        for (let window of this._dockedGroup) {
            if (window !== this) {
                window._window.focus(beforeCallback.ref());
            }
        }
    }

    resizeTo(width, height, callback) {
        if (!this._ready) { throw new Error('resizeTo can\'t be called on an unready window'); }
        if (!this.emit('resize-before')) { return; } // Allow preventing resize
        let size = new Position(width, height);

        this._window.resizeTo(size.left, size.top, 'top-left', callback);
    }

    moveTo(left, top, callback) {
        if (!this._ready) { throw new Error('moveTo can\'t be called on an unready window'); }
        if (!this.emit('move-before')) { return; } // Allow preventing move
        let deltaPos = (new Position(left, top)).subtract(this.getPosition());

        callback = new SyncCallback(callback);
        for (let window of this._dockedGroup) {
            let pos = window.getPosition().add(deltaPos);

            window._bounds.moveTo(pos);
            window._window.moveTo(pos.left, pos.top, callback.ref());
        }
    }

    moveBy(deltaLeft, deltaTop, callback) {
        if (!this._ready) { throw new Error('moveBy can\'t be called on an unready window'); }
        if (!this.emit('move-before')) { return; } // Allow preventing move
        let deltaPos = new Position(deltaLeft, deltaTop);

        callback = new SyncCallback(callback);
        for (let window of this._dockedGroup) {
            let pos = window.getPosition().add(deltaPos);

            window._bounds.moveTo(pos);
            window._window.moveTo(pos.left, pos.top, callback.ref());
        }
    }

    setSize(width, height, callback) {
        if (!this._ready) { throw new Error('setSize can\'t be called on an unready window'); }
        const size = new Size(width, height);

        this._window.resizeTo(size.left, size.top, 'top-left', callback);
    }

    setBounds(left, top, right, bottom, callback) {
        if (!this._ready) { throw new Error('resizeTo can\'t be called on an unready window'); }
        let bounds = new BoundingBox(left, top, right, bottom);

        this._window.setBounds(bounds.left, bounds.top, bounds.right, bounds.bottom, callback);
    }

    dock(other) {
        if (!this.emit('dock-before')) { return; } // Allow preventing dock
        if (other == null) { return; } // Failed to find other. TODO: Return error
        if (this._isFramed || other._isFramed) return; // If window is framed, don't support dock system.

        // If other is already in the group, return:
        if (this._dockedGroup.indexOf(other) >= 0) { return; }

        // Loop through all windows in otherGroup and add them to this's group:
        for (let otherWin of other._dockedGroup) {
            this._dockedGroup.push(otherWin);
            // Sharing the array between window objects makes it easier to manage:
            otherWin._dockedGroup = this._dockedGroup;
        }

        // TODO: Check if otherGroup is touching
    }

    undock(other) {
        // Check to see if window is already undocked:
        if (this._dockedGroup.length === 1) { return; }

        // Undock this:
        this._dockedGroup.splice(this._dockedGroup.indexOf(this), 1);
        this._dockedGroup = [this];

        // TODO: Redock those still touching, EXCEPT 'this'.
    }

    _dragStart() {
        if (!this.emit('drag-start')) { return; } // Allow preventing drag
        for (let window of this._dockedGroup) {
            window._dragStartPos = window.getPosition();
        }
    }

    _dragBy(deltaLeft, deltaTop) {
        if (!this.emit('drag-before')) { return; } // Allow preventing drag
        // Perform Snap:
        const thisBounds = this.getBounds().moveTo(this._dragStartPos.left + deltaLeft,
            this._dragStartPos.top + deltaTop);
        let snapDelta = new Vector(NaN, NaN);

        if (!this._isFramed) {
            // If window is framed, don't support snap system.
            for (const other of windowmanager._windows.values()) {
                if (!other._isFramed && other._dockedGroup !== this._dockedGroup) {
                    snapDelta.setMin(thisBounds.getSnapDelta(other.getBounds()));
                }
            }
        }
        deltaLeft += snapDelta.left || 0;
        deltaTop += snapDelta.top || 0;

        for (let other of this._dockedGroup) {
            let pos = other._dragStartPos;

            // If other doesn't have a drag position, start it:
            if (pos === undefined) {
                pos = other._dragStartPos = other.getPosition();
                pos.left -= deltaLeft;
                pos.top -= deltaTop;
            }

            other._window.moveTo(pos.left + deltaLeft, pos.top + deltaTop);
        }
    }

    _dragStop() {
        // Dock to those it snapped to:
        const thisBounds = this.getBounds();

        if (!this._isFramed) {
            // If window is framed, don't support dock system.
            for (const other of windowmanager._windows.values()) {
                if (!other._isFramed && thisBounds.isTouching(other.getBounds())) {
                    this.dock(other);
                }
            }
        }

        for (let window of this._dockedGroup) {
            delete window._dragStartPos;
        }

        this.emit('drag-stop');
    }

    static getAll() {
        return Array.from(windowmanager._windows.values());
    }

    static getByID(id) {
        return windowmanager._windows.get(id);
    }

    static getMain(id) {
        return windowmanager._windows.get(windowmanager._launcher.name);
    }

    static getCurrent() {
        return Window.current;
    }
}

function setupCurrentWindow() {
    Window.current = windowmanager._windows.get(currentWin.name) || new Window(currentWin);

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
            Window.current._dragStart();
        }
    });

    window.addEventListener('touchstart', function (event) {
        if (event.target.classList && event.target.classList.contains('window-drag')) {
            event.preventDefault();
            dragging = true;
            wX = event.touches[0].screenX;
            wY = event.touches[0].screenY;
            Window.current._dragStart();
        }
    });

    window.addEventListener('mousemove', function (event) {
        if (dragging) {
            // Stop text selection:
            window.getSelection().removeAllRanges();
            // Drag:
            Window.current._dragBy(event.screenX - wX, event.screenY - wY);
        }
    });

    window.addEventListener('touchmove', function (event) {
        if (dragging) {
            event.preventDefault();
            // Stop text selection:
            window.getSelection().removeAllRanges();
            // Drag:
            Window.current._dragBy(event.touches[0].screenX - wX, event.touches[0].screenY - wY);
        }
    });

    window.addEventListener('mouseup', function (event) {
        if (dragging) {
            dragging = false;
            Window.current._dragStop();
        }
    });

    window.addEventListener('touchend', function (event) {
        if (dragging) {
            event.preventDefault();
            dragging = false;
            Window.current._dragStop();
        }
    });
}

// Handle current window in this context:
// TODO: Rewrite to remove setTimeout for the following:
fin.desktop.main(readySync.ref(function () {
    currentWin = fin.desktop.Window.getCurrent();
    let currentReady = readySync.ref(setupCurrentWindow);

    function getCurrent() {
        if (windowmanager._windows) {
            currentReady();
        } else {
            setTimeout(getCurrent, 5);
        }
    }
    getCurrent();
}));

windowmanager.Window = Window;
export default Window;
