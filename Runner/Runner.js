const 
  path = require('path'),
  _ = require('underscore'),
  async = require('async'),
  fs = require('fs');

var Config = {
  "TestDirectory" : path.join(__dirname, '../Tests')
}

function readTestFilenames( path ) {
	const filenames = fs.readdirSync(path);
	const testFilenames = _.filter(filenames, function(filename){
		return /^test/.test(filename);
	});
	return _.map(testFilenames, function(filename) {
		return path.join(Config.TestDirectory, filename);
	});
}

function getFileAsSuitesOfRunnables( filename ) {
	var testSuites = [];
  	const TestCollection = require(filename);
  	for (var suite in TestCollection.tests) {
  		testSuites.push(
  			createRunnablesFromSuite(
  				suite, TestCollection.tests[suite]))
  	}
  	return testSuites;
}

function createRunnablesFromSuite(suiteName, testsObj) {
	var runnables = [];
	for (var test in testsObj) {
		runnables.push(
			createRunnableFromTest(
				suiteName, test, testsObj[test]));
	}
}

function createRunnableFromTest(suiteName, testName, testObj) {
	return function(done) {
		//var testEvent = 
		testObj.execute(function(error, response) {

		})
	};
}

function getCollection
module.exports = function( conf ) {

  this.TestFilenames = readTestFilenames(Config.TestDirectory);
  this.TestSuites = 
  	_.map(this.TestFilenames, getFileAsSuitesOfRunnables)


  /* run them synchronously */

}
if (module.parent && 
	module.parent.id.match(/test/)) {
  module.exports.config = Config;
  module.exports.getTestCollections = getTestCollections;
  // module.exports.readSuiteIntoRunnables = readSuiteIntoRunnables;
}