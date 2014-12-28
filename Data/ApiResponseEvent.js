var mongoose = require('mongoose');

module.exports = function(database) {

	if (!database.ApiResponseEvent) {
		initializeSchema(database);
	}

	return database.ApiResponseEvent;
}

function initializeSchema(database) {
	var Schema = mongoose.Schema;

	var ApiResponseEventSchema = new Schema({ 
		"suiteName" : String,
		"testName" : String,
		"startTime" : Number,
		"endTime" : Number,
		"duration" : Number,
		"response" : Schema.Types.Mixed,
		"error" : Schema.Types.Mixed
	});

	ApiResponseEventSchema.method('begin', function(suiteName, testName) {
		var event = this;
		this.suiteName = suiteName;
		this.testName = testName;
		this.startTime = Date.now();
	})

	ApiResponseEventSchema.method('end', function(error, response, cb) {
		this.error = error;
		this.response = response;
		this.endTime = Date.now();
		this.duration = this.endTime - this.startTime;
		this.markModified('error');
		this.markModified('response');
		this.save(cb);
	})

	database.ApiResponseEvent = mongoose.model('ApiResponseEvent', ApiResponseEventSchema);
}