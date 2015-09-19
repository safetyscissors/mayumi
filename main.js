var serverUtil = require('./client/services/serverUtilities');
var fs = require('fs');

serverUtil.send('GET', 'test', function(error, response, body){
	console.log(error, body);
})

fs.readFile('./testFile', 'utf8', function (error, data) {
  if(error){
    return error
  }
  console.log(data);
});


function printOutput(partArray) {

	var out = JSON.stringify(partArray);
	return out;
}


var testNew = {
	test:"The Dog",
	part_speech: "subject"
};

var testNew2 = {
	test:"ate",
	part_speech: "verb"
};

var outStuff = printOutput([testNew, testNew2]);
console.log(outStuff);
