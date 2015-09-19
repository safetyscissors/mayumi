<?php

// This function grabs the definition of a word in XML format.
function grab_xml_definition ($word){
	$key = '87163040-4b80-4d49-aac1-5f3e953afc48';
	$ref = 'intermediate';
	$uri = "http://www.dictionaryapi.com/api/v1/references/" . urlencode($ref) . "/xml/" . 
			urlencode($word) . "?key=" . urlencode($key);
  return file_get_contents($uri);
}

?>