var request = require('request');
console.log('loading server utilities');

//TODO require some configs
serverUrl = 'http://localhost:8888/mayumi/server/';


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