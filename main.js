var serverUtil = require('./client/services/serverUtilities');
var async = require('async');

var inputSentance = 'the dog is brown';
serverUtil.sendSentance(inputSentance, function(error, outputSentance){
	console.log('error:' + error);
	console.log('data:', outputSentance);



})

/*
serverUtil.send('GET', 'test', function(error, response, body){
	console.log(error, body);
})
*/