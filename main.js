var serverUtil = require('./client/services/serverUtilities');
var async = require('async');

var inputSentance = 'the dog is brown';
var outputSentance = [];
async.eachSeries(inputSentance.split(' '), 
	function(item, eachCallback){
		serverUtil.send('GET', item, function(error, response, body){
			outputSentance.push(body);
			return eachCallback();
		})
	},
	function(error){
		console.log(outputSentance);
	});

/*
serverUtil.send('GET', 'test', function(error, response, body){
	console.log(error, body);
})
*/