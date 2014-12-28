var mongoose = require('mongoose');

function connect() {
	const dbpath = 'mongodb://localhost/nitpicker';
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

