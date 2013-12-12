<?php
namespace lib\controllers;

use \lib\dao\Gpio;
use \Exception;

/**
 * GpioController permet de gerer les ports GPIO.
 * @author $imon
 * @version 1.0
 */
class GpioController extends \lib\ServerCallComponent {
	protected $executablePath = './bin/gpio.php';

	protected function _exec($args) {
		$errors = exec('sudo -n '.$this->executablePath.' '.$args.' 2>&1 1>/dev/null');

		if (!empty($errors)) {
			throw new Exception($errors);
		}
	}

	protected function output($pin, $value) {
		$pin = (int) $pin;
		$value = ($value) ? 1 : 0;

		$this->_exec('write '.$pin.' '.$value);
	}

	protected function blink($pin, $seconds) {
		$pin = (int) $pin;
		$seconds = (float) $seconds;

		$this->_exec('write '.$pin.' 1');

		usleep($seconds * 1000000);

		$this->_exec('write '.$pin.' 0');
		$this->_exec('unexport '.$pin);
	}

	protected function setupPin($pin, array $data) {
		$pin = (int) $pin;

		foreach($data as $index => $value) {
			switch ($index) {
				case 'mode':
					$this->_exec('mode '.$pin.' '.escapeshellarg($value));
					break;
				case 'outputValue':
					return $this->output($pin, $value);
					break;
			}
		}
	}
}