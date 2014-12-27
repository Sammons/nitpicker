const 
  path = require('path'),
  _ = require('underscore'),
  async = require('async'),
  fs = require('fs');

var Config = {
  "CollectionDir" : path.join(__dirname, '../Collections')
}

var ApiCallEvent = function() {
	this.begin = function(){};
	this.end = function() {};
}

var runSafely = function(functs, callback) {

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

function executeTestSuite(testSuite, callback) {
	const testNames = Object.keys(testSuite.tests);
	var i = -1;
	const doRun = function(next) {
		const curTest = testSuite.tests[testNames[i]];
		var e = new ApiCallEvent(testSuite.name, testNames[i]);
		try {
			e.begin();
			curTest(function(err, result) {
				e.end(err, result);
				next();
			})
		} catch (err) {
			e.end(err, null);
			next();
		}
	}
	const next = function() {
		i++;
		if (i >= testNames.length)
			{callback();}
		else
			{doRun(next);}

	}
	next();
}

if (module.parent && 
	module.parent.id.match(/test/)) {
	module.exports.getDirectories = getDirectories;
	module.exports.getTestFiles = getTestFiles;
	module.exports.getTestSuite = getTestSuite;
	module.exports.executeTestSuite = executeTestSuite;
	module.exports.config = Config;
}
