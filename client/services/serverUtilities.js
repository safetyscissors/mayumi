var request = require('request');
var async = require('async');
var xmlParser = require('xmljson').to_json;

console.log('loading server utilities');

//TODO require some configs
serverUrl = 'http://theninthbit.us/mayumi/server/';


/*
	Sends most requests
	param method			GET, POST, PUT, DELETE
	param uri					serverUrl + '/' + uri
	param callback 		function(error, response, body)
*/
exports.send = function(method, uri, callback){
	request({
		method:method,
		uri:serverUrl + uri
	}, callback);
}


exports.sendSentance = function(inputSentance, callback){
	var outputSentance = [];
	async.eachSeries(inputSentance.split(' '), 
		function(item, eachCallback){
			console.log('reading:'+item);
			exports.send('GET', 'word?word=' + item, function(error, response, body){
				console.log(body);
				
				xmlParser(body, function(xmlError, jsonData){
					//console.log(xmlError);
					outputSentance.push(JSON.stringify(jsonData)); 
					return eachCallback();
				});
			});
		},
		function(error){
			//console.log(outputSentance);
			callback(error, outputSentance);
		});
};