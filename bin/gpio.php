#!/usr/bin/env php
<?php
require('lib/dao/Gpio.class.php');

use \lib\dao\Gpio;

// Am i using php-cli?
if ('cli' != PHP_SAPI) {
    exit('This script must be run using php-cli');
}

// Am I a sudoer or the root user?
if ('root' !== $_SERVER['USER'] || empty($_SERVER['SUDO_USER'])) {
    exit('Please run this script as root');
}

$gpio = new Gpio();

$action = $argv[1];
if (isset($argv[2])) {
	$pin = (int) $argv[2];

	if(!in_array($pin, $gpio->getHackablePins())){
		exit($pin . ' is not a hackable gpio pin number');
	}
}

switch ($action) {
	case 'mode':
		if (!isset($argv[3])) {
			exit('No gpio pin mode specified');
		}

		$mode = $argv[3];

		if (!isset($pin)) {
			exit('No gpio pin number specified');
		}

		$gpio->setup($pin, $mode);
		break;
	case 'write':
		if (!isset($argv[3])) {
			exit('No gpio pin value specified');
		}

		$value = (int) $argv[3];

		if (!isset($pin)) {
			exit('No gpio pin number specified');
		}

		if (!$gpio->isExported($pin) || $gpio->currentDirection($pin) != 'out') {
			$gpio->setup($pin, 'out');
		}

		$gpio->output($pin, $value);
		break;
	case 'unexport':
		if (!isset($pin)) {
			exit('No gpio pin number specified');
		}

		$gpio->unexport($pin);
		break;
	case 'unexportall':
		$gpio->unexportAll();
		break;
}
