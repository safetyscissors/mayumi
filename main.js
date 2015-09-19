var serverUtil = require('./client/services/serverUtilities');
var async = require('async');

var inputSentance = 'the dog is brown';
serverUtil.sendSentance(inputSentance, function(error, outputSentance){
	console.log('error:' + error);
	console.log(outputSentance);




})
