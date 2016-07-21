/**
 * An EventHandler
 * @constructor
 * @alias EventHandler
 * @param {string[]} [acceptedEventHandlers=[]] - String of allowed events.
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
 * @param {string}
 * @param {callback}
 */
EventHandler.prototype.on = function (eventNames, eventListener) {
    eventNames = eventNames.toLowerCase().split(" ");

    for (const eventName of eventNames) {
        // Check if this event can be subscribed to via this function:
        if (this._eventListeners[eventName] === undefined) { continue; }

        // Check if eventListener is a function:
        if (!eventListener || typeof eventListener.constructor !== "function") {
            throw "on requires argument 'eventListener' of type Function";
        }

        // Check if eventListener is already added:
        if (this._eventListeners[eventName].indexOf(eventListener) >= 0) { continue; }

        // Add event listener:
        this._eventListeners[eventName].push(eventListener);
    }
};

/**
 * @method
 * @param {string}
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
 * @param {string}
 * @param {callback}
 */
EventHandler.prototype.off = function (eventNames, eventListener) {
    eventNames = eventNames.toLowerCase().split(" ");

    for (const eventName of eventNames) {
        // If event listeners don't exist, bail:
        if (this._eventListeners[eventName] === undefined) { return; }

        // Check if eventListener is a function:
        if (!eventListener || typeof eventListener.constructor !== "function") {
            throw "off requires argument 'eventListener' of type Function";
        }

        // Remove event listener, if exists:
        const index = this._eventListeners[eventName].indexOf(eventListener);
        if (index >= 0) { this._eventListeners[eventName].splice(index, 1); }
    }
};

/**
 * @method
 * @param {string}
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
 * @param {string}
 * @param {...*} args - Arguments to pass to listeners
 */
EventHandler.prototype.emit = function (eventName) {
    eventName = eventName.toLowerCase();

    // If event listeners don't exist, bail:
    if (this._eventListeners[eventName] === undefined) { return; }

    // Get arguments:
    let args = new Array(arguments.length - 1);
    for (let index = 1; index < arguments.length; index += 1) {
        args[index - 1] = arguments[index];
    }

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
        throw "addPipe requires argument 'eventHandler' of type EventHandler";
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
        throw "removePipe requires argument 'eventHandler' of type EventHandler";
    }

    // Check if eventHandler is already added:
    if (this._eventPipes.indexOf(eventHandler) >= 0) { return; }

    // Remove eventHandler, if exists:
    const index = this._eventPipes.indexOf(eventHandler);
    if (index >= 0) { this._eventPipes.splice(index, 1); }
};