const assert = require("assert"),
  path = require("path"),
  _ = require('underscore'),
  fs = require("fs");

suite('Runner',function() {
  var Runner = null;
  const sampleSuiteThatDoesNothing = {
    'SomeEndpoint' : [
      { 
        'should' : 'have { some response }',
        'execute' : function(done) {
          const error = null,
            response = '{ some response }';

          done( null, response )
        }
      } 
    ]
   };

  setup(function() {
    Runner = require(
      path.join(__dirname, '../Runner/Runner.js'));
  });

  suite('Unit Tests', function() {
    test('Config: Should have valid TestDirectory',
     function(done) {
      var stats = fs.statSync(Runner.config.TestDirectory);
      assert.ok(stats.isDirectory(),
        "TestDirectory should be a directory");
      done()
    }),
    test('getTestCollections: Should return an array of arrays of filenames',
      function(done) {
        const suites = 
          Runner.getTestCollections(Runner.config.TestDirectory);
        assert.ok(
          suites instanceof Array,
          "getTestCollections should return an array");
        _.each(suites,
          function(suiteFiles) {
            assert.ok(
              suiteFiles instanceof Array);
          });
        done();
      }),
    test('readSuiteIntoRunnables: Should return \n'+
      'an array of functions', function(done) {
        const runnables = 
          Runner.readSuiteIntoRunnables(
            sampleSuiteThatDoesNothing);
          
        assert.ok( runnables instanceof Array,
          "readSuiteIntoRunnables should return an Array" );

        _.each(runnables, function(runnable) {
          assert.ok( runnable.execute instanceof Function,
            "runnable should be a function");
        })

      })

  });

  teardown(function() {

  });
})

