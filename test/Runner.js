const assert = require("assert"),
  path = require("path"),
  _ = require('underscore'),
  fs = require("fs"),
  async = require('async');

function assertAllElementsAre(array, type, msg) {
  var allElementsMatch = true;
  _.each(array, function(el) {
    allElementsMatch |= el instanceof type;
  })
  assert.ok(allElementsMatch, msg);
}

suite('Runner',function() {
  var Runner,MockCollection,MockTestFile;

  setup(function() {
      Runner = require(path.join(__dirname, '../src/Runner.js')),
      MockCollection = path.join(__dirname, "./Mocks/MockCollection"),
      MockTestFile = path.join(__dirname, './Mocks/MockTestFile.js');
  });

  suite('Unit Tests', function() {
    test('Config: Should have valid CollectionDir',
     function(done) {
      var stats = fs.statSync(Runner.config.CollectionDir);
      assert.ok(stats.isDirectory(),
        "CollectionDir should be a directory");

      done();
    }),
    test('getDirectories: Should return an array of directory names',
      function(done) {
        const suites = 
          Runner.getDirectories(Runner.config.CollectionDir);

        assert.ok(
          suites instanceof Array,
          "getDirectories should return an array of directory names");

        assertAllElementsAre(suites, String,
          "every directory name should be a string");

        done();
      }),
    test('getTestFiles: should return an array of filename strings with "test" in them',
      function(done) {
        const filenames = 
          Runner.getTestFiles(MockCollection);

        assert.ok(
          filenames instanceof Array,
          "getTestFiles should return an array");

        assertAllElementsAre(filenames, String, 
          "every filename should be a string");

        _.each(filenames, function(el) {
          assert.ok(fs.statSync(el).isFile(),
            "filename should be valid");
        })

        _.each(filenames, function(el) {
          assert.ok(el.match(/test/), 
            "getTestFiles should only return files with 'test' in the name")
        });

        done();
      }),
    test('getTestSuite: should return a testsuite object', 
      function(done) {
        const
          expectedKeys = [
            "name",
            "tests"
          ],
          testSuite = Runner.getTestSuite(MockTestFile),
          testSuiteKeys = Object.keys(testSuite);

        assert.ok(expectedKeys.length == testSuiteKeys.length,
          "testSuite has unexpected properties");

        _.each(expectedKeys, function(key) {
          assert.ok(testSuiteKeys.indexOf(key) >= 0,
            "missing testsuite key:"+key+" in file "+MockTestFile);
        });

        done();
      }),

    test('executeTestSuite: should call the callback after running every test', 
      function(done) {
        var counter = 0;
        function count() {counter++}
        const sampleSuite = {
          name : 'testsuite',
          tests : {
            'test1' : { 'test': function(tdone) { count();setTimeout(tdone, 1)}, 'should' :'test'},
            'test2' : { 'test': function(tdone) { count();setTimeout(tdone, 2)}, 'should' :'test'},
            'test3' : { 'test': function(tdone) { count();setTimeout(tdone, 3)}, 'should' :'test'},
            'test4' : { 'test': function(tdone) { count();setTimeout(tdone, 5)}, 'should' :'test'},
            'test5' : { 'test': function(tdone) { count();setTimeout(tdone, 7)}, 'should' :'test'}
          }
        }

        Runner.executeTestSuite(sampleSuite, 
          function() {
            assert.ok(counter == Object.keys(sampleSuite.tests).length,
              "every test should finish once totalling "+Object.keys(sampleSuite.tests).length
              +", instead of "+counter+" times");
            done();
          });
      }),
    test('run: every completed event should call onEventCompletedCb',
      function(done) {
        Runner.run({ 
          CollectionDir: path.join(__dirname)
        }, function(event) {
          done();
        })
      })
  });

})

