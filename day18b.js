var fs = require('fs');
var CPU = require('./cpu');

var input = fs.readFileSync('day18_input.txt', 'utf8').trim();
var instructions = input.split('\n');

var messageCounter = [ 0, 0 ];

function send0To1(value)
{
	cpu1.addValue(value);
	++messageCounter[0];
}

function send1To0(value)
{
	cpu0.addValue(value);
	++messageCounter[1];
}

var cpu0 = new CPU(0, instructions, send0To1);
var cpu1 = new CPU(1, instructions, send1To0);


while (!((cpu0.isTerminated() || cpu0.isBlocked()) && (cpu1.isTerminated() || cpu1.isBlocked())))
{
	if (!cpu0.isBlocked() && !cpu0.isTerminated())
		cpu0.step();

	if (!cpu1.isBlocked() && !cpu1.isTerminated())
		cpu1.step();
}

console.log(messageCounter);