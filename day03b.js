var input = 289326;

function getLevel(offset)
{
	var level = 0;
	var max = 1;

	while (max < offset)
	{
		++level;
		max += getAmount(level);
	}

	return level;
}

function getSize(level)
{
	return 2 * level + 1;
}

function getAmount(level)
{
	var size = getSize(level);
	return 2 * size + 2 * (size - 2);
}

function getMinimum(level)
{
	var min = 1;

	for (var currentLevel = 1; currentLevel < level; ++currentLevel)
		min += getAmount(currentLevel);

	return min + 1;
}

function indexToPosition(index)
{
	var level = getLevel(index);
	var min = getMinimum(level);
	var size = getSize(level);

	var previousCorner = min - 1;

	var nextCorner;
	var center;
	var quadrant = 0;

	do
	{
		nextCorner = previousCorner + size - 1;
		center = (nextCorner + previousCorner) / 2;

		previousCorner = nextCorner;
		++quadrant;
	} while (index > nextCorner);

	var offset = index - center;

	switch (quadrant)
	{
		case 1:
			return { x: level, y: offset };

		case 2:
			return { x: -offset, y: level };

		case 3:
			return { x: -level, y: -offset };

		case 4:
			return { x: offset, y: -level };
	}
}

function positionToIndex(position)
{
	var level = Math.max(Math.abs(position.x), Math.abs(position.y));
	var size = getSize(level);
	var min = getMinimum(level);

	var quadrant;
	var offset;

	if (position.y == -level)
	{
		quadrant = 4;
		offset = position.x;
	}
	else if (position.y == level)
	{
		quadrant = 2;
		offset = -position.x;
	}
	else if (position.x == -level)
	{
		quadrant = 3;
		offset = -position.y
	}
	else
	{
		quadrant = 1;
		offset = position.y;
	}

	var previousCorner = (min - 1) + ((quadrant - 1) * (size - 1));
	var nextCorner = previousCorner + (size - 1);
	var center = (nextCorner + previousCorner) / 2;

	console.log(level, quadrant, center, offset);

	return center + offset; 
}

var values = [ 1 ];
var neighbours = 
[
	{ x: -1, y:  0 },
	{ x:  1, y:  0 },
	{ x:  0, y: -1 },
	{ x:  0, y:  1 },

	{ x: -1, y:  -1 },
	{ x:  1, y:  -1 },
	{ x: -1, y:   1 },
	{ x:  1, y:   1 },
]

var value;

do
{
	var position = indexToPosition(values.length + 1);

	value = 0;

	for (var neighbourIdx = 0; neighbourIdx < neighbours.length; ++neighbourIdx)
	{
		var neighbour = neighbours[neighbourIdx];
		var neighbourPosition = { x: position.x + neighbour.x, y: position.y + neighbour.y };
		var neighbourIndex = positionToIndex(neighbourPosition) - 1;

		console.log('Neighbour ' + JSON.stringify(neighbourPosition));
		console.log('\tindex: ' + (neighbourIndex + 1));

		if (neighbourIndex < values.length)
		{
			console.log('\tvalue: ' + values[neighbourIndex]);
			value += values[neighbourIndex];
		}
	}

	console.log('Index ' + (values.length + 1) + ' is at x: ' + position.x + '; y: ' + position.y);
	console.log('Value written: ' + value);

	values.push(value);
} while (value <= input);// && values.length < 10);