import windowmanager from '../global';
import nodeRequire from '../require';
const { BrowserWindow } = nodeRequire('electron');

// TODO: Give the node backend access to windowmanager Window-like functionality
// This is Electron's main process:
const { Vector, BoundingBox } = windowmanager.geometry;

// TODO: Solve event syncing between windows
BrowserWindow.prototype._notifyReady = function () {
    for (let other of BrowserWindow.getAllWindows()) {
        other.webContents.send('window-create', this.id);
    }
};

BrowserWindow.prototype._ensureDockSystem = function () {
    // Make sure docked group exists:
    if (this._dockedGroup === undefined) {
        this._dockedGroup = [this];

        this.on('closed', function () {
            // Clean up the dock system when this window closes:
            this.undock();
        });

        this.on('maximize', function () {
            this.undock(); // TODO: Support changing size when docked.
        });

        this.on('minimize', function () {
            this._dockMinimize();
        });

        this.on('restore', function () {
            for (let other of this._dockedGroup) {
                if (other !== this) {
                    other.restore();
                }
            }
        });

        let lastBounds = this.getBounds();

        this.on('move', function () {
            const newBounds = this.getBounds();

            // this._dockMoveTo(newBounds.x, newBounds.y, [lastBounds.x, lastBounds.y]);
            lastBounds = newBounds;
        });

        this.on('resize', function () {
            const newBounds = this.getBounds();

            if (newBounds.width !== lastBounds.width || newBounds.height !== lastBounds.height) {
                this.undock(); // TODO: Support changing size when docked.
            }
            // TODO: Handle resize positions of other docked windows
            //       This requires reworking how windows are docked/connected
            //       (they must be docked to edges of windows, not the windows themselves)
            /* for (let index = 0; index < this._dockedGroup.length; index += 1) {
                const other = this._dockedGroup[index];

                if (other !== this) {
                    other.setPosition()
                }
            }*/

            lastBounds = newBounds;
        });
    }
};

BrowserWindow.prototype.dock = function (otherID) {
    this._ensureDockSystem();

    // Resolve otherID, and fail if otherID doesn't exist.
    const other = BrowserWindow.fromId(otherID);

    if (other === undefined) { return; } // Failed to find other. TODO: Return error

    // If other is already in the group, return:
    if (this._dockedGroup.indexOf(other) >= 0) { return; }

    // Make sure docked group exists:
    other._ensureDockSystem();

    // Loop through all windows in otherGroup and add them to this's group:
    for (let otherWin of other._dockedGroup) {
        this._dockedGroup.push(otherWin);
        // Sharing the array between window objects makes it easier to manage:
        otherWin._dockedGroup = this._dockedGroup;
    }

    // TODO: Check if otherGroup is touching
};

BrowserWindow.prototype.undock = function () {
    this._ensureDockSystem();

    // Check to see if window is already undocked:
    if (this._dockedGroup.length === 1) { return; }

    // Undock this:
    this._dockedGroup.splice(this._dockedGroup.indexOf(this), 1);
    this._dockedGroup = [this];

    // TODO: Redock those still touching, EXCEPT 'this'.
};

BrowserWindow.prototype._dockFocus = function () {
    this._ensureDockSystem();

    for (let window of this._dockedGroup) {
        if (window !== this) {
            window.setAlwaysOnTop(true);
            window.setAlwaysOnTop(false);
        }
    }
    this.setAlwaysOnTop(true);
    this.setAlwaysOnTop(false);
};

BrowserWindow.prototype._dragStart = function () {
    // if (!this.emit('drag-start')) { return; } // Allow preventing drag
    this._ensureDockSystem();

    this.restore();

    for (let window of this._dockedGroup) {
        window._dragStartPos = window.getPosition();
    }
};

BrowserWindow.prototype._getBounds = function () {
    const bounds = this.getBounds();

    return new BoundingBox(bounds.x, bounds.y, bounds.x + bounds.width, bounds.y + bounds.height);
};

BrowserWindow.prototype._dragBy = function (deltaLeft, deltaTop) {
    this._ensureDockSystem();

    // Perform Snap:
    const thisBounds = this._getBounds().moveTo(this._dragStartPos[0] + deltaLeft,
                                                this._dragStartPos[1] + deltaTop);
    let snapDelta = new Vector(NaN, NaN);

    for (let other of BrowserWindow.getAllWindows()) {
        if (other._dockedGroup !== this._dockedGroup) {
            snapDelta.setMin(thisBounds.getSnapDelta(other._getBounds()));
        }
    }
    deltaLeft += snapDelta.left || 0;
    deltaTop += snapDelta.top || 0;

    for (let other of this._dockedGroup) {
        let pos = other._dragStartPos;

        // If other doesn't have a drag position, start it:
        if (pos === undefined) {
            pos = other._dragStartPos = other.getPosition();
            pos[0] -= deltaLeft;
            pos[1] -= deltaTop;
        }

        other.setPosition(pos[0] + deltaLeft, pos[1] + deltaTop);
    }
};

BrowserWindow.prototype._dragStop = function () {
    this._ensureDockSystem();

    // Dock to those it snapped to:
    const thisBounds = this._getBounds();

    for (let other of BrowserWindow.getAllWindows()) {
        if (thisBounds.isTouching(other._getBounds())) {
            this.dock(other.id);
        }
    }

    for (let window of this._dockedGroup) {
        delete window._dragStartPos;
    }
};

BrowserWindow.prototype._dockMoveTo = function (left, top) {
    this._ensureDockSystem();

    const oldPos = this.getPosition();
    const deltaLeft = left - oldPos[0];
    const deltaTop = top - oldPos[1];

    for (let other of this._dockedGroup) {
        const pos = other.getPosition();

        other.setPosition(pos[0] + deltaLeft, pos[1] + deltaTop);
    }
};

BrowserWindow.prototype._dockMinimize = function (left, top) {
    this._ensureDockSystem();

    for (let window of this._dockedGroup) {
        window.minimize();
    }
};

BrowserWindow.prototype._dockHide = function (left, top) {
    this._ensureDockSystem();

    for (let window of this._dockedGroup) {
        window.hide();
    }
};

BrowserWindow.prototype._dockShow = function (left, top) {
    this._ensureDockSystem();

    for (let window of this._dockedGroup) {
        window.show();
    }
};
