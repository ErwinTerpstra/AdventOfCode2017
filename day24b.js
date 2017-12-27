var fs = require('fs');

var input = fs.readFileSync('day24_input.txt', 'utf8').trim();

var parts = input.split('\n').map(function(line)
{
	var chunks = line.split('/');
	return { a: parseInt(chunks[0]), b: parseInt(chunks[1]) };
});


var Bridge = function(previous)
{
	if (previous)
	{
		this.lastPort = previous.lastPort;

		this.parts = previous.parts.slice(),
		this.partsLeft = previous.partsLeft.slice();
	}
	else
	{
		this.lastPort = 0;

		this.parts = [ ];
		this.partsLeft = parts.slice();
	}

	this.strength = 0;
};

Bridge.prototype.usePart = function(part, side)
{
	var partIdx = this.partsLeft.indexOf(part);
	this.partsLeft.splice(partIdx, 1);
	this.parts.push(part);

	this.strength = this.calculateStrength();
};

Bridge.prototype.calculateStrength = function()
{
	var strength = 0;
	this.parts.forEach(function(part)
	{
		strength += part.a + part.b;
	});

	return strength;
};


function buildBestBridge(currentBridge)
{
	var bridges = [ ];

	currentBridge.partsLeft.forEach(function(part)
	{
		var aCompatible = part.a == currentBridge.lastPort;
		var bCompatible = part.b == currentBridge.lastPort;

		if (aCompatible || bCompatible)
		{
			var newBridge = new Bridge(currentBridge);
			newBridge.usePart(part);

			if (aCompatible)
				newBridge.lastPort = part.b;
			else
				newBridge.lastPort = part.a;

			bridges.push(buildBestBridge(newBridge));
		}		
	});

	if (bridges.length == 0)
		return currentBridge;

	var bestBridge = null;
	bridges.forEach(function(bridge)
	{
		if (bestBridge != null)
		{
			if (bridge.parts.length > bestBridge.parts.length)
				bestBridge = bridge;
			else if (bridge.parts.length == bestBridge.parts.length && bridge.strength > bestBridge.strength)
				bestBridge = bridge;
		}
		else
			bestBridge = bridge;
	});

	return bestBridge;
}

var start = new Bridge();
var result = buildBestBridge(start);

console.log(result.parts, result.strength);