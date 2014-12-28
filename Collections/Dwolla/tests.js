// Dwolla API specific modules:
var keys = require('./keys.js');
var dwolla = require('dwolla-node')(keys.appKey, keys.appSecret);

module.exports.suite = {
	suiteName : 'Dwolla Sandbox',
	tests: {
		"Balance" : {
			should: 'Request is successful and response is valid',
			test : 
				function(done) {
					dwolla.setToken(keys.accessToken);
		      		dwolla.balance(done);
				}
		},
		"Send Money" : {
			should: 'Request is successful and response is valid',
			test :
				function(done) {
					dwolla.setToken(keys.accessToken);
		      		dwolla.send(keys.pin, keys.merchantDwollaID, '0.01', done);
				}
		},
		"Basic Account Info" : {
			should: 'Request is successful and response is valid',
			test :
				function(done) {
					dwolla.setToken(keys.accessToken);
			    	dwolla.basicAccountInfo('gordon@dwolla.com', done);
				}
		},
		"Full Account Info" : {
			should: 'Request is successful and response is valid',
			test: 
				function(done) {
					dwolla.setToken(keys.accessToken);
		      		dwolla.fullAccountInfo(done);
				}
		}
	}
};