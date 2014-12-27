const 
  path = require('path'),
  _ = require('underscore'),
  async = require('async'),
  fs = require('fs');

var Config = {
  "CollectionDir" : path.join(__dirname, '../Collections')
}


module.exports = function( conf ) {


	for (var i in conf) {Config[i] = conf[i]};

  	/* run everything synchronously */

	/* expose functions to tests */
}
function getDirectories(directory) {
	const allthings = fs.readdirSync(directory);
	const completedpaths = _.map(allthings,function(fileordir) {
		return path.join(directory,fileordir);
	})
	return _.filter(completedpaths, function(fileordir) {
		return fs.statSync(fileordir).isDirectory();
	});
}
function getTestFiles(directory) {
	const allfiles = fs.readdirSync(directory);
	const completedpaths = _.map(allfiles, function(file) {
		return path.join(directory, file);
	})
	return _.filter(completedpaths, function(file) {
		return 
			fs.statSync(file).isFile() &&
			file.match(/test/);
	})
}
function getTestSuite(filename) {
	return require(filename).suite;
}
function executeTest(collectionName, suiteName, test) {

}
function executeTestSuite(testSuite) {}

if (module.parent && 
	module.parent.id.match(/test/)) {
	module.exports.getDirectories = getDirectories;
	module.exports.getTestFiles = getTestFiles;
	module.exports.getTestSuite = getTestSuite;
	module.exports.config = Config;
}
