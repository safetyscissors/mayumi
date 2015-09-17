var serverUtil = require('./client/services/serverUtilities');

serverUtil.send('GET', 'test', function(error, response, body){
	console.log(error, body);
})