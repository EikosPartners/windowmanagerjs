// TODO: Use class, rather than prototype.

/**
 * An EventHandler
 * @constructor
 * @alias EventHandler
 * @param {String[]} [acceptedEventHandlers=[]] - String of allowed events.
 */
function EventHandler(acceptedEventHandlers = []) {
    this._eventListeners = {};
    this._eventPipes = [];
    // TODO: Look into making these special properties that can't be deleted?
    for (const acceptedEventHandler of acceptedEventHandlers) {
        this._eventListeners[acceptedEventHandler] = [];
    }
}

/**
 * @method
 * @param {String}
 * @param {callback}
 */
EventHandler.prototype.on = function (eventNames, eventListener) {
    eventNames = eventNames.toLowerCase().split(' ');

    for (const eventName of eventNames) {
        // Check if this event can be subscribed to via this function:
        if (this._eventListeners[eventName] === undefined) { continue; }

        // Check if eventListener is a function:
        if (!eventListener || typeof eventListener.constructor !== 'function') {
            throw new Error('on requires argument \'eventListener\' of type Function');
        }

        // Check if eventListener is already added:
        if (this._eventListeners[eventName].indexOf(eventListener) >= 0) { continue; }

        // Add event listener:
        this._eventListeners[eventName].push(eventListener);
    }
};

/**
 * @method
 * @param {String}
 * @param {callback}
 */
EventHandler.prototype.once = function (eventName, eventListener) {
    function onceListener() {
        this.off(eventName, onceListener);
        eventListener.apply(this, arguments);
    }
    this.on(eventName, onceListener);
};

/**
 * @method
 * @param {String}
 * @param {callback}
 */
EventHandler.prototype.off = function (eventNames, eventListener) {
    eventNames = eventNames.toLowerCase().split(' ');

    for (const eventName of eventNames) {
        // If event listeners don't exist, bail:
        if (this._eventListeners[eventName] === undefined) { return; }

        // Check if eventListener is a function:
        if (!eventListener || typeof eventListener.constructor !== 'function') {
            throw new Error('off requires argument \'eventListener\' of type Function');
        }

        // Remove event listener, if exists:
        const index = this._eventListeners[eventName].indexOf(eventListener);

        if (index >= 0) { this._eventListeners[eventName].splice(index, 1); }
    }
};

/**
 * @method
 * @param {String}
 */
EventHandler.prototype.clearEvent = function (eventNames) {
    eventNames = eventNames.toLowerCase();

    for (const eventName of eventNames) {
        // If event listeners don't exist, bail:
        if (this._eventListeners[eventName] === undefined) { return; }

        this._eventListeners[eventName] = [];
    }
};

/**
 * @method
 * @param {String}
 * @param {...*} args - Arguments to pass to listeners
 * @returns {Boolean} true if all handlers return true, else false
 */
EventHandler.prototype.emit = function (eventName, ...args) {
    eventName = eventName.toLowerCase();

    // If event listeners don't exist, bail:
    if (this._eventListeners[eventName] === undefined) { return false; }

    let returnVal = true;

    for (const eventListener of this._eventListeners[eventName]) {
        // Call listener with the 'this' context as the current window:
        returnVal = returnVal && eventListener.apply(this, args) !== false;
    }

    for (const eventHandler of this._eventPipes) {
        // Call handler with the 'this' context as the current window:
        returnVal = returnVal && eventHandler.emit.apply(eventHandler, arguments) !== false;
    }

    return returnVal;
};

/**
 * @method
 * @param {EventHandler}
 */
EventHandler.prototype.addPipe = function (eventHandler) {
    // Check if eventHandler is a EventHandler:
    if (!eventHandler || !eventHandler.emit) {
        throw new Error('addPipe requires argument \'eventHandler\' of type EventHandler');
    }

    // Check if eventHandler is already added:
    if (this._eventPipes.indexOf(eventHandler) >= 0) { return; }

    // Add event handler:
    this._eventPipes.push(eventHandler);
};

/**
 * @method
 * @param {EventHandler}
 */
EventHandler.prototype.removePipe = function (eventHandler) {
    // Check if eventHandler is a EventHandler:
    if (!eventHandler || !eventHandler.emit) {
        throw new Error('removePipe requires argument \'eventHandler\' of type EventHandler');
    }

    // Check if eventHandler is already added:
    if (this._eventPipes.indexOf(eventHandler) >= 0) { return; }

    // Remove eventHandler, if exists:
    const index = this._eventPipes.indexOf(eventHandler);

    if (index >= 0) { this._eventPipes.splice(index, 1); }
};

export default EventHandler;
