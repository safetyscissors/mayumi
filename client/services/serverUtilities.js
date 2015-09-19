var request = require('request');
var async = require('async');
var xmlParser = require('xmljson').to_json;
var _ = require('underscore');

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


exports.sendSentence = function(inputSentance, callback){
	var outputSentance = [];
	async.eachSeries(inputSentance.split(' '), 
		function(item, eachCallback){
			console.log('reading:'+item);
			exports.send('GET', 'word?word=' + item, function(error, response, body){
				//console.log(body);
				
				xmlParser(body, function(xmlError, jsonData){
					outputSentance.push(jsonData['entry_list']['entry']); 
					return eachCallback();
				});
			});
		},
		function(error){
			outputSentance = exports.cleanSentence(outputSentance);
			callback(error, outputSentance);
		});
};

exports.cleanSentence = function(sentence){
	var newSentence = [];
	for(var i=0;i<sentence.length;i++){
		var dataWord = sentence[i];

		var word = {};
		word.word = dataWord[0]['ew'];
		word.pos = i;
		word.fl = _.filter(_.pluck(dataWord, 'fl'), function(afl){return afl});
		word.cx = _.filter(_.pluck(dataWord, 'cx'), function(acx){return acx});

		newSentence.push(word);
	}
	
	return newSentence;
}