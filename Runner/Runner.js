const 
  path = require('path'),
  _ = require('underscore'),
  async = require('async'),
  fs = require('fs');

var Config = {
  "TestDirectory" : path.join(__dirname, '../Tests')
}

function getTestCollections( suitePath ) {
  const suiteDirs = fs.readdirSync(suitePath)
  return _.map(suiteDirs, function(dir) {
  	return fs.readdirSync(
  		path.join( Config.TestDirectory, dir));
  });
}

function saveResult( testResult ) {

}

function makeTestIntoRunnable( name, test ) {
	const runnable = function( done ) {
		var testResult = {};
		try {
			testResult.timeStarted = Date.now();
			test.execute(function(err, response) {
				if (err) testResult.error = err;
				testResult.response = response;
				testResult.delay = Date.now() - testResult.timeStarted;
			})
		} catch(e) {
			testResult.response = null;
			testResult.delay = null;
			testResult.error = e;
		}
		testResult.should = test.should;
		testResult.name = name;

		saveResult(testResult);

		done(testResult);
	}	
}

function getSuiteNames( testsObject ) {
	return Object.keys(testsObject);
}

function getTestNames( suiteObject ) {
	return Object.keys(suiteObject);
}




module.exports = function( conf ) {

  this.suites = getTestCollections(Config.TestDirectory);


  /* run them synchronously */

}
if (module.parent && 
	module.parent.id.match(/test/)) {
  module.exports.config = Config;
  module.exports.getTestCollections = getTestCollections;
  // module.exports.readSuiteIntoRunnables = readSuiteIntoRunnables;
}