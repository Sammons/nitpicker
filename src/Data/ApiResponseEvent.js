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
		"should" : String,
		"startTime" : Number,
		"endTime" : Number,
		"duration" : Number,
		"response" : {},
		"error" : String
	});

	ApiResponseEventSchema.method('begin', function(suiteName, testName, testShould) {
		var ev = this;
		ev.suiteName = suiteName;
		ev.testName = testName;
		ev.should = testShould;
		ev.startTime = Date.now();
	})

	ApiResponseEventSchema.method('end', function(error, response, cb) {
		var ev = this;
		if (error)
			{ev.error = error.toString();}
		ev.response = response;
		ev.endTime = Date.now();
		ev.duration = ev.endTime - ev.startTime;
		ev.markModified('response');
		ev.save(cb);
	})

	database.ApiResponseEvent = mongoose.model('ApiResponseEvent', ApiResponseEventSchema);
}