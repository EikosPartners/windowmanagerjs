function SyncCallback(callback) {
    if (!(this instanceof SyncCallback)) { return new SyncCallback(callback); }

    this.callback = callback;
    this.count = 0;

    // If no ref are called in event loop, then run callback:
    this._timeout = setTimeout((that) => {
        delete this._timeout;
        that._check();
    }, 0, this);
}

SyncCallback.prototype.ref = function (callback) {
    let thisRef = this;

    if (this._timeout !== undefined) {
        // Ref is called, so remove timeout:
        delete this._timeout;
        clearTimeout(this._timeout);
    }

    this.count += 1;
    return function (...args) {
        if (callback) { callback(...args); }
        thisRef._deref();
    };
};

SyncCallback.prototype._deref = function () {
    this.count -= 1;
    this._check();
};

SyncCallback.prototype._check = function () {
    if (this.count <= 0 && this.callback != null) {
        this.callback();
        delete this.callback;
    }
};

export default SyncCallback;
