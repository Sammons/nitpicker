const 
  path = require('path'),
  _ = require('underscore'),
  async = require('async'),
  fs = require('fs'),
  Database = require('../Data/Database.js'),
  ApiResponseEvent = require('../Data/ApiResponseEvent.js')(Database);

var Config = {
  "CollectionDir" : path.join(__dirname, '../Collections')
}

module.exports = function( conf ) {

	if (conf)
		for (var i in conf) {Config[i] = conf[i]};

  	/* run everything synchronously */
  	const dirs = getDirectories(Config.CollectionDir);
  	_.each(dirs, function(dir) {
  		const testFiles = getTestFiles(dir);
  		_.eachSeries(testFiles, function(file, next) {
  			executeTestSuite(
  				getTestSuite(file),
  				next);
  		});
  	});
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
		var e = new ApiResponseEvent();
		try {
			e.begin(testSuite.name, testNames[i]);
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
