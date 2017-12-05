var fs = require('fs');
var input = fs.readFileSync('day5_input.txt', 'utf8');

var instructions = input.trim().split('\n').map(function(line) { return parseInt(line); });


var index = 0;
var steps = 0;

while (index < instructions.length)
{
	var offset = instructions[index];

	if (offset >= 3)
		--instructions[index];
	else
		++instructions[index];

	index += offset;

	++steps;
}

console.log(steps);