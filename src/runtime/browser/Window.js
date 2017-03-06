import windowmanager from './global';
import { EventHandler, getUniqueWindowName } from '../../utils/index';
import { BoundingBox, Position, Size, Vector } from '../../geometry/index';

const defaultConfig = {
    width: 800,
    height: 500,
    frame: true,
    resizable: true,
    show: true,
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
 * @param {String|null} error - String on error, or null if no error
 * @param {Object|null} result - Object on success, or null if error
 */

/**
 * A Window class.
 * @extends EventHandler
 */
class Window extends EventHandler {
    /**
     * Wraps a window object.
     * @param {Object} [config] - Window Configuration
     * @param {Number} [config.width=800]
     * @param {Number} [config.height=500]
     * @param {Boolean} [config.frame=true] - When true, enables standard OS framing around the window
     * @param {Boolean} [config.resizable=true] - When true, allows user to resize window by dragging edges
     * @param {Boolean} [config.show=true] - When true, starts the window in the "show" state rather than "hidden"
     * @param {String} [config.icon='favicon.ico'] - Location to favicon
     * @param {String} [config.url='.'] - Location to page that the window should load
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
                    config[prop] = (config[prop] != null ? config[prop] : defaultConfig[prop]);
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

            let newWindow = windowmanager._launcher.document.createElement('div');
            let iframe = windowmanager._launcher.document.createElement('iframe');

            newWindow.style.position = 'absolute';
            iframe.style.margin = iframe.style.padding = iframe.style.border = 0;
            newWindow.style.resize = 'both';
            newWindow.style.overflow = 'visible';
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
            windowmanager._launcher.document.body.appendChild(newWindow);

            // Set up iframe for page:
            iframe.src = config.url;
            iframe.style.margin = iframe.style.padding = iframe.style.border = 0;
            iframe.style.width = iframe.style.height = '100%';
            newWindow.appendChild(iframe);

            this._window = iframe;
            this._wrapper = newWindow;
            windowmanager._windows.set(this._id, this);
            this._ready = true;
            this.emit('ready');
            windowmanager._internalBus.emit('window-create', this);
            this.bringToFront();
            this.focus();
        } else {
            this._minSize = new BoundingBox(defaultConfig.minWidth, defaultConfig.minHeight);
            this._maxSize = new BoundingBox(defaultConfig.maxWidth, defaultConfig.maxHeight);
            this._wrapper = this._window = config.document.body;
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
        return new Position(this._wrapper.getBoundingClientRect());
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
        return this._wrapper.getBoundingClientRect().height;
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
        let box = this._wrapper.getBoundingClientRect();

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

        this._wrapper.parentElement.removeChild(this._wrapper);
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
        this._wrapper.style.left = 0;
        this._wrapper.style.top = 0;
        this._wrapper.style.width = '100%';
        this._wrapper.style.height = '100%';
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
            window._wrapper.style.display = '';
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
            window._wrapper.style.display = 'none';
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
                window._wrapper.style.left = window._restoreBounds.left + 'px';
                window._wrapper.style.top = window._restoreBounds.top + 'px';
                window._wrapper.style.width = window._restoreBounds.getWidth() + 'px';
                window._wrapper.style.height = window._restoreBounds.getHeight() + 'px';
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
                window._wrapper.style['z-index'] = windowmanager._getNextZIndex();
            }
        }
        this._wrapper.style['z-index'] = windowmanager._getNextZIndex();
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
     * @param {Number} width
     * @param {Number} height
     * @param {Callback=}
     */
    resizeTo(width, height, callback) {
        if (!this._ready) { throw new Error('resizeTo can\'t be called on an unready window'); }
        if (!this.emit('resize-before')) { return; } // Allow preventing resize
        let size = new Position(width, height);

        this.undock();
        this._wrapper.style.width = size.left + 'px';
        this._wrapper.style.height = size.top + 'px';
        if (callback) { callback(); }
    }

    /**
     * Moves the window instance.
     * @param {Number} left
     * @param {Number} top
     * @param {Callback=}
     */
    moveTo(left, top, callback) {
        if (!this._ready) { throw new Error('moveTo can\'t be called on an unready window'); }
        if (!this.emit('move-before')) { return; } // Allow preventing move
        let deltaPos = (new Position(left, top)).subtract(this.getPosition());

        for (let window of this._dockedGroup) {
            let pos = window.getPosition().add(deltaPos);

            window._wrapper.style.left = pos.left + 'px';
            window._wrapper.style.top = pos.top + 'px';
        }
        if (callback) { callback(); }
    }

    /**
     * Moves the window instance relative to its current position.
     * @param {Number} deltaLeft
     * @param {Number} deltaTop
     * @param {Callback=}
     */
    moveBy(deltaLeft, deltaTop, callback) {
        if (!this._ready) { throw new Error('moveBy can\'t be called on an unready window'); }
        if (!this.emit('move-before')) { return; } // Allow preventing move
        let deltaPos = new Position(deltaLeft, deltaTop);

        for (let window of this._dockedGroup) {
            let pos = window.getPosition().add(deltaPos);

            window._wrapper.style.left = pos.left + 'px';
            window._wrapper.style.top = pos.top + 'px';
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
        this._wrapper.style.minWidth = this._minSize.left + 'px';
        this._wrapper.style.minHeight = this._minSize.top + 'px';
        if (this.getWidth() < size.left || this.getHeight() < size.top) {
            // Resize window to meet new min size:
            // TODO: Take into account transform?
            this._wrapper.style.width = Math.max(this.getWidth(), size.left) + 'px';
            this._wrapper.style.height = Math.max(this.getHeight(), size.top) + 'px';
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
        this._wrapper.style.width = Math.min(this._maxSize.left, Math.max(this._minSize.left, size.left)) + 'px';
        this._wrapper.style.height = Math.min(this._maxSize.top, Math.max(this._minSize.top, size.top)) + 'px';
        // Clear transform:
        for (let transformPropName of transformPropNames) {
            this._wrapper.style[transformPropName] = '';
        }
        if (callback) { callback(); }
        this.emit('resize');
    }

    forceScaledSize(width, height, callback) {
        if (!this._ready) { throw new Error('setMaxSize can\'t be called on an unready window'); }
        const size = new Size(Math.min(this._maxSize.left, Math.max(this._minSize.left, width)),
                            Math.min(this._maxSize.top, Math.max(this._minSize.top, height)));

        this.undock(); // TODO: Support changing size when docked.
        this._wrapper.style.width = size.left + 'px';
        this._wrapper.style.height = size.top + 'px';
        // TODO: Calc transform:
        let transform = Math.min(width / size.left, height / size.top);

        for (let transformPropName of transformPropNames) {
            this._wrapper.style[transformPropName] = 'scale(' + transform + ')';
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
        this._wrapper.style.maxWidth = this._maxSize.left + 'px';
        this._wrapper.style.maxHeight = this._maxSize.top + 'px';
        if (this.getWidth() > size.left || this.getHeight() > size.top) {
            // Resize window to meet new min size:
            // TODO: Take into account transform?
            this._wrapper.style.width = Math.min(this.getWidth(), size.left) + 'px';
            this._wrapper.style.height = Math.min(this.getHeight(), size.top) + 'px';
            // Clear transform:
            for (let transformPropName of transformPropNames) {
                this._wrapper.style[transformPropName] = '';
            }
            if (callback) { callback(); }
            this.emit('resize');
        } else {
            if (callback) { callback(); }
        }
    }

    /**
     * Sets the bounds of the window instance.
     * @param {Number} left
     * @param {Number} top
     * @param {Number} right
     * @param {Number} bottom
     * @param {Callback=}
     */
    setBounds(left, top, right, bottom, callback) {
        if (!this._ready) { throw new Error('resizeTo can\'t be called on an unready window'); }
        let bounds = new BoundingBox(left, top, right, bottom);

        this.undock(); // TODO: Support changing size when docked.
        this._wrapper.style.left = bounds.left + 'px';
        this._wrapper.style.top = bounds.top + 'px';
        // TODO: Take into account transform?
        this._wrapper.style.width = Math.min(this._maxSize.left, Math.max(this._minSize.left, bounds.getWidth())) + 'px';
        this._wrapper.style.height = Math.min(this._maxSize.top, Math.max(this._minSize.top, bounds.getHeight())) + 'px';
        // Clear transform:
        for (let transformPropName of transformPropNames) {
            this._wrapper.style[transformPropName] = '';
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

            other._wrapper.style.left = (pos.left + deltaLeft) + 'px';
            other._wrapper.style.top = (pos.top + deltaTop) + 'px';
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
     * Returns the {@link Window} instance that is the main window.
     * @returns {Window}
     */
    static getMain() {
        return windowmanager._launcher.windowmanager.Window.getCurrent();
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

windowmanager.Window = Window;
export default Window;
