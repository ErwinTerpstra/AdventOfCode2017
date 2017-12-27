var fs = require('fs');
var CPU = require('./cpu');

var input = fs.readFileSync('day23_input.txt', 'utf8').trim();
var instructions = input.split('\n');

var cpu = new CPU(0, instructions, function(value){ });

while (!cpu.isTerminated())
{
	cpu.step();
}

console.log(cpu.opcodeCounts.mul);