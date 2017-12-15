var padLeft = require('pad-left');

var a = 
{
	previous: 783,
	factor: 16807,
	divider: 2147483647
};

var b = 
{
	previous: 325,
	factor: 48271,
	divider: 2147483647
};

function updateMachine(machine)
{
	machine.previous = (machine.previous * machine.factor) % machine.divider;
}

function getLower16Bits(machine)
{
	return machine.previous & 0xFFFF;
}

var count = 0;

for (var round = 0; round < 40000000; ++round)
{
	updateMachine(a);
	updateMachine(b);

	var resultA = getLower16Bits(a);
	var resultB = getLower16Bits(b);

	if (resultA == resultB)
		++count;
}

console.log(count);