"use strict";
/*global fin*/
if (typeof define !== "undefined" && define) {
	define([
		"../geometry"
	], function (
		geometry
	) {
        if (!(typeof fin !== "undefined" && fin && fin.desktop && fin.desktop.getVersion())) { return; }

		var Vector = geometry.Vector,
			Position = geometry.Position,
			Size = geometry.Size,
			BoundingBox = geometry.BoundingBox;
		var defaultConfig = {
			width: 600,
			height: 600,
			frame: false,
			resizable: false,
			saveWindowState: false
		};
		defaultConfig.__proto__ = null;
		var configMap = {
			width: "defaultWidth",
			height: "defaultHeight"
		};
		configMap.__proto__ = null;

		function setupDOM() {
			var thisWindow = this;

			this._window.getBounds(function (bounds) {
				thisWindow._bounds.set(bounds.left, bounds.top, bounds.left + bounds.width, bounds.top + bounds.height);
			});

			function onBoundsChange(bounds) {
				thisWindow._bounds.set(bounds.left, bounds.top, bounds.left + bounds.width, bounds.top + bounds.height);
			}
			this._window.addEventListener("bounds-changing", onBoundsChange);
			this._window.addEventListener("bounds-changed", onBoundsChange);

			this._ready = true;
			// Notify Subscribers
		}

		function Window(config) {
			if (!(this instanceof Window)) { return new Window(config); }

			config = config || {}; // If no arguments are passed, assume we are creating a default blank window
			var isArgConfig = (config["app_uuid"] === undefined);

			this._bounds = new BoundingBox();

			if (isArgConfig) {
				for (var prop in defaultConfig) {
					if (defaultConfig.hasOwnProperty(prop)) {
						config[prop] = config[prop] || defaultConfig[prop];
					}
				}
				for (prop in config) {
					if (config.hasOwnProperty(prop) && configMap[prop] !== undefined) {
						config[configMap[prop]] = config[prop];
						delete config[prop];
					}
				}

				this._window = new fin.desktop.Window(config, setupDOM.bind(this), function (err) {
					console.error(err, config);
				});
			} else {
				this._window = config;
				setupDOM.call(this);
			}
		}

		Window.prototype.getPosition = function () {
			return this._bounds.getPosition();
		};

		Window.prototype.getWidth = function () {
			return this._bounds.getWidth();
		};

		Window.prototype.getHeight = function () {
			return this._bounds.getHeight();
		};

		Window.prototype.getSize = function () {
			return this._bounds.getSize();
		};

		Window.prototype.getBounds = function () {
			return this._bounds.clone();
		};




		Window.prototype.close = function (callback) {
			this._window.close(callback);
		};

		Window.prototype.minimize = function (callback) {
			if (!this._ready) { throw "minimize can't be called on an unready window"; }

			this._window.minimize(callback);
		};

		Window.prototype.maximize = function (callback) {
			if (!this._ready) { throw "maximize can't be called on an unready window"; }

			this._window.maximize(callback);
		};

		Window.prototype.show = function (callback) {
			if (!this._ready) { throw "show can't be called on an unready window"; }

			this._window.show(callback);
		};

		Window.prototype.hide = function (callback) {
			if (!this._ready) { throw "hide can't be called on an unready window"; }

			this._window.hide(callback);
		};

		Window.prototype.restore = function (callback) {
			if (!this._ready) { throw "restore can't be called on an unready window"; }

			this._window.restore(callback);
		};

		Window.prototype.bringToFront = function (callback) {
			if (!this._ready) { throw "bringToFront can't be called on an unready window"; }

			this._window.bringToFront(callback);
		};

		Window.prototype.focus = function (callback) {
			if (!this._ready) { throw "focus can't be called on an unready window"; }

			this._window.focus(callback);
		};

		Window.prototype.resizeTo = function (width, height, callback) {
			if (!this._ready) { throw "resizeTo can't be called on an unready window"; }
			var size = new Position(width, height);

			this._window.resizeTo(size.left, size.top, "top-left", callback);
		};

		Window.prototype.moveTo = function (left, top, callback) {
			if (!this._ready) { throw "moveTo can't be called on an unready window"; }
			var pos = new Position(left, top);

			this._window.moveTo(pos.left, pos.top, callback);
		};

		Window.prototype.moveBy = function (deltaLeft, deltaTop, callback) {
			if (!this._ready) { throw "moveBy can't be called on an unready window"; }
			var deltaPos = new Position(deltaLeft, deltaTop);

			this._window.moveBy(deltaPos.left, deltaPos.top, callback);
		};

		Window.prototype.setBounds = function (left, top, right, bottom, callback) {
			if (!this._ready) { throw "resizeTo can't be called on an unready window"; }
			var bounds = new BoundingBox(left, top, right, bottom);

			this._window.setBounds(bounds.left, bounds.top, bounds.right, bounds.bottom, callback);
		};

		return Window;
	});
}