var knotHash = require('./knot_hash');
var padLeft = require('pad-left');

var grid = [ ];

var width = 128;
var height = 128;

function positionToOffset(position)
{
	return position.y * width + position.x;
}

function offsetToPosition(offset)
{
	return { x: offset % width, y: Math.floor(offset / width) };
}

var input = 'nbysizxe';

for (var row = 0; row < height; ++row)
{
	var rowInput = input + '-' + row;
	var hash = knotHash(rowInput);

	for (var byte = 0; byte < 16; ++byte)
	{
		var binary = padLeft(hash[byte].toString(2), 8, '0');
		
		for (var bit = 0; bit < 8; ++bit)
			grid.push(binary.charAt(bit) == '1');
	}
}

var openList = [ ];

for (var idx = 0; idx < grid.length; ++idx)
{
	if (grid[idx])
		openList.push(idx);
}

var neighbours = 
[
	{ x:  1, y:  0 },
	{ x: -1, y:  0 },
	{ x:  0, y: -1 },
	{ x:  0, y:  1 },
];

var regions = 0;

while (openList.length > 0)
{
	var regionOpenList = [ openList.pop() ];

	while (regionOpenList.length > 0)
	{
		var offset = regionOpenList.pop();
		var position = offsetToPosition(offset);

		for (var neighbourIdx = 0; neighbourIdx < neighbours.length; ++neighbourIdx)
		{
			var neighbourPosition = 
			{
				x: position.x + neighbours[neighbourIdx].x, 
				y: position.y + neighbours[neighbourIdx].y 
			};

			if (neighbourPosition.x < 0 || neighbourPosition.y < 0 || neighbourPosition.x >= width || neighbourPosition.y >= height)
				continue;

			var neighbourOffset = positionToOffset(neighbourPosition);

			if (!grid[neighbourOffset])
				continue;

			var openListIdx = openList.indexOf(neighbourOffset);
			if (openListIdx == -1)
				continue;

			openList.splice(openListIdx, 1);
			regionOpenList.push(neighbourOffset);
		}

	}

	++regions;
}

console.log(regions);