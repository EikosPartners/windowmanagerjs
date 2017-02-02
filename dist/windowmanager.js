(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("windowmanager", [], factory);
	else if(typeof exports === 'object')
		exports["windowmanager"] = factory();
	else
		root["windowmanager"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(1);


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _global = __webpack_require__(2);
	
	var _global2 = _interopRequireDefault(_global);
	
	__webpack_require__(68);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	// Make windowmanager global:
	if (typeof global !== 'undefined' && global) {
	  global.windowmanager = _global2.default;
	}
	if (typeof window !== 'undefined' && window) {
	  window.windowmanager = _global2.default;
	}
	
	exports.default = _global2.default;
	module.exports = exports['default'];

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _index = __webpack_require__(3);
	
	var _index2 = __webpack_require__(59);
	
	var _index3 = _interopRequireDefault(_index2);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	/* global VERSION */
	var windowmanagerEventNames = ['window-create', 'window-close'];
	
	/**
	 * A global variable exposed on windows to access the windowmanager-related API.
	 * @namespace
	 * @extends EventHandler
	 * @property {String} version - version of windowmanager
	 * @property {Object} runtime - contains runtime-specific info
	 * @property {String} runtime.name - name of runtime (ie. Chrome, IE, OpenFin, Electron, ect)
	 * @property {String} runtime.version
	 * @property {Boolean} runtime.isBrowser - is this running in a browser
	 * @property {Boolean} runtime.isElectron - is this running in Electron
	 * @property {Boolean} runtime.isOpenFin - is this running in OpenFin
	 * @property {Boolean} runtime.isDesktop - is this a desktop OS
	 * @property {Boolean} runtime.isMobile - is this a mobile OS
	 * @property {Boolean} runtime.isMain - is this the main/startup window (Electron doesn't have one atm)
	 * @property {Window} Window
	 * @property {geometry} geometry
	 * @property {messagebus} messagebus - message bus for application
	 */
	var windowmanager = new _index.EventHandler(windowmanagerEventNames);
	
	windowmanager.version = ("0.12.7");
	// runtime is set in the respective runtime
	windowmanager.runtime = {
	    name: undefined,
	    version: undefined,
	    isBrowser: false,
	    isElectron: false,
	    isOpenFin: false,
	    isDesktop: false,
	    isMobile: false,
	    isMain: false
	};
	
	// Credit: http://stackoverflow.com/a/11381730
	if (typeof navigator !== 'undefined') {
	    /* eslint-disable max-len */
	    windowmanager.runtime.isMobile = function (a) {
	        return (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4))
	        );
	    }(navigator.userAgent || navigator.vendor || window.opera);
	    /* eslint-enable max-len */
	    windowmanager.runtime.isDesktop = !windowmanager.isMobile;
	}
	
	// Add geometry to global:
	windowmanager.geometry = _index3.default;
	
	// messagebus is set in the respective runtime
	
	exports.default = windowmanager;
	module.exports = exports['default'];

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _EventHandler = __webpack_require__(4);
	
	var _EventHandler2 = _interopRequireDefault(_EventHandler);
	
	var _SyncCallback = __webpack_require__(58);
	
	var _SyncCallback2 = _interopRequireDefault(_SyncCallback);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var genUIDE7 = function () {
	    var lut = [];
	
	    for (var i = 0; i < 256; i += 1) {
	        lut[i] = (i < 16 ? '0' : '') + i.toString(16);
	    }
	
	    return function () {
	        var d0 = Math.random() * 0xffffffff | 0;
	        var d1 = Math.random() * 0xffffffff | 0;
	        var d2 = Math.random() * 0xffffffff | 0;
	        var d3 = Math.random() * 0xffffffff | 0;
	
	        return lut[d0 & 0xff] + lut[d0 >> 8 & 0xff] + lut[d0 >> 16 & 0xff] + lut[d0 >> 24 & 0xff] + '-' + lut[d1 & 0xff] + lut[d1 >> 8 & 0xff] + '-' + lut[d1 >> 16 & 0x0f | 0x40] + lut[d1 >> 24 & 0xff] + '-' + lut[d2 & 0x3f | 0x80] + lut[d2 >> 8 & 0xff] + '-' + lut[d2 >> 16 & 0xff] + lut[d2 >> 24 & 0xff] + lut[d3 & 0xff] + lut[d3 >> 8 & 0xff] + lut[d3 >> 16 & 0xff] + lut[d3 >> 24 & 0xff];
	    };
	}();
	
	function getUniqueWindowName() {
	    return 'window' + genUIDE7() + new Date().getTime();
	};
	
	exports.default = {
	    getUniqueWindowName: getUniqueWindowName,
	    EventHandler: _EventHandler2.default,
	    SyncCallback: _SyncCallback2.default
	};
	module.exports = exports['default'];

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _getIterator2 = __webpack_require__(5);
	
	var _getIterator3 = _interopRequireDefault(_getIterator2);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	// TODO: Use class, rather than prototype.
	
	/**
	 * An EventHandler
	 * @constructor
	 * @alias EventHandler
	 * @param {String[]} [acceptedEventHandlers=[]] - String of allowed events.
	 */
	function EventHandler() {
	    var acceptedEventHandlers = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
	
	    this._eventListeners = {};
	    this._eventPipes = [];
	    // TODO: Look into making these special properties that can't be deleted?
	    var _iteratorNormalCompletion = true;
	    var _didIteratorError = false;
	    var _iteratorError = undefined;
	
	    try {
	        for (var _iterator = (0, _getIterator3.default)(acceptedEventHandlers), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
	            var acceptedEventHandler = _step.value;
	
	            this._eventListeners[acceptedEventHandler] = [];
	        }
	    } catch (err) {
	        _didIteratorError = true;
	        _iteratorError = err;
	    } finally {
	        try {
	            if (!_iteratorNormalCompletion && _iterator.return) {
	                _iterator.return();
	            }
	        } finally {
	            if (_didIteratorError) {
	                throw _iteratorError;
	            }
	        }
	    }
	}
	
	/**
	 * @method
	 * @param {String}
	 * @param {callback}
	 */
	EventHandler.prototype.on = function (eventNames, eventListener) {
	    eventNames = eventNames.toLowerCase().split(' ');
	
	    var _iteratorNormalCompletion2 = true;
	    var _didIteratorError2 = false;
	    var _iteratorError2 = undefined;
	
	    try {
	        for (var _iterator2 = (0, _getIterator3.default)(eventNames), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
	            var eventName = _step2.value;
	
	            // Check if this event can be subscribed to via this function:
	            if (this._eventListeners[eventName] === undefined) {
	                continue;
	            }
	
	            // Check if eventListener is a function:
	            if (!eventListener || typeof eventListener.constructor !== 'function') {
	                throw new Error('on requires argument \'eventListener\' of type Function');
	            }
	
	            // Check if eventListener is already added:
	            if (this._eventListeners[eventName].indexOf(eventListener) >= 0) {
	                continue;
	            }
	
	            // Add event listener:
	            this._eventListeners[eventName].push(eventListener);
	        }
	    } catch (err) {
	        _didIteratorError2 = true;
	        _iteratorError2 = err;
	    } finally {
	        try {
	            if (!_iteratorNormalCompletion2 && _iterator2.return) {
	                _iterator2.return();
	            }
	        } finally {
	            if (_didIteratorError2) {
	                throw _iteratorError2;
	            }
	        }
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
	
	    var _iteratorNormalCompletion3 = true;
	    var _didIteratorError3 = false;
	    var _iteratorError3 = undefined;
	
	    try {
	        for (var _iterator3 = (0, _getIterator3.default)(eventNames), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
	            var eventName = _step3.value;
	
	            // If event listeners don't exist, bail:
	            if (this._eventListeners[eventName] === undefined) {
	                return;
	            }
	
	            // Check if eventListener is a function:
	            if (!eventListener || typeof eventListener.constructor !== 'function') {
	                throw new Error('off requires argument \'eventListener\' of type Function');
	            }
	
	            // Remove event listener, if exists:
	            var index = this._eventListeners[eventName].indexOf(eventListener);
	
	            if (index >= 0) {
	                this._eventListeners[eventName].splice(index, 1);
	            }
	        }
	    } catch (err) {
	        _didIteratorError3 = true;
	        _iteratorError3 = err;
	    } finally {
	        try {
	            if (!_iteratorNormalCompletion3 && _iterator3.return) {
	                _iterator3.return();
	            }
	        } finally {
	            if (_didIteratorError3) {
	                throw _iteratorError3;
	            }
	        }
	    }
	};
	
	/**
	 * @method
	 * @param {String}
	 */
	EventHandler.prototype.clearEvent = function (eventNames) {
	    eventNames = eventNames.toLowerCase();
	
	    var _iteratorNormalCompletion4 = true;
	    var _didIteratorError4 = false;
	    var _iteratorError4 = undefined;
	
	    try {
	        for (var _iterator4 = (0, _getIterator3.default)(eventNames), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
	            var eventName = _step4.value;
	
	            // If event listeners don't exist, bail:
	            if (this._eventListeners[eventName] === undefined) {
	                return;
	            }
	
	            this._eventListeners[eventName] = [];
	        }
	    } catch (err) {
	        _didIteratorError4 = true;
	        _iteratorError4 = err;
	    } finally {
	        try {
	            if (!_iteratorNormalCompletion4 && _iterator4.return) {
	                _iterator4.return();
	            }
	        } finally {
	            if (_didIteratorError4) {
	                throw _iteratorError4;
	            }
	        }
	    }
	};
	
	/**
	 * @method
	 * @param {String}
	 * @param {...*} args - Arguments to pass to listeners
	 * @returns {Boolean} true if all handlers return true, else false
	 */
	EventHandler.prototype.emit = function (eventName) {
	    for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
	        args[_key - 1] = arguments[_key];
	    }
	
	    eventName = eventName.toLowerCase();
	
	    // If event listeners don't exist, bail:
	    if (this._eventListeners[eventName] === undefined) {
	        return false;
	    }
	
	    var returnVal = true;
	
	    var _iteratorNormalCompletion5 = true;
	    var _didIteratorError5 = false;
	    var _iteratorError5 = undefined;
	
	    try {
	        for (var _iterator5 = (0, _getIterator3.default)(this._eventListeners[eventName]), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
	            var eventListener = _step5.value;
	
	            // Call listener with the 'this' context as the current window:
	            returnVal = returnVal && eventListener.apply(this, args) !== false;
	        }
	    } catch (err) {
	        _didIteratorError5 = true;
	        _iteratorError5 = err;
	    } finally {
	        try {
	            if (!_iteratorNormalCompletion5 && _iterator5.return) {
	                _iterator5.return();
	            }
	        } finally {
	            if (_didIteratorError5) {
	                throw _iteratorError5;
	            }
	        }
	    }
	
	    var _iteratorNormalCompletion6 = true;
	    var _didIteratorError6 = false;
	    var _iteratorError6 = undefined;
	
	    try {
	        for (var _iterator6 = (0, _getIterator3.default)(this._eventPipes), _step6; !(_iteratorNormalCompletion6 = (_step6 = _iterator6.next()).done); _iteratorNormalCompletion6 = true) {
	            var eventHandler = _step6.value;
	
	            // Call handler with the 'this' context as the current window:
	            returnVal = returnVal && eventHandler.emit.apply(eventHandler, arguments) !== false;
	        }
	    } catch (err) {
	        _didIteratorError6 = true;
	        _iteratorError6 = err;
	    } finally {
	        try {
	            if (!_iteratorNormalCompletion6 && _iterator6.return) {
	                _iterator6.return();
	            }
	        } finally {
	            if (_didIteratorError6) {
	                throw _iteratorError6;
	            }
	        }
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
	    if (this._eventPipes.indexOf(eventHandler) >= 0) {
	        return;
	    }
	
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
	    if (this._eventPipes.indexOf(eventHandler) >= 0) {
	        return;
	    }
	
	    // Remove eventHandler, if exists:
	    var index = this._eventPipes.indexOf(eventHandler);
	
	    if (index >= 0) {
	        this._eventPipes.splice(index, 1);
	    }
	};
	
	exports.default = EventHandler;
	module.exports = exports['default'];

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(6), __esModule: true };

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(7);
	__webpack_require__(53);
	module.exports = __webpack_require__(55);

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(8);
	var global        = __webpack_require__(19)
	  , hide          = __webpack_require__(23)
	  , Iterators     = __webpack_require__(11)
	  , TO_STRING_TAG = __webpack_require__(50)('toStringTag');
	
	for(var collections = ['NodeList', 'DOMTokenList', 'MediaList', 'StyleSheetList', 'CSSRuleList'], i = 0; i < 5; i++){
	  var NAME       = collections[i]
	    , Collection = global[NAME]
	    , proto      = Collection && Collection.prototype;
	  if(proto && !proto[TO_STRING_TAG])hide(proto, TO_STRING_TAG, NAME);
	  Iterators[NAME] = Iterators.Array;
	}

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var addToUnscopables = __webpack_require__(9)
	  , step             = __webpack_require__(10)
	  , Iterators        = __webpack_require__(11)
	  , toIObject        = __webpack_require__(12);
	
	// 22.1.3.4 Array.prototype.entries()
	// 22.1.3.13 Array.prototype.keys()
	// 22.1.3.29 Array.prototype.values()
	// 22.1.3.30 Array.prototype[@@iterator]()
	module.exports = __webpack_require__(16)(Array, 'Array', function(iterated, kind){
	  this._t = toIObject(iterated); // target
	  this._i = 0;                   // next index
	  this._k = kind;                // kind
	// 22.1.5.2.1 %ArrayIteratorPrototype%.next()
	}, function(){
	  var O     = this._t
	    , kind  = this._k
	    , index = this._i++;
	  if(!O || index >= O.length){
	    this._t = undefined;
	    return step(1);
	  }
	  if(kind == 'keys'  )return step(0, index);
	  if(kind == 'values')return step(0, O[index]);
	  return step(0, [index, O[index]]);
	}, 'values');
	
	// argumentsList[@@iterator] is %ArrayProto_values% (9.4.4.6, 9.4.4.7)
	Iterators.Arguments = Iterators.Array;
	
	addToUnscopables('keys');
	addToUnscopables('values');
	addToUnscopables('entries');

/***/ },
/* 9 */
/***/ function(module, exports) {

	module.exports = function(){ /* empty */ };

/***/ },
/* 10 */
/***/ function(module, exports) {

	module.exports = function(done, value){
	  return {value: value, done: !!done};
	};

/***/ },
/* 11 */
/***/ function(module, exports) {

	module.exports = {};

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	// to indexed object, toObject with fallback for non-array-like ES3 strings
	var IObject = __webpack_require__(13)
	  , defined = __webpack_require__(15);
	module.exports = function(it){
	  return IObject(defined(it));
	};

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	// fallback for non-array-like ES3 and non-enumerable old V8 strings
	var cof = __webpack_require__(14);
	module.exports = Object('z').propertyIsEnumerable(0) ? Object : function(it){
	  return cof(it) == 'String' ? it.split('') : Object(it);
	};

/***/ },
/* 14 */
/***/ function(module, exports) {

	var toString = {}.toString;
	
	module.exports = function(it){
	  return toString.call(it).slice(8, -1);
	};

/***/ },
/* 15 */
/***/ function(module, exports) {

	// 7.2.1 RequireObjectCoercible(argument)
	module.exports = function(it){
	  if(it == undefined)throw TypeError("Can't call method on  " + it);
	  return it;
	};

/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var LIBRARY        = __webpack_require__(17)
	  , $export        = __webpack_require__(18)
	  , redefine       = __webpack_require__(33)
	  , hide           = __webpack_require__(23)
	  , has            = __webpack_require__(34)
	  , Iterators      = __webpack_require__(11)
	  , $iterCreate    = __webpack_require__(35)
	  , setToStringTag = __webpack_require__(49)
	  , getPrototypeOf = __webpack_require__(51)
	  , ITERATOR       = __webpack_require__(50)('iterator')
	  , BUGGY          = !([].keys && 'next' in [].keys()) // Safari has buggy iterators w/o `next`
	  , FF_ITERATOR    = '@@iterator'
	  , KEYS           = 'keys'
	  , VALUES         = 'values';
	
	var returnThis = function(){ return this; };
	
	module.exports = function(Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCED){
	  $iterCreate(Constructor, NAME, next);
	  var getMethod = function(kind){
	    if(!BUGGY && kind in proto)return proto[kind];
	    switch(kind){
	      case KEYS: return function keys(){ return new Constructor(this, kind); };
	      case VALUES: return function values(){ return new Constructor(this, kind); };
	    } return function entries(){ return new Constructor(this, kind); };
	  };
	  var TAG        = NAME + ' Iterator'
	    , DEF_VALUES = DEFAULT == VALUES
	    , VALUES_BUG = false
	    , proto      = Base.prototype
	    , $native    = proto[ITERATOR] || proto[FF_ITERATOR] || DEFAULT && proto[DEFAULT]
	    , $default   = $native || getMethod(DEFAULT)
	    , $entries   = DEFAULT ? !DEF_VALUES ? $default : getMethod('entries') : undefined
	    , $anyNative = NAME == 'Array' ? proto.entries || $native : $native
	    , methods, key, IteratorPrototype;
	  // Fix native
	  if($anyNative){
	    IteratorPrototype = getPrototypeOf($anyNative.call(new Base));
	    if(IteratorPrototype !== Object.prototype){
	      // Set @@toStringTag to native iterators
	      setToStringTag(IteratorPrototype, TAG, true);
	      // fix for some old engines
	      if(!LIBRARY && !has(IteratorPrototype, ITERATOR))hide(IteratorPrototype, ITERATOR, returnThis);
	    }
	  }
	  // fix Array#{values, @@iterator}.name in V8 / FF
	  if(DEF_VALUES && $native && $native.name !== VALUES){
	    VALUES_BUG = true;
	    $default = function values(){ return $native.call(this); };
	  }
	  // Define iterator
	  if((!LIBRARY || FORCED) && (BUGGY || VALUES_BUG || !proto[ITERATOR])){
	    hide(proto, ITERATOR, $default);
	  }
	  // Plug for library
	  Iterators[NAME] = $default;
	  Iterators[TAG]  = returnThis;
	  if(DEFAULT){
	    methods = {
	      values:  DEF_VALUES ? $default : getMethod(VALUES),
	      keys:    IS_SET     ? $default : getMethod(KEYS),
	      entries: $entries
	    };
	    if(FORCED)for(key in methods){
	      if(!(key in proto))redefine(proto, key, methods[key]);
	    } else $export($export.P + $export.F * (BUGGY || VALUES_BUG), NAME, methods);
	  }
	  return methods;
	};

/***/ },
/* 17 */
/***/ function(module, exports) {

	module.exports = true;

/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	var global    = __webpack_require__(19)
	  , core      = __webpack_require__(20)
	  , ctx       = __webpack_require__(21)
	  , hide      = __webpack_require__(23)
	  , PROTOTYPE = 'prototype';
	
	var $export = function(type, name, source){
	  var IS_FORCED = type & $export.F
	    , IS_GLOBAL = type & $export.G
	    , IS_STATIC = type & $export.S
	    , IS_PROTO  = type & $export.P
	    , IS_BIND   = type & $export.B
	    , IS_WRAP   = type & $export.W
	    , exports   = IS_GLOBAL ? core : core[name] || (core[name] = {})
	    , expProto  = exports[PROTOTYPE]
	    , target    = IS_GLOBAL ? global : IS_STATIC ? global[name] : (global[name] || {})[PROTOTYPE]
	    , key, own, out;
	  if(IS_GLOBAL)source = name;
	  for(key in source){
	    // contains in native
	    own = !IS_FORCED && target && target[key] !== undefined;
	    if(own && key in exports)continue;
	    // export native or passed
	    out = own ? target[key] : source[key];
	    // prevent global pollution for namespaces
	    exports[key] = IS_GLOBAL && typeof target[key] != 'function' ? source[key]
	    // bind timers to global for call from export context
	    : IS_BIND && own ? ctx(out, global)
	    // wrap global constructors for prevent change them in library
	    : IS_WRAP && target[key] == out ? (function(C){
	      var F = function(a, b, c){
	        if(this instanceof C){
	          switch(arguments.length){
	            case 0: return new C;
	            case 1: return new C(a);
	            case 2: return new C(a, b);
	          } return new C(a, b, c);
	        } return C.apply(this, arguments);
	      };
	      F[PROTOTYPE] = C[PROTOTYPE];
	      return F;
	    // make static versions for prototype methods
	    })(out) : IS_PROTO && typeof out == 'function' ? ctx(Function.call, out) : out;
	    // export proto methods to core.%CONSTRUCTOR%.methods.%NAME%
	    if(IS_PROTO){
	      (exports.virtual || (exports.virtual = {}))[key] = out;
	      // export proto methods to core.%CONSTRUCTOR%.prototype.%NAME%
	      if(type & $export.R && expProto && !expProto[key])hide(expProto, key, out);
	    }
	  }
	};
	// type bitmap
	$export.F = 1;   // forced
	$export.G = 2;   // global
	$export.S = 4;   // static
	$export.P = 8;   // proto
	$export.B = 16;  // bind
	$export.W = 32;  // wrap
	$export.U = 64;  // safe
	$export.R = 128; // real proto method for `library` 
	module.exports = $export;

/***/ },
/* 19 */
/***/ function(module, exports) {

	// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
	var global = module.exports = typeof window != 'undefined' && window.Math == Math
	  ? window : typeof self != 'undefined' && self.Math == Math ? self : Function('return this')();
	if(typeof __g == 'number')__g = global; // eslint-disable-line no-undef

/***/ },
/* 20 */
/***/ function(module, exports) {

	var core = module.exports = {version: '2.4.0'};
	if(typeof __e == 'number')__e = core; // eslint-disable-line no-undef

/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	// optional / simple context binding
	var aFunction = __webpack_require__(22);
	module.exports = function(fn, that, length){
	  aFunction(fn);
	  if(that === undefined)return fn;
	  switch(length){
	    case 1: return function(a){
	      return fn.call(that, a);
	    };
	    case 2: return function(a, b){
	      return fn.call(that, a, b);
	    };
	    case 3: return function(a, b, c){
	      return fn.call(that, a, b, c);
	    };
	  }
	  return function(/* ...args */){
	    return fn.apply(that, arguments);
	  };
	};

/***/ },
/* 22 */
/***/ function(module, exports) {

	module.exports = function(it){
	  if(typeof it != 'function')throw TypeError(it + ' is not a function!');
	  return it;
	};

/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	var dP         = __webpack_require__(24)
	  , createDesc = __webpack_require__(32);
	module.exports = __webpack_require__(28) ? function(object, key, value){
	  return dP.f(object, key, createDesc(1, value));
	} : function(object, key, value){
	  object[key] = value;
	  return object;
	};

/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	var anObject       = __webpack_require__(25)
	  , IE8_DOM_DEFINE = __webpack_require__(27)
	  , toPrimitive    = __webpack_require__(31)
	  , dP             = Object.defineProperty;
	
	exports.f = __webpack_require__(28) ? Object.defineProperty : function defineProperty(O, P, Attributes){
	  anObject(O);
	  P = toPrimitive(P, true);
	  anObject(Attributes);
	  if(IE8_DOM_DEFINE)try {
	    return dP(O, P, Attributes);
	  } catch(e){ /* empty */ }
	  if('get' in Attributes || 'set' in Attributes)throw TypeError('Accessors not supported!');
	  if('value' in Attributes)O[P] = Attributes.value;
	  return O;
	};

/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

	var isObject = __webpack_require__(26);
	module.exports = function(it){
	  if(!isObject(it))throw TypeError(it + ' is not an object!');
	  return it;
	};

/***/ },
/* 26 */
/***/ function(module, exports) {

	module.exports = function(it){
	  return typeof it === 'object' ? it !== null : typeof it === 'function';
	};

/***/ },
/* 27 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = !__webpack_require__(28) && !__webpack_require__(29)(function(){
	  return Object.defineProperty(__webpack_require__(30)('div'), 'a', {get: function(){ return 7; }}).a != 7;
	});

/***/ },
/* 28 */
/***/ function(module, exports, __webpack_require__) {

	// Thank's IE8 for his funny defineProperty
	module.exports = !__webpack_require__(29)(function(){
	  return Object.defineProperty({}, 'a', {get: function(){ return 7; }}).a != 7;
	});

/***/ },
/* 29 */
/***/ function(module, exports) {

	module.exports = function(exec){
	  try {
	    return !!exec();
	  } catch(e){
	    return true;
	  }
	};

/***/ },
/* 30 */
/***/ function(module, exports, __webpack_require__) {

	var isObject = __webpack_require__(26)
	  , document = __webpack_require__(19).document
	  // in old IE typeof document.createElement is 'object'
	  , is = isObject(document) && isObject(document.createElement);
	module.exports = function(it){
	  return is ? document.createElement(it) : {};
	};

/***/ },
/* 31 */
/***/ function(module, exports, __webpack_require__) {

	// 7.1.1 ToPrimitive(input [, PreferredType])
	var isObject = __webpack_require__(26);
	// instead of the ES6 spec version, we didn't implement @@toPrimitive case
	// and the second argument - flag - preferred type is a string
	module.exports = function(it, S){
	  if(!isObject(it))return it;
	  var fn, val;
	  if(S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it)))return val;
	  if(typeof (fn = it.valueOf) == 'function' && !isObject(val = fn.call(it)))return val;
	  if(!S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it)))return val;
	  throw TypeError("Can't convert object to primitive value");
	};

/***/ },
/* 32 */
/***/ function(module, exports) {

	module.exports = function(bitmap, value){
	  return {
	    enumerable  : !(bitmap & 1),
	    configurable: !(bitmap & 2),
	    writable    : !(bitmap & 4),
	    value       : value
	  };
	};

/***/ },
/* 33 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(23);

/***/ },
/* 34 */
/***/ function(module, exports) {

	var hasOwnProperty = {}.hasOwnProperty;
	module.exports = function(it, key){
	  return hasOwnProperty.call(it, key);
	};

/***/ },
/* 35 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var create         = __webpack_require__(36)
	  , descriptor     = __webpack_require__(32)
	  , setToStringTag = __webpack_require__(49)
	  , IteratorPrototype = {};
	
	// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
	__webpack_require__(23)(IteratorPrototype, __webpack_require__(50)('iterator'), function(){ return this; });
	
	module.exports = function(Constructor, NAME, next){
	  Constructor.prototype = create(IteratorPrototype, {next: descriptor(1, next)});
	  setToStringTag(Constructor, NAME + ' Iterator');
	};

/***/ },
/* 36 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
	var anObject    = __webpack_require__(25)
	  , dPs         = __webpack_require__(37)
	  , enumBugKeys = __webpack_require__(47)
	  , IE_PROTO    = __webpack_require__(44)('IE_PROTO')
	  , Empty       = function(){ /* empty */ }
	  , PROTOTYPE   = 'prototype';
	
	// Create object with fake `null` prototype: use iframe Object with cleared prototype
	var createDict = function(){
	  // Thrash, waste and sodomy: IE GC bug
	  var iframe = __webpack_require__(30)('iframe')
	    , i      = enumBugKeys.length
	    , lt     = '<'
	    , gt     = '>'
	    , iframeDocument;
	  iframe.style.display = 'none';
	  __webpack_require__(48).appendChild(iframe);
	  iframe.src = 'javascript:'; // eslint-disable-line no-script-url
	  // createDict = iframe.contentWindow.Object;
	  // html.removeChild(iframe);
	  iframeDocument = iframe.contentWindow.document;
	  iframeDocument.open();
	  iframeDocument.write(lt + 'script' + gt + 'document.F=Object' + lt + '/script' + gt);
	  iframeDocument.close();
	  createDict = iframeDocument.F;
	  while(i--)delete createDict[PROTOTYPE][enumBugKeys[i]];
	  return createDict();
	};
	
	module.exports = Object.create || function create(O, Properties){
	  var result;
	  if(O !== null){
	    Empty[PROTOTYPE] = anObject(O);
	    result = new Empty;
	    Empty[PROTOTYPE] = null;
	    // add "__proto__" for Object.getPrototypeOf polyfill
	    result[IE_PROTO] = O;
	  } else result = createDict();
	  return Properties === undefined ? result : dPs(result, Properties);
	};


/***/ },
/* 37 */
/***/ function(module, exports, __webpack_require__) {

	var dP       = __webpack_require__(24)
	  , anObject = __webpack_require__(25)
	  , getKeys  = __webpack_require__(38);
	
	module.exports = __webpack_require__(28) ? Object.defineProperties : function defineProperties(O, Properties){
	  anObject(O);
	  var keys   = getKeys(Properties)
	    , length = keys.length
	    , i = 0
	    , P;
	  while(length > i)dP.f(O, P = keys[i++], Properties[P]);
	  return O;
	};

/***/ },
/* 38 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.14 / 15.2.3.14 Object.keys(O)
	var $keys       = __webpack_require__(39)
	  , enumBugKeys = __webpack_require__(47);
	
	module.exports = Object.keys || function keys(O){
	  return $keys(O, enumBugKeys);
	};

/***/ },
/* 39 */
/***/ function(module, exports, __webpack_require__) {

	var has          = __webpack_require__(34)
	  , toIObject    = __webpack_require__(12)
	  , arrayIndexOf = __webpack_require__(40)(false)
	  , IE_PROTO     = __webpack_require__(44)('IE_PROTO');
	
	module.exports = function(object, names){
	  var O      = toIObject(object)
	    , i      = 0
	    , result = []
	    , key;
	  for(key in O)if(key != IE_PROTO)has(O, key) && result.push(key);
	  // Don't enum bug & hidden keys
	  while(names.length > i)if(has(O, key = names[i++])){
	    ~arrayIndexOf(result, key) || result.push(key);
	  }
	  return result;
	};

/***/ },
/* 40 */
/***/ function(module, exports, __webpack_require__) {

	// false -> Array#indexOf
	// true  -> Array#includes
	var toIObject = __webpack_require__(12)
	  , toLength  = __webpack_require__(41)
	  , toIndex   = __webpack_require__(43);
	module.exports = function(IS_INCLUDES){
	  return function($this, el, fromIndex){
	    var O      = toIObject($this)
	      , length = toLength(O.length)
	      , index  = toIndex(fromIndex, length)
	      , value;
	    // Array#includes uses SameValueZero equality algorithm
	    if(IS_INCLUDES && el != el)while(length > index){
	      value = O[index++];
	      if(value != value)return true;
	    // Array#toIndex ignores holes, Array#includes - not
	    } else for(;length > index; index++)if(IS_INCLUDES || index in O){
	      if(O[index] === el)return IS_INCLUDES || index || 0;
	    } return !IS_INCLUDES && -1;
	  };
	};

/***/ },
/* 41 */
/***/ function(module, exports, __webpack_require__) {

	// 7.1.15 ToLength
	var toInteger = __webpack_require__(42)
	  , min       = Math.min;
	module.exports = function(it){
	  return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
	};

/***/ },
/* 42 */
/***/ function(module, exports) {

	// 7.1.4 ToInteger
	var ceil  = Math.ceil
	  , floor = Math.floor;
	module.exports = function(it){
	  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
	};

/***/ },
/* 43 */
/***/ function(module, exports, __webpack_require__) {

	var toInteger = __webpack_require__(42)
	  , max       = Math.max
	  , min       = Math.min;
	module.exports = function(index, length){
	  index = toInteger(index);
	  return index < 0 ? max(index + length, 0) : min(index, length);
	};

/***/ },
/* 44 */
/***/ function(module, exports, __webpack_require__) {

	var shared = __webpack_require__(45)('keys')
	  , uid    = __webpack_require__(46);
	module.exports = function(key){
	  return shared[key] || (shared[key] = uid(key));
	};

/***/ },
/* 45 */
/***/ function(module, exports, __webpack_require__) {

	var global = __webpack_require__(19)
	  , SHARED = '__core-js_shared__'
	  , store  = global[SHARED] || (global[SHARED] = {});
	module.exports = function(key){
	  return store[key] || (store[key] = {});
	};

/***/ },
/* 46 */
/***/ function(module, exports) {

	var id = 0
	  , px = Math.random();
	module.exports = function(key){
	  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
	};

/***/ },
/* 47 */
/***/ function(module, exports) {

	// IE 8- don't enum bug keys
	module.exports = (
	  'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'
	).split(',');

/***/ },
/* 48 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(19).document && document.documentElement;

/***/ },
/* 49 */
/***/ function(module, exports, __webpack_require__) {

	var def = __webpack_require__(24).f
	  , has = __webpack_require__(34)
	  , TAG = __webpack_require__(50)('toStringTag');
	
	module.exports = function(it, tag, stat){
	  if(it && !has(it = stat ? it : it.prototype, TAG))def(it, TAG, {configurable: true, value: tag});
	};

/***/ },
/* 50 */
/***/ function(module, exports, __webpack_require__) {

	var store      = __webpack_require__(45)('wks')
	  , uid        = __webpack_require__(46)
	  , Symbol     = __webpack_require__(19).Symbol
	  , USE_SYMBOL = typeof Symbol == 'function';
	
	var $exports = module.exports = function(name){
	  return store[name] || (store[name] =
	    USE_SYMBOL && Symbol[name] || (USE_SYMBOL ? Symbol : uid)('Symbol.' + name));
	};
	
	$exports.store = store;

/***/ },
/* 51 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.9 / 15.2.3.2 Object.getPrototypeOf(O)
	var has         = __webpack_require__(34)
	  , toObject    = __webpack_require__(52)
	  , IE_PROTO    = __webpack_require__(44)('IE_PROTO')
	  , ObjectProto = Object.prototype;
	
	module.exports = Object.getPrototypeOf || function(O){
	  O = toObject(O);
	  if(has(O, IE_PROTO))return O[IE_PROTO];
	  if(typeof O.constructor == 'function' && O instanceof O.constructor){
	    return O.constructor.prototype;
	  } return O instanceof Object ? ObjectProto : null;
	};

/***/ },
/* 52 */
/***/ function(module, exports, __webpack_require__) {

	// 7.1.13 ToObject(argument)
	var defined = __webpack_require__(15);
	module.exports = function(it){
	  return Object(defined(it));
	};

/***/ },
/* 53 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var $at  = __webpack_require__(54)(true);
	
	// 21.1.3.27 String.prototype[@@iterator]()
	__webpack_require__(16)(String, 'String', function(iterated){
	  this._t = String(iterated); // target
	  this._i = 0;                // next index
	// 21.1.5.2.1 %StringIteratorPrototype%.next()
	}, function(){
	  var O     = this._t
	    , index = this._i
	    , point;
	  if(index >= O.length)return {value: undefined, done: true};
	  point = $at(O, index);
	  this._i += point.length;
	  return {value: point, done: false};
	});

/***/ },
/* 54 */
/***/ function(module, exports, __webpack_require__) {

	var toInteger = __webpack_require__(42)
	  , defined   = __webpack_require__(15);
	// true  -> String#at
	// false -> String#codePointAt
	module.exports = function(TO_STRING){
	  return function(that, pos){
	    var s = String(defined(that))
	      , i = toInteger(pos)
	      , l = s.length
	      , a, b;
	    if(i < 0 || i >= l)return TO_STRING ? '' : undefined;
	    a = s.charCodeAt(i);
	    return a < 0xd800 || a > 0xdbff || i + 1 === l || (b = s.charCodeAt(i + 1)) < 0xdc00 || b > 0xdfff
	      ? TO_STRING ? s.charAt(i) : a
	      : TO_STRING ? s.slice(i, i + 2) : (a - 0xd800 << 10) + (b - 0xdc00) + 0x10000;
	  };
	};

/***/ },
/* 55 */
/***/ function(module, exports, __webpack_require__) {

	var anObject = __webpack_require__(25)
	  , get      = __webpack_require__(56);
	module.exports = __webpack_require__(20).getIterator = function(it){
	  var iterFn = get(it);
	  if(typeof iterFn != 'function')throw TypeError(it + ' is not iterable!');
	  return anObject(iterFn.call(it));
	};

/***/ },
/* 56 */
/***/ function(module, exports, __webpack_require__) {

	var classof   = __webpack_require__(57)
	  , ITERATOR  = __webpack_require__(50)('iterator')
	  , Iterators = __webpack_require__(11);
	module.exports = __webpack_require__(20).getIteratorMethod = function(it){
	  if(it != undefined)return it[ITERATOR]
	    || it['@@iterator']
	    || Iterators[classof(it)];
	};

/***/ },
/* 57 */
/***/ function(module, exports, __webpack_require__) {

	// getting tag from 19.1.3.6 Object.prototype.toString()
	var cof = __webpack_require__(14)
	  , TAG = __webpack_require__(50)('toStringTag')
	  // ES3 wrong here
	  , ARG = cof(function(){ return arguments; }()) == 'Arguments';
	
	// fallback for IE11 Script Access Denied error
	var tryGet = function(it, key){
	  try {
	    return it[key];
	  } catch(e){ /* empty */ }
	};
	
	module.exports = function(it){
	  var O, T, B;
	  return it === undefined ? 'Undefined' : it === null ? 'Null'
	    // @@toStringTag case
	    : typeof (T = tryGet(O = Object(it), TAG)) == 'string' ? T
	    // builtinTag case
	    : ARG ? cof(O)
	    // ES3 arguments fallback
	    : (B = cof(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : B;
	};

/***/ },
/* 58 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	function SyncCallback(callback) {
	    if (!(this instanceof SyncCallback)) {
	        return new SyncCallback(callback);
	    }
	
	    this.callback = callback;
	    this.count = 0;
	}
	
	SyncCallback.prototype.ref = function (callback) {
	    var thisRef = this;
	
	    this.count += 1;
	    return function () {
	        if (callback) {
	            callback.apply(undefined, arguments);
	        }
	        thisRef._deref();
	    };
	};
	
	SyncCallback.prototype._deref = function () {
	    this.count -= 1;
	    if (this.count <= 0) {
	        this.callback();
	    }
	};
	
	exports.default = SyncCallback;
	module.exports = exports["default"];

/***/ },
/* 59 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _Vector = __webpack_require__(60);
	
	var _Vector2 = _interopRequireDefault(_Vector);
	
	var _BoundingBox = __webpack_require__(66);
	
	var _BoundingBox2 = _interopRequireDefault(_BoundingBox);
	
	var _CollisionMesh = __webpack_require__(67);
	
	var _CollisionMesh2 = _interopRequireDefault(_CollisionMesh);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	/**
	 * A library to handler geometry calculations.
	 * @namespace
	 * @alias geometry
	 * @property {BoundingBox}
	 * @property {CollisionMesh}
	 * @property {Position}
	 * @property {Size}
	 * @property {Vector}
	 */
	exports.default = {
	  BoundingBox: _BoundingBox2.default,
	  CollisionMesh: _CollisionMesh2.default,
	  /**
	   * A Position object. Alias of {@link Vector}.
	   * @class
	   * @alias Position
	   * @see {@link Vector} for further information.
	   */
	  Position: _Vector2.default,
	  /**
	   * A Size object. Alias of {@link Vector}.
	   * @class
	   * @alias Size
	   * @see {@link Vector} for further information.
	   */
	  Size: _Vector2.default,
	  Vector: _Vector2.default
	}; // TODO: Rewrite in class form, so can make use of get/set, and private.
	// TODO: Add asVector, asBoundingBox, asCollisionMesh to all classes (as a get),
	//       to easily coerce types!
	// TODO: Rewrite the classes to have more simplified functions (don't have complex
	//       functions that have very specific purposes).
	// TODO: Add proper argument checking! Not all methods have checks!
	
	module.exports = exports['default'];

/***/ },
/* 60 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _classCallCheck2 = __webpack_require__(61);
	
	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
	
	var _createClass2 = __webpack_require__(62);
	
	var _createClass3 = _interopRequireDefault(_createClass2);
	
	var _BoundingBox = __webpack_require__(66);
	
	var _BoundingBox2 = _interopRequireDefault(_BoundingBox);
	
	var _CollisionMesh = __webpack_require__(67);
	
	var _CollisionMesh2 = _interopRequireDefault(_CollisionMesh);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	/**
	 * A Vector class.
	 */
	var Vector = function () {
	    /**
	     * @param {Number} left - The position of the vector's x-axis.
	     * @param {Number} top - The position of the vector's y-axis.
	     * @returns {Vector} An instance of Vector
	     */
	    function Vector(left, top) {
	        (0, _classCallCheck3.default)(this, Vector);
	
	        var obj = left;
	
	        if (obj && obj.constructor !== Number) {
	            // new Vector(obj)
	            this.left = obj.left;
	            this.top = obj.top;
	        } else {
	            // new Vector(left, top)
	            this.left = left;
	            this.top = top;
	        }
	    }
	
	    /**
	     * Clone the current vector to a new object.
	     * @returns {Vector} A clone of this instance
	     */
	
	
	    (0, _createClass3.default)(Vector, [{
	        key: 'clone',
	        value: function clone() {
	            return new Vector(this);
	        }
	
	        /**
	         * Checks if any property on `this` is NaN.
	         * @returns {Boolean}
	         */
	
	    }, {
	        key: 'isNaN',
	        value: function (_isNaN) {
	            function isNaN() {
	                return _isNaN.apply(this, arguments);
	            }
	
	            isNaN.toString = function () {
	                return _isNaN.toString();
	            };
	
	            return isNaN;
	        }(function () {
	            return isNaN(this.left) || isNaN(this.top);
	        })
	
	        /**
	         * Resolve this object down to a {@link Vector} instance.
	         * Since this instance is already a vector, it returns itself.
	         * @returns {Vector} self
	         */
	
	    }, {
	        key: 'getVector',
	        value: function getVector() {
	            // We have this method, so any prototype in this script will return their position,
	            // and if they are one it will return itself.
	            // This simplifies code, and prevents having to do a ton of checks.
	            return this;
	        }
	
	        /**
	         * Returns a BoundingBox instance version of this vector similar to:<br>
	         * ```javascript
	         * new BoundingBox(Vector.left, Vector.top, Vector.left, Vector.top)
	         * ```
	         * @returns {BoundingBox}
	         */
	
	    }, {
	        key: 'getBoundingBox',
	        value: function getBoundingBox() {
	            // We have this method, so any prototype in this script will return their position,
	            // and if they are one it will return itself.
	            // This simplifies code, and prevents having to do a ton of checks.
	            return new _BoundingBox2.default(this.left, this.top, this.left, this.top);
	        }
	
	        /**
	         * Returns a {@link CollisionMesh} instance version of this vector similar to:<br>
	         * ```javascript
	         * new CollisionMesh(Vector.getBoundingBox())
	         * ```
	         * @returns {CollisionMesh}
	         */
	
	    }, {
	        key: 'getCollisionMesh',
	        value: function getCollisionMesh() {
	            return new _CollisionMesh2.default(this.getBoundingBox());
	        }
	
	        /**
	         * Returns the squared distance between `this` and `other`.
	         * @param {Vector}
	         * @returns {Number}
	         */
	
	    }, {
	        key: 'distanceSquared',
	        value: function distanceSquared(other) {
	            var diff = other.subtract(this);
	
	            return diff.left * diff.left + diff.top * diff.top;
	        }
	
	        /**
	         * Returns the distance between `this` and `other`.
	         * @param {Vector}
	         * @returns {Number}
	         */
	
	    }, {
	        key: 'distance',
	        value: function distance(other) {
	            return Math.sqrt(this.distanceSquared(other));
	        }
	
	        /**
	         * Sets `this.left` to `other.left`, and sets `this.top` to `other.top`.
	         * @param {Vector}
	         * @returns {Vector} self
	         */
	
	    }, {
	        key: 'set',
	        value: function set(other) {
	            if (!other) {
	                throw new Error("set requires argument 'other'");
	            }
	            other = other.getVector();
	
	            this.left = other.left;
	            this.top = other.top;
	            return this;
	        }
	
	        /**
	         * Move `this` to position at `left` and/or `top`.
	         * @param {Number} [left=null]
	         * @param {Number} [top=null]
	         * @returns {Vector} self
	         */
	
	    }, {
	        key: 'moveTo',
	        value: function moveTo(left, top) {
	            if (left && left.constructor === Number) {
	                this.left = left;
	            }
	            if (top && top.constructor === Number) {
	                this.top = top;
	            }
	            return this;
	        }
	
	        /**
	         * Move `this` relatively to position by `deltaLeft` and/or `deltaTop`.
	         * @param {Number} [deltaLeft=null]
	         * @param {Number} [deltaTop=null]
	         * @returns {Vector} self
	         */
	
	    }, {
	        key: 'moveBy',
	        value: function moveBy(deltaLeft, deltaTop) {
	            if (deltaLeft && deltaLeft.constructor === Number) {
	                this.left = deltaLeft;
	            }
	            if (deltaTop && deltaTop.constructor === Number) {
	                this.top = deltaTop;
	            }
	            return this;
	        }
	
	        /**
	         * Sets `this`'s properties if `other`'s is smaller.
	         * @param {Vector}
	         * @returns {Number}
	         */
	
	    }, {
	        key: 'setMin',
	        value: function setMin(other) {
	            if (!other) {
	                throw new Error("setMin requires argument 'other'");
	            }
	            other = other.getVector();
	
	            if (Math.abs(other.left) < Math.abs(this.left) || isNaN(this.left)) {
	                this.left = other.left;
	            }
	            if (Math.abs(other.top) < Math.abs(this.top) || isNaN(this.top)) {
	                this.top = other.top;
	            }
	        }
	
	        /**
	         * Sets `this`'s properties if `other`'s is larger.
	         * @param {Vector}
	         * @returns {Number}
	         */
	
	    }, {
	        key: 'setMax',
	        value: function setMax(other) {
	            if (!other) {
	                throw new Error("setMax requires argument 'other'");
	            }
	            other = other.getVector();
	
	            if (Math.abs(other.left) > Math.abs(this.left) || isNaN(this.left)) {
	                this.left = other.left;
	            }
	            if (Math.abs(other.top) > Math.abs(this.top) || isNaN(this.top)) {
	                this.top = other.top;
	            }
	        }
	
	        /**
	         * Add `other` to `this`.
	         * @param {Vector}
	         * @returns {Number}
	         */
	
	    }, {
	        key: 'add',
	        value: function add(other) {
	            if (!other) {
	                throw new Error("add requires argument 'other'");
	            }
	            other = other.getVector();
	
	            this.left += other.left;
	            this.top += other.top;
	            return this;
	        }
	    }, {
	        key: 'subtract',
	
	
	        /**
	         * Subtract `other` from `this`.
	         * @param {Vector}
	         * @returns {Number}
	         */
	        value: function subtract(other) {
	            if (!other) {
	                throw new Error("subtract requires argument 'other'");
	            }
	            other = other.getVector();
	
	            this.left -= other.left;
	            this.top -= other.top;
	            return this;
	        }
	    }]);
	    return Vector;
	}();
	
	exports.default = Vector;
	module.exports = exports['default'];

/***/ },
/* 61 */
/***/ function(module, exports) {

	"use strict";
	
	exports.__esModule = true;
	
	exports.default = function (instance, Constructor) {
	  if (!(instance instanceof Constructor)) {
	    throw new TypeError("Cannot call a class as a function");
	  }
	};

/***/ },
/* 62 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	exports.__esModule = true;
	
	var _defineProperty = __webpack_require__(63);
	
	var _defineProperty2 = _interopRequireDefault(_defineProperty);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	exports.default = function () {
	  function defineProperties(target, props) {
	    for (var i = 0; i < props.length; i++) {
	      var descriptor = props[i];
	      descriptor.enumerable = descriptor.enumerable || false;
	      descriptor.configurable = true;
	      if ("value" in descriptor) descriptor.writable = true;
	      (0, _defineProperty2.default)(target, descriptor.key, descriptor);
	    }
	  }
	
	  return function (Constructor, protoProps, staticProps) {
	    if (protoProps) defineProperties(Constructor.prototype, protoProps);
	    if (staticProps) defineProperties(Constructor, staticProps);
	    return Constructor;
	  };
	}();

/***/ },
/* 63 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(64), __esModule: true };

/***/ },
/* 64 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(65);
	var $Object = __webpack_require__(20).Object;
	module.exports = function defineProperty(it, key, desc){
	  return $Object.defineProperty(it, key, desc);
	};

/***/ },
/* 65 */
/***/ function(module, exports, __webpack_require__) {

	var $export = __webpack_require__(18);
	// 19.1.2.4 / 15.2.3.6 Object.defineProperty(O, P, Attributes)
	$export($export.S + $export.F * !__webpack_require__(28), 'Object', {defineProperty: __webpack_require__(24).f});

/***/ },
/* 66 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _classCallCheck2 = __webpack_require__(61);
	
	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
	
	var _createClass2 = __webpack_require__(62);
	
	var _createClass3 = _interopRequireDefault(_createClass2);
	
	var _getIterator2 = __webpack_require__(5);
	
	var _getIterator3 = _interopRequireDefault(_getIterator2);
	
	var _Vector = __webpack_require__(60);
	
	var _Vector2 = _interopRequireDefault(_Vector);
	
	var _CollisionMesh = __webpack_require__(67);
	
	var _CollisionMesh2 = _interopRequireDefault(_CollisionMesh);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	// Utility functions:
	// TODO: Utilize ES6 features (like for loops)
	function minAbs(min) {
	    var minAbs = Math.abs(min);
	
	    for (var _len = arguments.length, vals = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
	        vals[_key - 1] = arguments[_key];
	    }
	
	    var _iteratorNormalCompletion = true;
	    var _didIteratorError = false;
	    var _iteratorError = undefined;
	
	    try {
	        for (var _iterator = (0, _getIterator3.default)(vals), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
	            var val = _step.value;
	
	            var argAbs = Math.abs(val);
	
	            if (argAbs < minAbs) {
	                min = val;
	                minAbs = argAbs;
	            }
	        }
	    } catch (err) {
	        _didIteratorError = true;
	        _iteratorError = err;
	    } finally {
	        try {
	            if (!_iteratorNormalCompletion && _iterator.return) {
	                _iterator.return();
	            }
	        } finally {
	            if (_didIteratorError) {
	                throw _iteratorError;
	            }
	        }
	    }
	
	    return {
	        min: min,
	        abs: minAbs
	    };
	}
	
	/**
	 * A BoundingBox class.
	 */
	
	var BoundingBox = function () {
	    /**
	     * @param {Number} left - The left position of x-axis.
	     * @param {Number} top - The top position of y-axis.
	     * @param {Number} right - The right position of x-axis.
	     * @param {Number} bottom - The bottom position of y-axis.
	     */
	    function BoundingBox(left, top, right, bottom) {
	        (0, _classCallCheck3.default)(this, BoundingBox);
	
	        var obj = left;
	
	        if (obj && obj.constructor !== Number) {
	            if (obj.getBoundingBox) {
	                obj = obj.getBoundingBox();
	            }
	            // new BoundingBox(obj)
	            this.left = obj.left;
	            this.top = obj.top;
	            this.right = obj.right;
	            this.bottom = obj.bottom;
	        } else {
	            // new BoundingBox(left, top, right, bottom)
	            this.left = left;
	            this.top = top;
	            this.right = right;
	            this.bottom = bottom;
	        }
	    }
	
	    /**
	     * Clone the current boundingbox to a new object.
	     * @returns {BoundingBox} A clone of this instance
	     */
	
	
	    (0, _createClass3.default)(BoundingBox, [{
	        key: 'clone',
	        value: function clone() {
	            return new BoundingBox(this);
	        }
	
	        /**
	         * Checks if any property on `this` is NaN.
	         * @returns {Boolean}
	         */
	
	    }, {
	        key: 'isNaN',
	        value: function (_isNaN) {
	            function isNaN() {
	                return _isNaN.apply(this, arguments);
	            }
	
	            isNaN.toString = function () {
	                return _isNaN.toString();
	            };
	
	            return isNaN;
	        }(function () {
	            return isNaN(this.left) || isNaN(this.top) || isNaN(this.right) || isNaN(this.bottom);
	        })
	
	        /**
	         * Returns the width of `this`.
	         * @returns {Number} width
	         */
	
	    }, {
	        key: 'getWidth',
	        value: function getWidth() {
	            return Math.abs(this.right - this.left);
	        }
	
	        /**
	         * Returns the height of `this`.
	         * @returns {Number} height
	         */
	
	    }, {
	        key: 'getHeight',
	        value: function getHeight() {
	            return Math.abs(this.bottom - this.top);
	        }
	
	        /**
	         * Returns the size of `this`.
	         * @returns {Vector} size
	         */
	
	    }, {
	        key: 'getSize',
	        value: function getSize() {
	            return new _Vector2.default(this.getWidth(), this.getHeight());
	        }
	
	        /**
	         * Returns the area of `this`.
	         * @returns {Number} area
	         */
	
	    }, {
	        key: 'getArea',
	        value: function getArea() {
	            return this.getWidth() * this.getHeight();
	        }
	
	        /**
	         * Returns the position of `this`.
	         * @returns {Vector} position
	         */
	
	    }, {
	        key: 'getPosition',
	        value: function getPosition() {
	            return new _Vector2.default(this.left, this.top);
	        }
	
	        /**
	         * Resolve this object down to a {@link BoundingBox} instance.
	         * Since this instance is already a boundingbox, it returns itself.
	         * @returns {BoundingBox} self
	         */
	
	    }, {
	        key: 'getBoundingBox',
	        value: function getBoundingBox() {
	            // We have this method, so any prototype in this script will return their bounding box,
	            // and if they are one it will return itself.
	            // This simplifies code, and prevents having to do a ton of checks.
	            return this;
	        }
	
	        /**
	         * Returns a {@link CollisionMesh} instance version of this boundingbox similar to:<br>
	         * ```javascript
	         * new CollisionMesh(BoundingBox)
	         * ```
	         * @returns {CollisionMesh}
	         */
	
	    }, {
	        key: 'getCollisionMesh',
	        value: function getCollisionMesh() {
	            return new _CollisionMesh2.default(this);
	        }
	
	        /**
	         * Returns the center position of `this`.
	         * @returns {Vector} position
	         */
	
	    }, {
	        key: 'getCenterPosition',
	        value: function getCenterPosition() {
	            return new _Vector2.default(this.left + this.getWidth() / 2, this.top + this.getHeight() / 2);
	        }
	
	        /**
	         * Returns `this` subtract `other`.
	         * @param {BoundingBox}
	         * @returns {Vector} position
	         */
	
	    }, {
	        key: 'difference',
	        value: function difference(other) {
	            if (!other) {
	                throw new Error("difference requires argument 'other'");
	            }
	            other = other.getBoundingBox();
	
	            return new BoundingBox(this.left - other.left, this.top - other.top, this.right - other.right, this.bottom - other.bottom);
	        }
	
	        /**
	         * Returns a position, which if `this` is set to, `this` will be centered on `other`.
	         * @param {BoundingBox}
	         * @returns {Vector} position
	         */
	
	    }, {
	        key: 'getCenteredOnPosition',
	        value: function getCenteredOnPosition(other) {
	            if (!other) {
	                throw new Error("getCenteredOnPosition requires argument 'other'");
	            }
	            other = other.getBoundingBox();
	
	            return other.getCenterPosition().subtract(this.getCenterPosition().subtract(this.getPosition()));
	        }
	
	        /**
	         * Returns the intersection between `this` and `other`.
	         * This will return a {@link Vector} if they only intersect at a point.
	         * This will return a {@link BoundingBox} if they intersect over an area or line.
	         * This will return a undefined if they do not intersect.
	         * @param {BoundingBox}
	         * @returns {Vector|BoundingBox|undefined} intersection object
	         */
	
	    }, {
	        key: 'getIntersection',
	        value: function getIntersection(other) {
	            if (!other) {
	                throw new Error("getIntersection requires argument 'other'");
	            }
	            other = other.getBoundingBox();
	
	            var left = Math.max(this.left, other.left);
	            var top = Math.max(this.top, other.top);
	            var right = Math.min(this.right, other.right);
	            var bottom = Math.min(this.bottom, other.bottom);
	
	            if (left === right && top === bottom) {
	                return new _Vector2.default(left, top);
	            } else if (left <= right && top <= bottom) {
	                return new BoundingBox(left, top, right, bottom);
	            }
	        }
	
	        /**
	         * Returns the squared distance between `this` and `other`.
	         * @param {Vector}
	         * @returns {Number} squared distance
	         */
	
	    }, {
	        key: 'getDistanceSquaredToPoint',
	        value: function getDistanceSquaredToPoint(other) {
	            other = other.getVector();
	            var cLeft = other.left <= this.left ? this.left : other.left >= this.right ? this.right : other.left;
	            var cTop = other.top <= this.top ? this.top : other.top >= this.bottom ? this.bottom : other.top;
	            var cPos = new _Vector2.default(cLeft, cTop);
	
	            return cPos.distanceSquared(other);
	        }
	
	        /**
	         * Returns the distance between `this` and `other`.
	         * @param {Vector}
	         * @returns {Number} distance
	         */
	
	    }, {
	        key: 'getDistanceToPoint',
	        value: function getDistanceToPoint(other) {
	            return Math.sqrt(this.getDistanceSquaredToPoint(other));
	        }
	
	        /**
	         * Sets `this`'s properties to `other`'s properties.
	         * @param {BoundingBox}
	         * @returns {BoundingBox} self
	         */
	
	    }, {
	        key: 'set',
	        value: function set(other) {
	            if (!other) {
	                throw new Error("set requires argument 'other'");
	            }
	            other = other.getBoundingBox();
	
	            this.left = other.left;
	            this.top = other.top;
	            this.right = other.right;
	            this.bottom = other.bottom;
	            return this;
	        }
	
	        /**
	         * Move `this` to position at `left` and/or `top`.
	         * @param {Number} [left=null]
	         * @param {Number} [top=null]
	         * @returns {BoundingBox} self
	         */
	
	    }, {
	        key: 'moveTo',
	        value: function moveTo(left, top) {
	            if (left && left.constructor === Number) {
	                this.right = left + (this.right - this.left);
	                this.left = left;
	            }
	            if (top && top.constructor === Number) {
	                this.bottom = top + (this.bottom - this.top);
	                this.top = top;
	            }
	            return this;
	        }
	
	        /**
	         * Move `this` relatively to position by `deltaLeft` and/or `deltaTop`.
	         * @param {Number} [deltaLeft=null]
	         * @param {Number} [deltaTop=null]
	         * @returns {BoundingBox} self
	         */
	
	    }, {
	        key: 'moveBy',
	        value: function moveBy(deltaLeft, deltaTop) {
	            if (deltaLeft && deltaLeft.constructor === Number) {
	                this.left += deltaLeft;
	                this.right += deltaLeft;
	            }
	            if (deltaTop && deltaTop.constructor === Number) {
	                this.top += deltaTop;
	                this.bottom += deltaTop;
	            }
	            return this;
	        }
	
	        /**
	         * Resize `this` to size `width` and/or `height`, anchored at `anchor`.
	         * @param {Number} [width=null]
	         * @param {Number} [height=null]
	         * @param {String} [anchor='top-left'] supports "top-left", "top-right", "bottom-left", or "bottom-right"
	         * @returns {BoundingBox} self
	         */
	
	    }, {
	        key: 'resizeTo',
	        value: function resizeTo(width, height, anchor) {
	            // NOTE: anchor supports "top-left", "top-right", "bottom-left", or "bottom-right". By default it is "top-left".
	            // NOTE: anchor also supports being passed as a position. Allowing the resize anchor to be anywhere other than
	            //       the predefined strings.
	            var curSize = this.getSize();
	            var newSize = new _Vector2.default(width || curSize.left, height || curSize.top);
	
	            anchor = anchor || 'top-left';
	            if (typeof anchor === 'string' || anchor instanceof String) {
	                var anchorStr = anchor;
	
	                anchor = this.getPosition();
	                if (anchorStr.indexOf('right') >= 0) {
	                    anchor.left += curSize.left;
	                }
	                if (anchorStr.indexOf('bottom') >= 0) {
	                    anchor.top += curSize.top;
	                }
	            }
	
	            this.left += (anchor.left - this.left) * (curSize.left - newSize.left) / curSize.left;
	            this.right += (anchor.left - this.right) * (curSize.left - newSize.left) / curSize.left;
	            this.top += (anchor.top - this.top) * (curSize.top - newSize.top) / curSize.top;
	            this.bottom += (anchor.top - this.bottom) * (curSize.top - newSize.top) / curSize.top;
	            return this;
	        }
	
	        /**
	         * Determines if `this` encapsulates `other`.
	         * @param {BoundingBox}
	         * @returns {Boolean}
	         */
	
	    }, {
	        key: 'isContains',
	        value: function isContains(other) {
	            if (!other) {
	                throw new Error("isContains requires argument 'other'");
	            }
	            other = other.getBoundingBox();
	
	            return other.left >= this.left && other.right <= this.right && other.top >= this.top && other.bottom <= this.bottom;
	        }
	
	        /**
	         * Determines if `this` encapsulates at least one of `others`.
	         * @param {BoundingBox[]}
	         * @returns {Boolean}
	         */
	
	    }, {
	        key: 'someContains',
	        value: function someContains(others) {
	            if (!others) {
	                throw new Error("someContains requires argument 'others'");
	            }
	            if (others.constructor !== Array) {
	                throw new Error("someContains requires argument 'others' of type Array");
	            }
	
	            for (var index = 0; index < others.length; index += 1) {
	                if (this.isContains(others[index])) {
	                    return true;
	                }
	            }
	            return false;
	        }
	
	        /**
	         * Determines if `this` touches an edge of `other`, but does not intersect area.
	         * @param {BoundingBox}
	         * @returns {Boolean}
	         */
	
	    }, {
	        key: 'isTouching',
	        value: function isTouching(other) {
	            if (!other) {
	                throw new Error("isTouching requires argument 'other'");
	            }
	            other = other.getBoundingBox();
	
	            return this.top <= other.bottom && this.bottom >= other.top && (this.left === other.right || this.right === other.left) || this.left <= other.right && this.right >= other.left && (this.top === other.bottom || this.bottom === other.top);
	        }
	
	        /**
	         * If `this` touches one of `others`, but does not intersect area, then this returns the `this` edge name.
	         * @param {BoundingBox[]}
	         * @returns {String|undefined} edge name
	         */
	
	    }, {
	        key: 'getEdgeTouching',
	        value: function getEdgeTouching(others) {
	            if (!others) {
	                throw new Error("getEdgeTouching requires argument 'others'");
	            }
	            if (others.constructor !== Array) {
	                others = [others];
	            }
	
	            for (var index = 0; index < others.length; index += 1) {
	                var other = others[index].getBoundingBox();
	
	                if (this.top <= other.bottom && this.bottom >= other.top) {
	                    if (this.left === other.right) {
	                        return 'left';
	                    }
	                    if (this.right === other.left) {
	                        return 'right';
	                    }
	                }
	                if (this.left <= other.right && this.right >= other.left) {
	                    if (this.top === other.bottom) {
	                        return 'top';
	                    }
	                    if (this.bottom === other.top) {
	                        return 'bottom';
	                    }
	                }
	            }
	        }
	
	        /**
	         * If `this` touches one of `others`, but does not intersect area, then this returns the `other` edge name.
	         * @param {BoundingBox[]}
	         * @returns {String|undefined} edge name
	         */
	
	    }, {
	        key: 'getOtherEdgeTouching',
	        value: function getOtherEdgeTouching(others) {
	            if (!others) {
	                throw new Error("getOtherEdgeTouching requires argument 'others'");
	            }
	            if (others.constructor !== Array) {
	                others = [others];
	            }
	
	            for (var index = 0; index < others.length; index += 1) {
	                var other = others[index].getBoundingBox();
	
	                if (this.top <= other.bottom && this.bottom >= other.top) {
	                    if (this.left === other.right) {
	                        return 'right';
	                    }
	                    if (this.right === other.left) {
	                        return 'left';
	                    }
	                }
	                if (this.left <= other.right && this.right >= other.left) {
	                    if (this.top === other.bottom) {
	                        return 'bottom';
	                    }
	                    if (this.bottom === other.top) {
	                        return 'top';
	                    }
	                }
	            }
	        }
	
	        /**
	         * Determines which edges of `this` is closest to `other`, returns all edges in sorted order by distance.
	         * @param {BoundingBox}
	         * @returns {String[]} edge names sorted from closest to furthest
	         */
	
	    }, {
	        key: 'getEdgeClosestOrder',
	        value: function getEdgeClosestOrder(other) {
	            if (!other) {
	                throw new Error("getEdgeClosest requires argument 'other'");
	            }
	            other = other.getBoundingBox();
	            var centerPos = this.getCenterPosition();
	            var dis = [];
	
	            dis.push({
	                'edge': 'left',
	                dis: other.getDistanceSquaredToPoint(this.left, centerPos.top)
	            });
	            dis.push({
	                'edge': 'top',
	                dis: other.getDistanceSquaredToPoint(centerPos.left, this.top)
	            });
	            dis.push({
	                'edge': 'right',
	                dis: other.getDistanceSquaredToPoint(this.right, centerPos.top)
	            });
	            dis.push({
	                'edge': 'bottom',
	                dis: other.getDistanceSquaredToPoint(centerPos.left, this.bottom)
	            });
	            dis.sort(function (a, b) {
	                return a.dis - b.dis;
	            });
	
	            return dis.map(function (dis) {
	                return dis.edge;
	            });
	        }
	
	        /**
	         * Determines which `this` edge is closest to `other`.
	         * @param {BoundingBox}
	         * @returns {String} edge name
	         */
	
	    }, {
	        key: 'getEdgeClosest',
	        value: function getEdgeClosest(other) {
	            var edges = this.getEdgeClosestOrder(other);
	
	            return edges[0];
	        }
	
	        /**
	         * Returns a vector representing the delta position to add to `this` to snap to `other`.<br>
	         * Note: `snapDelta` may contain `NaN` for `left` or `right`
	         * @param {BoundingBox}
	         * @param {Number} [snapDistance=5] max distance to move `this`
	         * @returns {Vector} snapDelta
	         */
	
	    }, {
	        key: 'getSnapDelta',
	        value: function getSnapDelta(other, snapDistance) {
	            if (!other) {
	                throw new Error("getSnapDelta requires argument 'other'");
	            }
	            other = other.getBoundingBox();
	            snapDistance = snapDistance || 5;
	
	            var snapDelta = new _Vector2.default(NaN, NaN);
	
	            if (this.top <= other.bottom && this.bottom >= other.top) {
	                // Handle x-snap:
	                var leftRightDis = minAbs(other.left - this.right, other.right - this.left);
	
	                if (leftRightDis.abs <= snapDistance) {
	                    // this.LeftRightSnapTo(other)
	                    snapDelta.left = leftRightDis.min;
	
	                    // Handle y-subsnap:
	                    var topBottomDis = minAbs(other.top - this.top, other.bottom - this.bottom);
	
	                    if (topBottomDis.abs <= snapDistance) {
	                        // this.TopBottomSubSnapTo(other)
	                        snapDelta.top = topBottomDis.min;
	                    }
	                }
	            } else if (this.left <= other.right && this.right >= other.left) {
	                // Handle y-snap:
	                var _topBottomDis = minAbs(other.top - this.bottom, other.bottom - this.top);
	
	                if (_topBottomDis.abs <= snapDistance) {
	                    // this.TopBottomSnapTo(other)
	                    snapDelta.top = _topBottomDis.min;
	
	                    // Handle x-subsnap:
	                    var _leftRightDis = minAbs(other.left - this.left, other.right - this.right);
	
	                    if (_leftRightDis.abs <= snapDistance) {
	                        // this.LeftRightSubSnapTo(other)
	                        snapDelta.left = _leftRightDis.min;
	                    }
	                }
	            }
	
	            return snapDelta;
	        }
	
	        /**
	         * Determines if `this` touches an edge of one of `others`, but does not intersect area.
	         * @param {BoundingBox[]}
	         * @returns {Boolean}
	         */
	
	    }, {
	        key: 'someTouching',
	        value: function someTouching(others) {
	            if (!others) {
	                throw new Error("someTouching requires argument 'others'");
	            }
	            if (others.constructor !== Array) {
	                throw new Error("someTouching requires argument 'others' of type Array");
	            }
	
	            for (var index = 0; index < others.length; index += 1) {
	                if (this.isTouching(others[index])) {
	                    return true;
	                }
	            }
	            return false;
	        }
	
	        /**
	         * Determines if `this` intersects an area of `others`, not an edge.
	         * @param {BoundingBox}
	         * @returns {Boolean}
	         */
	
	    }, {
	        key: 'isColliding',
	        value: function isColliding(other) {
	            if (!other) {
	                throw new Error("isColliding requires argument 'other'");
	            }
	            other = other.getBoundingBox();
	
	            return this.left < other.right && this.right > other.left && this.top < other.bottom && this.bottom > other.top;
	        }
	
	        /**
	         * Determines if `this` intersects an area of one of `others`, not an edge.
	         * @param {BoundingBox[]}
	         * @returns {Boolean}
	         */
	
	    }, {
	        key: 'someColliding',
	        value: function someColliding(others) {
	            if (!others) {
	                throw new Error("someColliding requires argument 'others'");
	            }
	            if (others.constructor !== Array) {
	                throw new Error("someColliding requires argument 'others' of type Array");
	            }
	
	            for (var index = 0; index < others.length; index += 1) {
	                if (this.isColliding(others[index])) {
	                    return true;
	                }
	            }
	            return false;
	        }
	
	        /**
	         * Returns which of `other` that `this` intersects an area of, not an edge.
	         * @param {BoundingBox[]}
	         * @returns {BoundingBox|undefined}
	         */
	
	    }, {
	        key: 'getColliding',
	        value: function getColliding(others) {
	            if (!others) {
	                throw new Error("getColliding requires argument 'others'");
	            }
	            if (others.constructor !== Array) {
	                throw new Error("getColliding requires argument 'others' of type Array");
	            }
	
	            for (var index = 0; index < others.length; index += 1) {
	                if (this.isColliding(others[index])) {
	                    return others[index];
	                }
	            }
	        }
	    }]);
	    return BoundingBox;
	}();
	
	exports.default = BoundingBox;
	module.exports = exports['default'];

/***/ },
/* 67 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _getIterator2 = __webpack_require__(5);
	
	var _getIterator3 = _interopRequireDefault(_getIterator2);
	
	var _classCallCheck2 = __webpack_require__(61);
	
	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
	
	var _createClass2 = __webpack_require__(62);
	
	var _createClass3 = _interopRequireDefault(_createClass2);
	
	var _Vector = __webpack_require__(60);
	
	var _Vector2 = _interopRequireDefault(_Vector);
	
	var _BoundingBox = __webpack_require__(66);
	
	var _BoundingBox2 = _interopRequireDefault(_BoundingBox);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	/**
	 * A CollisionMesh class.
	 */
	var CollisionMesh = function () {
	    /**
	     * @param {BoundingBox[]} boxes - An array of objects thatg resolve to BoundingBox.
	     */
	    function CollisionMesh(boxes) {
	        var opts = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
	        (0, _classCallCheck3.default)(this, CollisionMesh);
	
	        if (!boxes) {
	            throw new Error('CollisionMesh constructor requires argument \'boxes\'');
	        }
	        if (boxes.constructor !== Array) {
	            boxes = [boxes];
	        }
	        this.boxes = [];
	
	        var _iteratorNormalCompletion = true;
	        var _didIteratorError = false;
	        var _iteratorError = undefined;
	
	        try {
	            for (var _iterator = (0, _getIterator3.default)(boxes), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
	                var box = _step.value;
	
	                if (box.constructor === _BoundingBox2.default) {
	                    this.boxes.push(box);
	                } else if (box.constructor === CollisionMesh) {
	                    this.boxes = this.boxes.concat(box.boxes);
	                } else {
	                    this.boxes = this.boxes.concat(box.getCollisionMesh(opts).boxes);
	                }
	            }
	        } catch (err) {
	            _didIteratorError = true;
	            _iteratorError = err;
	        } finally {
	            try {
	                if (!_iteratorNormalCompletion && _iterator.return) {
	                    _iterator.return();
	                }
	            } finally {
	                if (_didIteratorError) {
	                    throw _iteratorError;
	                }
	            }
	        }
	    }
	
	    /**
	     * Clone the current collisionmesh to a new object.
	     * @returns {CollisionMesh} A clone of this instance
	     */
	
	
	    (0, _createClass3.default)(CollisionMesh, [{
	        key: 'clone',
	        value: function clone() {
	            var boxes = new Array(this.boxes.length);
	
	            for (var index = 0; index < this.boxes.length; index += 1) {
	                boxes[index] = this.boxes[index].clone();
	            }
	
	            return new CollisionMesh(boxes);
	        }
	
	        /**
	         * Returns the width of `this`.
	         * @returns {Number} width
	         */
	
	    }, {
	        key: 'getWidth',
	        value: function getWidth() {
	            if (this.boxes.length === 0) {
	                return 0;
	            }
	            var left = this.boxes[0].left;
	            var right = this.boxes[0].right;
	
	            for (var index = 1; index < this.boxes.length; index += 1) {
	                // This assumes left is least, and right is most in terms of value:
	                left = Math.min(left, this.boxes[index].left);
	                right = Math.max(right, this.boxes[index].right);
	            }
	
	            return right - left;
	        }
	
	        /**
	         * Returns the height of `this`.
	         * @returns {Number} height
	         */
	
	    }, {
	        key: 'getHeight',
	        value: function getHeight() {
	            if (this.boxes.length === 0) {
	                return 0;
	            }
	
	            var top = this.boxes[0].top;
	            var bottom = this.boxes[0].bottom;
	
	            for (var index = 1; index < this.boxes.length; index += 1) {
	                // This assumes top is least, and bottom is most in terms of value:
	                top = Math.min(top, this.boxes[index].top);
	                bottom = Math.max(bottom, this.boxes[index].bottom);
	            }
	
	            return bottom - top;
	        }
	
	        /**
	         * Returns the size of `this`.
	         * @returns {Vector} size
	         */
	
	    }, {
	        key: 'getSize',
	        value: function getSize() {
	            return this.getBoundingBox().getSize();
	        }
	
	        /**
	         * Returns the position of `this`.
	         * @returns {Vector} position
	         */
	
	    }, {
	        key: 'getPosition',
	        value: function getPosition() {
	            return this.getBoundingBox().getPosition();
	        }
	
	        /**
	         * Returns a BoundingBox instance version of this collisionmesh, which encapsulates all of it's internal boxes.
	         * @returns {BoundingBox}
	         */
	
	    }, {
	        key: 'getBoundingBox',
	        value: function getBoundingBox() {
	            if (this.boxes.length === 0) {
	                return new _BoundingBox2.default(NaN, NaN, NaN, NaN);
	            }
	
	            var box = this.boxes[0].clone();
	
	            for (var index = 1; index < this.boxes.length; index += 1) {
	                box.left = Math.min(box.left, this.boxes[index].left);
	                box.top = Math.min(box.top, this.boxes[index].top);
	                box.right = Math.max(box.right, this.boxes[index].right);
	                box.bottom = Math.max(box.bottom, this.boxes[index].bottom);
	            }
	
	            return box;
	        }
	
	        /**
	         * Resolve this object down to a {@link CollisionMesh} instance.
	         * Since this instance is already a collisionmesh, it returns itself.
	         * @returns {CollisionMesh} self
	         */
	
	    }, {
	        key: 'getCollisionMesh',
	        value: function getCollisionMesh() {
	            return this;
	        }
	
	        /**
	         * Move `this` to position at `left` and/or `top`.
	         * @param {Number} [left=null]
	         * @param {Number} [top=null]
	         * @returns {BoundingBox} self
	         */
	
	    }, {
	        key: 'moveTo',
	        value: function moveTo(left, top) {
	            var newPosition = new _Vector2.default(left, top);
	
	            this.moveBy(newPosition.subtract(this.getPosition()));
	            return this;
	        }
	
	        /**
	         * Move `this` relatively to position by `deltaLeft` and/or `deltaTop`.
	         * @param {Number} [deltaLeft=null]
	         * @param {Number} [deltaTop=null]
	         * @returns {BoundingBox} self
	         */
	
	    }, {
	        key: 'moveBy',
	        value: function moveBy(left, top) {
	            var newPosition = new _Vector2.default(left || 0, top || 0);
	
	            var _iteratorNormalCompletion2 = true;
	            var _didIteratorError2 = false;
	            var _iteratorError2 = undefined;
	
	            try {
	                for (var _iterator2 = (0, _getIterator3.default)(this.boxes), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
	                    var box = _step2.value;
	
	                    box.moveBy(newPosition);
	                }
	            } catch (err) {
	                _didIteratorError2 = true;
	                _iteratorError2 = err;
	            } finally {
	                try {
	                    if (!_iteratorNormalCompletion2 && _iterator2.return) {
	                        _iterator2.return();
	                    }
	                } finally {
	                    if (_didIteratorError2) {
	                        throw _iteratorError2;
	                    }
	                }
	            }
	
	            return this;
	        }
	
	        /**
	         * Determines if `this` encapsulates all of `other`.
	         * @param {CollisionMesh|BoundingBox[]}
	         * @returns {Boolean}
	         */
	
	    }, {
	        key: 'isContains',
	        value: function isContains(other) {
	            if (!other) {
	                throw new Error('isContains requires argument \'other\'');
	            }
	            other = other.constructor === Array ? new CollisionMesh(other) : other.getCollisionMesh();
	
	            var _iteratorNormalCompletion3 = true;
	            var _didIteratorError3 = false;
	            var _iteratorError3 = undefined;
	
	            try {
	                for (var _iterator3 = (0, _getIterator3.default)(other.boxes), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
	                    var otherBox = _step3.value;
	
	                    var contained = false;
	
	                    var _iteratorNormalCompletion4 = true;
	                    var _didIteratorError4 = false;
	                    var _iteratorError4 = undefined;
	
	                    try {
	                        for (var _iterator4 = (0, _getIterator3.default)(this.boxes), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
	                            var thisBox = _step4.value;
	
	                            contained |= thisBox.isContains(otherBox);
	                        }
	                    } catch (err) {
	                        _didIteratorError4 = true;
	                        _iteratorError4 = err;
	                    } finally {
	                        try {
	                            if (!_iteratorNormalCompletion4 && _iterator4.return) {
	                                _iterator4.return();
	                            }
	                        } finally {
	                            if (_didIteratorError4) {
	                                throw _iteratorError4;
	                            }
	                        }
	                    }
	
	                    if (!contained) {
	                        return false;
	                    }
	                }
	            } catch (err) {
	                _didIteratorError3 = true;
	                _iteratorError3 = err;
	            } finally {
	                try {
	                    if (!_iteratorNormalCompletion3 && _iterator3.return) {
	                        _iterator3.return();
	                    }
	                } finally {
	                    if (_didIteratorError3) {
	                        throw _iteratorError3;
	                    }
	                }
	            }
	
	            return true;
	        }
	
	        /**
	         * Determines if `this` encapsulates at least one of `other`.
	         * @param {CollisionMesh|BoundingBox[]}
	         * @returns {Boolean}
	         */
	
	    }, {
	        key: 'someContains',
	        value: function someContains(other) {
	            if (!other) {
	                throw new Error('someContains requires argument \'other\'');
	            }
	            other = other.constructor === Array ? new CollisionMesh(other) : other.getCollisionMesh();
	
	            var _iteratorNormalCompletion5 = true;
	            var _didIteratorError5 = false;
	            var _iteratorError5 = undefined;
	
	            try {
	                for (var _iterator5 = (0, _getIterator3.default)(this.boxes), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
	                    var box = _step5.value;
	
	                    if (box.someContains(other.boxes)) {
	                        return true;
	                    }
	                }
	            } catch (err) {
	                _didIteratorError5 = true;
	                _iteratorError5 = err;
	            } finally {
	                try {
	                    if (!_iteratorNormalCompletion5 && _iterator5.return) {
	                        _iterator5.return();
	                    }
	                } finally {
	                    if (_didIteratorError5) {
	                        throw _iteratorError5;
	                    }
	                }
	            }
	
	            return false;
	        }
	
	        /**
	         * Determines if `this` touches an edge of `other`, but does not intersect area.
	         * @param {CollisionMesh|BoundingBox[]}
	         * @returns {Boolean}
	         */
	
	    }, {
	        key: 'isTouching',
	        value: function isTouching(other) {
	            if (!other) {
	                throw new Error('isTouching requires argument \'other\'');
	            }
	            other = other.constructor === Array ? new CollisionMesh(other) : other.getCollisionMesh();
	
	            var _iteratorNormalCompletion6 = true;
	            var _didIteratorError6 = false;
	            var _iteratorError6 = undefined;
	
	            try {
	                for (var _iterator6 = (0, _getIterator3.default)(this.boxes), _step6; !(_iteratorNormalCompletion6 = (_step6 = _iterator6.next()).done); _iteratorNormalCompletion6 = true) {
	                    var box = _step6.value;
	
	                    if (box.someTouching(other.boxes)) {
	                        return true;
	                    }
	                }
	            } catch (err) {
	                _didIteratorError6 = true;
	                _iteratorError6 = err;
	            } finally {
	                try {
	                    if (!_iteratorNormalCompletion6 && _iterator6.return) {
	                        _iterator6.return();
	                    }
	                } finally {
	                    if (_didIteratorError6) {
	                        throw _iteratorError6;
	                    }
	                }
	            }
	
	            return false;
	        }
	
	        /**
	         * Determines if `this` touches an edge of one of `others`, but does not intersect area.
	         * @param {CollisionMesh[]}
	         * @returns {Boolean}
	         */
	
	    }, {
	        key: 'someTouching',
	        value: function someTouching(others) {
	            if (!others) {
	                throw new Error('someTouching requires argument \'others\'');
	            }
	            if (others.constructor !== Array) {
	                throw new Error('someTouching requires argument \'others\' to resolve to type Array');
	            }
	
	            var _iteratorNormalCompletion7 = true;
	            var _didIteratorError7 = false;
	            var _iteratorError7 = undefined;
	
	            try {
	                for (var _iterator7 = (0, _getIterator3.default)(others), _step7; !(_iteratorNormalCompletion7 = (_step7 = _iterator7.next()).done); _iteratorNormalCompletion7 = true) {
	                    var other = _step7.value;
	
	                    if (this.isTouching(other)) {
	                        return true;
	                    }
	                }
	            } catch (err) {
	                _didIteratorError7 = true;
	                _iteratorError7 = err;
	            } finally {
	                try {
	                    if (!_iteratorNormalCompletion7 && _iterator7.return) {
	                        _iterator7.return();
	                    }
	                } finally {
	                    if (_didIteratorError7) {
	                        throw _iteratorError7;
	                    }
	                }
	            }
	
	            return false;
	        }
	
	        /**
	         * Determines if `this` intersects an area of `other`, not an edge.
	         * @param {CollisionMesh|BoundingBox[]}
	         * @returns {Boolean}
	         */
	
	    }, {
	        key: 'isColliding',
	        value: function isColliding(other) {
	            if (!other) {
	                throw new Error('isColliding requires argument \'other\'');
	            }
	            other = other.constructor === Array ? new CollisionMesh(other) : other.getCollisionMesh();
	
	            var _iteratorNormalCompletion8 = true;
	            var _didIteratorError8 = false;
	            var _iteratorError8 = undefined;
	
	            try {
	                for (var _iterator8 = (0, _getIterator3.default)(this.boxes), _step8; !(_iteratorNormalCompletion8 = (_step8 = _iterator8.next()).done); _iteratorNormalCompletion8 = true) {
	                    var box = _step8.value;
	
	                    if (box.someColliding(other.boxes)) {
	                        return true;
	                    }
	                }
	            } catch (err) {
	                _didIteratorError8 = true;
	                _iteratorError8 = err;
	            } finally {
	                try {
	                    if (!_iteratorNormalCompletion8 && _iterator8.return) {
	                        _iterator8.return();
	                    }
	                } finally {
	                    if (_didIteratorError8) {
	                        throw _iteratorError8;
	                    }
	                }
	            }
	
	            return false;
	        }
	
	        /**
	         * Determines if `this` intersects an area of one of `others`, not an edge.
	         * @param {CollisionMesh[]}
	         * @returns {Boolean}
	         */
	
	    }, {
	        key: 'someColliding',
	        value: function someColliding(others) {
	            if (!others) {
	                throw new Error('someColliding requires argument \'others\'');
	            }
	            if (others.constructor !== Array) {
	                throw new Error('someColliding requires argument \'others\' to resolve to type Array');
	            }
	
	            var _iteratorNormalCompletion9 = true;
	            var _didIteratorError9 = false;
	            var _iteratorError9 = undefined;
	
	            try {
	                for (var _iterator9 = (0, _getIterator3.default)(others), _step9; !(_iteratorNormalCompletion9 = (_step9 = _iterator9.next()).done); _iteratorNormalCompletion9 = true) {
	                    var other = _step9.value;
	                    var _iteratorNormalCompletion10 = true;
	                    var _didIteratorError10 = false;
	                    var _iteratorError10 = undefined;
	
	                    try {
	                        for (var _iterator10 = (0, _getIterator3.default)(this.boxes), _step10; !(_iteratorNormalCompletion10 = (_step10 = _iterator10.next()).done); _iteratorNormalCompletion10 = true) {
	                            var box = _step10.value;
	
	                            if (box.isColliding(other)) {
	                                return true;
	                            }
	                        }
	                    } catch (err) {
	                        _didIteratorError10 = true;
	                        _iteratorError10 = err;
	                    } finally {
	                        try {
	                            if (!_iteratorNormalCompletion10 && _iterator10.return) {
	                                _iterator10.return();
	                            }
	                        } finally {
	                            if (_didIteratorError10) {
	                                throw _iteratorError10;
	                            }
	                        }
	                    }
	                }
	            } catch (err) {
	                _didIteratorError9 = true;
	                _iteratorError9 = err;
	            } finally {
	                try {
	                    if (!_iteratorNormalCompletion9 && _iterator9.return) {
	                        _iterator9.return();
	                    }
	                } finally {
	                    if (_didIteratorError9) {
	                        throw _iteratorError9;
	                    }
	                }
	            }
	
	            return false;
	        }
	
	        /**
	         * Returns which box of `other` that `this` intersects an area of, not an edge.
	         * @param {CollisionMesh|BoundingBox[]}
	         * @returns {BoundingBox|undefined}
	         */
	
	    }, {
	        key: 'getColliding',
	        value: function getColliding(other) {
	            if (!other) {
	                throw new Error('getColliding requires argument \'other\'');
	            }
	            other = other.constructor === Array ? new CollisionMesh(other) : other.getCollisionMesh();
	
	            var _iteratorNormalCompletion11 = true;
	            var _didIteratorError11 = false;
	            var _iteratorError11 = undefined;
	
	            try {
	                for (var _iterator11 = (0, _getIterator3.default)(this.boxes), _step11; !(_iteratorNormalCompletion11 = (_step11 = _iterator11.next()).done); _iteratorNormalCompletion11 = true) {
	                    var box = _step11.value;
	
	                    var collided = box.getColliding(other.boxes);
	
	                    if (collided) {
	                        return collided;
	                    }
	                }
	            } catch (err) {
	                _didIteratorError11 = true;
	                _iteratorError11 = err;
	            } finally {
	                try {
	                    if (!_iteratorNormalCompletion11 && _iterator11.return) {
	                        _iterator11.return();
	                    }
	                } finally {
	                    if (_didIteratorError11) {
	                        throw _iteratorError11;
	                    }
	                }
	            }
	        }
	    }]);
	    return CollisionMesh;
	}();
	
	exports.default = CollisionMesh;
	module.exports = exports['default'];

/***/ },
/* 68 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	__webpack_require__(69);
	
	// TODO: Add runtime checks here for OpenFin and Electron
	var runtime = void 0; /* global fin */
	
	
	if (typeof process !== 'undefined' && process && process.versions && (process.versions.electron || process.versions.node) || typeof window !== 'undefined' && window && window.nodeRequire && window.nodeRequire.runtime) {
	    // We are running in an Electron Runtime:
	    runtime = __webpack_require__(70);
	} else if (typeof fin !== 'undefined' && fin && fin.desktop && fin.desktop.main) {
	    // We are running in an OpenFin Runtime:
	    runtime = __webpack_require__(136);
	} else {
	    // We are running in an Browser Runtime:
	    runtime = __webpack_require__(142);
	}
	
	exports.default = runtime;
	module.exports = exports['default'];

/***/ },
/* 69 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _getIterator2 = __webpack_require__(5);
	
	var _getIterator3 = _interopRequireDefault(_getIterator2);
	
	var _global = __webpack_require__(2);
	
	var _global2 = _interopRequireDefault(_global);
	
	var _index = __webpack_require__(3);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var callbacks = [];
	var isReady = false;
	
	/**
	 * Executes callback when windowmanager is ready.
	 * @memberof windowmanager
	 * @method
	 * @param {callback}
	 */
	_global2.default.onReady = function (callback) {
	    // Check if callback is not a function:
	    if (!(callback && callback.constructor && callback.call && callback.apply)) {
	        throw new Error('onReady expects a function passed as the callback argument!');
	    }
	
	    // Check if already ready:
	    if (isReady) {
	        callback();
	    }
	
	    // Check to see if callback is already in callbacks:
	    if (callbacks.indexOf(callback) >= 0) {
	        return;
	    }
	
	    callbacks.push(callback);
	};
	
	/**
	 * Returns if windowmanager is ready.
	 * @memberof windowmanager
	 * @method
	 * @returns {Boolean}
	 */
	_global2.default.isReady = function () {
	    return isReady;
	};
	
	exports.default = new _index.SyncCallback(function () {
	    isReady = true;
	    var _iteratorNormalCompletion = true;
	    var _didIteratorError = false;
	    var _iteratorError = undefined;
	
	    try {
	        for (var _iterator = (0, _getIterator3.default)(callbacks), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
	            var callback = _step.value;
	            callback();
	        }
	    } catch (err) {
	        _didIteratorError = true;
	        _iteratorError = err;
	    } finally {
	        try {
	            if (!_iteratorNormalCompletion && _iterator.return) {
	                _iterator.return();
	            }
	        } finally {
	            if (_didIteratorError) {
	                throw _iteratorError;
	            }
	        }
	    }
	
	    callbacks = [];
	});
	module.exports = exports['default'];

/***/ },
/* 70 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _global = __webpack_require__(71);
	
	var _global2 = _interopRequireDefault(_global);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	// Setup windowmanager runtime variables for Electron
	// TODO: Determine if renderer should be setup using the startup script, and have renderer be a NOOP
	
	if (_global2.default._isNode) {
	    // We are running in an Electron's main script:
	    __webpack_require__(93);
	} else if (_global2.default._isRenderer) {
	    // We are running in an Electron renderer:
	    __webpack_require__(95);
	}

/***/ },
/* 71 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _map = __webpack_require__(72);
	
	var _map2 = _interopRequireDefault(_map);
	
	var _global = __webpack_require__(2);
	
	var _global2 = _interopRequireDefault(_global);
	
	var _require2 = __webpack_require__(92);
	
	var _require3 = _interopRequireDefault(_require2);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	_global2.default._isNode = false;
	_global2.default._isStartup = false;
	_global2.default._isRenderer = false;
	_global2.default.runtime.name = 'Electron';
	_global2.default.runtime.version = undefined;
	_global2.default.runtime.isElectron = true;
	
	// Determine if this is node or renderer:
	// TODO: Clean up the following code to clearly identify the three potential states: node, startup, renderer
	if (typeof global !== 'undefined' && global) {
	    // We are running in an Electron Window Backend's Runtime:
	    var _nodeRequire = (0, _require3.default)('electron'),
	        BrowserWindow = _nodeRequire.BrowserWindow;
	
	    // The following check works because BrowserWindow is not exposed to the window scripts:
	
	
	    _global2.default._isNode = BrowserWindow != null;
	    _global2.default._isStartup = !_global2.default._isNode;
	    _global2.default.runtime.version = global.process.versions.electron;
	
	    // If is a window startup script:
	    if (_global2.default._isStartup) {
	        (function () {
	            var _require = _require3.default;
	
	            _require.runtime = _global2.default.runtime;
	            _require.workingDir = _require('path').dirname(_require.main.filename);
	            _require.windowmanagerPath = __filename; // Used so new windows know where to load windowmanager from.
	            global.nodeRequire = _require; // Used so windowmanager in a window can access electron.
	            // TODO: Determine if window can be set directly here.
	
	            process.once('loaded', function () {
	                // TODO: Is this needed?
	                global.nodeRequire = _require;
	            });
	        })();
	    }
	} else if (typeof window !== 'undefined' && window) {
	    _global2.default._isRenderer = true;
	
	    if (window.nodeRequire != null) {
	        // We are running in an Electron Window's Runtime:
	        _global2.default.runtime = window.nodeRequire.runtime;
	        _global2.default._windows = new _map2.default();
	    }
	}
	
	// This is used to store info across windows:
	// Everything on here gets exported as windowmanager.
	exports.default = _global2.default;
	module.exports = exports['default'];

/***/ },
/* 72 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(73), __esModule: true };

/***/ },
/* 73 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(74);
	__webpack_require__(53);
	__webpack_require__(7);
	__webpack_require__(75);
	__webpack_require__(89);
	module.exports = __webpack_require__(20).Map;

/***/ },
/* 74 */
/***/ function(module, exports) {



/***/ },
/* 75 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var strong = __webpack_require__(76);
	
	// 23.1 Map Objects
	module.exports = __webpack_require__(84)('Map', function(get){
	  return function Map(){ return get(this, arguments.length > 0 ? arguments[0] : undefined); };
	}, {
	  // 23.1.3.6 Map.prototype.get(key)
	  get: function get(key){
	    var entry = strong.getEntry(this, key);
	    return entry && entry.v;
	  },
	  // 23.1.3.9 Map.prototype.set(key, value)
	  set: function set(key, value){
	    return strong.def(this, key === 0 ? 0 : key, value);
	  }
	}, strong, true);

/***/ },
/* 76 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var dP          = __webpack_require__(24).f
	  , create      = __webpack_require__(36)
	  , redefineAll = __webpack_require__(77)
	  , ctx         = __webpack_require__(21)
	  , anInstance  = __webpack_require__(78)
	  , defined     = __webpack_require__(15)
	  , forOf       = __webpack_require__(79)
	  , $iterDefine = __webpack_require__(16)
	  , step        = __webpack_require__(10)
	  , setSpecies  = __webpack_require__(82)
	  , DESCRIPTORS = __webpack_require__(28)
	  , fastKey     = __webpack_require__(83).fastKey
	  , SIZE        = DESCRIPTORS ? '_s' : 'size';
	
	var getEntry = function(that, key){
	  // fast case
	  var index = fastKey(key), entry;
	  if(index !== 'F')return that._i[index];
	  // frozen object case
	  for(entry = that._f; entry; entry = entry.n){
	    if(entry.k == key)return entry;
	  }
	};
	
	module.exports = {
	  getConstructor: function(wrapper, NAME, IS_MAP, ADDER){
	    var C = wrapper(function(that, iterable){
	      anInstance(that, C, NAME, '_i');
	      that._i = create(null); // index
	      that._f = undefined;    // first entry
	      that._l = undefined;    // last entry
	      that[SIZE] = 0;         // size
	      if(iterable != undefined)forOf(iterable, IS_MAP, that[ADDER], that);
	    });
	    redefineAll(C.prototype, {
	      // 23.1.3.1 Map.prototype.clear()
	      // 23.2.3.2 Set.prototype.clear()
	      clear: function clear(){
	        for(var that = this, data = that._i, entry = that._f; entry; entry = entry.n){
	          entry.r = true;
	          if(entry.p)entry.p = entry.p.n = undefined;
	          delete data[entry.i];
	        }
	        that._f = that._l = undefined;
	        that[SIZE] = 0;
	      },
	      // 23.1.3.3 Map.prototype.delete(key)
	      // 23.2.3.4 Set.prototype.delete(value)
	      'delete': function(key){
	        var that  = this
	          , entry = getEntry(that, key);
	        if(entry){
	          var next = entry.n
	            , prev = entry.p;
	          delete that._i[entry.i];
	          entry.r = true;
	          if(prev)prev.n = next;
	          if(next)next.p = prev;
	          if(that._f == entry)that._f = next;
	          if(that._l == entry)that._l = prev;
	          that[SIZE]--;
	        } return !!entry;
	      },
	      // 23.2.3.6 Set.prototype.forEach(callbackfn, thisArg = undefined)
	      // 23.1.3.5 Map.prototype.forEach(callbackfn, thisArg = undefined)
	      forEach: function forEach(callbackfn /*, that = undefined */){
	        anInstance(this, C, 'forEach');
	        var f = ctx(callbackfn, arguments.length > 1 ? arguments[1] : undefined, 3)
	          , entry;
	        while(entry = entry ? entry.n : this._f){
	          f(entry.v, entry.k, this);
	          // revert to the last existing entry
	          while(entry && entry.r)entry = entry.p;
	        }
	      },
	      // 23.1.3.7 Map.prototype.has(key)
	      // 23.2.3.7 Set.prototype.has(value)
	      has: function has(key){
	        return !!getEntry(this, key);
	      }
	    });
	    if(DESCRIPTORS)dP(C.prototype, 'size', {
	      get: function(){
	        return defined(this[SIZE]);
	      }
	    });
	    return C;
	  },
	  def: function(that, key, value){
	    var entry = getEntry(that, key)
	      , prev, index;
	    // change existing entry
	    if(entry){
	      entry.v = value;
	    // create new entry
	    } else {
	      that._l = entry = {
	        i: index = fastKey(key, true), // <- index
	        k: key,                        // <- key
	        v: value,                      // <- value
	        p: prev = that._l,             // <- previous entry
	        n: undefined,                  // <- next entry
	        r: false                       // <- removed
	      };
	      if(!that._f)that._f = entry;
	      if(prev)prev.n = entry;
	      that[SIZE]++;
	      // add to index
	      if(index !== 'F')that._i[index] = entry;
	    } return that;
	  },
	  getEntry: getEntry,
	  setStrong: function(C, NAME, IS_MAP){
	    // add .keys, .values, .entries, [@@iterator]
	    // 23.1.3.4, 23.1.3.8, 23.1.3.11, 23.1.3.12, 23.2.3.5, 23.2.3.8, 23.2.3.10, 23.2.3.11
	    $iterDefine(C, NAME, function(iterated, kind){
	      this._t = iterated;  // target
	      this._k = kind;      // kind
	      this._l = undefined; // previous
	    }, function(){
	      var that  = this
	        , kind  = that._k
	        , entry = that._l;
	      // revert to the last existing entry
	      while(entry && entry.r)entry = entry.p;
	      // get next entry
	      if(!that._t || !(that._l = entry = entry ? entry.n : that._t._f)){
	        // or finish the iteration
	        that._t = undefined;
	        return step(1);
	      }
	      // return step by kind
	      if(kind == 'keys'  )return step(0, entry.k);
	      if(kind == 'values')return step(0, entry.v);
	      return step(0, [entry.k, entry.v]);
	    }, IS_MAP ? 'entries' : 'values' , !IS_MAP, true);
	
	    // add [@@species], 23.1.2.2, 23.2.2.2
	    setSpecies(NAME);
	  }
	};

/***/ },
/* 77 */
/***/ function(module, exports, __webpack_require__) {

	var hide = __webpack_require__(23);
	module.exports = function(target, src, safe){
	  for(var key in src){
	    if(safe && target[key])target[key] = src[key];
	    else hide(target, key, src[key]);
	  } return target;
	};

/***/ },
/* 78 */
/***/ function(module, exports) {

	module.exports = function(it, Constructor, name, forbiddenField){
	  if(!(it instanceof Constructor) || (forbiddenField !== undefined && forbiddenField in it)){
	    throw TypeError(name + ': incorrect invocation!');
	  } return it;
	};

/***/ },
/* 79 */
/***/ function(module, exports, __webpack_require__) {

	var ctx         = __webpack_require__(21)
	  , call        = __webpack_require__(80)
	  , isArrayIter = __webpack_require__(81)
	  , anObject    = __webpack_require__(25)
	  , toLength    = __webpack_require__(41)
	  , getIterFn   = __webpack_require__(56)
	  , BREAK       = {}
	  , RETURN      = {};
	var exports = module.exports = function(iterable, entries, fn, that, ITERATOR){
	  var iterFn = ITERATOR ? function(){ return iterable; } : getIterFn(iterable)
	    , f      = ctx(fn, that, entries ? 2 : 1)
	    , index  = 0
	    , length, step, iterator, result;
	  if(typeof iterFn != 'function')throw TypeError(iterable + ' is not iterable!');
	  // fast case for arrays with default iterator
	  if(isArrayIter(iterFn))for(length = toLength(iterable.length); length > index; index++){
	    result = entries ? f(anObject(step = iterable[index])[0], step[1]) : f(iterable[index]);
	    if(result === BREAK || result === RETURN)return result;
	  } else for(iterator = iterFn.call(iterable); !(step = iterator.next()).done; ){
	    result = call(iterator, f, step.value, entries);
	    if(result === BREAK || result === RETURN)return result;
	  }
	};
	exports.BREAK  = BREAK;
	exports.RETURN = RETURN;

/***/ },
/* 80 */
/***/ function(module, exports, __webpack_require__) {

	// call something on iterator step with safe closing on error
	var anObject = __webpack_require__(25);
	module.exports = function(iterator, fn, value, entries){
	  try {
	    return entries ? fn(anObject(value)[0], value[1]) : fn(value);
	  // 7.4.6 IteratorClose(iterator, completion)
	  } catch(e){
	    var ret = iterator['return'];
	    if(ret !== undefined)anObject(ret.call(iterator));
	    throw e;
	  }
	};

/***/ },
/* 81 */
/***/ function(module, exports, __webpack_require__) {

	// check on default Array iterator
	var Iterators  = __webpack_require__(11)
	  , ITERATOR   = __webpack_require__(50)('iterator')
	  , ArrayProto = Array.prototype;
	
	module.exports = function(it){
	  return it !== undefined && (Iterators.Array === it || ArrayProto[ITERATOR] === it);
	};

/***/ },
/* 82 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var global      = __webpack_require__(19)
	  , core        = __webpack_require__(20)
	  , dP          = __webpack_require__(24)
	  , DESCRIPTORS = __webpack_require__(28)
	  , SPECIES     = __webpack_require__(50)('species');
	
	module.exports = function(KEY){
	  var C = typeof core[KEY] == 'function' ? core[KEY] : global[KEY];
	  if(DESCRIPTORS && C && !C[SPECIES])dP.f(C, SPECIES, {
	    configurable: true,
	    get: function(){ return this; }
	  });
	};

/***/ },
/* 83 */
/***/ function(module, exports, __webpack_require__) {

	var META     = __webpack_require__(46)('meta')
	  , isObject = __webpack_require__(26)
	  , has      = __webpack_require__(34)
	  , setDesc  = __webpack_require__(24).f
	  , id       = 0;
	var isExtensible = Object.isExtensible || function(){
	  return true;
	};
	var FREEZE = !__webpack_require__(29)(function(){
	  return isExtensible(Object.preventExtensions({}));
	});
	var setMeta = function(it){
	  setDesc(it, META, {value: {
	    i: 'O' + ++id, // object ID
	    w: {}          // weak collections IDs
	  }});
	};
	var fastKey = function(it, create){
	  // return primitive with prefix
	  if(!isObject(it))return typeof it == 'symbol' ? it : (typeof it == 'string' ? 'S' : 'P') + it;
	  if(!has(it, META)){
	    // can't set metadata to uncaught frozen object
	    if(!isExtensible(it))return 'F';
	    // not necessary to add metadata
	    if(!create)return 'E';
	    // add missing metadata
	    setMeta(it);
	  // return object ID
	  } return it[META].i;
	};
	var getWeak = function(it, create){
	  if(!has(it, META)){
	    // can't set metadata to uncaught frozen object
	    if(!isExtensible(it))return true;
	    // not necessary to add metadata
	    if(!create)return false;
	    // add missing metadata
	    setMeta(it);
	  // return hash weak collections IDs
	  } return it[META].w;
	};
	// add metadata on freeze-family methods calling
	var onFreeze = function(it){
	  if(FREEZE && meta.NEED && isExtensible(it) && !has(it, META))setMeta(it);
	  return it;
	};
	var meta = module.exports = {
	  KEY:      META,
	  NEED:     false,
	  fastKey:  fastKey,
	  getWeak:  getWeak,
	  onFreeze: onFreeze
	};

/***/ },
/* 84 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var global         = __webpack_require__(19)
	  , $export        = __webpack_require__(18)
	  , meta           = __webpack_require__(83)
	  , fails          = __webpack_require__(29)
	  , hide           = __webpack_require__(23)
	  , redefineAll    = __webpack_require__(77)
	  , forOf          = __webpack_require__(79)
	  , anInstance     = __webpack_require__(78)
	  , isObject       = __webpack_require__(26)
	  , setToStringTag = __webpack_require__(49)
	  , dP             = __webpack_require__(24).f
	  , each           = __webpack_require__(85)(0)
	  , DESCRIPTORS    = __webpack_require__(28);
	
	module.exports = function(NAME, wrapper, methods, common, IS_MAP, IS_WEAK){
	  var Base  = global[NAME]
	    , C     = Base
	    , ADDER = IS_MAP ? 'set' : 'add'
	    , proto = C && C.prototype
	    , O     = {};
	  if(!DESCRIPTORS || typeof C != 'function' || !(IS_WEAK || proto.forEach && !fails(function(){
	    new C().entries().next();
	  }))){
	    // create collection constructor
	    C = common.getConstructor(wrapper, NAME, IS_MAP, ADDER);
	    redefineAll(C.prototype, methods);
	    meta.NEED = true;
	  } else {
	    C = wrapper(function(target, iterable){
	      anInstance(target, C, NAME, '_c');
	      target._c = new Base;
	      if(iterable != undefined)forOf(iterable, IS_MAP, target[ADDER], target);
	    });
	    each('add,clear,delete,forEach,get,has,set,keys,values,entries,toJSON'.split(','),function(KEY){
	      var IS_ADDER = KEY == 'add' || KEY == 'set';
	      if(KEY in proto && !(IS_WEAK && KEY == 'clear'))hide(C.prototype, KEY, function(a, b){
	        anInstance(this, C, KEY);
	        if(!IS_ADDER && IS_WEAK && !isObject(a))return KEY == 'get' ? undefined : false;
	        var result = this._c[KEY](a === 0 ? 0 : a, b);
	        return IS_ADDER ? this : result;
	      });
	    });
	    if('size' in proto)dP(C.prototype, 'size', {
	      get: function(){
	        return this._c.size;
	      }
	    });
	  }
	
	  setToStringTag(C, NAME);
	
	  O[NAME] = C;
	  $export($export.G + $export.W + $export.F, O);
	
	  if(!IS_WEAK)common.setStrong(C, NAME, IS_MAP);
	
	  return C;
	};

/***/ },
/* 85 */
/***/ function(module, exports, __webpack_require__) {

	// 0 -> Array#forEach
	// 1 -> Array#map
	// 2 -> Array#filter
	// 3 -> Array#some
	// 4 -> Array#every
	// 5 -> Array#find
	// 6 -> Array#findIndex
	var ctx      = __webpack_require__(21)
	  , IObject  = __webpack_require__(13)
	  , toObject = __webpack_require__(52)
	  , toLength = __webpack_require__(41)
	  , asc      = __webpack_require__(86);
	module.exports = function(TYPE, $create){
	  var IS_MAP        = TYPE == 1
	    , IS_FILTER     = TYPE == 2
	    , IS_SOME       = TYPE == 3
	    , IS_EVERY      = TYPE == 4
	    , IS_FIND_INDEX = TYPE == 6
	    , NO_HOLES      = TYPE == 5 || IS_FIND_INDEX
	    , create        = $create || asc;
	  return function($this, callbackfn, that){
	    var O      = toObject($this)
	      , self   = IObject(O)
	      , f      = ctx(callbackfn, that, 3)
	      , length = toLength(self.length)
	      , index  = 0
	      , result = IS_MAP ? create($this, length) : IS_FILTER ? create($this, 0) : undefined
	      , val, res;
	    for(;length > index; index++)if(NO_HOLES || index in self){
	      val = self[index];
	      res = f(val, index, O);
	      if(TYPE){
	        if(IS_MAP)result[index] = res;            // map
	        else if(res)switch(TYPE){
	          case 3: return true;                    // some
	          case 5: return val;                     // find
	          case 6: return index;                   // findIndex
	          case 2: result.push(val);               // filter
	        } else if(IS_EVERY)return false;          // every
	      }
	    }
	    return IS_FIND_INDEX ? -1 : IS_SOME || IS_EVERY ? IS_EVERY : result;
	  };
	};

/***/ },
/* 86 */
/***/ function(module, exports, __webpack_require__) {

	// 9.4.2.3 ArraySpeciesCreate(originalArray, length)
	var speciesConstructor = __webpack_require__(87);
	
	module.exports = function(original, length){
	  return new (speciesConstructor(original))(length);
	};

/***/ },
/* 87 */
/***/ function(module, exports, __webpack_require__) {

	var isObject = __webpack_require__(26)
	  , isArray  = __webpack_require__(88)
	  , SPECIES  = __webpack_require__(50)('species');
	
	module.exports = function(original){
	  var C;
	  if(isArray(original)){
	    C = original.constructor;
	    // cross-realm fallback
	    if(typeof C == 'function' && (C === Array || isArray(C.prototype)))C = undefined;
	    if(isObject(C)){
	      C = C[SPECIES];
	      if(C === null)C = undefined;
	    }
	  } return C === undefined ? Array : C;
	};

/***/ },
/* 88 */
/***/ function(module, exports, __webpack_require__) {

	// 7.2.2 IsArray(argument)
	var cof = __webpack_require__(14);
	module.exports = Array.isArray || function isArray(arg){
	  return cof(arg) == 'Array';
	};

/***/ },
/* 89 */
/***/ function(module, exports, __webpack_require__) {

	// https://github.com/DavidBruant/Map-Set.prototype.toJSON
	var $export  = __webpack_require__(18);
	
	$export($export.P + $export.R, 'Map', {toJSON: __webpack_require__(90)('Map')});

/***/ },
/* 90 */
/***/ function(module, exports, __webpack_require__) {

	// https://github.com/DavidBruant/Map-Set.prototype.toJSON
	var classof = __webpack_require__(57)
	  , from    = __webpack_require__(91);
	module.exports = function(NAME){
	  return function toJSON(){
	    if(classof(this) != NAME)throw TypeError(NAME + "#toJSON isn't generic");
	    return from(this);
	  };
	};

/***/ },
/* 91 */
/***/ function(module, exports, __webpack_require__) {

	var forOf = __webpack_require__(79);
	
	module.exports = function(iter, ITERATOR){
	  var result = [];
	  forOf(iter, false, result.push, result, ITERATOR);
	  return result;
	};


/***/ },
/* 92 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	// Exposes node require
	exports.default = eval('typeof require !== \'undefined\' && require'); // eslint-disable-line no-eval
	
	module.exports = exports['default'];

/***/ },
/* 93 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _ready = __webpack_require__(69);
	
	var _ready2 = _interopRequireDefault(_ready);
	
	var _require = __webpack_require__(92);
	
	var _require2 = _interopRequireDefault(_require);
	
	var _global = __webpack_require__(71);
	
	var _global2 = _interopRequireDefault(_global);
	
	__webpack_require__(94);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	// Setup window backend
	var _nodeRequire = (0, _require2.default)('electron'),
	    app = _nodeRequire.app,
	    BrowserWindow = _nodeRequire.BrowserWindow,
	    dialog = _nodeRequire.dialog;
	
	var http = (0, _require2.default)('http');
	var https = (0, _require2.default)('https');
	var url = (0, _require2.default)('url');
	
	// TODO: Add support for an app.json packaged with this script.
	// TODO: Add support for local file loading for window url.
	
	function getArg(argName) {
	    return process.argv.find(function (arg) {
	        return arg.indexOf('--' + argName) >= 0;
	    });
	}
	
	function extractArg(argName) {
	    var arg = getArg(argName);
	
	    if (arg) {
	        var index = arg.indexOf('=') + 1;
	
	        if (index < arg.length) {
	            return arg.substr(index);
	        }
	    }
	    // Return falsey value
	}
	
	// Determine the endpoint:
	var packageJson = (0, _require2.default)('./package.json');
	var endpoint = extractArg('endpoint') || packageJson.endpoint;
	var configPath = extractArg('config') || packageJson.config;
	// If configPath is null, url.resolve doesn't execute:
	var configUrl = configPath && url.resolve(endpoint, configPath);
	// Setup defaults (similar to OpenFin):
	var defaultConfig = {
	    url: endpoint,
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
	        // Windowmanager path should be absolute:
	        preload: __filename
	    }
	};
	// Setup openfin to electron mappings:
	var configMap = {
	    name: 'title',
	    autoShow: 'show',
	    defaultLeft: 'x',
	    defaultTop: 'y',
	    defaultWidth: 'width',
	    defaultHeight: 'height'
	};
	var mainWindow = void 0;
	
	function createWindow() {
	    function _start(config) {
	        var _url = config.url;
	
	        delete config.url;
	
	        // Start main window:
	        mainWindow = new BrowserWindow(config);
	        config.title = config.title == null ? String(mainWindow.id) : config.title;
	
	        // load the index.html of the app:
	        mainWindow.loadURL(_url);
	        mainWindow.setTitle(config.title);
	
	        mainWindow.on('closed', function () {
	            mainWindow = null;
	            app.quit();
	        });
	
	        // Store this as the main window:
	        _global2.default._launcher = mainWindow;
	
	        // Open the DevTools.
	        // mainWindow.webContents.openDevTools();
	
	        // Notify windowmanager is setup:
	        _ready2.default._deref();
	    }
	
	    function _response(res) {
	        var json = '';
	
	        res.setEncoding('utf8');
	        res.on('data', function (chunk) {
	            json += chunk;
	        });
	        res.on('end', function () {
	            if (res.statusCode === 200) {
	                var config = void 0;
	
	                try {
	                    config = JSON.parse(json).startup_app || {};
	                } catch (e) {
	                    var err = 'Server failed to parse app.json (' + configUrl + ').';
	
	                    dialog.showErrorBox('ERROR', err);
	                    return app.quit();
	                }
	
	                // Map options to electron options:
	                for (var prop in config) {
	                    if (config.hasOwnProperty(prop) && configMap[prop] !== undefined) {
	                        config[configMap[prop]] = config[prop];
	                        delete config[prop];
	                    }
	                }
	                // Set defaults:
	                for (var _prop in defaultConfig) {
	                    if (defaultConfig.hasOwnProperty(_prop)) {
	                        config[_prop] = config[_prop] != null ? config[_prop] : defaultConfig[_prop];
	                    }
	                }
	
	                // Start main window:
	                _start(config);
	            } else {
	                var _err = 'Server failed to load app.json (' + configUrl + '). Status code: ' + res.statusCode;
	
	                dialog.showErrorBox('ERROR', _err);
	                app.quit();
	            }
	        });
	    }
	
	    // Get app.json:
	    if (configUrl != null) {
	        if (configUrl.indexOf('https') === 0) {
	            https.get(configUrl, _response);
	        } else if (configUrl.indexOf('http') === 0) {
	            http.get(configUrl, _response);
	        } else {
	            // Unsupported protocol:
	            var err = 'Server doesn\'t support endpoint for app.json (' + configUrl + ').';
	
	            dialog.showErrorBox('ERROR', err);
	            app.quit();
	        }
	    } else if (endpoint != null) {
	        // Load defaults:
	        _start(defaultConfig);
	    } else {
	        var _err2 = 'No endpoint provided to start the app.';
	
	        dialog.showErrorBox('ERROR', _err2);
	        app.quit();
	    }
	}
	
	// When app starts, load main window:
	app.on('ready', createWindow);
	
	// When app closes all windows, end app:
	app.on('window-all-closed', function () {
	    if (process.platform !== 'darwin') {
	        app.quit();
	    }
	});
	
	app.on('activate', function () {
	    if (mainWindow === null) {
	        createWindow();
	    }
	});

/***/ },
/* 94 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _getIterator2 = __webpack_require__(5);
	
	var _getIterator3 = _interopRequireDefault(_getIterator2);
	
	var _global = __webpack_require__(71);
	
	var _global2 = _interopRequireDefault(_global);
	
	var _require = __webpack_require__(92);
	
	var _require2 = _interopRequireDefault(_require);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var _nodeRequire = (0, _require2.default)('electron'),
	    BrowserWindow = _nodeRequire.BrowserWindow;
	
	// TODO: Give the node backend access to windowmanager Window-like functionality.
	//       This will automatically setup windowmanager on each window if added.
	
	// This is Electron's main process:
	
	
	var _windowmanager$geomet = _global2.default.geometry,
	    Vector = _windowmanager$geomet.Vector,
	    BoundingBox = _windowmanager$geomet.BoundingBox;
	
	// TODO: Solve event syncing between windows
	
	BrowserWindow.prototype._notifyReady = function () {
	    var _iteratorNormalCompletion = true;
	    var _didIteratorError = false;
	    var _iteratorError = undefined;
	
	    try {
	        for (var _iterator = (0, _getIterator3.default)(BrowserWindow.getAllWindows()), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
	            var other = _step.value;
	
	            other.webContents.send('window-create', this.id);
	        }
	    } catch (err) {
	        _didIteratorError = true;
	        _iteratorError = err;
	    } finally {
	        try {
	            if (!_iteratorNormalCompletion && _iterator.return) {
	                _iterator.return();
	            }
	        } finally {
	            if (_didIteratorError) {
	                throw _iteratorError;
	            }
	        }
	    }
	};
	
	BrowserWindow.prototype._ensureDockSystem = function () {
	    var _this = this;
	
	    // Make sure docked group exists:
	    if (this._dockedGroup === undefined) {
	        (function () {
	            _this._dockedGroup = [_this];
	
	            _this.on('closed', function () {
	                // Clean up the dock system when this window closes:
	                this.undock();
	            });
	
	            _this.on('maximize', function () {
	                this.undock(); // TODO: Support changing size when docked.
	            });
	
	            _this.on('minimize', function () {
	                this._dockMinimize();
	            });
	
	            _this.on('restore', function () {
	                var _iteratorNormalCompletion2 = true;
	                var _didIteratorError2 = false;
	                var _iteratorError2 = undefined;
	
	                try {
	                    for (var _iterator2 = (0, _getIterator3.default)(this._dockedGroup), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
	                        var other = _step2.value;
	
	                        if (other !== this) {
	                            other.restore();
	                        }
	                    }
	                } catch (err) {
	                    _didIteratorError2 = true;
	                    _iteratorError2 = err;
	                } finally {
	                    try {
	                        if (!_iteratorNormalCompletion2 && _iterator2.return) {
	                            _iterator2.return();
	                        }
	                    } finally {
	                        if (_didIteratorError2) {
	                            throw _iteratorError2;
	                        }
	                    }
	                }
	            });
	
	            var lastBounds = _this.getBounds();
	
	            _this.on('move', function () {
	                var newBounds = this.getBounds();
	
	                // this._dockMoveTo(newBounds.x, newBounds.y, [lastBounds.x, lastBounds.y]);
	                lastBounds = newBounds;
	            });
	
	            _this.on('resize', function () {
	                var newBounds = this.getBounds();
	
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
	        })();
	    }
	};
	
	BrowserWindow.prototype.dock = function (otherID) {
	    this._ensureDockSystem();
	
	    // Resolve otherID, and fail if otherID doesn't exist.
	    var other = BrowserWindow.fromId(otherID);
	
	    if (other === undefined) {
	        return;
	    } // Failed to find other. TODO: Return error
	
	    // If other is already in the group, return:
	    if (this._dockedGroup.indexOf(other) >= 0) {
	        return;
	    }
	
	    // Make sure docked group exists:
	    other._ensureDockSystem();
	
	    // Loop through all windows in otherGroup and add them to this's group:
	    var _iteratorNormalCompletion3 = true;
	    var _didIteratorError3 = false;
	    var _iteratorError3 = undefined;
	
	    try {
	        for (var _iterator3 = (0, _getIterator3.default)(other._dockedGroup), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
	            var otherWin = _step3.value;
	
	            this._dockedGroup.push(otherWin);
	            // Sharing the array between window objects makes it easier to manage:
	            otherWin._dockedGroup = this._dockedGroup;
	        }
	
	        // TODO: Check if otherGroup is touching
	    } catch (err) {
	        _didIteratorError3 = true;
	        _iteratorError3 = err;
	    } finally {
	        try {
	            if (!_iteratorNormalCompletion3 && _iterator3.return) {
	                _iterator3.return();
	            }
	        } finally {
	            if (_didIteratorError3) {
	                throw _iteratorError3;
	            }
	        }
	    }
	};
	
	BrowserWindow.prototype.undock = function () {
	    this._ensureDockSystem();
	
	    // Check to see if window is already undocked:
	    if (this._dockedGroup.length === 1) {
	        return;
	    }
	
	    // Undock this:
	    this._dockedGroup.splice(this._dockedGroup.indexOf(this), 1);
	    this._dockedGroup = [this];
	
	    // TODO: Redock those still touching, EXCEPT 'this'.
	};
	
	BrowserWindow.prototype._dockFocus = function () {
	    this._ensureDockSystem();
	
	    var _iteratorNormalCompletion4 = true;
	    var _didIteratorError4 = false;
	    var _iteratorError4 = undefined;
	
	    try {
	        for (var _iterator4 = (0, _getIterator3.default)(this._dockedGroup), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
	            var window = _step4.value;
	
	            if (window !== this) {
	                window.setAlwaysOnTop(true);
	                window.setAlwaysOnTop(false);
	            }
	        }
	    } catch (err) {
	        _didIteratorError4 = true;
	        _iteratorError4 = err;
	    } finally {
	        try {
	            if (!_iteratorNormalCompletion4 && _iterator4.return) {
	                _iterator4.return();
	            }
	        } finally {
	            if (_didIteratorError4) {
	                throw _iteratorError4;
	            }
	        }
	    }
	
	    this.setAlwaysOnTop(true);
	    this.setAlwaysOnTop(false);
	};
	
	BrowserWindow.prototype._dragStart = function () {
	    // if (!this.emit('drag-start')) { return; } // Allow preventing drag
	    this._ensureDockSystem();
	
	    this.restore();
	
	    var _iteratorNormalCompletion5 = true;
	    var _didIteratorError5 = false;
	    var _iteratorError5 = undefined;
	
	    try {
	        for (var _iterator5 = (0, _getIterator3.default)(this._dockedGroup), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
	            var window = _step5.value;
	
	            window._dragStartPos = window.getPosition();
	        }
	    } catch (err) {
	        _didIteratorError5 = true;
	        _iteratorError5 = err;
	    } finally {
	        try {
	            if (!_iteratorNormalCompletion5 && _iterator5.return) {
	                _iterator5.return();
	            }
	        } finally {
	            if (_didIteratorError5) {
	                throw _iteratorError5;
	            }
	        }
	    }
	};
	
	BrowserWindow.prototype._getBounds = function () {
	    var bounds = this.getBounds();
	
	    return new BoundingBox(bounds.x, bounds.y, bounds.x + bounds.width, bounds.y + bounds.height);
	};
	
	BrowserWindow.prototype._dragBy = function (deltaLeft, deltaTop) {
	    this._ensureDockSystem();
	
	    // Perform Snap:
	    var thisBounds = this._getBounds().moveTo(this._dragStartPos[0] + deltaLeft, this._dragStartPos[1] + deltaTop);
	    var snapDelta = new Vector(NaN, NaN);
	
	    var _iteratorNormalCompletion6 = true;
	    var _didIteratorError6 = false;
	    var _iteratorError6 = undefined;
	
	    try {
	        for (var _iterator6 = (0, _getIterator3.default)(BrowserWindow.getAllWindows()), _step6; !(_iteratorNormalCompletion6 = (_step6 = _iterator6.next()).done); _iteratorNormalCompletion6 = true) {
	            var other = _step6.value;
	
	            if (other._dockedGroup !== this._dockedGroup) {
	                snapDelta.setMin(thisBounds.getSnapDelta(other._getBounds()));
	            }
	        }
	    } catch (err) {
	        _didIteratorError6 = true;
	        _iteratorError6 = err;
	    } finally {
	        try {
	            if (!_iteratorNormalCompletion6 && _iterator6.return) {
	                _iterator6.return();
	            }
	        } finally {
	            if (_didIteratorError6) {
	                throw _iteratorError6;
	            }
	        }
	    }
	
	    deltaLeft += snapDelta.left || 0;
	    deltaTop += snapDelta.top || 0;
	
	    var _iteratorNormalCompletion7 = true;
	    var _didIteratorError7 = false;
	    var _iteratorError7 = undefined;
	
	    try {
	        for (var _iterator7 = (0, _getIterator3.default)(this._dockedGroup), _step7; !(_iteratorNormalCompletion7 = (_step7 = _iterator7.next()).done); _iteratorNormalCompletion7 = true) {
	            var _other = _step7.value;
	
	            var pos = _other._dragStartPos;
	
	            // If other doesn't have a drag position, start it:
	            if (pos === undefined) {
	                pos = _other._dragStartPos = _other.getPosition();
	                pos[0] -= deltaLeft;
	                pos[1] -= deltaTop;
	            }
	
	            _other.setPosition(pos[0] + deltaLeft, pos[1] + deltaTop);
	        }
	    } catch (err) {
	        _didIteratorError7 = true;
	        _iteratorError7 = err;
	    } finally {
	        try {
	            if (!_iteratorNormalCompletion7 && _iterator7.return) {
	                _iterator7.return();
	            }
	        } finally {
	            if (_didIteratorError7) {
	                throw _iteratorError7;
	            }
	        }
	    }
	};
	
	BrowserWindow.prototype._dragStop = function () {
	    this._ensureDockSystem();
	
	    // Dock to those it snapped to:
	    var thisBounds = this._getBounds();
	
	    var _iteratorNormalCompletion8 = true;
	    var _didIteratorError8 = false;
	    var _iteratorError8 = undefined;
	
	    try {
	        for (var _iterator8 = (0, _getIterator3.default)(BrowserWindow.getAllWindows()), _step8; !(_iteratorNormalCompletion8 = (_step8 = _iterator8.next()).done); _iteratorNormalCompletion8 = true) {
	            var other = _step8.value;
	
	            if (thisBounds.isTouching(other._getBounds())) {
	                this.dock(other.id);
	            }
	        }
	    } catch (err) {
	        _didIteratorError8 = true;
	        _iteratorError8 = err;
	    } finally {
	        try {
	            if (!_iteratorNormalCompletion8 && _iterator8.return) {
	                _iterator8.return();
	            }
	        } finally {
	            if (_didIteratorError8) {
	                throw _iteratorError8;
	            }
	        }
	    }
	
	    var _iteratorNormalCompletion9 = true;
	    var _didIteratorError9 = false;
	    var _iteratorError9 = undefined;
	
	    try {
	        for (var _iterator9 = (0, _getIterator3.default)(this._dockedGroup), _step9; !(_iteratorNormalCompletion9 = (_step9 = _iterator9.next()).done); _iteratorNormalCompletion9 = true) {
	            var window = _step9.value;
	
	            delete window._dragStartPos;
	        }
	    } catch (err) {
	        _didIteratorError9 = true;
	        _iteratorError9 = err;
	    } finally {
	        try {
	            if (!_iteratorNormalCompletion9 && _iterator9.return) {
	                _iterator9.return();
	            }
	        } finally {
	            if (_didIteratorError9) {
	                throw _iteratorError9;
	            }
	        }
	    }
	};
	
	BrowserWindow.prototype._dockMoveTo = function (left, top) {
	    this._ensureDockSystem();
	
	    var oldPos = this.getPosition();
	    var deltaLeft = left - oldPos[0];
	    var deltaTop = top - oldPos[1];
	
	    var _iteratorNormalCompletion10 = true;
	    var _didIteratorError10 = false;
	    var _iteratorError10 = undefined;
	
	    try {
	        for (var _iterator10 = (0, _getIterator3.default)(this._dockedGroup), _step10; !(_iteratorNormalCompletion10 = (_step10 = _iterator10.next()).done); _iteratorNormalCompletion10 = true) {
	            var other = _step10.value;
	
	            var pos = other.getPosition();
	
	            other.setPosition(pos[0] + deltaLeft, pos[1] + deltaTop);
	        }
	    } catch (err) {
	        _didIteratorError10 = true;
	        _iteratorError10 = err;
	    } finally {
	        try {
	            if (!_iteratorNormalCompletion10 && _iterator10.return) {
	                _iterator10.return();
	            }
	        } finally {
	            if (_didIteratorError10) {
	                throw _iteratorError10;
	            }
	        }
	    }
	};
	
	BrowserWindow.prototype._dockMinimize = function (left, top) {
	    this._ensureDockSystem();
	
	    var _iteratorNormalCompletion11 = true;
	    var _didIteratorError11 = false;
	    var _iteratorError11 = undefined;
	
	    try {
	        for (var _iterator11 = (0, _getIterator3.default)(this._dockedGroup), _step11; !(_iteratorNormalCompletion11 = (_step11 = _iterator11.next()).done); _iteratorNormalCompletion11 = true) {
	            var window = _step11.value;
	
	            window.minimize();
	        }
	    } catch (err) {
	        _didIteratorError11 = true;
	        _iteratorError11 = err;
	    } finally {
	        try {
	            if (!_iteratorNormalCompletion11 && _iterator11.return) {
	                _iterator11.return();
	            }
	        } finally {
	            if (_didIteratorError11) {
	                throw _iteratorError11;
	            }
	        }
	    }
	};
	
	BrowserWindow.prototype._dockHide = function (left, top) {
	    this._ensureDockSystem();
	
	    var _iteratorNormalCompletion12 = true;
	    var _didIteratorError12 = false;
	    var _iteratorError12 = undefined;
	
	    try {
	        for (var _iterator12 = (0, _getIterator3.default)(this._dockedGroup), _step12; !(_iteratorNormalCompletion12 = (_step12 = _iterator12.next()).done); _iteratorNormalCompletion12 = true) {
	            var window = _step12.value;
	
	            window.hide();
	        }
	    } catch (err) {
	        _didIteratorError12 = true;
	        _iteratorError12 = err;
	    } finally {
	        try {
	            if (!_iteratorNormalCompletion12 && _iterator12.return) {
	                _iterator12.return();
	            }
	        } finally {
	            if (_didIteratorError12) {
	                throw _iteratorError12;
	            }
	        }
	    }
	};
	
	BrowserWindow.prototype._dockShow = function (left, top) {
	    this._ensureDockSystem();
	
	    var _iteratorNormalCompletion13 = true;
	    var _didIteratorError13 = false;
	    var _iteratorError13 = undefined;
	
	    try {
	        for (var _iterator13 = (0, _getIterator3.default)(this._dockedGroup), _step13; !(_iteratorNormalCompletion13 = (_step13 = _iterator13.next()).done); _iteratorNormalCompletion13 = true) {
	            var window = _step13.value;
	
	            window.show();
	        }
	    } catch (err) {
	        _didIteratorError13 = true;
	        _iteratorError13 = err;
	    } finally {
	        try {
	            if (!_iteratorNormalCompletion13 && _iterator13.return) {
	                _iterator13.return();
	            }
	        } finally {
	            if (_didIteratorError13) {
	                throw _iteratorError13;
	            }
	        }
	    }
	};
	
	BrowserWindow._getMainID = function () {
	    return _global2.default._launcher.id;
	};

/***/ },
/* 95 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _set = __webpack_require__(96);
	
	var _set2 = _interopRequireDefault(_set);
	
	var _map = __webpack_require__(72);
	
	var _map2 = _interopRequireDefault(_map);
	
	var _getIterator2 = __webpack_require__(5);
	
	var _getIterator3 = _interopRequireDefault(_getIterator2);
	
	var _global = __webpack_require__(71);
	
	var _global2 = _interopRequireDefault(_global);
	
	var _ready = __webpack_require__(69);
	
	var _ready2 = _interopRequireDefault(_ready);
	
	var _Window = __webpack_require__(100);
	
	var _Window2 = _interopRequireDefault(_Window);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var _window$nodeRequire = window.nodeRequire('electron'),
	    ipcRenderer = _window$nodeRequire.ipcRenderer;
	
	_global2.default.messagebus = function () {
	    // TODO: Optimize Electron's messagebus by keeping track of listeners
	    //       in the main process for early termination.
	    // TODO: Listener cleanup on this window, or other window close.
	    // TODO: Use a custom eventName, so to not collide with current ones.
	    var wrappedListeners = {};
	    var windowWrappedListeners = {};
	
	    function wrapListener(window, listener) {
	        return function (_, message) {
	            // If listener only listens from a specific window, check that this message is from that window:
	            if (window && window._id !== message.winID) {
	                return;
	            }
	
	            var fromWindow = _global2.default.Window.getByID(message.winID);
	
	            // Don't execute listeners when the sender is the same as the listener:
	            if (fromWindow._id === _global2.default.Window.current._id) {
	                return;
	            }
	
	            listener.apply(fromWindow, message.args);
	            // TODO: Send response if response is expected
	        };
	    }
	
	    return {
	        send: function send(eventName) {
	            for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
	                args[_key - 1] = arguments[_key];
	            }
	
	            var curWin = _global2.default.Window.current;
	            var message = {
	                id: 0, // TODO: Randomly generate a unique id to avoid collision!
	                winID: curWin._id,
	                event: eventName,
	                args: args // If the first arg is a window, it gets removed later.
	            };
	
	            if (args.length > 0 && args[0] instanceof _Window2.default) {
	                // Remove window from args in message:
	                var _window = args.shift(); // args is by reference in message currently
	
	                // Don't execute listeners when the sender is the same as the listener:
	                if (_window._id === curWin._id) {
	                    return;
	                }
	
	                _window._window.webContents.send(eventName, message);
	            } else {
	                var _iteratorNormalCompletion = true;
	                var _didIteratorError = false;
	                var _iteratorError = undefined;
	
	                try {
	                    for (var _iterator = (0, _getIterator3.default)(_global2.default.Window.getAll()), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
	                        var _window2 = _step.value;
	
	                        if (_window2 !== curWin) {
	                            _window2._window.webContents.send(eventName, message);
	                        }
	                    }
	                } catch (err) {
	                    _didIteratorError = true;
	                    _iteratorError = err;
	                } finally {
	                    try {
	                        if (!_iteratorNormalCompletion && _iterator.return) {
	                            _iterator.return();
	                        }
	                    } finally {
	                        if (_didIteratorError) {
	                            throw _iteratorError;
	                        }
	                    }
	                }
	            }
	        },
	        on: function on(eventName, window, listener) {
	            if (listener === undefined) {
	                listener = window;
	                window = undefined;
	            }
	
	            var onMessage = wrapListener(window, listener);
	
	            if (window !== undefined) {
	                // Don't execute listeners when the sender is the same as the listener:
	                if (window._id === _global2.default.Window.current._id) {
	                    return;
	                }
	
	                var winLisGroup = windowWrappedListeners[window._id] = windowWrappedListeners[window._id] || {};
	
	                winLisGroup[eventName] = winLisGroup[eventName] || new _map2.default();
	                winLisGroup[eventName].set(listener, onMessage);
	                // TODO: On window close, clear subscriptions in windowWrappedListeners!
	            } else {
	                wrappedListeners[eventName] = wrappedListeners[eventName] || new _map2.default();
	                wrappedListeners[eventName].set(listener, onMessage);
	            }
	            ipcRenderer.on(eventName, onMessage);
	        },
	        off: function off(eventName, window, listener) {
	            if (listener === undefined) {
	                listener = window;
	                window = undefined;
	            }
	
	            if (window !== undefined) {
	                var winLisGroup = windowWrappedListeners[window._id] = windowWrappedListeners[window._id] || {};
	
	                winLisGroup[eventName] = winLisGroup[eventName] || new _map2.default();
	                // delete on a Map returns the deleted value (desired onMessage):
	                ipcRenderer.removeListener(eventName, winLisGroup[eventName].delete(listener));
	            } else {
	                wrappedListeners[eventName] = wrappedListeners[eventName] || new _set2.default();
	                // delete on a Map returns the deleted value (desired onMessage):
	                ipcRenderer.removeListener(eventName, wrappedListeners[eventName].get(listener));
	            }
	        }
	    };
	}();
	
	_ready2.default._deref();

/***/ },
/* 96 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(97), __esModule: true };

/***/ },
/* 97 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(74);
	__webpack_require__(53);
	__webpack_require__(7);
	__webpack_require__(98);
	__webpack_require__(99);
	module.exports = __webpack_require__(20).Set;

/***/ },
/* 98 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var strong = __webpack_require__(76);
	
	// 23.2 Set Objects
	module.exports = __webpack_require__(84)('Set', function(get){
	  return function Set(){ return get(this, arguments.length > 0 ? arguments[0] : undefined); };
	}, {
	  // 23.2.3.1 Set.prototype.add(value)
	  add: function add(value){
	    return strong.def(this, value = value === 0 ? 0 : value, value);
	  }
	}, strong);

/***/ },
/* 99 */
/***/ function(module, exports, __webpack_require__) {

	// https://github.com/DavidBruant/Map-Set.prototype.toJSON
	var $export  = __webpack_require__(18);
	
	$export($export.P + $export.R, 'Set', {toJSON: __webpack_require__(90)('Set')});

/***/ },
/* 100 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _getIterator2 = __webpack_require__(5);
	
	var _getIterator3 = _interopRequireDefault(_getIterator2);
	
	var _from = __webpack_require__(101);
	
	var _from2 = _interopRequireDefault(_from);
	
	var _getPrototypeOf = __webpack_require__(106);
	
	var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);
	
	var _classCallCheck2 = __webpack_require__(61);
	
	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
	
	var _createClass2 = __webpack_require__(62);
	
	var _createClass3 = _interopRequireDefault(_createClass2);
	
	var _possibleConstructorReturn2 = __webpack_require__(110);
	
	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);
	
	var _inherits2 = __webpack_require__(128);
	
	var _inherits3 = _interopRequireDefault(_inherits2);
	
	var _global = __webpack_require__(71);
	
	var _global2 = _interopRequireDefault(_global);
	
	var _index = __webpack_require__(3);
	
	var _index2 = __webpack_require__(59);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var _window$nodeRequire = window.nodeRequire('electron'),
	    ipcRenderer = _window$nodeRequire.ipcRenderer,
	    remote = _window$nodeRequire.remote;
	
	var url = window.nodeRequire('url');
	var BrowserWindow = remote.BrowserWindow;
	
	var currentWin = remote.getCurrentWindow();
	var defaultConfig = {
	    width: 600,
	    height: 600,
	    frame: false,
	    resizable: true,
	    hasShadow: false,
	    autoHideMenuBar: true,
	    icon: 'favicon.ico',
	    webPreferences: {
	        nodeIntegration: false,
	        preload: window.nodeRequire.windowmanagerPath
	    }
	};
	var configMap = {
	    left: 'x',
	    top: 'y'
	};
	var acceptedEventHandlers = ['ready', 'drag-start', 'drag-before', 'drag-stop', 'dock-before', 'move', 'move-before', 'resize-before', 'close', 'minimize'];
	
	var Window = function (_EventHandler) {
	    (0, _inherits3.default)(Window, _EventHandler);
	
	    function Window(config) {
	        (0, _classCallCheck3.default)(this, Window);
	
	        var _this = (0, _possibleConstructorReturn3.default)(this, (Window.__proto__ || (0, _getPrototypeOf2.default)(Window)).call(this, acceptedEventHandlers));
	        // Call the parent constructor:
	
	
	        config = config || {}; // If no arguments are passed, assume we are creating a default blank window
	        var isArgConfig = config.webContents === undefined; // TODO: Improve checking of arguments.
	
	        if (isArgConfig) {
	            for (var prop in config) {
	                if (config.hasOwnProperty(prop) && configMap[prop] !== undefined) {
	                    config[configMap[prop]] = config[prop];
	                    delete config[prop];
	                }
	            }
	            for (var _prop in defaultConfig) {
	                if (defaultConfig.hasOwnProperty(_prop)) {
	                    config[_prop] = config[_prop] != null ? config[_prop] : defaultConfig[_prop];
	                }
	            }
	            var _url = config.url;
	
	            delete config.url;
	
	            _this._window = new BrowserWindow(config);
	            _this._id = _this._window.id;
	            config.title = config.title == null ? String(_this._id) : config.title;
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
	            _this._window.loadURL(_url);
	            _this._window.setTitle(config.title);
	        } else {
	            _this._window = config;
	            _this._id = _this._window.id;
	        }
	        _global2.default._windows.set(_this._id, _this);
	        _this._window._ensureDockSystem();
	
	        // Setup _window event listeners:
	        // TODO: look into moving these elsewhere, might not work if currentWin is closed, and thisWindow is not.
	        var thisWindow = _this;
	
	        function _onmove() {
	            thisWindow.emit('move'); // TODO: Pass what position it is at.
	        }
	        _this._window.on('move', _onmove);
	
	        function _onminimize() {
	            thisWindow.emit('minimize'); // TODO: Pass what position it is at.
	        }
	        _this._window.on('minimize', _onminimize);
	
	        function _onclose() {
	            window.removeEventListener('beforeunload', _oncurrclose); // eslint-disable-line no-use-before-define
	            _global2.default._windows.delete(thisWindow._id);
	            thisWindow._isClosed = true;
	            thisWindow.emit('close');
	            thisWindow._window = undefined;
	            // TODO: Clean up ALL listeners
	        }
	
	        function _oncurrclose() {
	            _global2.default._windows.delete(thisWindow._id);
	            thisWindow._window.removeListener('move', _onmove);
	            thisWindow._window.removeListener('close', _onclose);
	            thisWindow._window.removeListener('minimize', _onminimize);
	        }
	
	        // Register _oncurrclose when page changes or window closes to clean up listeners:
	        window.addEventListener('beforeunload', _oncurrclose);
	
	        // If window isn't currentWin, execute local event listeners:
	        if (_this._window !== currentWin) {
	            _this._window.on('close', _onclose);
	        }
	
	        _this._isClosed = false;
	        _this._ready = true;
	        if (isArgConfig) {
	            _this._window._notifyReady();
	        }
	        return _this;
	    }
	
	    (0, _createClass3.default)(Window, [{
	        key: 'isReady',
	        value: function isReady() {
	            return this._window !== undefined && !this._isClosed();
	        }
	    }, {
	        key: 'onReady',
	        value: function onReady(callback) {
	            if (this.isClosed()) {
	                throw new Error('onReady can\'t be called on a closed window');
	            }
	            if (this.isReady()) {
	                return callback.call(this);
	            }
	
	            this.once('ready', callback);
	        }
	    }, {
	        key: 'isClosed',
	        value: function isClosed() {
	            return this._isClosed;
	        }
	    }, {
	        key: 'getPosition',
	        value: function getPosition() {
	            var pos = this._window.getPosition();
	
	            return new _index2.Position(pos[0], pos[1]);
	        }
	    }, {
	        key: 'getWidth',
	        value: function getWidth() {
	            var size = this._window.getSize();
	
	            return size[0];
	        }
	    }, {
	        key: 'getHeight',
	        value: function getHeight() {
	            var size = this._window.getSize();
	
	            return size[1];
	        }
	    }, {
	        key: 'getSize',
	        value: function getSize() {
	            var size = this._window.getSize();
	
	            return new _index2.Position(size[0], size[1]);
	        }
	    }, {
	        key: 'getBounds',
	        value: function getBounds() {
	            var bounds = this._window.getBounds();
	
	            return new _index2.BoundingBox(bounds.x, bounds.y, bounds.x + bounds.width, bounds.y + bounds.height);
	        }
	    }, {
	        key: 'getTitle',
	        value: function getTitle() {
	            return this._window.getTitle();
	        }
	    }, {
	        key: 'setTitle',
	        value: function setTitle(newTitle) {
	            if (!newTitle) {
	                throw new Error('setTitle requires one argument of type String');
	            }
	            this._window.setTitle(newTitle);
	        }
	    }, {
	        key: 'isHidden',
	        value: function isHidden() {
	            return !this.isShown();
	        }
	    }, {
	        key: 'isShown',
	        value: function isShown() {
	            return this._window.isVisible();
	        }
	    }, {
	        key: 'isMinimized',
	        value: function isMinimized() {
	            return this._window.isMinimized();
	        }
	    }, {
	        key: 'isMaximized',
	        value: function isMaximized() {
	            return this._window.isMaximized();
	        }
	    }, {
	        key: 'isRestored',
	        value: function isRestored() {
	            return this.isShown() && !this.isMinimized() && !this.isMaximized();
	        }
	    }, {
	        key: 'close',
	        value: function close(callback) {
	            if (this.isClosed()) {
	                return callback && callback();
	            }
	
	            this._window.close();
	            if (callback) {
	                callback();
	            }
	        }
	    }, {
	        key: 'minimize',
	        value: function minimize(callback) {
	            if (!this._ready) {
	                throw new Error('minimize can\'t be called on an unready window');
	            }
	
	            this._window._dockMinimize();
	            if (callback) {
	                callback();
	            }
	        }
	    }, {
	        key: 'maximize',
	        value: function maximize(callback) {
	            if (!this._ready) {
	                throw new Error('maximize can\'t be called on an unready window');
	            }
	
	            this._window.maximize();
	            if (callback) {
	                callback();
	            }
	        }
	    }, {
	        key: 'show',
	        value: function show(callback) {
	            if (!this._ready) {
	                throw new Error('show can\'t be called on an unready window');
	            }
	
	            this._window._dockShow();
	            if (callback) {
	                callback();
	            }
	        }
	    }, {
	        key: 'hide',
	        value: function hide(callback) {
	            if (!this._ready) {
	                throw new Error('hide can\'t be called on an unready window');
	            }
	
	            this._window._dockHide();
	            if (callback) {
	                callback();
	            }
	        }
	    }, {
	        key: 'restore',
	        value: function restore(callback) {
	            if (!this._ready) {
	                throw new Error('restore can\'t be called on an unready window');
	            }
	
	            this._window.restore();
	            if (callback) {
	                callback();
	            }
	        }
	    }, {
	        key: 'bringToFront',
	        value: function bringToFront(callback) {
	            if (!this._ready) {
	                throw new Error('bringToFront can\'t be called on an unready window');
	            }
	
	            this._window._dockFocus();
	            if (callback) {
	                callback();
	            }
	        }
	    }, {
	        key: 'focus',
	        value: function focus(callback) {
	            if (!this._ready) {
	                throw new Error('focus can\'t be called on an unready window');
	            }
	
	            this._window.focus();
	            if (callback) {
	                callback();
	            }
	        }
	    }, {
	        key: 'resizeTo',
	        value: function resizeTo(width, height, callback) {
	            if (!this._ready) {
	                throw new Error('resizeTo can\'t be called on an unready window');
	            }
	            var size = new _index2.Position(width, height);
	
	            this._window.setSize(size.left, size.top);
	            if (callback) {
	                callback();
	            }
	        }
	    }, {
	        key: 'moveTo',
	        value: function moveTo(left, top, callback) {
	            if (!this._ready) {
	                throw new Error('moveTo can\'t be called on an unready window');
	            }
	            var pos = new _index2.Position(left, top);
	
	            this._window._dockMoveTo(pos.left, pos.top);
	            if (callback) {
	                callback();
	            }
	        }
	    }, {
	        key: 'moveBy',
	        value: function moveBy(deltaLeft, deltaTop, callback) {
	            if (!this._ready) {
	                throw new Error('moveBy can\'t be called on an unready window');
	            }
	            var bounds = this.getBounds();
	            var deltaPos = new _index2.Position(deltaLeft, deltaTop);
	
	            this._window._dockMoveTo(bounds.left + deltaPos.left, bounds.top + deltaPos.top);
	            if (callback) {
	                callback();
	            }
	        }
	    }, {
	        key: 'setSize',
	        value: function setSize(width, height, callback) {
	            if (!this._ready) {
	                throw new Error('setSize can\'t be called on an unready window');
	            }
	            var size = new _index2.Size(width, height);
	
	            this._window.setSize(size.left, size.top);
	            if (callback) {
	                callback();
	            }
	        }
	    }, {
	        key: 'setBounds',
	        value: function setBounds(left, top, right, bottom, callback) {
	            if (!this._ready) {
	                throw new Error('resizeTo can\'t be called on an unready window');
	            }
	            var bounds = new _index2.BoundingBox(left, top, right, bottom);
	
	            this._window.setBounds({
	                x: bounds.left,
	                y: bounds.top,
	                width: bounds.getWidth(),
	                height: bounds.getHeight()
	            });
	            if (callback) {
	                callback();
	            }
	        }
	    }, {
	        key: 'dock',
	        value: function dock(other) {
	            this._window.dock(other._window.id);
	        }
	    }, {
	        key: 'undock',
	        value: function undock() {
	            this._window.undock();
	        }
	    }], [{
	        key: 'getAll',
	        value: function getAll() {
	            return (0, _from2.default)(_global2.default._windows.values());
	        }
	    }, {
	        key: 'getByID',
	        value: function getByID(id) {
	            return _global2.default._windows.get(id);
	        }
	    }, {
	        key: 'getMain',
	        value: function getMain(id) {
	            return _global2.default._windows.get(BrowserWindow._getMainID());
	        }
	    }, {
	        key: 'getCurrent',
	        value: function getCurrent() {
	            return Window.current;
	        }
	    }]);
	    return Window;
	}(_index.EventHandler);
	
	// Handle current window in this context:
	
	
	Window.current = new Window(currentWin);
	
	(function () {
	    // Setup handlers on this window:
	    var wX = 0;
	    var wY = 0;
	    var dragging = false;
	
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
	            Window.current._window._dragBy(event.screenX - wX, event.screenY - wY);
	        }
	    });
	
	    window.addEventListener('touchmove', function (event) {
	        if (dragging) {
	            event.preventDefault();
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
	    var Menu = remote.Menu;
	    var MenuItem = remote.MenuItem;
	    var rightClickPosition = null;
	    var menu = new Menu();
	
	    menu.append(new MenuItem({
	        label: 'Reload',
	        accelerator: 'CmdOrCtrl+R',
	        click: function click() {
	            Window.current._window.reload();
	        }
	    }));
	    menu.append(new MenuItem({
	        label: 'Reload app and restart children',
	        click: function click() {
	            // Close ALL windows:
	            var _iteratorNormalCompletion = true;
	            var _didIteratorError = false;
	            var _iteratorError = undefined;
	
	            try {
	                for (var _iterator = (0, _getIterator3.default)(_global2.default._windows.values()), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
	                    var _window = _step.value;
	
	                    _window.close();
	                }
	                // Relaunch app:
	            } catch (err) {
	                _didIteratorError = true;
	                _iteratorError = err;
	            } finally {
	                try {
	                    if (!_iteratorNormalCompletion && _iterator.return) {
	                        _iterator.return();
	                    }
	                } finally {
	                    if (_didIteratorError) {
	                        throw _iteratorError;
	                    }
	                }
	            }
	
	            remote.app.relaunch();
	            remote.app.exit(0);
	        }
	    }));
	    menu.append(new MenuItem({ type: 'separator' }));
	    menu.append(new MenuItem({
	        label: 'Inspect Element',
	        accelerator: 'CmdOrCtrl+Shift+I',
	        click: function click() {
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
	    var window = _global2.default._windows.get(id);
	
	    if (window) return window;
	
	    // Window isn't registered yet in windowmanager, so do so:
	    var electronWin = BrowserWindow.fromId(id);
	
	    if (electronWin !== null) {
	        return new Window(electronWin);
	    }
	}
	
	// Add other browser windows to global windows:
	var _iteratorNormalCompletion2 = true;
	var _didIteratorError2 = false;
	var _iteratorError2 = undefined;
	
	try {
	    for (var _iterator2 = (0, _getIterator3.default)(BrowserWindow.getAllWindows()), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
	        var other = _step2.value;
	
	        resolveWindowWithID(other.id);
	    }
	} catch (err) {
	    _didIteratorError2 = true;
	    _iteratorError2 = err;
	} finally {
	    try {
	        if (!_iteratorNormalCompletion2 && _iterator2.return) {
	            _iterator2.return();
	        }
	    } finally {
	        if (_didIteratorError2) {
	            throw _iteratorError2;
	        }
	    }
	}
	
	ipcRenderer.on('window-create', function (event, otherID) {
	    _global2.default.emit('window-create', resolveWindowWithID(otherID));
	});
	
	_global2.default.Window = Window;
	exports.default = Window;
	module.exports = exports['default'];

/***/ },
/* 101 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(102), __esModule: true };

/***/ },
/* 102 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(53);
	__webpack_require__(103);
	module.exports = __webpack_require__(20).Array.from;

/***/ },
/* 103 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var ctx            = __webpack_require__(21)
	  , $export        = __webpack_require__(18)
	  , toObject       = __webpack_require__(52)
	  , call           = __webpack_require__(80)
	  , isArrayIter    = __webpack_require__(81)
	  , toLength       = __webpack_require__(41)
	  , createProperty = __webpack_require__(104)
	  , getIterFn      = __webpack_require__(56);
	
	$export($export.S + $export.F * !__webpack_require__(105)(function(iter){ Array.from(iter); }), 'Array', {
	  // 22.1.2.1 Array.from(arrayLike, mapfn = undefined, thisArg = undefined)
	  from: function from(arrayLike/*, mapfn = undefined, thisArg = undefined*/){
	    var O       = toObject(arrayLike)
	      , C       = typeof this == 'function' ? this : Array
	      , aLen    = arguments.length
	      , mapfn   = aLen > 1 ? arguments[1] : undefined
	      , mapping = mapfn !== undefined
	      , index   = 0
	      , iterFn  = getIterFn(O)
	      , length, result, step, iterator;
	    if(mapping)mapfn = ctx(mapfn, aLen > 2 ? arguments[2] : undefined, 2);
	    // if object isn't iterable or it's array with default iterator - use simple case
	    if(iterFn != undefined && !(C == Array && isArrayIter(iterFn))){
	      for(iterator = iterFn.call(O), result = new C; !(step = iterator.next()).done; index++){
	        createProperty(result, index, mapping ? call(iterator, mapfn, [step.value, index], true) : step.value);
	      }
	    } else {
	      length = toLength(O.length);
	      for(result = new C(length); length > index; index++){
	        createProperty(result, index, mapping ? mapfn(O[index], index) : O[index]);
	      }
	    }
	    result.length = index;
	    return result;
	  }
	});


/***/ },
/* 104 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var $defineProperty = __webpack_require__(24)
	  , createDesc      = __webpack_require__(32);
	
	module.exports = function(object, index, value){
	  if(index in object)$defineProperty.f(object, index, createDesc(0, value));
	  else object[index] = value;
	};

/***/ },
/* 105 */
/***/ function(module, exports, __webpack_require__) {

	var ITERATOR     = __webpack_require__(50)('iterator')
	  , SAFE_CLOSING = false;
	
	try {
	  var riter = [7][ITERATOR]();
	  riter['return'] = function(){ SAFE_CLOSING = true; };
	  Array.from(riter, function(){ throw 2; });
	} catch(e){ /* empty */ }
	
	module.exports = function(exec, skipClosing){
	  if(!skipClosing && !SAFE_CLOSING)return false;
	  var safe = false;
	  try {
	    var arr  = [7]
	      , iter = arr[ITERATOR]();
	    iter.next = function(){ return {done: safe = true}; };
	    arr[ITERATOR] = function(){ return iter; };
	    exec(arr);
	  } catch(e){ /* empty */ }
	  return safe;
	};

/***/ },
/* 106 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(107), __esModule: true };

/***/ },
/* 107 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(108);
	module.exports = __webpack_require__(20).Object.getPrototypeOf;

/***/ },
/* 108 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.9 Object.getPrototypeOf(O)
	var toObject        = __webpack_require__(52)
	  , $getPrototypeOf = __webpack_require__(51);
	
	__webpack_require__(109)('getPrototypeOf', function(){
	  return function getPrototypeOf(it){
	    return $getPrototypeOf(toObject(it));
	  };
	});

/***/ },
/* 109 */
/***/ function(module, exports, __webpack_require__) {

	// most Object methods by ES6 should accept primitives
	var $export = __webpack_require__(18)
	  , core    = __webpack_require__(20)
	  , fails   = __webpack_require__(29);
	module.exports = function(KEY, exec){
	  var fn  = (core.Object || {})[KEY] || Object[KEY]
	    , exp = {};
	  exp[KEY] = exec(fn);
	  $export($export.S + $export.F * fails(function(){ fn(1); }), 'Object', exp);
	};

/***/ },
/* 110 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	exports.__esModule = true;
	
	var _typeof2 = __webpack_require__(111);
	
	var _typeof3 = _interopRequireDefault(_typeof2);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	exports.default = function (self, call) {
	  if (!self) {
	    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
	  }
	
	  return call && ((typeof call === "undefined" ? "undefined" : (0, _typeof3.default)(call)) === "object" || typeof call === "function") ? call : self;
	};

/***/ },
/* 111 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	exports.__esModule = true;
	
	var _iterator = __webpack_require__(112);
	
	var _iterator2 = _interopRequireDefault(_iterator);
	
	var _symbol = __webpack_require__(115);
	
	var _symbol2 = _interopRequireDefault(_symbol);
	
	var _typeof = typeof _symbol2.default === "function" && typeof _iterator2.default === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof _symbol2.default === "function" && obj.constructor === _symbol2.default && obj !== _symbol2.default.prototype ? "symbol" : typeof obj; };
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	exports.default = typeof _symbol2.default === "function" && _typeof(_iterator2.default) === "symbol" ? function (obj) {
	  return typeof obj === "undefined" ? "undefined" : _typeof(obj);
	} : function (obj) {
	  return obj && typeof _symbol2.default === "function" && obj.constructor === _symbol2.default && obj !== _symbol2.default.prototype ? "symbol" : typeof obj === "undefined" ? "undefined" : _typeof(obj);
	};

/***/ },
/* 112 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(113), __esModule: true };

/***/ },
/* 113 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(53);
	__webpack_require__(7);
	module.exports = __webpack_require__(114).f('iterator');

/***/ },
/* 114 */
/***/ function(module, exports, __webpack_require__) {

	exports.f = __webpack_require__(50);

/***/ },
/* 115 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(116), __esModule: true };

/***/ },
/* 116 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(117);
	__webpack_require__(74);
	__webpack_require__(126);
	__webpack_require__(127);
	module.exports = __webpack_require__(20).Symbol;

/***/ },
/* 117 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	// ECMAScript 6 symbols shim
	var global         = __webpack_require__(19)
	  , has            = __webpack_require__(34)
	  , DESCRIPTORS    = __webpack_require__(28)
	  , $export        = __webpack_require__(18)
	  , redefine       = __webpack_require__(33)
	  , META           = __webpack_require__(83).KEY
	  , $fails         = __webpack_require__(29)
	  , shared         = __webpack_require__(45)
	  , setToStringTag = __webpack_require__(49)
	  , uid            = __webpack_require__(46)
	  , wks            = __webpack_require__(50)
	  , wksExt         = __webpack_require__(114)
	  , wksDefine      = __webpack_require__(118)
	  , keyOf          = __webpack_require__(119)
	  , enumKeys       = __webpack_require__(120)
	  , isArray        = __webpack_require__(88)
	  , anObject       = __webpack_require__(25)
	  , toIObject      = __webpack_require__(12)
	  , toPrimitive    = __webpack_require__(31)
	  , createDesc     = __webpack_require__(32)
	  , _create        = __webpack_require__(36)
	  , gOPNExt        = __webpack_require__(123)
	  , $GOPD          = __webpack_require__(125)
	  , $DP            = __webpack_require__(24)
	  , $keys          = __webpack_require__(38)
	  , gOPD           = $GOPD.f
	  , dP             = $DP.f
	  , gOPN           = gOPNExt.f
	  , $Symbol        = global.Symbol
	  , $JSON          = global.JSON
	  , _stringify     = $JSON && $JSON.stringify
	  , PROTOTYPE      = 'prototype'
	  , HIDDEN         = wks('_hidden')
	  , TO_PRIMITIVE   = wks('toPrimitive')
	  , isEnum         = {}.propertyIsEnumerable
	  , SymbolRegistry = shared('symbol-registry')
	  , AllSymbols     = shared('symbols')
	  , OPSymbols      = shared('op-symbols')
	  , ObjectProto    = Object[PROTOTYPE]
	  , USE_NATIVE     = typeof $Symbol == 'function'
	  , QObject        = global.QObject;
	// Don't use setters in Qt Script, https://github.com/zloirock/core-js/issues/173
	var setter = !QObject || !QObject[PROTOTYPE] || !QObject[PROTOTYPE].findChild;
	
	// fallback for old Android, https://code.google.com/p/v8/issues/detail?id=687
	var setSymbolDesc = DESCRIPTORS && $fails(function(){
	  return _create(dP({}, 'a', {
	    get: function(){ return dP(this, 'a', {value: 7}).a; }
	  })).a != 7;
	}) ? function(it, key, D){
	  var protoDesc = gOPD(ObjectProto, key);
	  if(protoDesc)delete ObjectProto[key];
	  dP(it, key, D);
	  if(protoDesc && it !== ObjectProto)dP(ObjectProto, key, protoDesc);
	} : dP;
	
	var wrap = function(tag){
	  var sym = AllSymbols[tag] = _create($Symbol[PROTOTYPE]);
	  sym._k = tag;
	  return sym;
	};
	
	var isSymbol = USE_NATIVE && typeof $Symbol.iterator == 'symbol' ? function(it){
	  return typeof it == 'symbol';
	} : function(it){
	  return it instanceof $Symbol;
	};
	
	var $defineProperty = function defineProperty(it, key, D){
	  if(it === ObjectProto)$defineProperty(OPSymbols, key, D);
	  anObject(it);
	  key = toPrimitive(key, true);
	  anObject(D);
	  if(has(AllSymbols, key)){
	    if(!D.enumerable){
	      if(!has(it, HIDDEN))dP(it, HIDDEN, createDesc(1, {}));
	      it[HIDDEN][key] = true;
	    } else {
	      if(has(it, HIDDEN) && it[HIDDEN][key])it[HIDDEN][key] = false;
	      D = _create(D, {enumerable: createDesc(0, false)});
	    } return setSymbolDesc(it, key, D);
	  } return dP(it, key, D);
	};
	var $defineProperties = function defineProperties(it, P){
	  anObject(it);
	  var keys = enumKeys(P = toIObject(P))
	    , i    = 0
	    , l = keys.length
	    , key;
	  while(l > i)$defineProperty(it, key = keys[i++], P[key]);
	  return it;
	};
	var $create = function create(it, P){
	  return P === undefined ? _create(it) : $defineProperties(_create(it), P);
	};
	var $propertyIsEnumerable = function propertyIsEnumerable(key){
	  var E = isEnum.call(this, key = toPrimitive(key, true));
	  if(this === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key))return false;
	  return E || !has(this, key) || !has(AllSymbols, key) || has(this, HIDDEN) && this[HIDDEN][key] ? E : true;
	};
	var $getOwnPropertyDescriptor = function getOwnPropertyDescriptor(it, key){
	  it  = toIObject(it);
	  key = toPrimitive(key, true);
	  if(it === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key))return;
	  var D = gOPD(it, key);
	  if(D && has(AllSymbols, key) && !(has(it, HIDDEN) && it[HIDDEN][key]))D.enumerable = true;
	  return D;
	};
	var $getOwnPropertyNames = function getOwnPropertyNames(it){
	  var names  = gOPN(toIObject(it))
	    , result = []
	    , i      = 0
	    , key;
	  while(names.length > i){
	    if(!has(AllSymbols, key = names[i++]) && key != HIDDEN && key != META)result.push(key);
	  } return result;
	};
	var $getOwnPropertySymbols = function getOwnPropertySymbols(it){
	  var IS_OP  = it === ObjectProto
	    , names  = gOPN(IS_OP ? OPSymbols : toIObject(it))
	    , result = []
	    , i      = 0
	    , key;
	  while(names.length > i){
	    if(has(AllSymbols, key = names[i++]) && (IS_OP ? has(ObjectProto, key) : true))result.push(AllSymbols[key]);
	  } return result;
	};
	
	// 19.4.1.1 Symbol([description])
	if(!USE_NATIVE){
	  $Symbol = function Symbol(){
	    if(this instanceof $Symbol)throw TypeError('Symbol is not a constructor!');
	    var tag = uid(arguments.length > 0 ? arguments[0] : undefined);
	    var $set = function(value){
	      if(this === ObjectProto)$set.call(OPSymbols, value);
	      if(has(this, HIDDEN) && has(this[HIDDEN], tag))this[HIDDEN][tag] = false;
	      setSymbolDesc(this, tag, createDesc(1, value));
	    };
	    if(DESCRIPTORS && setter)setSymbolDesc(ObjectProto, tag, {configurable: true, set: $set});
	    return wrap(tag);
	  };
	  redefine($Symbol[PROTOTYPE], 'toString', function toString(){
	    return this._k;
	  });
	
	  $GOPD.f = $getOwnPropertyDescriptor;
	  $DP.f   = $defineProperty;
	  __webpack_require__(124).f = gOPNExt.f = $getOwnPropertyNames;
	  __webpack_require__(122).f  = $propertyIsEnumerable;
	  __webpack_require__(121).f = $getOwnPropertySymbols;
	
	  if(DESCRIPTORS && !__webpack_require__(17)){
	    redefine(ObjectProto, 'propertyIsEnumerable', $propertyIsEnumerable, true);
	  }
	
	  wksExt.f = function(name){
	    return wrap(wks(name));
	  }
	}
	
	$export($export.G + $export.W + $export.F * !USE_NATIVE, {Symbol: $Symbol});
	
	for(var symbols = (
	  // 19.4.2.2, 19.4.2.3, 19.4.2.4, 19.4.2.6, 19.4.2.8, 19.4.2.9, 19.4.2.10, 19.4.2.11, 19.4.2.12, 19.4.2.13, 19.4.2.14
	  'hasInstance,isConcatSpreadable,iterator,match,replace,search,species,split,toPrimitive,toStringTag,unscopables'
	).split(','), i = 0; symbols.length > i; )wks(symbols[i++]);
	
	for(var symbols = $keys(wks.store), i = 0; symbols.length > i; )wksDefine(symbols[i++]);
	
	$export($export.S + $export.F * !USE_NATIVE, 'Symbol', {
	  // 19.4.2.1 Symbol.for(key)
	  'for': function(key){
	    return has(SymbolRegistry, key += '')
	      ? SymbolRegistry[key]
	      : SymbolRegistry[key] = $Symbol(key);
	  },
	  // 19.4.2.5 Symbol.keyFor(sym)
	  keyFor: function keyFor(key){
	    if(isSymbol(key))return keyOf(SymbolRegistry, key);
	    throw TypeError(key + ' is not a symbol!');
	  },
	  useSetter: function(){ setter = true; },
	  useSimple: function(){ setter = false; }
	});
	
	$export($export.S + $export.F * !USE_NATIVE, 'Object', {
	  // 19.1.2.2 Object.create(O [, Properties])
	  create: $create,
	  // 19.1.2.4 Object.defineProperty(O, P, Attributes)
	  defineProperty: $defineProperty,
	  // 19.1.2.3 Object.defineProperties(O, Properties)
	  defineProperties: $defineProperties,
	  // 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)
	  getOwnPropertyDescriptor: $getOwnPropertyDescriptor,
	  // 19.1.2.7 Object.getOwnPropertyNames(O)
	  getOwnPropertyNames: $getOwnPropertyNames,
	  // 19.1.2.8 Object.getOwnPropertySymbols(O)
	  getOwnPropertySymbols: $getOwnPropertySymbols
	});
	
	// 24.3.2 JSON.stringify(value [, replacer [, space]])
	$JSON && $export($export.S + $export.F * (!USE_NATIVE || $fails(function(){
	  var S = $Symbol();
	  // MS Edge converts symbol values to JSON as {}
	  // WebKit converts symbol values to JSON as null
	  // V8 throws on boxed symbols
	  return _stringify([S]) != '[null]' || _stringify({a: S}) != '{}' || _stringify(Object(S)) != '{}';
	})), 'JSON', {
	  stringify: function stringify(it){
	    if(it === undefined || isSymbol(it))return; // IE8 returns string on undefined
	    var args = [it]
	      , i    = 1
	      , replacer, $replacer;
	    while(arguments.length > i)args.push(arguments[i++]);
	    replacer = args[1];
	    if(typeof replacer == 'function')$replacer = replacer;
	    if($replacer || !isArray(replacer))replacer = function(key, value){
	      if($replacer)value = $replacer.call(this, key, value);
	      if(!isSymbol(value))return value;
	    };
	    args[1] = replacer;
	    return _stringify.apply($JSON, args);
	  }
	});
	
	// 19.4.3.4 Symbol.prototype[@@toPrimitive](hint)
	$Symbol[PROTOTYPE][TO_PRIMITIVE] || __webpack_require__(23)($Symbol[PROTOTYPE], TO_PRIMITIVE, $Symbol[PROTOTYPE].valueOf);
	// 19.4.3.5 Symbol.prototype[@@toStringTag]
	setToStringTag($Symbol, 'Symbol');
	// 20.2.1.9 Math[@@toStringTag]
	setToStringTag(Math, 'Math', true);
	// 24.3.3 JSON[@@toStringTag]
	setToStringTag(global.JSON, 'JSON', true);

/***/ },
/* 118 */
/***/ function(module, exports, __webpack_require__) {

	var global         = __webpack_require__(19)
	  , core           = __webpack_require__(20)
	  , LIBRARY        = __webpack_require__(17)
	  , wksExt         = __webpack_require__(114)
	  , defineProperty = __webpack_require__(24).f;
	module.exports = function(name){
	  var $Symbol = core.Symbol || (core.Symbol = LIBRARY ? {} : global.Symbol || {});
	  if(name.charAt(0) != '_' && !(name in $Symbol))defineProperty($Symbol, name, {value: wksExt.f(name)});
	};

/***/ },
/* 119 */
/***/ function(module, exports, __webpack_require__) {

	var getKeys   = __webpack_require__(38)
	  , toIObject = __webpack_require__(12);
	module.exports = function(object, el){
	  var O      = toIObject(object)
	    , keys   = getKeys(O)
	    , length = keys.length
	    , index  = 0
	    , key;
	  while(length > index)if(O[key = keys[index++]] === el)return key;
	};

/***/ },
/* 120 */
/***/ function(module, exports, __webpack_require__) {

	// all enumerable object keys, includes symbols
	var getKeys = __webpack_require__(38)
	  , gOPS    = __webpack_require__(121)
	  , pIE     = __webpack_require__(122);
	module.exports = function(it){
	  var result     = getKeys(it)
	    , getSymbols = gOPS.f;
	  if(getSymbols){
	    var symbols = getSymbols(it)
	      , isEnum  = pIE.f
	      , i       = 0
	      , key;
	    while(symbols.length > i)if(isEnum.call(it, key = symbols[i++]))result.push(key);
	  } return result;
	};

/***/ },
/* 121 */
/***/ function(module, exports) {

	exports.f = Object.getOwnPropertySymbols;

/***/ },
/* 122 */
/***/ function(module, exports) {

	exports.f = {}.propertyIsEnumerable;

/***/ },
/* 123 */
/***/ function(module, exports, __webpack_require__) {

	// fallback for IE11 buggy Object.getOwnPropertyNames with iframe and window
	var toIObject = __webpack_require__(12)
	  , gOPN      = __webpack_require__(124).f
	  , toString  = {}.toString;
	
	var windowNames = typeof window == 'object' && window && Object.getOwnPropertyNames
	  ? Object.getOwnPropertyNames(window) : [];
	
	var getWindowNames = function(it){
	  try {
	    return gOPN(it);
	  } catch(e){
	    return windowNames.slice();
	  }
	};
	
	module.exports.f = function getOwnPropertyNames(it){
	  return windowNames && toString.call(it) == '[object Window]' ? getWindowNames(it) : gOPN(toIObject(it));
	};


/***/ },
/* 124 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.7 / 15.2.3.4 Object.getOwnPropertyNames(O)
	var $keys      = __webpack_require__(39)
	  , hiddenKeys = __webpack_require__(47).concat('length', 'prototype');
	
	exports.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O){
	  return $keys(O, hiddenKeys);
	};

/***/ },
/* 125 */
/***/ function(module, exports, __webpack_require__) {

	var pIE            = __webpack_require__(122)
	  , createDesc     = __webpack_require__(32)
	  , toIObject      = __webpack_require__(12)
	  , toPrimitive    = __webpack_require__(31)
	  , has            = __webpack_require__(34)
	  , IE8_DOM_DEFINE = __webpack_require__(27)
	  , gOPD           = Object.getOwnPropertyDescriptor;
	
	exports.f = __webpack_require__(28) ? gOPD : function getOwnPropertyDescriptor(O, P){
	  O = toIObject(O);
	  P = toPrimitive(P, true);
	  if(IE8_DOM_DEFINE)try {
	    return gOPD(O, P);
	  } catch(e){ /* empty */ }
	  if(has(O, P))return createDesc(!pIE.f.call(O, P), O[P]);
	};

/***/ },
/* 126 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(118)('asyncIterator');

/***/ },
/* 127 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(118)('observable');

/***/ },
/* 128 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	exports.__esModule = true;
	
	var _setPrototypeOf = __webpack_require__(129);
	
	var _setPrototypeOf2 = _interopRequireDefault(_setPrototypeOf);
	
	var _create = __webpack_require__(133);
	
	var _create2 = _interopRequireDefault(_create);
	
	var _typeof2 = __webpack_require__(111);
	
	var _typeof3 = _interopRequireDefault(_typeof2);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	exports.default = function (subClass, superClass) {
	  if (typeof superClass !== "function" && superClass !== null) {
	    throw new TypeError("Super expression must either be null or a function, not " + (typeof superClass === "undefined" ? "undefined" : (0, _typeof3.default)(superClass)));
	  }
	
	  subClass.prototype = (0, _create2.default)(superClass && superClass.prototype, {
	    constructor: {
	      value: subClass,
	      enumerable: false,
	      writable: true,
	      configurable: true
	    }
	  });
	  if (superClass) _setPrototypeOf2.default ? (0, _setPrototypeOf2.default)(subClass, superClass) : subClass.__proto__ = superClass;
	};

/***/ },
/* 129 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(130), __esModule: true };

/***/ },
/* 130 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(131);
	module.exports = __webpack_require__(20).Object.setPrototypeOf;

/***/ },
/* 131 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.3.19 Object.setPrototypeOf(O, proto)
	var $export = __webpack_require__(18);
	$export($export.S, 'Object', {setPrototypeOf: __webpack_require__(132).set});

/***/ },
/* 132 */
/***/ function(module, exports, __webpack_require__) {

	// Works with __proto__ only. Old v8 can't work with null proto objects.
	/* eslint-disable no-proto */
	var isObject = __webpack_require__(26)
	  , anObject = __webpack_require__(25);
	var check = function(O, proto){
	  anObject(O);
	  if(!isObject(proto) && proto !== null)throw TypeError(proto + ": can't set as prototype!");
	};
	module.exports = {
	  set: Object.setPrototypeOf || ('__proto__' in {} ? // eslint-disable-line
	    function(test, buggy, set){
	      try {
	        set = __webpack_require__(21)(Function.call, __webpack_require__(125).f(Object.prototype, '__proto__').set, 2);
	        set(test, []);
	        buggy = !(test instanceof Array);
	      } catch(e){ buggy = true; }
	      return function setPrototypeOf(O, proto){
	        check(O, proto);
	        if(buggy)O.__proto__ = proto;
	        else set(O, proto);
	        return O;
	      };
	    }({}, false) : undefined),
	  check: check
	};

/***/ },
/* 133 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(134), __esModule: true };

/***/ },
/* 134 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(135);
	var $Object = __webpack_require__(20).Object;
	module.exports = function create(P, D){
	  return $Object.create(P, D);
	};

/***/ },
/* 135 */
/***/ function(module, exports, __webpack_require__) {

	var $export = __webpack_require__(18)
	// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
	$export($export.S, 'Object', {create: __webpack_require__(36)});

/***/ },
/* 136 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _set = __webpack_require__(96);
	
	var _set2 = _interopRequireDefault(_set);
	
	var _map = __webpack_require__(72);
	
	var _map2 = _interopRequireDefault(_map);
	
	var _global = __webpack_require__(137);
	
	var _global2 = _interopRequireDefault(_global);
	
	var _Window = __webpack_require__(141);
	
	var _Window2 = _interopRequireDefault(_Window);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	/* global fin */
	var APP_UUID = 'app_uuid';
	
	_global2.default.messagebus = function () {
	    var wrappedListeners = {};
	    var windowWrappedListeners = {};
	
	    function wrapListener(listener) {
	        return function (message) {
	            var window = _Window2.default.getByID(message.winID);
	
	            // Don't execute listeners when the sender is the same as the listener:
	            if (window._id === _Window2.default.current._id) {
	                return;
	            }
	
	            listener.apply(window, message.args);
	            // TODO: Send response if response is expected
	        };
	    }
	
	    return {
	        send: function send(eventName) {
	            for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
	                args[_key - 1] = arguments[_key];
	            }
	
	            // TODO: Check if ready? Dunno if needed
	            var curWin = _Window2.default.current;
	            var message = {
	                id: 0, // TODO: Randomly generate a unique id to avoid collision!
	                winID: curWin._id,
	                event: eventName,
	                args: args // If the first arg is a window, it gets removed later.
	            };
	
	            if (args.length > 0 && args[0] instanceof _Window2.default) {
	                // Remove window from args in message:
	                var window = args.shift(); // args is by reference in message currently
	
	                // Don't execute listeners when the sender is the same as the listener:
	                if (window._id === curWin._id) {
	                    return;
	                }
	
	                fin.desktop.InterApplicationBus.send(_Window2.default.current._window[APP_UUID], window._id, eventName, message);
	            } else {
	                // TODO: Possibly switch the below out for a loop through all windows?
	                fin.desktop.InterApplicationBus.send(_Window2.default.current._window[APP_UUID], eventName, message);
	            }
	        },
	        on: function on(eventName, window, listener) {
	            if (listener === undefined) {
	                listener = window;
	                window = undefined;
	            }
	
	            var onMessage = wrapListener(listener);
	
	            if (window !== undefined) {
	                // Don't execute listeners when the sender is the same as the listener:
	                if (window._id === _Window2.default.current._id) {
	                    return;
	                }
	
	                var winLisGroup = windowWrappedListeners[window._id] = windowWrappedListeners[window._id] || {};
	
	                winLisGroup[eventName] = winLisGroup[eventName] || new _map2.default();
	                winLisGroup[eventName].set(listener, onMessage);
	                fin.desktop.InterApplicationBus.subscribe(_Window2.default.current._window[APP_UUID], window._id, eventName, onMessage);
	                // TODO: On window close, clear subscriptions in windowWrappedListeners!
	            } else {
	                wrappedListeners[eventName] = wrappedListeners[eventName] || new _map2.default();
	                wrappedListeners[eventName].set(listener, onMessage);
	                fin.desktop.InterApplicationBus.subscribe(_Window2.default.current._window[APP_UUID], eventName, onMessage);
	            }
	        },
	        off: function off(eventName, window, listener) {
	            if (listener === undefined) {
	                listener = window;
	                window = undefined;
	            }
	
	            if (window !== undefined) {
	                var winLisGroup = windowWrappedListeners[window._id] = windowWrappedListeners[window._id] || {};
	
	                winLisGroup[eventName] = winLisGroup[eventName] || new _map2.default();
	                // delete on a Map returns the deleted value (desired onMessage):
	                fin.desktop.InterApplicationBus.unsubscribe(_Window2.default.current._window[APP_UUID], window._window._id, eventName, winLisGroup[eventName].delete(listener));
	            } else {
	                wrappedListeners[eventName] = wrappedListeners[eventName] || new _set2.default();
	                // delete on a Map returns the deleted value (desired onMessage):
	                fin.desktop.InterApplicationBus.unsubscribe(_Window2.default.current._window[APP_UUID], eventName, wrappedListeners[eventName].delete(listener));
	            }
	        }
	    };
	}();

/***/ },
/* 137 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _keys = __webpack_require__(138);
	
	var _keys2 = _interopRequireDefault(_keys);
	
	var _map = __webpack_require__(72);
	
	var _map2 = _interopRequireDefault(_map);
	
	var _global = __webpack_require__(2);
	
	var _global2 = _interopRequireDefault(_global);
	
	var _ready = __webpack_require__(69);
	
	var _ready2 = _interopRequireDefault(_ready);
	
	var _index = __webpack_require__(3);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	_global2.default.runtime.name = 'OpenFin'; /* global fin */
	
	_global2.default.runtime.version = undefined;
	_global2.default.runtime.isOpenFin = true;
	
	var setVersion = _ready2.default.ref(function (version) {
	    _global2.default.runtime.version = version;
	});
	
	fin.desktop.main(_ready2.default.ref(function () {
	    fin.desktop.System.getVersion(setVersion); // TODO: Handle errorCallback
	
	    var app = fin.desktop.Application.getCurrent();
	    var mainWindow = app.getWindow().contentWindow;
	
	    if (mainWindow === window) {
	        _global2.default.runtime.isMain = true;
	        _global2.default._launcher = mainWindow;
	        _global2.default._windows = new _map2.default();
	        _global2.default._internalBus = new _index.EventHandler((0, _keys2.default)(_global2.default._eventListeners));
	    } // children get the above in the constructor of the Window.
	
	    // Wire the internal bus to emit events on windowmanager:
	    _global2.default._internalBus.addPipe(_global2.default);
	}));
	
	// This is used to store info across windows:
	// Everything on here gets exported as windowmanager.
	exports.default = _global2.default;
	module.exports = exports['default'];

/***/ },
/* 138 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(139), __esModule: true };

/***/ },
/* 139 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(140);
	module.exports = __webpack_require__(20).Object.keys;

/***/ },
/* 140 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.14 Object.keys(O)
	var toObject = __webpack_require__(52)
	  , $keys    = __webpack_require__(38);
	
	__webpack_require__(109)('keys', function(){
	  return function keys(it){
	    return $keys(toObject(it));
	  };
	});

/***/ },
/* 141 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _from = __webpack_require__(101);
	
	var _from2 = _interopRequireDefault(_from);
	
	var _getPrototypeOf = __webpack_require__(106);
	
	var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);
	
	var _classCallCheck2 = __webpack_require__(61);
	
	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
	
	var _createClass2 = __webpack_require__(62);
	
	var _createClass3 = _interopRequireDefault(_createClass2);
	
	var _possibleConstructorReturn2 = __webpack_require__(110);
	
	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);
	
	var _inherits2 = __webpack_require__(128);
	
	var _inherits3 = _interopRequireDefault(_inherits2);
	
	var _getIterator2 = __webpack_require__(5);
	
	var _getIterator3 = _interopRequireDefault(_getIterator2);
	
	var _global = __webpack_require__(137);
	
	var _global2 = _interopRequireDefault(_global);
	
	var _ready = __webpack_require__(69);
	
	var _ready2 = _interopRequireDefault(_ready);
	
	var _index = __webpack_require__(3);
	
	var _index2 = __webpack_require__(59);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	/* global fin */
	var defaultConfig = {
	    defaultWidth: 600,
	    defaultHeight: 600,
	    frame: false,
	    resizable: true,
	    saveWindowState: false,
	    autoShow: true,
	    icon: location.href + 'favicon.ico'
	};
	var configMap = {
	    title: 'name',
	    left: 'defaultLeft',
	    top: 'defaultTop',
	    width: 'defaultWidth',
	    height: 'defaultHeight'
	};
	var acceptedEventHandlers = ['ready', 'drag-start', 'drag-before', 'drag-stop', 'dock-before', 'move', 'move-before', 'resize-before', 'close', 'minimize'];
	var currentWin = void 0;
	
	function _setupDOM() {
	    var thisWindow = this;
	
	    // TODO: Rewrite to remove setTimeout for the following:
	    function setWindows() {
	        if (thisWindow._window.contentWindow.windowmanager) {
	            thisWindow._window.contentWindow.windowmanager._launcher = _global2.default._launcher;
	            thisWindow._window.contentWindow.windowmanager._windows = _global2.default._windows;
	            thisWindow._window.contentWindow.windowmanager._internalBus = _global2.default._internalBus;
	        } else {
	            setTimeout(setWindows, 5);
	        }
	    }
	    setWindows();
	
	    this._window.getBounds(function (bounds) {
	        bounds.right = bounds.left + bounds.width;
	        bounds.bottom = bounds.top + bounds.height;
	        thisWindow._bounds.set(new _index2.BoundingBox(bounds));
	    });
	
	    // Setup _window event listeners:
	    // TODO: look into moving these elsewhere, might not work if currentWin is closed, and thisWindow is not.
	    function onBoundsChange(event) {
	        event.right = event.left + event.width;
	        event.bottom = event.top + event.height;
	        thisWindow._bounds.set(new _index2.BoundingBox(event));
	
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
	        _global2.default._windows.delete(thisWindow._id);
	
	        // Undock:
	        thisWindow.undock();
	
	        // Move children to parent:
	        var parent = thisWindow.getParent();
	
	        var _iteratorNormalCompletion = true;
	        var _didIteratorError = false;
	        var _iteratorError = undefined;
	
	        try {
	            for (var _iterator = (0, _getIterator3.default)(thisWindow.getChildren()), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
	                var child = _step.value;
	
	                // We use getChildren to have a copy of the list, so child.setParent doesn't modify this loop's list!
	                // TODO: Optimize this loop, by not making a copy of children, and not executing splice in each setParent!
	                child.setParent(parent);
	            }
	        } catch (err) {
	            _didIteratorError = true;
	            _iteratorError = err;
	        } finally {
	            try {
	                if (!_iteratorNormalCompletion && _iterator.return) {
	                    _iterator.return();
	                }
	            } finally {
	                if (_didIteratorError) {
	                    throw _iteratorError;
	                }
	            }
	        }
	
	        thisWindow.setParent(undefined); // Remove from parent
	
	        thisWindow.emit('close');
	        _global2.default._internalBus.emit('window-close', thisWindow);
	        thisWindow._window = undefined;
	        // TODO: Clean up ALL listeners
	    }
	    this._window.addEventListener('closed', onClose);
	
	    function onMinimized() {
	        thisWindow.emit('minimize');
	    }
	    this._window.addEventListener('minimized', onMinimized);
	
	    // Setup title element:
	    this._titleEl = this._window.contentWindow.document.createElement('title');
	    this._titleEl.innerText = this._title;
	    this._window.contentWindow.document.head.appendChild(this._titleEl);
	
	    this._ready = true;
	    this.emit('ready');
	    _global2.default._internalBus.emit('window-create', this);
	};
	
	var Window = function (_EventHandler) {
	    (0, _inherits3.default)(Window, _EventHandler);
	
	    function Window(config) {
	        (0, _classCallCheck3.default)(this, Window);
	
	        var _this = (0, _possibleConstructorReturn3.default)(this, (Window.__proto__ || (0, _getPrototypeOf2.default)(Window)).call(this, acceptedEventHandlers));
	        // Call the parent constructor:
	
	
	        config = config || {}; // If no arguments are passed, assume we are creating a default blank window
	        var isArgConfig = config.app_uuid === undefined;
	
	        // Setup private variables:
	        _this._bounds = new _index2.BoundingBox();
	        _this._ready = false;
	        // TODO: Identify current states.
	        _this._isClosed = false;
	        _this._isHidden = false;
	        _this._isMinimized = false;
	        _this._isMaximized = false;
	        _this._dockedGroup = [_this];
	        _this._children = [];
	        _this._parent = undefined;
	        _this._title = undefined;
	
	        if (isArgConfig) {
	            for (var prop in config) {
	                if (config.hasOwnProperty(prop) && configMap[prop] !== undefined) {
	                    config[configMap[prop]] = config[prop];
	                    delete config[prop];
	                }
	            }
	            for (var _prop in defaultConfig) {
	                if (defaultConfig.hasOwnProperty(_prop)) {
	                    config[_prop] = config[_prop] != null ? config[_prop] : defaultConfig[_prop];
	                }
	            }
	            _this._id = (0, _index.getUniqueWindowName)();
	            _this._title = config.name == null ? _this._id : config.name;
	            config.name = _this._id; // Need name to be unique
	
	            if (config.parent) {
	                config.parent._children.push(_this);
	                _this._parent = config.parent;
	                // TODO: Emit event 'child-added' on parent
	                delete config.parent;
	            }
	
	            _global2.default._windows.set(_this._id, _this);
	            _this._window = new fin.desktop.Window(config, _setupDOM.bind(_this), function (err) {
	                console.error(err, config);
	            });
	        } else {
	            _this._id = config._id || config.name;
	            _this._title = _this._id;
	            _this._window = config;
	            _global2.default._windows.set(_this._id, _this);
	            _setupDOM.call(_this);
	        }
	
	        // TODO: Ensure docking system
	        return _this;
	    }
	
	    (0, _createClass3.default)(Window, [{
	        key: 'isReady',
	        value: function isReady() {
	            return this._ready;
	        }
	    }, {
	        key: 'onReady',
	        value: function onReady(callback) {
	            if (this.isClosed()) {
	                throw new Error('onReady can\'t be called on a closed window');
	            }
	            if (this.isReady()) {
	                return callback.call(this);
	            }
	
	            this.once('ready', callback);
	        }
	    }, {
	        key: 'isClosed',
	        value: function isClosed() {
	            return this._isClosed;
	        }
	    }, {
	        key: 'getPosition',
	        value: function getPosition() {
	            return this._bounds.getPosition();
	        }
	    }, {
	        key: 'getWidth',
	        value: function getWidth() {
	            return this._bounds.getWidth();
	        }
	    }, {
	        key: 'getHeight',
	        value: function getHeight() {
	            return this._bounds.getHeight();
	        }
	    }, {
	        key: 'getSize',
	        value: function getSize() {
	            return this._bounds.getSize();
	        }
	    }, {
	        key: 'getBounds',
	        value: function getBounds() {
	            return this._bounds.clone();
	        }
	    }, {
	        key: 'getParent',
	        value: function getParent() {
	            return this._parent;
	        }
	    }, {
	        key: 'setParent',
	        value: function setParent(parent) {
	            // TODO: Execute appropriate checks (if not closed, and is this new parent a window)
	
	            if (parent === this._parent) {
	                return;
	            }
	
	            if (this._parent) {
	                var index = this._parent._children.indexOf(this);
	
	                if (index >= 0) {
	                    this._parent._children.splice(index, 1);
	                }
	                // TODO: Emit event 'child-removed' on current parent.
	            }
	
	            if (parent) {
	                this._parent = parent;
	                this._parent._children.push(this);
	                // TODO: Emit event 'child-added on parent'.
	            }
	        }
	    }, {
	        key: 'getChildren',
	        value: function getChildren() {
	            return this._children.slice();
	        }
	    }, {
	        key: 'addChild',
	        value: function addChild(child) {
	            child.setParent(this);
	        }
	    }, {
	        key: 'getTitle',
	        value: function getTitle() {
	            return this._title;
	        }
	    }, {
	        key: 'setTitle',
	        value: function setTitle(newTitle) {
	            if (!newTitle) {
	                throw new Error('setTitle requires one argument of type String');
	            }
	            this._titleEl.innerText = this._title = newTitle;
	        }
	    }, {
	        key: 'isHidden',
	        value: function isHidden() {
	            return this._isHidden;
	        }
	    }, {
	        key: 'isShown',
	        value: function isShown() {
	            return !this._isHidden;
	        }
	    }, {
	        key: 'isMinimized',
	        value: function isMinimized() {
	            return this._isMinimized;
	        }
	    }, {
	        key: 'isMaximized',
	        value: function isMaximized() {
	            return this._isMaximized;
	        }
	    }, {
	        key: 'isRestored',
	        value: function isRestored() {
	            return this.isShown() && !this.isMinimized() && !this.isMaximized();
	        }
	    }, {
	        key: 'close',
	        value: function close(callback) {
	            if (this.isClosed()) {
	                return callback && callback();
	            }
	            this._window.close(callback);
	        }
	    }, {
	        key: 'minimize',
	        value: function minimize(callback) {
	            if (!this._ready) {
	                throw new Error('minimize can\'t be called on an unready window');
	            }
	
	            callback = new _index.SyncCallback(callback);
	            var _iteratorNormalCompletion2 = true;
	            var _didIteratorError2 = false;
	            var _iteratorError2 = undefined;
	
	            try {
	                for (var _iterator2 = (0, _getIterator3.default)(this._dockedGroup), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
	                    var _window = _step2.value;
	
	                    _window._isMinimized = true;
	                    _window._window.minimize(callback.ref());
	                }
	            } catch (err) {
	                _didIteratorError2 = true;
	                _iteratorError2 = err;
	            } finally {
	                try {
	                    if (!_iteratorNormalCompletion2 && _iterator2.return) {
	                        _iterator2.return();
	                    }
	                } finally {
	                    if (_didIteratorError2) {
	                        throw _iteratorError2;
	                    }
	                }
	            }
	        }
	    }, {
	        key: 'maximize',
	        value: function maximize(callback) {
	            if (!this._ready) {
	                throw new Error('maximize can\'t be called on an unready window');
	            }
	
	            this._isMaximized = true;
	            this._window.maximize(callback);
	        }
	    }, {
	        key: 'show',
	        value: function show(callback) {
	            if (!this._ready) {
	                throw new Error('show can\'t be called on an unready window');
	            }
	
	            callback = new _index.SyncCallback(callback);
	            var _iteratorNormalCompletion3 = true;
	            var _didIteratorError3 = false;
	            var _iteratorError3 = undefined;
	
	            try {
	                for (var _iterator3 = (0, _getIterator3.default)(this._dockedGroup), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
	                    var _window2 = _step3.value;
	
	                    _window2._isHidden = false;
	                    _window2._window.show(callback.ref());
	                }
	            } catch (err) {
	                _didIteratorError3 = true;
	                _iteratorError3 = err;
	            } finally {
	                try {
	                    if (!_iteratorNormalCompletion3 && _iterator3.return) {
	                        _iterator3.return();
	                    }
	                } finally {
	                    if (_didIteratorError3) {
	                        throw _iteratorError3;
	                    }
	                }
	            }
	        }
	    }, {
	        key: 'hide',
	        value: function hide(callback) {
	            if (!this._ready) {
	                throw new Error('hide can\'t be called on an unready window');
	            }
	
	            callback = new _index.SyncCallback(callback);
	            var _iteratorNormalCompletion4 = true;
	            var _didIteratorError4 = false;
	            var _iteratorError4 = undefined;
	
	            try {
	                for (var _iterator4 = (0, _getIterator3.default)(this._dockedGroup), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
	                    var _window3 = _step4.value;
	
	                    _window3._isHidden = true;
	                    _window3._window.hide(callback.ref());
	                }
	            } catch (err) {
	                _didIteratorError4 = true;
	                _iteratorError4 = err;
	            } finally {
	                try {
	                    if (!_iteratorNormalCompletion4 && _iterator4.return) {
	                        _iterator4.return();
	                    }
	                } finally {
	                    if (_didIteratorError4) {
	                        throw _iteratorError4;
	                    }
	                }
	            }
	        }
	    }, {
	        key: 'restore',
	        value: function restore(callback) {
	            if (!this._ready) {
	                throw new Error('restore can\'t be called on an unready window');
	            }
	
	            callback = new _index.SyncCallback(callback);
	            var _iteratorNormalCompletion5 = true;
	            var _didIteratorError5 = false;
	            var _iteratorError5 = undefined;
	
	            try {
	                for (var _iterator5 = (0, _getIterator3.default)(this._dockedGroup), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
	                    var _window4 = _step5.value;
	
	                    _window4._isHidden = false;
	                    _window4._isMinimized = false;
	                    _window4._isMaximized = false;
	                    _window4._window.restore(callback.ref());
	                }
	            } catch (err) {
	                _didIteratorError5 = true;
	                _iteratorError5 = err;
	            } finally {
	                try {
	                    if (!_iteratorNormalCompletion5 && _iterator5.return) {
	                        _iterator5.return();
	                    }
	                } finally {
	                    if (_didIteratorError5) {
	                        throw _iteratorError5;
	                    }
	                }
	            }
	        }
	    }, {
	        key: 'bringToFront',
	        value: function bringToFront(callback) {
	            if (!this._ready) {
	                throw new Error('bringToFront can\'t be called on an unready window');
	            }
	            var thisWindow = this;
	
	            var beforeCallback = new _index.SyncCallback(function () {
	                thisWindow._window.bringToFront(callback);
	            });
	
	            var _iteratorNormalCompletion6 = true;
	            var _didIteratorError6 = false;
	            var _iteratorError6 = undefined;
	
	            try {
	                for (var _iterator6 = (0, _getIterator3.default)(this._dockedGroup), _step6; !(_iteratorNormalCompletion6 = (_step6 = _iterator6.next()).done); _iteratorNormalCompletion6 = true) {
	                    var _window5 = _step6.value;
	
	                    if (_window5 !== this) {
	                        _window5._window.bringToFront(beforeCallback.ref());
	                    }
	                }
	            } catch (err) {
	                _didIteratorError6 = true;
	                _iteratorError6 = err;
	            } finally {
	                try {
	                    if (!_iteratorNormalCompletion6 && _iterator6.return) {
	                        _iterator6.return();
	                    }
	                } finally {
	                    if (_didIteratorError6) {
	                        throw _iteratorError6;
	                    }
	                }
	            }
	        }
	    }, {
	        key: 'focus',
	        value: function focus(callback) {
	            if (!this._ready) {
	                throw new Error('focus can\'t be called on an unready window');
	            }
	            var thisWindow = this;
	
	            var beforeCallback = new _index.SyncCallback(function () {
	                thisWindow._window.focus(callback);
	            });
	
	            var _iteratorNormalCompletion7 = true;
	            var _didIteratorError7 = false;
	            var _iteratorError7 = undefined;
	
	            try {
	                for (var _iterator7 = (0, _getIterator3.default)(this._dockedGroup), _step7; !(_iteratorNormalCompletion7 = (_step7 = _iterator7.next()).done); _iteratorNormalCompletion7 = true) {
	                    var _window6 = _step7.value;
	
	                    if (_window6 !== this) {
	                        _window6._window.focus(beforeCallback.ref());
	                    }
	                }
	            } catch (err) {
	                _didIteratorError7 = true;
	                _iteratorError7 = err;
	            } finally {
	                try {
	                    if (!_iteratorNormalCompletion7 && _iterator7.return) {
	                        _iterator7.return();
	                    }
	                } finally {
	                    if (_didIteratorError7) {
	                        throw _iteratorError7;
	                    }
	                }
	            }
	        }
	    }, {
	        key: 'resizeTo',
	        value: function resizeTo(width, height, callback) {
	            if (!this._ready) {
	                throw new Error('resizeTo can\'t be called on an unready window');
	            }
	            if (!this.emit('resize-before')) {
	                return;
	            } // Allow preventing resize
	            var size = new _index2.Position(width, height);
	
	            this._window.resizeTo(size.left, size.top, 'top-left', callback);
	        }
	    }, {
	        key: 'moveTo',
	        value: function moveTo(left, top, callback) {
	            if (!this._ready) {
	                throw new Error('moveTo can\'t be called on an unready window');
	            }
	            if (!this.emit('move-before')) {
	                return;
	            } // Allow preventing move
	            var deltaPos = new _index2.Position(left, top).subtract(this.getPosition());
	
	            callback = new _index.SyncCallback(callback);
	            var _iteratorNormalCompletion8 = true;
	            var _didIteratorError8 = false;
	            var _iteratorError8 = undefined;
	
	            try {
	                for (var _iterator8 = (0, _getIterator3.default)(this._dockedGroup), _step8; !(_iteratorNormalCompletion8 = (_step8 = _iterator8.next()).done); _iteratorNormalCompletion8 = true) {
	                    var _window7 = _step8.value;
	
	                    var pos = _window7.getPosition().add(deltaPos);
	
	                    _window7._bounds.moveTo(pos);
	                    _window7._window.moveTo(pos.left, pos.top, callback.ref());
	                }
	            } catch (err) {
	                _didIteratorError8 = true;
	                _iteratorError8 = err;
	            } finally {
	                try {
	                    if (!_iteratorNormalCompletion8 && _iterator8.return) {
	                        _iterator8.return();
	                    }
	                } finally {
	                    if (_didIteratorError8) {
	                        throw _iteratorError8;
	                    }
	                }
	            }
	        }
	    }, {
	        key: 'moveBy',
	        value: function moveBy(deltaLeft, deltaTop, callback) {
	            if (!this._ready) {
	                throw new Error('moveBy can\'t be called on an unready window');
	            }
	            if (!this.emit('move-before')) {
	                return;
	            } // Allow preventing move
	            var deltaPos = new _index2.Position(deltaLeft, deltaTop);
	
	            callback = new _index.SyncCallback(callback);
	            var _iteratorNormalCompletion9 = true;
	            var _didIteratorError9 = false;
	            var _iteratorError9 = undefined;
	
	            try {
	                for (var _iterator9 = (0, _getIterator3.default)(this._dockedGroup), _step9; !(_iteratorNormalCompletion9 = (_step9 = _iterator9.next()).done); _iteratorNormalCompletion9 = true) {
	                    var _window8 = _step9.value;
	
	                    var pos = _window8.getPosition().add(deltaPos);
	
	                    _window8._bounds.moveTo(pos);
	                    _window8._window.moveTo(pos.left, pos.top, callback.ref());
	                }
	            } catch (err) {
	                _didIteratorError9 = true;
	                _iteratorError9 = err;
	            } finally {
	                try {
	                    if (!_iteratorNormalCompletion9 && _iterator9.return) {
	                        _iterator9.return();
	                    }
	                } finally {
	                    if (_didIteratorError9) {
	                        throw _iteratorError9;
	                    }
	                }
	            }
	        }
	    }, {
	        key: 'setSize',
	        value: function setSize(width, height, callback) {
	            if (!this._ready) {
	                throw new Error('setSize can\'t be called on an unready window');
	            }
	            var size = new _index2.Size(width, height);
	
	            this._window.resizeTo(size.left, size.top, 'top-left', callback);
	        }
	    }, {
	        key: 'setBounds',
	        value: function setBounds(left, top, right, bottom, callback) {
	            if (!this._ready) {
	                throw new Error('resizeTo can\'t be called on an unready window');
	            }
	            var bounds = new _index2.BoundingBox(left, top, right, bottom);
	
	            this._window.setBounds(bounds.left, bounds.top, bounds.right, bounds.bottom, callback);
	        }
	    }, {
	        key: 'dock',
	        value: function dock(other) {
	            if (!this.emit('dock-before')) {
	                return;
	            } // Allow preventing dock
	            if (other === undefined) {
	                return;
	            } // Failed to find other. TODO: Return error
	
	            // If other is already in the group, return:
	            if (this._dockedGroup.indexOf(other) >= 0) {
	                return;
	            }
	
	            // Loop through all windows in otherGroup and add them to this's group:
	            var _iteratorNormalCompletion10 = true;
	            var _didIteratorError10 = false;
	            var _iteratorError10 = undefined;
	
	            try {
	                for (var _iterator10 = (0, _getIterator3.default)(other._dockedGroup), _step10; !(_iteratorNormalCompletion10 = (_step10 = _iterator10.next()).done); _iteratorNormalCompletion10 = true) {
	                    var otherWin = _step10.value;
	
	                    this._dockedGroup.push(otherWin);
	                    // Sharing the array between window objects makes it easier to manage:
	                    otherWin._dockedGroup = this._dockedGroup;
	                }
	
	                // TODO: Check if otherGroup is touching
	            } catch (err) {
	                _didIteratorError10 = true;
	                _iteratorError10 = err;
	            } finally {
	                try {
	                    if (!_iteratorNormalCompletion10 && _iterator10.return) {
	                        _iterator10.return();
	                    }
	                } finally {
	                    if (_didIteratorError10) {
	                        throw _iteratorError10;
	                    }
	                }
	            }
	        }
	    }, {
	        key: 'undock',
	        value: function undock(other) {
	            // Check to see if window is already undocked:
	            if (this._dockedGroup.length === 1) {
	                return;
	            }
	
	            // Undock this:
	            this._dockedGroup.splice(this._dockedGroup.indexOf(this), 1);
	            this._dockedGroup = [this];
	
	            // TODO: Redock those still touching, EXCEPT 'this'.
	        }
	    }, {
	        key: '_dragStart',
	        value: function _dragStart() {
	            if (!this.emit('drag-start')) {
	                return;
	            } // Allow preventing drag
	            var _iteratorNormalCompletion11 = true;
	            var _didIteratorError11 = false;
	            var _iteratorError11 = undefined;
	
	            try {
	                for (var _iterator11 = (0, _getIterator3.default)(this._dockedGroup), _step11; !(_iteratorNormalCompletion11 = (_step11 = _iterator11.next()).done); _iteratorNormalCompletion11 = true) {
	                    var _window9 = _step11.value;
	
	                    _window9._dragStartPos = _window9.getPosition();
	                }
	            } catch (err) {
	                _didIteratorError11 = true;
	                _iteratorError11 = err;
	            } finally {
	                try {
	                    if (!_iteratorNormalCompletion11 && _iterator11.return) {
	                        _iterator11.return();
	                    }
	                } finally {
	                    if (_didIteratorError11) {
	                        throw _iteratorError11;
	                    }
	                }
	            }
	        }
	    }, {
	        key: '_dragBy',
	        value: function _dragBy(deltaLeft, deltaTop) {
	            if (!this.emit('drag-before')) {
	                return;
	            } // Allow preventing drag
	            // Perform Snap:
	            var thisBounds = this.getBounds().moveTo(this._dragStartPos.left + deltaLeft, this._dragStartPos.top + deltaTop);
	            var snapDelta = new _index2.Vector(NaN, NaN);
	
	            var _iteratorNormalCompletion12 = true;
	            var _didIteratorError12 = false;
	            var _iteratorError12 = undefined;
	
	            try {
	                for (var _iterator12 = (0, _getIterator3.default)(_global2.default._windows.values()), _step12; !(_iteratorNormalCompletion12 = (_step12 = _iterator12.next()).done); _iteratorNormalCompletion12 = true) {
	                    var other = _step12.value;
	
	                    if (other._dockedGroup !== this._dockedGroup) {
	                        snapDelta.setMin(thisBounds.getSnapDelta(other.getBounds()));
	                    }
	                }
	            } catch (err) {
	                _didIteratorError12 = true;
	                _iteratorError12 = err;
	            } finally {
	                try {
	                    if (!_iteratorNormalCompletion12 && _iterator12.return) {
	                        _iterator12.return();
	                    }
	                } finally {
	                    if (_didIteratorError12) {
	                        throw _iteratorError12;
	                    }
	                }
	            }
	
	            deltaLeft += snapDelta.left || 0;
	            deltaTop += snapDelta.top || 0;
	
	            var _iteratorNormalCompletion13 = true;
	            var _didIteratorError13 = false;
	            var _iteratorError13 = undefined;
	
	            try {
	                for (var _iterator13 = (0, _getIterator3.default)(this._dockedGroup), _step13; !(_iteratorNormalCompletion13 = (_step13 = _iterator13.next()).done); _iteratorNormalCompletion13 = true) {
	                    var _other = _step13.value;
	
	                    var pos = _other._dragStartPos;
	
	                    // If other doesn't have a drag position, start it:
	                    if (pos === undefined) {
	                        pos = _other._dragStartPos = _other.getPosition();
	                        pos.left -= deltaLeft;
	                        pos.top -= deltaTop;
	                    }
	
	                    _other._window.moveTo(pos.left + deltaLeft, pos.top + deltaTop);
	                }
	            } catch (err) {
	                _didIteratorError13 = true;
	                _iteratorError13 = err;
	            } finally {
	                try {
	                    if (!_iteratorNormalCompletion13 && _iterator13.return) {
	                        _iterator13.return();
	                    }
	                } finally {
	                    if (_didIteratorError13) {
	                        throw _iteratorError13;
	                    }
	                }
	            }
	        }
	    }, {
	        key: '_dragStop',
	        value: function _dragStop() {
	            // Dock to those it snapped to:
	            var thisBounds = this.getBounds();
	
	            var _iteratorNormalCompletion14 = true;
	            var _didIteratorError14 = false;
	            var _iteratorError14 = undefined;
	
	            try {
	                for (var _iterator14 = (0, _getIterator3.default)(_global2.default._windows.values()), _step14; !(_iteratorNormalCompletion14 = (_step14 = _iterator14.next()).done); _iteratorNormalCompletion14 = true) {
	                    var other = _step14.value;
	
	                    if (thisBounds.isTouching(other.getBounds())) {
	                        this.dock(other);
	                    }
	                }
	            } catch (err) {
	                _didIteratorError14 = true;
	                _iteratorError14 = err;
	            } finally {
	                try {
	                    if (!_iteratorNormalCompletion14 && _iterator14.return) {
	                        _iterator14.return();
	                    }
	                } finally {
	                    if (_didIteratorError14) {
	                        throw _iteratorError14;
	                    }
	                }
	            }
	
	            var _iteratorNormalCompletion15 = true;
	            var _didIteratorError15 = false;
	            var _iteratorError15 = undefined;
	
	            try {
	                for (var _iterator15 = (0, _getIterator3.default)(this._dockedGroup), _step15; !(_iteratorNormalCompletion15 = (_step15 = _iterator15.next()).done); _iteratorNormalCompletion15 = true) {
	                    var _window10 = _step15.value;
	
	                    delete _window10._dragStartPos;
	                }
	            } catch (err) {
	                _didIteratorError15 = true;
	                _iteratorError15 = err;
	            } finally {
	                try {
	                    if (!_iteratorNormalCompletion15 && _iterator15.return) {
	                        _iterator15.return();
	                    }
	                } finally {
	                    if (_didIteratorError15) {
	                        throw _iteratorError15;
	                    }
	                }
	            }
	
	            this.emit('drag-stop');
	        }
	    }], [{
	        key: 'getAll',
	        value: function getAll() {
	            return (0, _from2.default)(_global2.default._windows.values());
	        }
	    }, {
	        key: 'getByID',
	        value: function getByID(id) {
	            return _global2.default._windows.get(id);
	        }
	    }, {
	        key: 'getMain',
	        value: function getMain(id) {
	            return _global2.default._windows.get(_global2.default._launcher.name);
	        }
	    }, {
	        key: 'getCurrent',
	        value: function getCurrent() {
	            return Window.current;
	        }
	    }]);
	    return Window;
	}(_index.EventHandler);
	
	function setupCurrentWindow() {
	    Window.current = _global2.default._windows.get(currentWin.name) || new Window(currentWin);
	
	    // Setup handlers on this window:
	    var wX = 0;
	    var wY = 0;
	    var dragging = false;
	
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
	            Window.current._dragBy(event.screenX - wX, event.screenY - wY);
	        }
	    });
	
	    window.addEventListener('touchmove', function (event) {
	        if (dragging) {
	            event.preventDefault();
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
	fin.desktop.main(_ready2.default.ref(function () {
	    currentWin = fin.desktop.Window.getCurrent();
	    var currentReady = _ready2.default.ref(setupCurrentWindow);
	
	    function getCurrent() {
	        if (_global2.default._windows) {
	            currentReady();
	        } else {
	            setTimeout(getCurrent, 5);
	        }
	    }
	    getCurrent();
	}));
	
	_global2.default.Window = Window;
	exports.default = Window;
	module.exports = exports['default'];

/***/ },
/* 142 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _set = __webpack_require__(96);
	
	var _set2 = _interopRequireDefault(_set);
	
	var _getIterator2 = __webpack_require__(5);
	
	var _getIterator3 = _interopRequireDefault(_getIterator2);
	
	var _global = __webpack_require__(143);
	
	var _global2 = _interopRequireDefault(_global);
	
	var _ready = __webpack_require__(69);
	
	var _ready2 = _interopRequireDefault(_ready);
	
	var _Window = __webpack_require__(144);
	
	var _Window2 = _interopRequireDefault(_Window);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	/**
	 * Message bus for application.
	 * @namespace
	 * @alias messagebus
	 */
	_global2.default.messagebus = function () {
	    // TODO: Utilize iframe communication? Or use messagebus that is currently shared in setup.js?
	    var wrappedListeners = {};
	    var windowWrappedListeners = {};
	
	    window.addEventListener('message', function (event) {
	        var message = event.data;
	        var win = _Window2.default.getByID(message.winID);
	
	        // Don't execute listeners when the sender is the same as the listener:
	        if (win._id === _Window2.default.current._id) {
	            return;
	        }
	
	        if (windowWrappedListeners[message.event] != null) {
	            // Check to see if the called window is being listened to directly:
	            if (windowWrappedListeners[message.event][message.winID] != null) {
	                var _iteratorNormalCompletion = true;
	                var _didIteratorError = false;
	                var _iteratorError = undefined;
	
	                try {
	                    for (var _iterator = (0, _getIterator3.default)(windowWrappedListeners[message.event][message.winID]), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
	                        var listener = _step.value;
	
	                        listener.apply(win, message.args); // TODO: Make apply's this point to window who sent messsage
	                    }
	                } catch (err) {
	                    _didIteratorError = true;
	                    _iteratorError = err;
	                } finally {
	                    try {
	                        if (!_iteratorNormalCompletion && _iterator.return) {
	                            _iterator.return();
	                        }
	                    } finally {
	                        if (_didIteratorError) {
	                            throw _iteratorError;
	                        }
	                    }
	                }
	            }
	        }
	        if (wrappedListeners[message.event] != null) {
	            var _iteratorNormalCompletion2 = true;
	            var _didIteratorError2 = false;
	            var _iteratorError2 = undefined;
	
	            try {
	                for (var _iterator2 = (0, _getIterator3.default)(wrappedListeners[message.event]), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
	                    var _listener = _step2.value;
	
	                    _listener.apply(win, message.args); // TODO: Make apply's this point to window who sent messsage
	                }
	            } catch (err) {
	                _didIteratorError2 = true;
	                _iteratorError2 = err;
	            } finally {
	                try {
	                    if (!_iteratorNormalCompletion2 && _iterator2.return) {
	                        _iterator2.return();
	                    }
	                } finally {
	                    if (_didIteratorError2) {
	                        throw _iteratorError2;
	                    }
	                }
	            }
	        }
	    }, false);
	
	    return {
	        /**
	         * @method
	         * @alias messagebus.send
	         * @param {String} eventName - the event to send to
	         * @param {Window} [window=undefined] - the target window to send to (if not specified, sends to all windows)
	         * @param {...*} args Arguments to send to listeners
	         */
	        send: function send(eventName) {
	            for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
	                args[_key - 1] = arguments[_key];
	            }
	
	            // TODO: Check if ready? Dunno if needed
	            // TODO: Do we need to add a way to identify if a return is needed?
	            var curWin = _Window2.default.current;
	            var message = {
	                id: 0, // TODO: Randomly generate a unique id to avoid collision!
	                winID: curWin._id,
	                event: eventName,
	                args: args // If the first arg is a window, it gets removed later.
	            };
	
	            if (args.length > 0 && args[0] instanceof _Window2.default) {
	                // Remove window from args in message:
	                var _window = args.shift(); // args is by reference in message currently
	
	                // Don't execute listeners when the sender is the same as the listener:
	                if (_window._id === curWin._id) {
	                    return;
	                }
	                // TODO: Save the id of message so we can get the response
	                _window._window.contentWindow.postMessage(message, '*');
	            } else {
	                var _iteratorNormalCompletion3 = true;
	                var _didIteratorError3 = false;
	                var _iteratorError3 = undefined;
	
	                try {
	                    for (var _iterator3 = (0, _getIterator3.default)(_global2.default._windows.values()), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
	                        var _window2 = _step3.value;
	
	                        if (curWin !== _window2) {
	                            // Don't send to current window
	                            _window2._window.contentWindow.postMessage(message, '*');
	                        }
	                    }
	                } catch (err) {
	                    _didIteratorError3 = true;
	                    _iteratorError3 = err;
	                } finally {
	                    try {
	                        if (!_iteratorNormalCompletion3 && _iterator3.return) {
	                            _iterator3.return();
	                        }
	                    } finally {
	                        if (_didIteratorError3) {
	                            throw _iteratorError3;
	                        }
	                    }
	                }
	            }
	        },
	        /**
	         * @method
	         * @alias messagebus.on
	         * @param {String} eventName - the event to listen to
	         * @param {Window} [window=undefined] - the window to listen to events from (if null, listens to all windows)
	         * @param {Function} listener - the callback function to call when event is triggered for this window
	         */
	        on: function on(eventName, window, listener) {
	            if (listener === undefined) {
	                listener = window;
	                window = undefined;
	            }
	
	            if (window !== undefined) {
	                // Don't execute listeners when the sender is the same as the listener:
	                if (window._id === _Window2.default.current._id) {
	                    return;
	                }
	                // Replace window.name with some way to identify the unique window
	                var winLisGroup = windowWrappedListeners[window._id] = windowWrappedListeners[window._id] || {};
	
	                winLisGroup[eventName] = winLisGroup[eventName] || new _set2.default();
	                winLisGroup[eventName].add(listener);
	                // TODO: On window close, clear subscriptions in windowWrappedListeners!
	            } else {
	                wrappedListeners[eventName] = wrappedListeners[eventName] || new _set2.default();
	                wrappedListeners[eventName].add(listener);
	            }
	        },
	        /**
	         * @method
	         * @alias messagebus.off
	         * @param {String} eventName - the event to remove listener from
	         * @param {Window} [window=undefined] - the window to listen to events from (if null, listens to all windows)
	         * @param {Function} listener - the callback function to call when event is triggered for this window
	         */
	        off: function off(eventName, window, listener) {
	            if (listener === undefined) {
	                listener = window;
	                window = undefined;
	            }
	
	            if (window !== undefined) {
	                // Replace window.name with some way to identify the unique window
	                var winLisGroup = windowWrappedListeners[window._id] = windowWrappedListeners[window._id] || {};
	
	                winLisGroup[eventName] = winLisGroup[eventName] || new _set2.default();
	                winLisGroup[eventName].delete(listener);
	            } else {
	                wrappedListeners[eventName] = wrappedListeners[eventName] || new _set2.default();
	                wrappedListeners[eventName].delete(listener);
	            }
	        }
	    };
	}();
	
	// Notify everyone that windowmanager is setup for this window:
	_ready2.default._deref();

/***/ },
/* 143 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _keys = __webpack_require__(138);
	
	var _keys2 = _interopRequireDefault(_keys);
	
	var _create = __webpack_require__(133);
	
	var _create2 = _interopRequireDefault(_create);
	
	var _classCallCheck2 = __webpack_require__(61);
	
	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
	
	var _createClass2 = __webpack_require__(62);
	
	var _createClass3 = _interopRequireDefault(_createClass2);
	
	var _global = __webpack_require__(2);
	
	var _global2 = _interopRequireDefault(_global);
	
	var _index = __webpack_require__(3);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function getBrowserInfo() {
	    // Credit: http://www.gregoryvarghese.com/how-to-get-browser-name-and-version-via-javascript/
	    var ua = navigator.userAgent;
	    var M = ua.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || [];
	    var tem = void 0;
	
	    if (/trident/i.test(M[1])) {
	        tem = /\brv[ :]+(\d+)/g.exec(ua) || [];
	        return { name: 'IE', version: tem[1] || '' };
	    }
	    if (M[1] === 'Chrome') {
	        tem = ua.match(/\bOPR\/(\d+)/);
	        if (tem !== null) {
	            return { name: 'Opera', version: tem[1] };
	        }
	        tem = ua.match(/\bedge\/(\d+)/i);
	        if (tem !== null) {
	            return { name: 'Edge', version: tem[1] };
	        }
	    }
	    M = M[2] ? [M[1], M[2]] : [navigator.appName, navigator.appVersion, '-?'];
	    if ((tem = ua.match(/version\/(\d+)/i)) !== null) {
	        M.splice(1, 1, tem[1]);
	    }
	    return {
	        name: M[0],
	        version: M[1]
	    };
	}
	
	var browser = getBrowserInfo();
	
	_global2.default.runtime.name = browser.name;
	_global2.default.runtime.version = browser.version;
	_global2.default.runtime.isBrowser = true;
	_global2.default.runtime.isMain = window.parent === window;
	
	try {
	    window.parent.document;
	} catch (e) {
	    // If the above access errors out, it's due to CORS violation.
	    // So assume this JavaScript window is the top-level window:
	    _global2.default.runtime.isMain = true;
	}
	
	if (_global2.default.runtime.isMain) {
	    (function () {
	        // This is the main/root window!
	        var nextZIndex = 1000; // TODO: Recycle Z-Indexes! In case of a (probably never) overflow!
	
	        // The following is to fix Edge not sharing Map values across windows:
	
	        var _Map = function () {
	            function _Map() {
	                (0, _classCallCheck3.default)(this, _Map);
	
	                this._map = (0, _create2.default)(null);
	            }
	
	            (0, _createClass3.default)(_Map, [{
	                key: 'values',
	                value: function values() {
	                    var values = (0, _keys2.default)(this._map);
	
	                    for (var index = 0; index < values.length; index += 1) {
	                        values[index] = this._map[values[index]];
	                    }
	
	                    return values;
	                }
	            }, {
	                key: 'set',
	                value: function set(key, value) {
	                    this._map[key] = value;
	                }
	            }, {
	                key: 'get',
	                value: function get(key) {
	                    return this._map[key];
	                }
	            }, {
	                key: 'delete',
	                value: function _delete(key) {
	                    delete this._map[key];
	                }
	            }]);
	            return _Map;
	        }();
	
	        _global2.default._launcher = window;
	        _global2.default._internalBus = new _index.EventHandler((0, _keys2.default)(_global2.default._eventListeners));
	        _global2.default._windows = new _Map();
	
	        _global2.default._getNextZIndex = function () {
	            nextZIndex += 1;
	            return nextZIndex;
	        };
	    })();
	} else {
	    // This is a child window of root!
	    _global2.default._launcher = window.parent.windowmanager._launcher || window.parent;
	    _global2.default._internalBus = window.parent.windowmanager._internalBus;
	    _global2.default._windows = window.parent.windowmanager._windows;
	    _global2.default._getNextZIndex = window.parent.windowmanager._getNextZIndex;
	}
	
	// Wire the internal bus to emit events on windowmanager:
	_global2.default._internalBus.addPipe(_global2.default);
	
	// This is used to store info across windows:
	// Everything on here gets exported as windowmanager.
	exports.default = _global2.default;
	module.exports = exports['default'];

/***/ },
/* 144 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _from = __webpack_require__(101);
	
	var _from2 = _interopRequireDefault(_from);
	
	var _getIterator2 = __webpack_require__(5);
	
	var _getIterator3 = _interopRequireDefault(_getIterator2);
	
	var _isFinite = __webpack_require__(145);
	
	var _isFinite2 = _interopRequireDefault(_isFinite);
	
	var _getPrototypeOf = __webpack_require__(106);
	
	var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);
	
	var _classCallCheck2 = __webpack_require__(61);
	
	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
	
	var _createClass2 = __webpack_require__(62);
	
	var _createClass3 = _interopRequireDefault(_createClass2);
	
	var _possibleConstructorReturn2 = __webpack_require__(110);
	
	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);
	
	var _inherits2 = __webpack_require__(128);
	
	var _inherits3 = _interopRequireDefault(_inherits2);
	
	var _global = __webpack_require__(143);
	
	var _global2 = _interopRequireDefault(_global);
	
	var _index = __webpack_require__(3);
	
	var _index2 = __webpack_require__(59);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var defaultConfig = {
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
	var configMap = {};
	var acceptedEventHandlers = ['ready', 'drag-start', 'drag-before', 'drag-stop', 'dock-before', 'move', 'move-before', 'resize-before', 'close', 'minimize'];
	var transformPropNames = ['-ms-transform', '-moz-transform', '-o-transform', '-webkit-transform', 'transform'];
	
	/**
	 * @callback Callback
	 * @param {String|null} error - String on error, or null if no error
	 * @param {Object|null} result - Object on success, or null if error
	 */
	
	/**
	 * A Window class.
	 * @extends EventHandler
	 */
	
	var Window = function (_EventHandler) {
	    (0, _inherits3.default)(Window, _EventHandler);
	
	    /**
	     * Wraps a window object.
	     * @param {Object} config - Configuration
	     */
	    function Window(config) {
	        (0, _classCallCheck3.default)(this, Window);
	
	        var _this = (0, _possibleConstructorReturn3.default)(this, (Window.__proto__ || (0, _getPrototypeOf2.default)(Window)).call(this, acceptedEventHandlers));
	        // Call the parent constructor:
	
	
	        config = config || {}; // If no arguments are passed, assume we are creating a default blank window
	        var isArgConfig = !(config instanceof window.Window);
	
	        // Setup private variables:
	        _this._ready = false;
	        // TODO: Identify current states.
	        _this._isClosed = false;
	        _this._isHidden = false;
	        _this._isMinimized = false;
	        _this._isMaximized = false;
	        _this._dockedGroup = [_this];
	        _this._children = []; // TODO: Add way to remove or change heirarchy.
	        _this._parent = undefined;
	        _this._title = undefined;
	        _this._id = (0, _index.getUniqueWindowName)();
	
	        if (isArgConfig) {
	            for (var prop in config) {
	                if (config.hasOwnProperty(prop) && configMap[prop] !== undefined) {
	                    config[configMap[prop]] = config[prop];
	                    delete config[prop];
	                }
	            }
	            for (var _prop in defaultConfig) {
	                if (defaultConfig.hasOwnProperty(_prop)) {
	                    config[_prop] = config[_prop] != null ? config[_prop] : defaultConfig[_prop];
	                }
	            }
	            _this._title = config.title == null ? _this._id : config.title;
	
	            if (config.parent) {
	                config.parent._children.push(_this);
	                _this._parent = config.parent;
	                // TODO: Emit event 'child-added' on parent
	                delete config.parent;
	            }
	
	            _this._minSize = new _index2.BoundingBox(config.minWidth, config.minHeight);
	            _this._maxSize = new _index2.BoundingBox(config.maxWidth, config.maxHeight);
	
	            var newWindow = _global2.default._launcher.document.createElement('iframe');
	
	            newWindow.src = config.url;
	            newWindow.style.position = 'absolute';
	            if (!(0, _isFinite2.default)(config.left)) {
	                config.left = (_global2.default._launcher.innerWidth - config.width) / 2;
	            }
	            newWindow.style.left = config.left + 'px';
	            if (!(0, _isFinite2.default)(config.top)) {
	                config.top = (_global2.default._launcher.innerHeight - config.height) / 2;
	            }
	            newWindow.style.top = config.top + 'px';
	            newWindow.style.width = config.width + 'px';
	            newWindow.style.height = config.height + 'px';
	            newWindow.style.minWidth = _this._minSize.left + 'px';
	            newWindow.style.minHeight = _this._minSize.top + 'px';
	            newWindow.style.maxWidth = _this._maxSize.left + 'px';
	            newWindow.style.maxHeight = _this._maxSize.top + 'px';
	            newWindow.style.margin = 0;
	            newWindow.style.padding = 0;
	            newWindow.style.border = 0;
	            newWindow.style.resize = 'both';
	            newWindow.style.overflow = 'auto';
	            _global2.default._launcher.document.body.appendChild(newWindow);
	
	            _this._window = newWindow;
	            _global2.default._windows.set(_this._id, _this);
	            _this._ready = true;
	            _this.emit('ready');
	            _global2.default._internalBus.emit('window-create', _this);
	            _this.bringToFront();
	            _this.focus();
	        } else {
	            _this._minSize = new _index2.BoundingBox(defaultConfig.minWidth, defaultConfig.minHeight);
	            _this._maxSize = new _index2.BoundingBox(defaultConfig.maxWidth, defaultConfig.maxHeight);
	            _this._window = config.document.body;
	            _global2.default._windows.set(_this._id, _this);
	            _this._ready = true;
	        }
	        return _this;
	    }
	
	    /**
	     * Returns true if the {@link Window} instance is created, not closed, and ready for method calls.
	     * @returns {Boolean}
	     */
	
	
	    (0, _createClass3.default)(Window, [{
	        key: 'isReady',
	        value: function isReady() {
	            return this._ready;
	        }
	
	        /**
	         * Calls a callback when window is ready and setup.
	         * @param {Callback=}
	         */
	
	    }, {
	        key: 'onReady',
	        value: function onReady(callback) {
	            if (this.isClosed()) {
	                throw new Error('onReady can\'t be called on a closed window');
	            }
	            if (this.isReady()) {
	                return callback.call(this);
	            }
	
	            this.once('ready', callback);
	        }
	
	        /**
	         * Returns whether window has been closed already.
	         * @returns {Boolean}
	         */
	
	    }, {
	        key: 'isClosed',
	        value: function isClosed() {
	            return this._isClosed;
	        }
	
	        /**
	         * Returns window's current position.
	         * @returns {Vector}
	         */
	
	    }, {
	        key: 'getPosition',
	        value: function getPosition() {
	            return new _index2.Position(this._window.getBoundingClientRect());
	        }
	    }, {
	        key: 'getMinWidth',
	        value: function getMinWidth() {
	            return this._minSize.left;
	        }
	
	        /**
	         * Returns window's width.
	         * @returns {Number}
	         */
	
	    }, {
	        key: 'getWidth',
	        value: function getWidth() {
	            return this._window.getBoundingClientRect().width;
	        }
	    }, {
	        key: 'getMaxWidth',
	        value: function getMaxWidth() {
	            return this._maxSize.left;
	        }
	    }, {
	        key: 'getMinHeight',
	        value: function getMinHeight() {
	            return this._minSize.top;
	        }
	
	        /**
	         * Returns window's height.
	         * @returns {Number}
	         */
	
	    }, {
	        key: 'getHeight',
	        value: function getHeight() {
	            return this._window.getBoundingClientRect().height;
	        }
	    }, {
	        key: 'getMaxHeight',
	        value: function getMaxHeight() {
	            return this._maxSize.top;
	        }
	    }, {
	        key: 'getMinSize',
	        value: function getMinSize() {
	            return this._minSize.clone();
	        }
	
	        /**
	         * Returns window's size.
	         * @returns {Size}
	         */
	
	    }, {
	        key: 'getSize',
	        value: function getSize() {
	            var box = this._window.getBoundingClientRect();
	
	            return new _index2.Size(box.width, box.height);
	        }
	    }, {
	        key: 'getMaxSize',
	        value: function getMaxSize() {
	            return this._maxSize.clone();
	        }
	
	        /**
	         * Returns window's bounding box.
	         * @returns {BoundingBox}
	         */
	
	    }, {
	        key: 'getBounds',
	        value: function getBounds() {
	            return new _index2.BoundingBox(this._window.getBoundingClientRect());
	        }
	    }, {
	        key: 'getParent',
	        value: function getParent() {
	            return this._parent;
	        }
	    }, {
	        key: 'setParent',
	        value: function setParent(parent) {
	            // TODO: Execute appropriate checks (if not closed, and is this new parent a window)
	            if (parent === this._parent) {
	                return;
	            }
	
	            if (this._parent) {
	                var index = this._parent._children.indexOf(this);
	
	                if (index >= 0) {
	                    this._parent._children.splice(index, 1);
	                }
	                // TODO: Emit event 'child-removed' on current parent.
	            }
	
	            if (parent) {
	                this._parent = parent;
	                this._parent._children.push(this);
	                // TODO: Emit event 'child-added on parent'.
	            }
	        }
	    }, {
	        key: 'getChildren',
	        value: function getChildren() {
	            return this._children.slice();
	        }
	    }, {
	        key: 'addChild',
	        value: function addChild(child) {
	            child.setParent(this);
	        }
	
	        /**
	         * Returns window's title.
	         * @returns {String}
	         */
	
	    }, {
	        key: 'getTitle',
	        value: function getTitle() {
	            return this._title;
	        }
	
	        /**
	         * Sets window's title.
	         * @param {String}
	         */
	
	    }, {
	        key: 'setTitle',
	        value: function setTitle(title) {
	            if (!title) {
	                throw new Error('setTitle requires one argument of type String');
	            }
	            this._title = title;
	        }
	
	        /**
	         * Returns true if window is hidden.
	         * @returns {Boolean}
	         */
	
	    }, {
	        key: 'isHidden',
	        value: function isHidden() {
	            return this._isHidden;
	        }
	
	        /**
	         * Returns true if window is not hidden.
	         * @returns {Boolean}
	         */
	
	    }, {
	        key: 'isShown',
	        value: function isShown() {
	            return !this._isHidden;
	        }
	
	        /**
	         * Returns true if window is minimized.
	         * @returns {Boolean}
	         */
	
	    }, {
	        key: 'isMinimized',
	        value: function isMinimized() {
	            return this._isMinimized;
	        }
	
	        /**
	         * Returns true if window is maximized.
	         * @returns {Boolean}
	         */
	
	    }, {
	        key: 'isMaximized',
	        value: function isMaximized() {
	            return this._isMaximized;
	        }
	
	        /**
	         * Returns true if window is not hidden or minimize or maximized.
	         * @returns {Boolean}
	         */
	
	    }, {
	        key: 'isRestored',
	        value: function isRestored() {
	            return this.isShown() && !this.isMinimized() && !this.isMaximized();
	        }
	
	        /**
	         * Closes the window instance.
	         * @param {Callback=}
	         */
	
	    }, {
	        key: 'close',
	        value: function close(callback) {
	            if (this.isClosed()) {
	                return callback && callback();
	            }
	
	            this._window.parentElement.removeChild(this._window);
	            _global2.default._windows.delete(this._id);
	
	            // Undock:
	            this.undock();
	
	            // Move children to parent:
	            var parent = this.getParent();
	
	            var _iteratorNormalCompletion = true;
	            var _didIteratorError = false;
	            var _iteratorError = undefined;
	
	            try {
	                for (var _iterator = (0, _getIterator3.default)(this.getChildren()), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
	                    var child = _step.value;
	
	                    // We use getChildren to have a copy of the list, so child.setParent doesn't modify this loop's list!
	                    // TODO: Optimize this loop, by not making a copy of children, and not executing splice in each setParent!
	                    child.setParent(parent);
	                }
	            } catch (err) {
	                _didIteratorError = true;
	                _iteratorError = err;
	            } finally {
	                try {
	                    if (!_iteratorNormalCompletion && _iterator.return) {
	                        _iterator.return();
	                    }
	                } finally {
	                    if (_didIteratorError) {
	                        throw _iteratorError;
	                    }
	                }
	            }
	
	            this.setParent(undefined); // Remove from parent
	
	            this._isClosed = true;
	            if (callback) {
	                callback();
	            }
	            this.emit('close');
	            _global2.default._internalBus.emit('window-close', this);
	        }
	
	        /**
	         * Minimizes the window instance.
	         * @param {Callback=}
	         */
	
	    }, {
	        key: 'minimize',
	        value: function minimize(callback) {
	            if (!this._ready) {
	                throw new Error('minimize can\'t be called on an unready window');
	            }
	
	            // TODO: What do we do on minimize in this runtime?
	            var _iteratorNormalCompletion2 = true;
	            var _didIteratorError2 = false;
	            var _iteratorError2 = undefined;
	
	            try {
	                for (var _iterator2 = (0, _getIterator3.default)(this._dockedGroup), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
	                    var _window = _step2.value;
	
	                    _window._isMinimized = true;
	                    _window.emit('minimize');
	                }
	            } catch (err) {
	                _didIteratorError2 = true;
	                _iteratorError2 = err;
	            } finally {
	                try {
	                    if (!_iteratorNormalCompletion2 && _iterator2.return) {
	                        _iterator2.return();
	                    }
	                } finally {
	                    if (_didIteratorError2) {
	                        throw _iteratorError2;
	                    }
	                }
	            }
	        }
	
	        /**
	         * Maximizes the window instance.
	         * @param {Callback=}
	         */
	
	    }, {
	        key: 'maximize',
	        value: function maximize(callback) {
	            if (!this._ready) {
	                throw new Error('maximize can\'t be called on an unready window');
	            }
	
	            this._restoreBounds = this.getBounds();
	            this._window.style.left = 0;
	            this._window.style.top = 0;
	            this._window.style.width = '100%';
	            this._window.style.height = '100%';
	            this._isMaximized = true;
	            if (callback) {
	                callback();
	            }
	        }
	
	        /**
	         * Unhides the window instance.
	         * @param {Callback=}
	         */
	
	    }, {
	        key: 'show',
	        value: function show(callback) {
	            if (!this._ready) {
	                throw new Error('show can\'t be called on an unready window');
	            }
	
	            var _iteratorNormalCompletion3 = true;
	            var _didIteratorError3 = false;
	            var _iteratorError3 = undefined;
	
	            try {
	                for (var _iterator3 = (0, _getIterator3.default)(this._dockedGroup), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
	                    var _window2 = _step3.value;
	
	                    _window2._window.style.display = '';
	                    _window2._isHidden = false;
	                }
	            } catch (err) {
	                _didIteratorError3 = true;
	                _iteratorError3 = err;
	            } finally {
	                try {
	                    if (!_iteratorNormalCompletion3 && _iterator3.return) {
	                        _iterator3.return();
	                    }
	                } finally {
	                    if (_didIteratorError3) {
	                        throw _iteratorError3;
	                    }
	                }
	            }
	
	            if (callback) {
	                callback();
	            }
	        }
	
	        /**
	         * Hides the window instance.
	         * @param {Callback=}
	         */
	
	    }, {
	        key: 'hide',
	        value: function hide(callback) {
	            if (!this._ready) {
	                throw new Error('hide can\'t be called on an unready window');
	            }
	
	            var _iteratorNormalCompletion4 = true;
	            var _didIteratorError4 = false;
	            var _iteratorError4 = undefined;
	
	            try {
	                for (var _iterator4 = (0, _getIterator3.default)(this._dockedGroup), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
	                    var _window3 = _step4.value;
	
	                    _window3._window.style.display = 'none';
	                    _window3._isHidden = true;
	                }
	            } catch (err) {
	                _didIteratorError4 = true;
	                _iteratorError4 = err;
	            } finally {
	                try {
	                    if (!_iteratorNormalCompletion4 && _iterator4.return) {
	                        _iterator4.return();
	                    }
	                } finally {
	                    if (_didIteratorError4) {
	                        throw _iteratorError4;
	                    }
	                }
	            }
	
	            if (callback) {
	                callback();
	            }
	        }
	
	        /**
	         * Restores the window instance from the minimized or maximized states.
	         * @param {Callback=}
	         */
	
	    }, {
	        key: 'restore',
	        value: function restore(callback) {
	            if (!this._ready) {
	                throw new Error('restore can\'t be called on an unready window');
	            }
	
	            var _iteratorNormalCompletion5 = true;
	            var _didIteratorError5 = false;
	            var _iteratorError5 = undefined;
	
	            try {
	                for (var _iterator5 = (0, _getIterator3.default)(this._dockedGroup), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
	                    var _window4 = _step5.value;
	
	                    if (_window4._isMaximized) {
	                        _window4._window.style.left = _window4._restoreBounds.left + 'px';
	                        _window4._window.style.top = _window4._restoreBounds.top + 'px';
	                        _window4._window.style.width = _window4._restoreBounds.getWidth() + 'px';
	                        _window4._window.style.height = _window4._restoreBounds.getHeight() + 'px';
	                        _window4._isHidden = false;
	                        _window4._isMinimized = false;
	                        _window4._isMaximized = false;
	                    }
	                }
	            } catch (err) {
	                _didIteratorError5 = true;
	                _iteratorError5 = err;
	            } finally {
	                try {
	                    if (!_iteratorNormalCompletion5 && _iterator5.return) {
	                        _iterator5.return();
	                    }
	                } finally {
	                    if (_didIteratorError5) {
	                        throw _iteratorError5;
	                    }
	                }
	            }
	
	            if (callback) {
	                callback();
	            }
	        }
	
	        /**
	         * Brings the window instance to the front of all windows.
	         * @param {Callback=}
	         */
	
	    }, {
	        key: 'bringToFront',
	        value: function bringToFront(callback) {
	            if (!this._ready) {
	                throw new Error('bringToFront can\'t be called on an unready window');
	            }
	
	            var _iteratorNormalCompletion6 = true;
	            var _didIteratorError6 = false;
	            var _iteratorError6 = undefined;
	
	            try {
	                for (var _iterator6 = (0, _getIterator3.default)(this._dockedGroup), _step6; !(_iteratorNormalCompletion6 = (_step6 = _iterator6.next()).done); _iteratorNormalCompletion6 = true) {
	                    var _window5 = _step6.value;
	
	                    if (_window5 !== this) {
	                        _window5._window.style['z-index'] = _global2.default._getNextZIndex();
	                    }
	                }
	            } catch (err) {
	                _didIteratorError6 = true;
	                _iteratorError6 = err;
	            } finally {
	                try {
	                    if (!_iteratorNormalCompletion6 && _iterator6.return) {
	                        _iterator6.return();
	                    }
	                } finally {
	                    if (_didIteratorError6) {
	                        throw _iteratorError6;
	                    }
	                }
	            }
	
	            this._window.style['z-index'] = _global2.default._getNextZIndex();
	            if (callback) {
	                callback();
	            }
	        }
	
	        /**
	         * Sets focus to the window instance.
	         * @param {Callback=}
	         */
	
	    }, {
	        key: 'focus',
	        value: function focus(callback) {
	            if (!this._ready) {
	                throw new Error('focus can\'t be called on an unready window');
	            }
	
	            var _iteratorNormalCompletion7 = true;
	            var _didIteratorError7 = false;
	            var _iteratorError7 = undefined;
	
	            try {
	                for (var _iterator7 = (0, _getIterator3.default)(this._dockedGroup), _step7; !(_iteratorNormalCompletion7 = (_step7 = _iterator7.next()).done); _iteratorNormalCompletion7 = true) {
	                    var _window6 = _step7.value;
	
	                    if (_window6 !== this) {
	                        _window6._window.contentWindow.focus();
	                    }
	                }
	            } catch (err) {
	                _didIteratorError7 = true;
	                _iteratorError7 = err;
	            } finally {
	                try {
	                    if (!_iteratorNormalCompletion7 && _iterator7.return) {
	                        _iterator7.return();
	                    }
	                } finally {
	                    if (_didIteratorError7) {
	                        throw _iteratorError7;
	                    }
	                }
	            }
	
	            this._window.contentWindow.focus();
	            if (callback) {
	                callback();
	            }
	        }
	
	        /**
	         * Resizes the window instance.
	         * @param {Number} width
	         * @param {Number} height
	         * @param {Callback=}
	         */
	
	    }, {
	        key: 'resizeTo',
	        value: function resizeTo(width, height, callback) {
	            if (!this._ready) {
	                throw new Error('resizeTo can\'t be called on an unready window');
	            }
	            if (!this.emit('resize-before')) {
	                return;
	            } // Allow preventing resize
	            var size = new _index2.Position(width, height);
	
	            this.undock();
	            this._window.width = size.left + 'px';
	            this._window.height = size.top + 'px';
	            if (callback) {
	                callback();
	            }
	        }
	
	        /**
	         * Moves the window instance.
	         * @param {Number} left
	         * @param {Number} top
	         * @param {Callback=}
	         */
	
	    }, {
	        key: 'moveTo',
	        value: function moveTo(left, top, callback) {
	            if (!this._ready) {
	                throw new Error('moveTo can\'t be called on an unready window');
	            }
	            if (!this.emit('move-before')) {
	                return;
	            } // Allow preventing move
	            var deltaPos = new _index2.Position(left, top).subtract(this.getPosition());
	
	            var _iteratorNormalCompletion8 = true;
	            var _didIteratorError8 = false;
	            var _iteratorError8 = undefined;
	
	            try {
	                for (var _iterator8 = (0, _getIterator3.default)(this._dockedGroup), _step8; !(_iteratorNormalCompletion8 = (_step8 = _iterator8.next()).done); _iteratorNormalCompletion8 = true) {
	                    var _window7 = _step8.value;
	
	                    var pos = _window7.getPosition().add(deltaPos);
	
	                    _window7._window.style.left = pos.left + 'px';
	                    _window7._window.style.top = pos.top + 'px';
	                }
	            } catch (err) {
	                _didIteratorError8 = true;
	                _iteratorError8 = err;
	            } finally {
	                try {
	                    if (!_iteratorNormalCompletion8 && _iterator8.return) {
	                        _iterator8.return();
	                    }
	                } finally {
	                    if (_didIteratorError8) {
	                        throw _iteratorError8;
	                    }
	                }
	            }
	
	            if (callback) {
	                callback();
	            }
	        }
	
	        /**
	         * Moves the window instance relative to its current position.
	         * @param {Number} deltaLeft
	         * @param {Number} deltaTop
	         * @param {Callback=}
	         */
	
	    }, {
	        key: 'moveBy',
	        value: function moveBy(deltaLeft, deltaTop, callback) {
	            if (!this._ready) {
	                throw new Error('moveBy can\'t be called on an unready window');
	            }
	            if (!this.emit('move-before')) {
	                return;
	            } // Allow preventing move
	            var deltaPos = new _index2.Position(deltaLeft, deltaTop);
	
	            var _iteratorNormalCompletion9 = true;
	            var _didIteratorError9 = false;
	            var _iteratorError9 = undefined;
	
	            try {
	                for (var _iterator9 = (0, _getIterator3.default)(this._dockedGroup), _step9; !(_iteratorNormalCompletion9 = (_step9 = _iterator9.next()).done); _iteratorNormalCompletion9 = true) {
	                    var _window8 = _step9.value;
	
	                    var pos = _window8.getPosition().add(deltaPos);
	
	                    _window8._window.style.left = pos.left + 'px';
	                    _window8._window.style.top = pos.top + 'px';
	                }
	            } catch (err) {
	                _didIteratorError9 = true;
	                _iteratorError9 = err;
	            } finally {
	                try {
	                    if (!_iteratorNormalCompletion9 && _iterator9.return) {
	                        _iterator9.return();
	                    }
	                } finally {
	                    if (_didIteratorError9) {
	                        throw _iteratorError9;
	                    }
	                }
	            }
	
	            if (callback) {
	                callback();
	            }
	            var _iteratorNormalCompletion10 = true;
	            var _didIteratorError10 = false;
	            var _iteratorError10 = undefined;
	
	            try {
	                for (var _iterator10 = (0, _getIterator3.default)(this._dockedGroup), _step10; !(_iteratorNormalCompletion10 = (_step10 = _iterator10.next()).done); _iteratorNormalCompletion10 = true) {
	                    var _window9 = _step10.value;
	
	                    _window9.emit('move');
	                }
	            } catch (err) {
	                _didIteratorError10 = true;
	                _iteratorError10 = err;
	            } finally {
	                try {
	                    if (!_iteratorNormalCompletion10 && _iterator10.return) {
	                        _iterator10.return();
	                    }
	                } finally {
	                    if (_didIteratorError10) {
	                        throw _iteratorError10;
	                    }
	                }
	            }
	        }
	    }, {
	        key: 'setMinSize',
	        value: function setMinSize(width, height, callback) {
	            if (!this._ready) {
	                throw new Error('setMinSize can\'t be called on an unready window');
	            }
	            var size = new _index2.Size(width, height);
	
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
	                if (callback) {
	                    callback();
	                }
	                this.emit('resize');
	            } else {
	                if (callback) {
	                    callback();
	                }
	            }
	        }
	    }, {
	        key: 'setSize',
	        value: function setSize(width, height, callback) {
	            if (!this._ready) {
	                throw new Error('setMaxSize can\'t be called on an unready window');
	            }
	            var size = new _index2.Size(width, height);
	
	            this.undock(); // TODO: Support changing size when docked.
	            this._window.style.width = Math.min(this._maxSize.left, Math.max(this._minSize.left, size.left)) + 'px';
	            this._window.style.height = Math.min(this._maxSize.top, Math.max(this._minSize.top, size.top)) + 'px';
	            // Clear transform:
	            var _iteratorNormalCompletion11 = true;
	            var _didIteratorError11 = false;
	            var _iteratorError11 = undefined;
	
	            try {
	                for (var _iterator11 = (0, _getIterator3.default)(transformPropNames), _step11; !(_iteratorNormalCompletion11 = (_step11 = _iterator11.next()).done); _iteratorNormalCompletion11 = true) {
	                    var transformPropName = _step11.value;
	
	                    this._window.style[transformPropName] = '';
	                }
	            } catch (err) {
	                _didIteratorError11 = true;
	                _iteratorError11 = err;
	            } finally {
	                try {
	                    if (!_iteratorNormalCompletion11 && _iterator11.return) {
	                        _iterator11.return();
	                    }
	                } finally {
	                    if (_didIteratorError11) {
	                        throw _iteratorError11;
	                    }
	                }
	            }
	
	            if (callback) {
	                callback();
	            }
	            this.emit('resize');
	        }
	    }, {
	        key: 'forceScaledSize',
	        value: function forceScaledSize(width, height, callback) {
	            if (!this._ready) {
	                throw new Error('setMaxSize can\'t be called on an unready window');
	            }
	            var size = new _index2.Size(Math.min(this._maxSize.left, Math.max(this._minSize.left, width)), Math.min(this._maxSize.top, Math.max(this._minSize.top, height)));
	
	            this.undock(); // TODO: Support changing size when docked.
	            this._window.style.width = size.left + 'px';
	            this._window.style.height = size.top + 'px';
	            // TODO: Calc transform:
	            var transform = Math.min(width / size.left, height / size.top);
	
	            var _iteratorNormalCompletion12 = true;
	            var _didIteratorError12 = false;
	            var _iteratorError12 = undefined;
	
	            try {
	                for (var _iterator12 = (0, _getIterator3.default)(transformPropNames), _step12; !(_iteratorNormalCompletion12 = (_step12 = _iterator12.next()).done); _iteratorNormalCompletion12 = true) {
	                    var transformPropName = _step12.value;
	
	                    this._window.style[transformPropName] = 'scale(' + transform + ')';
	                }
	            } catch (err) {
	                _didIteratorError12 = true;
	                _iteratorError12 = err;
	            } finally {
	                try {
	                    if (!_iteratorNormalCompletion12 && _iterator12.return) {
	                        _iterator12.return();
	                    }
	                } finally {
	                    if (_didIteratorError12) {
	                        throw _iteratorError12;
	                    }
	                }
	            }
	
	            if (callback) {
	                callback();
	            }
	            this.emit('resize');
	        }
	    }, {
	        key: 'setMaxSize',
	        value: function setMaxSize(width, height, callback) {
	            if (!this._ready) {
	                throw new Error('setMaxSize can\'t be called on an unready window');
	            }
	            var size = new _index2.Size(width, height);
	
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
	                var _iteratorNormalCompletion13 = true;
	                var _didIteratorError13 = false;
	                var _iteratorError13 = undefined;
	
	                try {
	                    for (var _iterator13 = (0, _getIterator3.default)(transformPropNames), _step13; !(_iteratorNormalCompletion13 = (_step13 = _iterator13.next()).done); _iteratorNormalCompletion13 = true) {
	                        var transformPropName = _step13.value;
	
	                        this._window.style[transformPropName] = '';
	                    }
	                } catch (err) {
	                    _didIteratorError13 = true;
	                    _iteratorError13 = err;
	                } finally {
	                    try {
	                        if (!_iteratorNormalCompletion13 && _iterator13.return) {
	                            _iterator13.return();
	                        }
	                    } finally {
	                        if (_didIteratorError13) {
	                            throw _iteratorError13;
	                        }
	                    }
	                }
	
	                if (callback) {
	                    callback();
	                }
	                this.emit('resize');
	            } else {
	                if (callback) {
	                    callback();
	                }
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
	
	    }, {
	        key: 'setBounds',
	        value: function setBounds(left, top, right, bottom, callback) {
	            if (!this._ready) {
	                throw new Error('resizeTo can\'t be called on an unready window');
	            }
	            var bounds = new _index2.BoundingBox(left, top, right, bottom);
	
	            this.undock(); // TODO: Support changing size when docked.
	            this._window.style.left = bounds.left + 'px';
	            this._window.style.top = bounds.top + 'px';
	            // TODO: Take into account transform?
	            this._window.style.width = Math.min(this._maxSize.left, Math.max(this._minSize.left, bounds.getWidth())) + 'px';
	            this._window.style.height = Math.min(this._maxSize.top, Math.max(this._minSize.top, bounds.getHeight())) + 'px';
	            // Clear transform:
	            var _iteratorNormalCompletion14 = true;
	            var _didIteratorError14 = false;
	            var _iteratorError14 = undefined;
	
	            try {
	                for (var _iterator14 = (0, _getIterator3.default)(transformPropNames), _step14; !(_iteratorNormalCompletion14 = (_step14 = _iterator14.next()).done); _iteratorNormalCompletion14 = true) {
	                    var transformPropName = _step14.value;
	
	                    this._window.style[transformPropName] = '';
	                }
	                // TODO: Events
	            } catch (err) {
	                _didIteratorError14 = true;
	                _iteratorError14 = err;
	            } finally {
	                try {
	                    if (!_iteratorNormalCompletion14 && _iterator14.return) {
	                        _iterator14.return();
	                    }
	                } finally {
	                    if (_didIteratorError14) {
	                        throw _iteratorError14;
	                    }
	                }
	            }
	
	            if (callback) {
	                callback();
	            }
	        }
	
	        /**
	         * Force docking this window to another. They don't need to be touching.
	         * @param {Window}
	         * @param {Callback=}
	         */
	
	    }, {
	        key: 'dock',
	        value: function dock(other) {
	            // TODO: Check if otherGroup is touching
	            if (!this.emit('dock-before')) {
	                return;
	            } // Allow preventing dock
	            if (other === undefined) {
	                return;
	            } // Failed to find other. TODO: Return error
	
	            // If other is already in the group, return:
	            if (this._dockedGroup.indexOf(other) >= 0) {
	                return;
	            }
	
	            // Loop through all windows in otherGroup and add them to this's group:
	            var _iteratorNormalCompletion15 = true;
	            var _didIteratorError15 = false;
	            var _iteratorError15 = undefined;
	
	            try {
	                for (var _iterator15 = (0, _getIterator3.default)(other._dockedGroup), _step15; !(_iteratorNormalCompletion15 = (_step15 = _iterator15.next()).done); _iteratorNormalCompletion15 = true) {
	                    var otherWin = _step15.value;
	
	                    this._dockedGroup.push(otherWin);
	                    // Sharing the array between window objects makes it easier to manage:
	                    otherWin._dockedGroup = otherWin._dockedGroup;
	                }
	            } catch (err) {
	                _didIteratorError15 = true;
	                _iteratorError15 = err;
	            } finally {
	                try {
	                    if (!_iteratorNormalCompletion15 && _iterator15.return) {
	                        _iterator15.return();
	                    }
	                } finally {
	                    if (_didIteratorError15) {
	                        throw _iteratorError15;
	                    }
	                }
	            }
	        }
	
	        /**
	         * Force undocking this window from it's group.<br>
	         * TODO: Redock those still touching, EXCEPT 'this'.
	         * @param {Window}
	         * @param {Callback=}
	         */
	
	    }, {
	        key: 'undock',
	        value: function undock(other) {
	            // Check to see if window is already undocked:
	            if (this._dockedGroup.length === 1) {
	                return;
	            }
	
	            // Undock this:
	            this._dockedGroup.splice(this._dockedGroup.indexOf(this), 1);
	            this._dockedGroup = [this];
	
	            // TODO: Redock those still touching, EXCEPT 'this'.
	        }
	    }, {
	        key: '_dragStart',
	        value: function _dragStart() {
	            if (!this.emit('drag-start')) {
	                return;
	            } // Allow preventing drag
	            this.restore();
	            var _iteratorNormalCompletion16 = true;
	            var _didIteratorError16 = false;
	            var _iteratorError16 = undefined;
	
	            try {
	                for (var _iterator16 = (0, _getIterator3.default)(this._dockedGroup), _step16; !(_iteratorNormalCompletion16 = (_step16 = _iterator16.next()).done); _iteratorNormalCompletion16 = true) {
	                    var _window10 = _step16.value;
	
	                    _window10._dragStartPos = _window10.getPosition();
	                }
	            } catch (err) {
	                _didIteratorError16 = true;
	                _iteratorError16 = err;
	            } finally {
	                try {
	                    if (!_iteratorNormalCompletion16 && _iterator16.return) {
	                        _iterator16.return();
	                    }
	                } finally {
	                    if (_didIteratorError16) {
	                        throw _iteratorError16;
	                    }
	                }
	            }
	        }
	    }, {
	        key: '_dragBy',
	        value: function _dragBy(deltaLeft, deltaTop) {
	            if (!this.emit('drag-before')) {
	                return;
	            } // Allow preventing drag
	            // Perform Snap:
	            var thisBounds = this.getBounds().moveTo(this._dragStartPos.left + deltaLeft, this._dragStartPos.top + deltaTop);
	            var snapDelta = new _index2.Vector(NaN, NaN);
	
	            var _iteratorNormalCompletion17 = true;
	            var _didIteratorError17 = false;
	            var _iteratorError17 = undefined;
	
	            try {
	                for (var _iterator17 = (0, _getIterator3.default)(_global2.default._windows.values()), _step17; !(_iteratorNormalCompletion17 = (_step17 = _iterator17.next()).done); _iteratorNormalCompletion17 = true) {
	                    var other = _step17.value;
	
	                    if (other._dockedGroup !== this._dockedGroup) {
	                        snapDelta.setMin(thisBounds.getSnapDelta(other.getBounds()));
	                    }
	                }
	            } catch (err) {
	                _didIteratorError17 = true;
	                _iteratorError17 = err;
	            } finally {
	                try {
	                    if (!_iteratorNormalCompletion17 && _iterator17.return) {
	                        _iterator17.return();
	                    }
	                } finally {
	                    if (_didIteratorError17) {
	                        throw _iteratorError17;
	                    }
	                }
	            }
	
	            deltaLeft += snapDelta.left || 0;
	            deltaTop += snapDelta.top || 0;
	
	            var _iteratorNormalCompletion18 = true;
	            var _didIteratorError18 = false;
	            var _iteratorError18 = undefined;
	
	            try {
	                for (var _iterator18 = (0, _getIterator3.default)(this._dockedGroup), _step18; !(_iteratorNormalCompletion18 = (_step18 = _iterator18.next()).done); _iteratorNormalCompletion18 = true) {
	                    var _other = _step18.value;
	
	                    var pos = _other._dragStartPos;
	
	                    // If other doesn't have a drag position, start it:
	                    if (pos === undefined) {
	                        pos = _other._dragStartPos = _other.getPosition();
	                        pos.left -= deltaLeft;
	                        pos.top -= deltaTop;
	                    }
	
	                    _other._window.style.left = pos.left + deltaLeft + 'px';
	                    _other._window.style.top = pos.top + deltaTop + 'px';
	                    _other.emit('move');
	                }
	            } catch (err) {
	                _didIteratorError18 = true;
	                _iteratorError18 = err;
	            } finally {
	                try {
	                    if (!_iteratorNormalCompletion18 && _iterator18.return) {
	                        _iterator18.return();
	                    }
	                } finally {
	                    if (_didIteratorError18) {
	                        throw _iteratorError18;
	                    }
	                }
	            }
	        }
	    }, {
	        key: '_dragStop',
	        value: function _dragStop() {
	            // Dock to those it snapped to:
	            var thisBounds = this.getBounds();
	
	            var _iteratorNormalCompletion19 = true;
	            var _didIteratorError19 = false;
	            var _iteratorError19 = undefined;
	
	            try {
	                for (var _iterator19 = (0, _getIterator3.default)(_global2.default._windows.values()), _step19; !(_iteratorNormalCompletion19 = (_step19 = _iterator19.next()).done); _iteratorNormalCompletion19 = true) {
	                    var other = _step19.value;
	
	                    if (thisBounds.isTouching(other.getBounds())) {
	                        this.dock(other);
	                    }
	                }
	            } catch (err) {
	                _didIteratorError19 = true;
	                _iteratorError19 = err;
	            } finally {
	                try {
	                    if (!_iteratorNormalCompletion19 && _iterator19.return) {
	                        _iterator19.return();
	                    }
	                } finally {
	                    if (_didIteratorError19) {
	                        throw _iteratorError19;
	                    }
	                }
	            }
	
	            var _iteratorNormalCompletion20 = true;
	            var _didIteratorError20 = false;
	            var _iteratorError20 = undefined;
	
	            try {
	                for (var _iterator20 = (0, _getIterator3.default)(this._dockedGroup), _step20; !(_iteratorNormalCompletion20 = (_step20 = _iterator20.next()).done); _iteratorNormalCompletion20 = true) {
	                    var _window11 = _step20.value;
	
	                    delete _window11._dragStartPos;
	                }
	            } catch (err) {
	                _didIteratorError20 = true;
	                _iteratorError20 = err;
	            } finally {
	                try {
	                    if (!_iteratorNormalCompletion20 && _iterator20.return) {
	                        _iterator20.return();
	                    }
	                } finally {
	                    if (_didIteratorError20) {
	                        throw _iteratorError20;
	                    }
	                }
	            }
	
	            this.emit('drag-stop');
	        }
	
	        /**
	         * Returns a list of all {@link Window} instances open.
	         * @returns {Window[]}
	         */
	
	    }], [{
	        key: 'getAll',
	        value: function getAll() {
	            return (0, _from2.default)(_global2.default._windows.values());
	        }
	
	        /**
	         * Returns the {@link Window} instance that has `id`.
	         * @param {String|Number}
	         * @returns {Window|undefined}
	         */
	
	    }, {
	        key: 'getByID',
	        value: function getByID(id) {
	            return _global2.default._windows.get(id);
	        }
	
	        /**
	         * Returns the {@link Window} instance that is the main window.
	         * @returns {Window}
	         */
	
	    }, {
	        key: 'getMain',
	        value: function getMain() {
	            return _global2.default._launcher.windowmanager.Window.getCurrent();
	        }
	
	        /**
	         * Returns the {@link Window} instance that calls this function.
	         * @returns {Window}
	         */
	
	    }, {
	        key: 'getCurrent',
	        value: function getCurrent() {
	            return Window.current;
	        }
	    }]);
	    return Window;
	}(_index.EventHandler);
	
	// Add launcher to list of windows:
	
	
	if (_global2.default.runtime.isMain) {
	    window.document.body.contentWindow = window;
	    Window.current = new Window(window); // Force add launcher to window list
	} else {
	    // No need to do this for child windows, since _windows is shared across windows.
	    // Handle current window in this context:
	    Window.current = function () {
	        var _iteratorNormalCompletion21 = true;
	        var _didIteratorError21 = false;
	        var _iteratorError21 = undefined;
	
	        try {
	            for (var _iterator21 = (0, _getIterator3.default)(_global2.default._windows.values()), _step21; !(_iteratorNormalCompletion21 = (_step21 = _iterator21.next()).done); _iteratorNormalCompletion21 = true) {
	                var win = _step21.value;
	
	                if (win._window.contentWindow === window) {
	                    return win;
	                }
	            }
	        } catch (err) {
	            _didIteratorError21 = true;
	            _iteratorError21 = err;
	        } finally {
	            try {
	                if (!_iteratorNormalCompletion21 && _iterator21.return) {
	                    _iterator21.return();
	                }
	            } finally {
	                if (_didIteratorError21) {
	                    throw _iteratorError21;
	                }
	            }
	        }
	    }();
	}
	
	if (!_global2.default.runtime.isMain) {
	    (function () {
	        // Setup handlers on this child window:
	        var wX = 0;
	        var wY = 0;
	        var dragging = false;
	
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
	                Window.current._dragBy(event.screenX - wX, event.screenY - wY);
	            }
	        });
	
	        window.addEventListener('touchmove', function (event) {
	            if (dragging) {
	                event.preventDefault();
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
	    })();
	}
	
	_global2.default.Window = Window;
	exports.default = Window;
	module.exports = exports['default'];

/***/ },
/* 145 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(146), __esModule: true };

/***/ },
/* 146 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(147);
	module.exports = __webpack_require__(20).Number.isFinite;

/***/ },
/* 147 */
/***/ function(module, exports, __webpack_require__) {

	// 20.1.2.2 Number.isFinite(number)
	var $export   = __webpack_require__(18)
	  , _isFinite = __webpack_require__(19).isFinite;
	
	$export($export.S, 'Number', {
	  isFinite: function isFinite(it){
	    return typeof it == 'number' && _isFinite(it);
	  }
	});

/***/ }
/******/ ])
});
;
//# sourceMappingURL=windowmanager.js.map