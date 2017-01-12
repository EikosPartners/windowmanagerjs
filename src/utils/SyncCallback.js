function SyncCallback(callback) {
    if (!(this instanceof SyncCallback)) { return new SyncCallback(callback); }

    this.callback = callback;
    this.count = 0;
}

SyncCallback.prototype.ref = function (callback) {
    let thisRef = this;

    this.count += 1;
    return function (...args) {
        if (callback) { callback(...args); }
        thisRef._deref();
    };
};

SyncCallback.prototype._deref = function () {
    this.count -= 1;
    if (this.count <= 0) { this.callback(); }
};

export default SyncCallback;
