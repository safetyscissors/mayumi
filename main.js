var serverUtil = require('./client/services/serverUtilities');
var async = require('async');

var inputSentence = 'the dog eats candy';
serverUtil.sendSentence(inputSentence, function(error, outputSentence){
	console.log('error:' + error);
	console.log(JSON.stringify(outputSentence));




})
