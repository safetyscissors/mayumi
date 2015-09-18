<?php
	$router = require('../library/router.php');
	$db = require('../config/dbServerConfig.php');

	function mainTest($res){
		$res->data='maintest';
	}
	function thingTest($res){
		$res->data='thingTest';
	}

	$router->get('thing', thingTest);
	$router->get('test', mainTest);
	$router->route();
?>