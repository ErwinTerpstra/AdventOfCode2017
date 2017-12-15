var padLeft = require('pad-left');

var a = 
{
	previous: 783,
	factor: 16807,
	divider: 2147483647,
	criteria: 4,
};

var b = 
{
	previous: 325,
	factor: 48271,
	divider: 2147483647,
	criteria: 8,
};

function updateMachine(machine)
{
	do
	{
		machine.previous = (machine.previous * machine.factor) % machine.divider;
	} while (machine.previous % machine.criteria != 0);
}

function getLower16Bits(machine)
{
	return machine.previous & 0xFFFF;
}

var count = 0;

for (var round = 0; round < 5000000; ++round)
{
	updateMachine(a);
	updateMachine(b);

	var resultA = getLower16Bits(a);
	var resultB = getLower16Bits(b);

	if (resultA == resultB)
		++count;
}

console.log(count);