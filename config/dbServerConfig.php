<?php
	if(isset($db)) return $db;

	//CHANGE ME. template for git.
	$db = new mysqli("127.0.0.1","gitfun","Iamai#13","mayumi_dev");
	return $db;
?>