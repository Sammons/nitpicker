const assert = require("assert"),
  path = require("path"),
  conf = require('../config.js');

  suite('Filter', function() {
    var Filter;
    setup(function() {
       Filter = require('../src/Filter.js');
    });
    suite('Unit Tests', function() {
    	test('Count: Should return ', function(done) {

    	})
    });
  });

SPA? No

Two Categories (Prod/Sand)

Several Subjects (Balance...Send)

Graph on its side, plot dots per slot, when
mouseover dot get details on response to right.
collect error dots on the left

timescale, until later just plot per half hour

// one graph
GET /:Collection/:Suite/:Test/events?start=X&end=Y&sliceSize=30

// collected, color coded?
GET /:Collection/:Suite/all

page components:

Nitpicker - Collection (Dwolla)
Suite1 Suite2 Suite3 (indicate selected) 
  GET /:Collection/:Suite
all Test1 Test2 Test3 (indicate selected)
  GET /:Collection/:Suite/:Test/list
graph
                                ms
            | errors | 0  50 100 150 200 250 300 350 

NOW

2:30 PM
2:15 PM
...
scroll down
to get more



