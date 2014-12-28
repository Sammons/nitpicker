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
		"response" : {},
		"error" : String
	});

	ApiResponseEventSchema.method('begin', function(suiteName, testName, testShould) {
		var event = this;
		this.suiteName = suiteName;
		this.testName = testName;
		this.testShould = testShould;
		this.startTime = Date.now();
	})

	ApiResponseEventSchema.method('end', function(error, response, cb) {
		this.error = error.toString();
		this.response = response;
		this.endTime = Date.now();
		this.duration = this.endTime - this.startTime;
		this.markModified('response');
		this.save(cb);
	})

	database.ApiResponseEvent = mongoose.model('ApiResponseEvent', ApiResponseEventSchema);
}