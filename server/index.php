<?php
	$router = require('../library/router.php');
	$dbService = require('./services/dbService.php');
	$dictionary = require('./services/dictionary.php');

	function mainTest($res){
		$res->data='maintest';
		var_dump(grab_xml_definition('test'));
	}
	function thingTest($res){
		$res->data='thingTest';
	}
	function dictionaryThing($res){
		var_dump(grab_xml_definition($_GET['word']));
	}

	$router->get('thing', 'thingTest');
	$router->get('test', 'mainTest');
	$router->get('word', 'dictionaryThing');
	$router->route();


	//$resul=$dbService->query("INSERT INTO words (word, frequency) VALUES('test',2)", array());
	//$resul2=$dbService->query("SELECT * FROM words", array());
	//echo($resul2);

	//cleaning up
	$dbService->close();
?>