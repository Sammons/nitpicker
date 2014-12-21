const 
  path = require('path'),
  _ = require('underscore'),
  fs = require('fs');

var Config = {
  "SuiteDirectory" : path.join(__dirname, '../Suites')
}

function getSuites( suitePath ) {
  const suiteDirs = fs.readdirSync(suitePath)
  return _.map(suiteDirs, function(dir) {
  	return fs.readdirSync(
  		path.join( Config.SuiteDirectory, dir));
  });
}


module.exports = function( conf ) {

  this.suites = getSuites(Config.SuiteDirectory);

  /* run them synchronously */

}
if (module.parent && 
	module.parent.id.match(/test/)) {
  module.exports.config = Config;
  module.exports.getSuites = getSuites;
}