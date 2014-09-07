var tests = require('./tests/tests.js');
var config = require('./config.js');
var _ = require('underscore');
var db = require('./database');

var startWorker = function(queue) {
  _.each(tests, function(service, serviceName) {
    _.each(service, function(test, name) {

      setInterval(function() {
        runTest(test, name, service, serviceName, queue);
      }, config.testInterval);

    });
  });
};

// TODO: run an entire Service every interval secs, which consists of a async.

function runTest(test, name, service, serviceName, queue) {
  var beginTime = Date.now();
  console.log(beginTime, 'running test:', name);

  test.execute(function(err, response) {
    var endTime = Date.now();
    var responseTime = (endTime - beginTime); // should be in ms

    // save err, response in new TestResult object.
    console.log(err);
    console.log(response);

    var testResult = new db.TestResult({
      testId: name,
      serviceName: serviceName, //production or sandbox
      error: err,
      timeStart: Date(beginTime),
      timeEnd: Date(endTime),
      responseTime: responseTime,
      response: {
        code: null,
        body: response,
        headers: null
      }
    });
    // TODO: tack on the document ID when you pass to queue.
    testResult.save();

    console.log(testResult)

    queue.push(testResult);

  });
}

module.exports = {
  startWorker: startWorker
};