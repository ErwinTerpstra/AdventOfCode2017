var fs = require('fs');
var sscanf = require('scanf').sscanf;

var input = fs.readFileSync('day13_input.txt', 'utf8').trim();

var scanners = { };
var highestDepth = 0;

input.split('\n').forEach(function(line)
{
	var chunks = sscanf(line, '%d: %d');
	var scanner = 
	{
		depth: chunks[0],
		range: chunks[1],
		cycle: 0
	};

	highestDepth = Math.max(highestDepth, scanner.depth);

	scanners[chunks[0]] = scanner;
});


function getScannerPosition(scanner)
{
	if (scanner.cycle < scanner.range)
		return scanner.cycle;
	else
		return scanner.range - 1 - (scanner.cycle - scanner.range);
}

function updateScanners()
{
	for (var depth in scanners)
	{
		var scanner = scanners[depth];

		var fullRange = scanner.range * 2 - 2;
		scanner.cycle = (scanner.cycle + 1) % fullRange;
	}
}

var severity = 0;

for (var depth = 0; depth <= highestDepth; ++depth)
{
	var scanner = scanners[depth.toString()] || null;

	if (scanner != null)
	{
		var scannerPosition = getScannerPosition(scanner);
		if (scannerPosition == 0)
			severity += scanner.depth * scanner.range;
	}

	updateScanners();
}

console.log(severity);