const assert = require("assert"),
  path = require("path"),
  _ = require('underscore'),
  fs = require("fs"),
  async = require('async');

  suite('Database', function() {
  var db, ApiResponseEvent;
  setup(function() {
     db = require('../Data/Database.js');
     db.connect();
     ApiResponseEvent = require('../Data/ApiResponseEvent.js')(db);
  });


  suite('Integration Tests', function() {
  	test('Should be able to connect', function(done) {
  		var connection = db.connect();
  		if (connection.readyState == 1/*connected*/) {
  			done();
        return;
  		}
      connection.on('open', done);
  	}),
	test('ApiResponseEvent should persist',
      function(done) {
      	var testEvent = new ApiResponseEvent();
      	testEvent.save(function(error) {
          if (error) assert.fail(null, null, "should be no error on saving");
          done();
      	})
        ApiResponseEvent.findById(testEvent._id).remove();
      }),
  test('ApiResponseEvent begin should set suiteName testName and startTime',
    function(done) {
      var testEvent = new ApiResponseEvent();
      testEvent.begin('testSuite', 'testName');
      assert.ok(testEvent.suiteName === 'testSuite',
        "suiteName should be set");
      assert.ok(testEvent.testName === 'testName',
        "testName should be set");
      assert.ok(testEvent.startTime > 0,
        "startTime should be set");
      done();
    }),
  test('ApiResponseEvent end should set rest of properties and save',
    function(done) {
      var testEvent = new ApiResponseEvent();
      testEvent.begin('testSuite', 'testName');
      setTimeout(function(){
        testEvent.end(null, '{}');
        assert.ok(testEvent.response && testEvent.startTime && testEvent.duration, 
          "end should have set response, startTime, and duration");
          setTimeout(function(){
            ApiResponseEvent.findById(testEvent._id,
              function(err, ev) {
                if (err) assert.fail(null, null, "should have been no error finding event");
                done();
              })
          },10)
      },10)
    })
  })

})

