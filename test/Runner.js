const assert = require("assert"),
  path = require("path"),
  fs = require("fs");

suite('Runner',function() {
  var Runner = null;

  setup(function() {
    Runner = require(
      path.join(__dirname, '../Runner/Runner.js'));
  });

  suite('Unit Tests', function() {
    test('Should have valid SuiteDirectory',
     function(done) {
      var stats = fs.statSync(Runner.config.SuiteDirectory);
      assert.ok(stats.isDirectory(),
        "suitedirectory should be a directory");
      done()
    }),
    test('getSuites should return an array',
      function(done) {
        assert.ok(
          Runner.getSuites(
            Runner.config.SuiteDirectory) instanceof Array,
          "getSuites should return an array");
        done();
      })
    
  });

  teardown(function() {

  });
})

