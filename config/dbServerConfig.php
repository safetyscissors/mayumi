<?php
	if(isset($DB)) return $DB;

	//CHANGE ME. template for git.
	$DB = new mysqli("host","user","password","database");
	
	if($DB->connect_errono){
		printf("Connection failed: %s\n", $DB->connect_error);
		exit();
	}

	return $DB;
?>