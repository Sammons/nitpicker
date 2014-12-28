const 
	Runner = require('./src/Runner.js'),
	Filter = require('./src/Filter.js');

Runner.run({}, function(ev) {
	console.log(
		ev
		)
});
console.log('runner started');