import windowmanager from './global';
import { EventHandler, getUniqueWindowName } from '../../utils/index';
import { BoundingBox, Position, Size, Vector } from '../../geometry/index';

const defaultConfig = {
    width: 600,
    height: 600,
    frame: false,
    resizable: true,
    saveWindowState: false,
    autoShow: true,
    icon: location.href + 'favicon.ico',
    url: '.',
    minWidth: 100,
    minHeight: 100,
    maxWidth: Infinity,
    maxHeight: Infinity
};
const configMap = {
};
const acceptedEventHandlers = [
    'ready',
    'drag-start', 'drag-before', 'drag-stop',
    'dock-before',
    'move', 'move-before',
    'resize-before', 'close', 'minimize'];
const transformPropNames = ['-ms-transform', '-moz-transform', '-o-transform',
    '-webkit-transform', 'transform'];

/**
 * @callback Callback
 * @param {string|null} error - String on error, or null if no error
 * @param {object|null} result - Object on success, or null if error
 */

/**
 * A Window class.
 * @extends EventHandler
 */
class Window extends EventHandler {
    /**
     * Wraps a window object.
     * @param {Object} config - Configuration
     */
    constructor(config) {
        // Call the parent constructor:
        super(acceptedEventHandlers);

        config = config || {}; // If no arguments are passed, assume we are creating a default blank window
        const isArgConfig = !(config instanceof window.Window);

        // Setup private variables:
        this._ready = false;
        // TODO: Identify current states.
        this._isClosed = false;
        this._isHidden = false;
        this._isMinimized = false;
        this._isMaximized = false;
        this._dockedGroup = [this];
        this._children = []; // TODO: Add way to remove or change heirarchy.
        this._parent = undefined;
        this._title = undefined;
        this._id = getUniqueWindowName();

        if (isArgConfig) {
            for (const prop in config) {
                if (config.hasOwnProperty(prop) && configMap[prop] !== undefined) {
                    config[configMap[prop]] = config[prop];
                    delete config[prop];
                }
            }
            for (const prop in defaultConfig) {
                if (defaultConfig.hasOwnProperty(prop)) {
                    config[prop] = config[prop] || defaultConfig[prop];
                }
            }
            this._title = config.title == null ? this._id : config.title;

            if (config.parent) {
                config.parent._children.push(this);
                this._parent = config.parent;
                // TODO: Emit event 'child-added' on parent
                delete config.parent;
            }

            this._minSize = new BoundingBox(config.minWidth, config.minHeight);
            this._maxSize = new BoundingBox(config.maxWidth, config.maxHeight);

            let newWindow = windowmanager._launcher.document.createElement('iframe');

            newWindow.src = config.url;
            newWindow.style.position = 'absolute';
            if (!Number.isFinite(config.left)) {
                config.left = (windowmanager._launcher.innerWidth - config.width) / 2;
            }
            newWindow.style.left = config.left + 'px';
            if (!Number.isFinite(config.top)) {
                config.top = (windowmanager._launcher.innerHeight - config.height) / 2;
            }
            newWindow.style.top = config.top + 'px';
            newWindow.style.width = config.width + 'px';
            newWindow.style.height = config.height + 'px';
            newWindow.style.minWidth = this._minSize.left + 'px';
            newWindow.style.minHeight = this._minSize.top + 'px';
            newWindow.style.maxWidth = this._maxSize.left + 'px';
            newWindow.style.maxHeight = this._maxSize.top + 'px';
            newWindow.style.margin = 0;
            newWindow.style.padding = 0;
            newWindow.style.border = 0;
            newWindow.style.resize = 'both';
            newWindow.style.overflow = 'auto';
            windowmanager._launcher.document.body.appendChild(newWindow);

            this._window = newWindow;
            windowmanager._windows.set(this._id, this);
            this._ready = true;
            this.emit('ready');
            windowmanager._internalBus.emit('window-create', this);
            this.bringToFront();
            this.focus();
        } else {
            this._minSize = new BoundingBox(defaultConfig.minWidth, defaultConfig.minHeight);
            this._maxSize = new BoundingBox(defaultConfig.maxWidth, defaultConfig.maxHeight);
            this._window = config.document.body;
            windowmanager._windows.set(this._id, this);
            this._ready = true;
        }
    }

    /**
     * Returns true if the {@link Window} instance is created, not closed, and ready for method calls.
     * @returns {Boolean}
     */
    isReady() {
        return this._ready;
    }

    /**
     * Calls a callback when window is ready and setup.
     * @param {Callback=}
     */
    onReady(callback) {
        if (this.isClosed()) { throw new Error('onReady can\'t be called on a closed window'); }
        if (this.isReady()) { return callback.call(this); }

        this.once('ready', callback);
    }

    /**
     * Returns whether window has been closed already.
     * @returns {Boolean}
     */
    isClosed() {
        return this._isClosed;
    }

    /**
     * Returns window's current position.
     * @returns {Vector}
     */
    getPosition() {
        return new Position(this._window.getBoundingClientRect());
    }

    getMinWidth() {
        return this._minSize.left;
    }

    /**
     * Returns window's width.
     * @returns {Number}
     */
    getWidth() {
        return this._window.getBoundingClientRect().width;
    }

    getMaxWidth() {
        return this._maxSize.left;
    }

    getMinHeight() {
        return this._minSize.top;
    }

    /**
     * Returns window's height.
     * @returns {Number}
     */
    getHeight() {
        return this._window.getBoundingClientRect().height;
    }

    getMaxHeight() {
        return this._maxSize.top;
    }

    getMinSize() {
        return this._minSize.clone();
    }

    /**
     * Returns window's size.
     * @returns {Size}
     */
    getSize() {
        let box = this._window.getBoundingClientRect();

        return new Size(box.width, box.height);
    }

    getMaxSize() {
        return this._maxSize.clone();
    }

    /**
     * Returns window's bounding box.
     * @returns {BoundingBox}
     */
    getBounds() {
        return new BoundingBox(this._window.getBoundingClientRect());
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

    /**
     * Returns window's title.
     * @returns {String}
     */
    getTitle() {
        return this._title;
    }

    /**
     * Sets window's title.
     * @param {String}
     */
    setTitle(title) {
        if (!title) { throw new Error('setTitle requires one argument of type String'); }
        this._title = title;
    }

    /**
     * Returns true if window is hidden.
     * @returns {Boolean}
     */
    isHidden() {
        return this._isHidden;
    }

    /**
     * Returns true if window is not hidden.
     * @returns {Boolean}
     */
    isShown() {
        return !this._isHidden;
    }

    /**
     * Returns true if window is minimized.
     * @returns {Boolean}
     */
    isMinimized() {
        return this._isMinimized;
    }

    /**
     * Returns true if window is maximized.
     * @returns {Boolean}
     */
    isMaximized() {
        return this._isMaximized;
    }

    /**
     * Returns true if window is not hidden or minimize or maximized.
     * @returns {Boolean}
     */
    isRestored() {
        return this.isShown() && !this.isMinimized() && !this.isMaximized();
    }

    /**
     * Closes the window instance.
     * @param {Callback=}
     */
    close(callback) {
        if (this.isClosed()) { return callback && callback(); }

        this._window.parentElement.removeChild(this._window);
        windowmanager._windows.delete(this._id);

        // Undock:
        this.undock();

        // Move children to parent:
        const parent = this.getParent();

        for (const child of this.getChildren()) {
            // We use getChildren to have a copy of the list, so child.setParent doesn't modify this loop's list!
            // TODO: Optimize this loop, by not making a copy of children, and not executing splice in each setParent!
            child.setParent(parent);
        }
        this.setParent(undefined); // Remove from parent

        this._isClosed = true;
        if (callback) { callback(); }
        this.emit('close');
        windowmanager._internalBus.emit('window-close', this);
    }

    /**
     * Minimizes the window instance.
     * @param {Callback=}
     */
    minimize(callback) {
        if (!this._ready) { throw new Error('minimize can\'t be called on an unready window'); }

        // TODO: What do we do on minimize in this runtime?
        for (let window of this._dockedGroup) {
            window._isMinimized = true;
            window.emit('minimize');
        }
    }

    /**
     * Maximizes the window instance.
     * @param {Callback=}
     */
    maximize(callback) {
        if (!this._ready) { throw new Error('maximize can\'t be called on an unready window'); }

        this._restoreBounds = this.getBounds();
        this._window.style.left = 0;
        this._window.style.top = 0;
        this._window.style.width = '100%';
        this._window.style.height = '100%';
        this._isMaximized = true;
        if (callback) { callback(); }
    }

    /**
     * Unhides the window instance.
     * @param {Callback=}
     */
    show(callback) {
        if (!this._ready) { throw new Error('show can\'t be called on an unready window'); }

        for (let window of this._dockedGroup) {
            window._window.style.display = '';
            window._isHidden = false;
        }
        if (callback) { callback(); }
    }

    /**
     * Hides the window instance.
     * @param {Callback=}
     */
    hide(callback) {
        if (!this._ready) { throw new Error('hide can\'t be called on an unready window'); }

        for (let window of this._dockedGroup) {
            window._window.style.display = 'none';
            window._isHidden = true;
        }
        if (callback) { callback(); }
    }

    /**
     * Restores the window instance from the minimized or maximized states.
     * @param {Callback=}
     */
    restore(callback) {
        if (!this._ready) { throw new Error('restore can\'t be called on an unready window'); }

        for (let window of this._dockedGroup) {
            if (window._isMaximized) {
                window._window.style.left = window._restoreBounds.left + 'px';
                window._window.style.top = window._restoreBounds.top + 'px';
                window._window.style.width = window._restoreBounds.getWidth() + 'px';
                window._window.style.height = window._restoreBounds.getHeight() + 'px';
                window._isHidden = false;
                window._isMinimized = false;
                window._isMaximized = false;
            }
        }
        if (callback) { callback(); }
    }

    /**
     * Brings the window instance to the front of all windows.
     * @param {Callback=}
     */
    bringToFront(callback) {
        if (!this._ready) { throw new Error('bringToFront can\'t be called on an unready window'); }

        for (let window of this._dockedGroup) {
            if (window !== this) {
                window._window.style['z-index'] = windowmanager._getNextZIndex();
            }
        }
        this._window.style['z-index'] = windowmanager._getNextZIndex();
        if (callback) { callback(); }
    }

    /**
     * Sets focus to the window instance.
     * @param {Callback=}
     */
    focus(callback) {
        if (!this._ready) { throw new Error('focus can\'t be called on an unready window'); }

        for (let window of this._dockedGroup) {
            if (window !== this) { window._window.contentWindow.focus(); }
        }
        this._window.contentWindow.focus();
        if (callback) { callback(); }
    }

    /**
     * Resizes the window instance.
     * @param {number} width
     * @param {number} height
     * @param {Callback=}
     */
    resizeTo(width, height, callback) {
        if (!this._ready) { throw new Error('resizeTo can\'t be called on an unready window'); }
        if (!this.emit('resize-before')) { return; } // Allow preventing resize
        let size = new Position(width, height);

        this.undock();
        this._window.width = size.left + 'px';
        this._window.height = size.top + 'px';
        if (callback) { callback(); }
    }

    /**
     * Moves the window instance.
     * @param {number} left
     * @param {number} top
     * @param {Callback=}
     */
    moveTo(left, top, callback) {
        if (!this._ready) { throw new Error('moveTo can\'t be called on an unready window'); }
        if (!this.emit('move-before')) { return; } // Allow preventing move
        let deltaPos = (new Position(left, top)).subtract(this.getPosition());

        for (let window of this._dockedGroup) {
            let pos = window.getPosition().add(deltaPos);

            window._window.style.left = pos.left + 'px';
            window._window.style.top = pos.top + 'px';
        }
        if (callback) { callback(); }
    }

    /**
     * Moves the window instance relative to its current position.
     * @param {number} deltaLeft
     * @param {number} deltaTop
     * @param {Callback=}
     */
    moveBy(deltaLeft, deltaTop, callback) {
        if (!this._ready) { throw new Error('moveBy can\'t be called on an unready window'); }
        if (!this.emit('move-before')) { return; } // Allow preventing move
        let deltaPos = new Position(deltaLeft, deltaTop);

        for (let window of this._dockedGroup) {
            let pos = window.getPosition().add(deltaPos);

            window._window.style.left = pos.left + 'px';
            window._window.style.top = pos.top + 'px';
        }
        if (callback) { callback(); }
        for (let window of this._dockedGroup) {
            window.emit('move');
        }
    }

    setMinSize(width, height, callback) {
        if (!this._ready) { throw new Error('setMinSize can\'t be called on an unready window'); }
        const size = new Size(width, height);

        this.undock(); // TODO: Support changing size when docked.
        this._minSize.left = size.left;
        this._minSize.top = size.top;
        this._window.style.minWidth = this._minSize.left + 'px';
        this._window.style.minHeight = this._minSize.top + 'px';
        if (this.getWidth() < size.left || this.getHeight() < size.top) {
            // Resize window to meet new min size:
            // TODO: Take into account transform?
            this._window.style.width = Math.max(this.getWidth(), size.left) + 'px';
            this._window.style.height = Math.max(this.getHeight(), size.top) + 'px';
            if (callback) { callback(); }
            this.emit('resize');
        } else {
            if (callback) { callback(); }
        }
    }

    setSize(width, height, callback) {
        if (!this._ready) { throw new Error('setMaxSize can\'t be called on an unready window'); }
        const size = new Size(width, height);

        this.undock(); // TODO: Support changing size when docked.
        this._window.style.width = Math.min(this._maxSize.left, Math.max(this._minSize.left, size.left)) + 'px';
        this._window.style.height = Math.min(this._maxSize.top, Math.max(this._minSize.top, size.top)) + 'px';
        // Clear transform:
        for (let transformPropName of transformPropNames) {
            this._window.style[transformPropName] = '';
        }
        if (callback) { callback(); }
        this.emit('resize');
    }

    forceScaledSize(width, height, callback) {
        if (!this._ready) { throw new Error('setMaxSize can\'t be called on an unready window'); }
        const size = new Size(Math.min(this._maxSize.left, Math.max(this._minSize.left, width)),
                            Math.min(this._maxSize.top, Math.max(this._minSize.top, height)));

        this.undock(); // TODO: Support changing size when docked.
        this._window.style.width = size.left + 'px';
        this._window.style.height = size.top + 'px';
        // TODO: Calc transform:
        let transform = Math.min(width / size.left, height / size.top);

        for (let transformPropName of transformPropNames) {
            this._window.style[transformPropName] = 'scale(' + transform + ')';
        }
        if (callback) { callback(); }
        this.emit('resize');
    }

    setMaxSize(width, height, callback) {
        if (!this._ready) { throw new Error('setMaxSize can\'t be called on an unready window'); }
        const size = new Size(width, height);

        this.undock(); // TODO: Support changing size when docked.
        this._maxSize.left = size.left;
        this._maxSize.top = size.top;
        this._window.style.maxWidth = this._maxSize.left + 'px';
        this._window.style.maxHeight = this._maxSize.top + 'px';
        if (this.getWidth() > size.left || this.getHeight() > size.top) {
            // Resize window to meet new min size:
            // TODO: Take into account transform?
            this._window.style.width = Math.min(this.getWidth(), size.left) + 'px';
            this._window.style.height = Math.min(this.getHeight(), size.top) + 'px';
            // Clear transform:
            for (let transformPropName of transformPropNames) {
                this._window.style[transformPropName] = '';
            }
            if (callback) { callback(); }
            this.emit('resize');
        } else {
            if (callback) { callback(); }
        }
    }

    /**
     * Sets the bounds of the window instance.
     * @param {number} left
     * @param {number} top
     * @param {number} right
     * @param {number} bottom
     * @param {Callback=}
     */
    setBounds(left, top, right, bottom, callback) {
        if (!this._ready) { throw new Error('resizeTo can\'t be called on an unready window'); }
        let bounds = new BoundingBox(left, top, right, bottom);

        this.undock(); // TODO: Support changing size when docked.
        this._window.style.left = bounds.left + 'px';
        this._window.style.top = bounds.top + 'px';
        // TODO: Take into account transform?
        this._window.style.width = Math.min(this._maxSize.left, Math.max(this._minSize.left, bounds.getWidth())) + 'px';
        this._window.style.height = Math.min(this._maxSize.top, Math.max(this._minSize.top, bounds.getHeight())) + 'px';
        // Clear transform:
        for (let transformPropName of transformPropNames) {
            this._window.style[transformPropName] = '';
        }
        // TODO: Events
        if (callback) { callback(); }
    }

    /**
     * Force docking this window to another. They don't need to be touching.
     * @param {Window}
     * @param {Callback=}
     */
    dock(other) {
        // TODO: Check if otherGroup is touching
        if (!this.emit('dock-before')) { return; } // Allow preventing dock
        if (other === undefined) { return; } // Failed to find other. TODO: Return error

        // If other is already in the group, return:
        if (this._dockedGroup.indexOf(other) >= 0) { return; }

        // Loop through all windows in otherGroup and add them to this's group:
        for (let otherWin of other._dockedGroup) {
            this._dockedGroup.push(otherWin);
            // Sharing the array between window objects makes it easier to manage:
            otherWin._dockedGroup = otherWin._dockedGroup;
        }
    }

    /**
     * Force undocking this window from it's group.<br>
     * TODO: Redock those still touching, EXCEPT 'this'.
     * @param {Window}
     * @param {Callback=}
     */
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
        this.restore();
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

        for (const other of windowmanager._windows.values()) {
            if (other._dockedGroup !== this._dockedGroup) {
                snapDelta.setMin(thisBounds.getSnapDelta(other.getBounds()));
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

            other._window.style.left = (pos.left + deltaLeft) + 'px';
            other._window.style.top = (pos.top + deltaTop) + 'px';
            other.emit('move');
        }
    }

    _dragStop() {
        // Dock to those it snapped to:
        const thisBounds = this.getBounds();

        for (const other of windowmanager._windows.values()) {
            if (thisBounds.isTouching(other.getBounds())) {
                this.dock(other);
            }
        }

        for (let window of this._dockedGroup) {
            delete window._dragStartPos;
        }

        this.emit('drag-stop');
    }

    /**
     * Returns a list of all {@link Window} instances open.
     * @returns {Window[]}
     */
    static getAll() {
        return Array.from(windowmanager._windows.values());
    }

    /**
     * Returns the {@link Window} instance that has `id`.
     * @param {String|Number}
     * @returns {Window|undefined}
     */
    static getByID(id) {
        return windowmanager._windows.get(id);
    }

    /**
     * Returns the {@link Window} instance that calls this function.
     * @returns {Window}
     */
    static getCurrent() {
        return Window.current;
    }
}

// Add launcher to list of windows:
if (windowmanager.runtime.isMain) {
    window.document.body.contentWindow = window;
    Window.current = new Window(window); // Force add launcher to window list
} else {
    // No need to do this for child windows, since _windows is shared across windows.
    // Handle current window in this context:
    Window.current = (function () {
        for (let win of windowmanager._windows.values()) {
            if (win._window.contentWindow === window) { return win; }
        }
    })();
}

if (!windowmanager.runtime.isMain) {
    // Setup handlers on this child window:
    let wX = 0;
    let wY = 0;
    let dragging = false;

    window.addEventListener('focus', function () {
        Window.current.bringToFront();
    });

    window.addEventListener('mousedown', function (event) {
        if (event.target.classList && event.target.classList.contains('window-drag')) {
            dragging = true;
            wX = event.screenX;
            wY = event.screenY;
            Window.current._dragStart();
        }
    });

    window.addEventListener('mousemove', function (event) {
        if (dragging) {
            Window.current._dragBy(event.screenX - wX, event.screenY - wY);
        }
    });

    window.addEventListener('mouseup', function () {
        dragging = false;
        Window.current._dragStop();
    });
}

windowmanager.Window = Window;
export default Window;
