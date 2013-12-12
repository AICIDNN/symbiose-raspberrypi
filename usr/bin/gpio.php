<?php
$executablePath = './bin/gpio.php';

if (!$this->arguments->isParam(0) || !$this->arguments->isParam(1)) {
	throw new InvalidArgumentException('Usage : gpio write pin value');
}

$action = $this->arguments->getParam(0);

$this->webos->getAuthorization()->control('gpio.' . (($action == 'read') ? 'read' : 'write'));

$cmd = 'sudo -n '.$executablePath.' '.escapeshellarg($action);

$params = $this->arguments->getParams();
for ($i = 1; $i < count($params); $i++) {
	$cmd .= ' '.escapeshellarg($params[$i]);
}

$cmd .= ' 2>&1';

echo exec($cmd);