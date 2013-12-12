(function() {
	if (window.Gpio) { //If library is already loaded
		return;
	}

	var Gpio = {
		_pins: [0, 1, 4, 7, 8, 9, 10, 11, 14, 15, 17, 18, 21, 22, 23, 24, 25],
		_hackablePins: [4, 17, 18, 21, 22, 23,24, 25],
		_modes: ['in', 'out'],
		_outputs: [0, 1],
		_cachedPins: {}
	};
	Webos.Observable.build(Gpio);

	Gpio.getPin = function(id) {
		id = parseInt(id);

		if (isNaN(id)) {
			return false;
		}

		if (!Gpio._cachedPins[id]) {
			Gpio._cachedPins[id] = new Gpio.Pin({}, id);
		}

		return Gpio._cachedPins[id];
	};

	Gpio.getHackablePins = function() {
		var pins = [];

		for (var i = 0; i < Gpio._hackablePins.length; i++) {
			pins.push(Gpio.getPin(Gpio._hackablePins[i]));
		}

		return pins;
	};


	Gpio.Pin = function(data, id) {
		data = jQuery.extend({
			mode: null,
			outputValue: 0
		}, data);

		this._id = id;

		Webos.Model.call(this, data);
	};
	Gpio.Pin.prototype = {
		id: function() {
			return this._id;
		},
		setMode: function(mode) {
			mode = String(mode);

			if (jQuery.inArray(mode, Gpio._modes) == -1) {
				return false;
			}

			this._set('mode', mode);
		},
		setOutputValue: function(value) {
			value = (value) ? 1 : 0;

			this._set('outputValue', value);
		},
		unexport: function() {
			this._set('mode', null);
		},
		sync: function(callback) {
			callback = Webos.Callback.toCallback(callback);
			
			var that = this;
			
			var data = {};
			var nbrChanges = 0;
			for (var key in this._unsynced) {
				if (this._unsynced[key].state === 1) {
					this._unsynced[key].state = 2;
					data[key] = this._unsynced[key].value;
					nbrChanges++;
				}
			}
			
			if (nbrChanges === 0) {
				callback.success(this);
				return;
			}
			
			return new Webos.ServerCall({
				'class': 'GpioController',
				method: 'setupPin',
				arguments: {
					pin: this.id(),
					data: data
				}
			}).load([function() {
				for (var key in that._unsynced) {
					if (that._unsynced[key].state === 2) {
						that._data[key] = that._unsynced[key].value;
						delete that._unsynced[key];
						that.notify('update', { key: key, value: that._data[key].value });
					}
				}
				callback.success(that);
			}, callback.error]);
		}
	};

	Webos.inherit(Gpio.Pin, Webos.Model);

	//Export API
	window.Gpio = Gpio;
})();