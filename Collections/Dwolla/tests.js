// Dwolla API specific modules:
var keys = require('./keys.js');
var dwolla = require('dwolla-node')(keys.appKey, keys.appSecret);

module.exports.suite = {
	name : 'Dwolla Sandbox',
	tests: {
		"Balance" : {
			should: 'Balance check',
			test : 
				function(done) {
					dwolla.setToken(keys.accessToken);
		      		dwolla.balance(done);
				}
		},
		"Send Money" : {
			should: 'Send 1 cent to a merchant account',
			test :
				function(done) {
					dwolla.setToken(keys.accessToken);
		      		dwolla.send(keys.pin, keys.merchantDwollaID, '0.01', done);
				}
		},
		"Basic Account Info" : {
			should: 'Get basic account information on gordon',
			test :
				function(done) {
					dwolla.setToken(keys.accessToken);
			    	dwolla.basicAccountInfo('gordon@dwolla.com', done);
				}
		},
		"Full Account Info" : {
			should: 'Get all account information available for this access token',
			test: 
				function(done) {
					dwolla.setToken(keys.accessToken);
		      		dwolla.fullAccountInfo(done);
				}
		}
	}
};