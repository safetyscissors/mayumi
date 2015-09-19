<?php
	if(isset($db)) return $db;
	$db = new mysqli("localhost", "thenint2_mai","Iamai#13","thenint2_mayumi_dev");
	return $db;
?>
