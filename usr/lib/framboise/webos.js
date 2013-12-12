/**
 * Framboise - An application to manage your Raspberry Pi.
 * @version 1.0alpha1
 * @author $imon (Simon Ser)
 */

//Load dependencies
var dependencies = [
	'/usr/lib/gpio/webos.js'
];

Webos.require(dependencies, function() {
	if (window.Framboise) { //If library is already loaded
		return;
	}

	var Framboise = function() {
		Webos.Observable.call(this);

		this.bind('translationsloaded', function() {
			var that = this, t = this._translations;

			//Define the main window
			this._window = $.w.window.main({
				title: 'Framboise - ' + t.get('Raspberry Pi manager'),
				icon: 'applications/framboise',
				resizable: false,
				width: 400,
				dialog: true
			});

			this._controls = {};

			var $pins = $.w.container();
			var pins = Gpio.getHackablePins();

			for (var i = 0; i < pins.length; i++) {
				(function(pin) {
					var $switchButton = $.w.switchButton('Pin #'+pin.id());

					$switchButton.bind('switchbuttonchange', function(e, data) {
						pin.set('mode', 'out');
						pin.set('outputValue', data.value);

						that._window.window('loading', true, {
							message: t.get('Configuring gpio pin #'+pin.id())
						});
						pin.sync([function() {
							that._window.window('loading', false);
						}, function(response) {
							that._window.window('loading', false);
							$switchButton.switchButton('value', pin.get('outputValue'));
							response.triggerError(t.get('Unable to configure gpio pin #'+pin.id()));
						}]);
					});

					$switchButton.appendTo($pins);
				})(pins[i]);
			}

			$pins.appendTo(this._window.window('content'));

			this._window.window('open');
		});

		Webos.TranslatedLibrary.call(this);
	};

	Framboise.prototype = {
		_translationsName: 'framboise'
	};

	Webos.inherit(Framboise, Webos.Observable);
	Webos.inherit(Framboise, Webos.TranslatedLibrary);

	//Export api
	window.Framboise = Framboise;
});