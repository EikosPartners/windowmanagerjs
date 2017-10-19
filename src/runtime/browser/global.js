import windowmanager from '../../global';
import { EventHandler } from '../../utils/index';
import { BoundingBox, Position } from '../../geometry/index';

function getBrowserInfo() {
    // Credit: http://www.gregoryvarghese.com/how-to-get-browser-name-and-version-via-javascript/
    let ua = navigator.userAgent;
    let M = ua.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || [];
    let tem;

    if (/trident/i.test(M[1])) {
        tem = /\brv[ :]+(\d+)/g.exec(ua) || [];
        return { name: 'IE', version: (tem[1] || '') };
    }
    if (M[1] === 'Chrome') {
        tem = ua.match(/\bOPR\/(\d+)/);
        if (tem !== null) { return { name: 'Opera', version: tem[1] }; }
        tem = ua.match(/\bedge\/(\d+)/i);
        if (tem !== null) { return { name: 'Edge', version: tem[1] }; }
    }
    M = M[2] ? [M[1], M[2]] : [navigator.appName, navigator.appVersion, '-?'];
    if ((tem = ua.match(/version\/(\d+)/i)) !== null) { M.splice(1, 1, tem[1]); }
    return {
        name: M[0],
        version: M[1]
    };
}

let browser = getBrowserInfo();

windowmanager.runtime.name = browser.name;
windowmanager.runtime.version = browser.version;
windowmanager.runtime.isBrowser = true;
windowmanager.runtime.isMain = (window.parent === window);

try {
    window.parent.document;
} catch (e) {
    // If the above access errors out, it's due to CORS violation.
    // So assume this JavaScript window is the top-level window:
    windowmanager.runtime.isMain = true;
}

if (windowmanager.runtime.isMain) {
    // This is the main/root window!
    let nextZIndex = 1000; // TODO: Recycle Z-Indexes! In case of a (probably never) overflow!

    // The following is to fix Edge not sharing Map values across windows:
    class _Map {
        constructor() {
            this._map = Object.create(null);
        }

        values() {
            let values = Object.keys(this._map);

            for (let index = 0; index < values.length; index += 1) {
                values[index] = this._map[values[index]];
            }

            return values;
        }

        set(key, value) {
            this._map[key] = value;
        }

        get(key) {
            return this._map[key];
        }

        delete(key) {
            delete this._map[key];
        }
    }

    windowmanager._launcher = window;
    windowmanager._internalBus = new EventHandler(Object.keys(windowmanager._eventListeners));
    windowmanager._windows = new _Map();
    windowmanager._layouts = new _Map();

    // Create overlay:
    let overlay = window.document.createElement('div');

    overlay.style.position = 'absolute';
    overlay.style.left = '0';
    overlay.style.top = '0';
    overlay.style.right = '0';
    overlay.style.bottom = '0';
    overlay.style['z-index'] = '10000000';
    overlay.style.display = 'none';
    window.document.body.appendChild(overlay);
    windowmanager._overlay = overlay;

    windowmanager._getScale = () => {
        let scale = 1;

        if (screen.deviceXDPI) {
            // IE/Edge
            scale = screen.deviceXDPI / screen.logicalXDPI;
        } else {
            // Chrome
            scale = screen.width / overlay.clientWidth;
        }

        return scale;
    };

    const mousemove = (event) => {
        // Disable propagation of event to any other element (prevent underlying clicks):
        if (windowmanager._drag.down === '') return;
        event.preventDefault();

        const scale = windowmanager._getScale();
        const delta = new Position(event.screenX, event.screenY).subtract(windowmanager._drag.mouseStart);
        let that = windowmanager._drag.target;

        // Account for scaling:
        delta.left /= scale;
        delta.top /= scale;

        // Drag window:
        if (windowmanager._drag.down === 'm') {
            if (windowmanager.runtime.name !== 'Firefox') {
                // Stop text selection:
                that._window.contentWindow.getSelection().removeAllRanges();
                window.getSelection().removeAllRanges();
                // Drag:
                that._dragBy(delta.left, delta.top);
            }
        } else {
            // Resize window:
            let bounds = windowmanager._drag.targetStartBounds.clone();

            // Size horizontally:
            if (windowmanager._drag.down.includes('w')) {
                bounds.left = Math.min(bounds.left + delta.left, bounds.right - that._minSize.left);
            } else if (windowmanager._drag.down.includes('e')) {
                bounds.right = Math.max(bounds.right + delta.left, bounds.left + that._minSize.left);
            }

            // Size vertically:
            if (windowmanager._drag.down.includes('n')) {
                bounds.top = Math.min(bounds.top + delta.top, bounds.bottom - that._minSize.top);
            } else if (windowmanager._drag.down.includes('s')) {
                bounds.bottom = Math.max(bounds.bottom + delta.top, bounds.top + that._minSize.top);
            }

            // Resize the window:
            that.setBounds(bounds);
        }
    };

    overlay.addEventListener('mousemove', mousemove, true); // true argument makes it execute before its children get the event
    overlay.addEventListener('touchmove', (event) => {
        mousemove({
            screenX: event.touches[0].screenX,
            screenY: event.touches[0].screenY,
            preventDefault: event.preventDefault
        });
    }, true); // true argument makes it execute before its children get the event

    const mouseup = (event) => {
        // Finish dragging:
        if (windowmanager._drag.down === 'm') {
            event.preventDefault();
            windowmanager._drag.target._dragStop();
        }
        // Turn off resizing mode:
        windowmanager._drag.down = '';
        windowmanager._overlay.style.display = 'none';
    };

    windowmanager._overlay.addEventListener('mouseup', mouseup, true); // true argument makes it execute before its children get the event
    windowmanager._overlay.addEventListener('touchend', mouseup, true); // true argument makes it execute before its children get the event

    windowmanager._drag = {
        down: '', // either direction (n, s, e, w, ne, se, ect), or 'm' for move
        mouseStart: new Position(),
        target: null,
        targetStartBounds: new BoundingBox()
    };

    windowmanager._getNextZIndex = () => {
        nextZIndex += 1;
        return nextZIndex;
    };
} else {
    // This is a child window of root!
    windowmanager._launcher = window.parent.windowmanager._launcher || window.parent;
    windowmanager._internalBus = window.parent.windowmanager._internalBus;
    windowmanager._windows = window.parent.windowmanager._windows;
    windowmanager._layouts = window.parent.windowmanager._layouts;
    windowmanager._getNextZIndex = window.parent.windowmanager._getNextZIndex;
    windowmanager._overlay = window.parent.windowmanager._overlay;
    windowmanager._drag = window.parent.windowmanager._drag;
    windowmanager._getScale = window.parent.windowmanager._getScale;
}

// Wire the internal bus to emit events on windowmanager:
windowmanager._internalBus.addPipe(windowmanager);

// This is used to store info across windows:
// Everything on here gets exported as windowmanager.
export default windowmanager;
