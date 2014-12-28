var mongoose = require('mongoose'),
conf = require('../config.js');

function connect(connectionstring) {
	const dbpath = connectionstring || conf.database;
	if (!mongoose.connection) {
		mongoose.connection = 
			mongoose.createConnection(dbpath);
			return mongoose.connection;
	}
	if (mongoose.connection.readyState == 0/*disconnected*/) {
		mongoose.connection.open(dbpath)
	}
	return mongoose.connection;
}

if (module.parent && 
	module.parent.id.match(/test/)) {
	module.exports.connect = connect;
}
else {
	connect();
}

