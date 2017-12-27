var fs = require('fs');
var sscanf = require('scanf').sscanf;

var input = fs.readFileSync('day21_input.txt', 'utf8').trim().split('\n');

var parsePattern = function(input)
{
	var rows = input.trim().split('/');
	var pattern = [ ];

	rows.forEach(function(row)
	{
		row.split('').forEach(function(character)
		{
			pattern.push(character == '#' ? 1 : 0);
		});
	});

	return pattern;
}

var rotatePattern = function(pattern, size)
{
	var result = new Array(size * size);
	var halfSize = (size - 1) / 2;

	for (var y = 0; y < size; ++y)
	{
		for (var x = 0; x < size; ++x)
		{
			var dx = x - halfSize;
			var dy = y - halfSize;

			var rx = -dy;
			var ry = dx;

			var dx = rx + halfSize;
			var dy = ry + halfSize;

			result[dy * size + dx] = pattern[y * size + x];
		}
	}

	return result;
};

var flipPatternHorizontal = function(pattern, size)
{
	var result = new Array(size * size);

	for (var y = 0; y < size; ++y)
	{
		for (var x = 0; x < size; ++x)
		{
			var dx = size - 1 - x;
			result[y * size + dx] = pattern[y * size + x];
		}
	}

	return result;
};

var flipPatternVertical = function(pattern, size)
{
	var result = new Array(size * size);

	for (var y = 0; y < size; ++y)
	{
		for (var x = 0; x < size; ++x)
		{
			var dy = size - 1 - y;
			result[dy * size + x] = pattern[y * size + x];
		}
	}

	return result;
};

var rules = input.map(function(line)
{
	var chunks = line.split('=>');

	var originalPattern = parsePattern(chunks[0]);

	var rule = 
	{
		from: [ ],
		to: parsePattern(chunks[1]),
		size: Math.sqrt(originalPattern.length),
	};

	var rotatedPattern = originalPattern;
	for (var i = 0; i < 4; ++i)
	{
		rule.from.push(rotatedPattern);
		rotatedPattern = rotatePattern(rotatedPattern, rule.size);
	}

	var rotatedPattern = flipPatternHorizontal(originalPattern, rule.size);
	for (var i = 0; i < 4; ++i)
	{
		rule.from.push(rotatedPattern);
		rotatedPattern = rotatePattern(rotatedPattern, rule.size);
	}

	var rotatedPattern = flipPatternVertical(originalPattern, rule.size);
	for (var i = 0; i < 4; ++i)
	{
		rule.from.push(rotatedPattern);
		rotatedPattern = rotatePattern(rotatedPattern, rule.size);
	}

	return rule;
});

var rulesPerSize = { };

rules.forEach(function(rule)
{
	rulesPerSize[rule.size] = rulesPerSize[rule.size] || [ ];
	rulesPerSize[rule.size].push(rule);
});

var state = 
{
	grid: 
	[
		0, 1, 0,
		0, 0, 1,
		1, 1, 1
	],

	size: 3,

	extractSubgrid: function(x, y, size)
	{
		var result = [ ];

		for (var localY = 0; localY < size; ++localY)
		{
			for (var localX = 0; localX < size; ++localX)	
			{
				var gridX = (x * size) + localX;
				var gridY = (y * size) + localY;

				result.push(this.grid[gridY * this.size + gridX]);
			}
		}

		return result;
	},

	replacePatterns: function(subgridSize)
	{
		var subgrids = this.size / subgridSize;

		var newSubgridSize = subgridSize + 1;
		var newSize = subgrids * newSubgridSize;
		var newGrid = new Array(newSize * newSize);

		for (var subgridY = 0; subgridY < subgrids; ++subgridY)
		{
			for (var subgridX = 0; subgridX < subgrids; ++subgridX)
			{
				var subgrid = this.extractSubgrid(subgridX, subgridY, subgridSize);
				var rule = this.findMatchingRule(subgrid, subgridSize);

				if (!rule)
				{
					console.log('Could not find rule for subgrid', subgrid);
					continue;
				}

				for (var localY = 0; localY < newSubgridSize; ++localY)
				{
					for (var localX = 0; localX < newSubgridSize; ++localX)
					{
						var gridX = subgridX * newSubgridSize + localX;
						var gridY = subgridY * newSubgridSize + localY;
						
						newGrid[gridY * newSize + gridX] = rule.to[localY * newSubgridSize + localX];
					}
				}
			}
		}

		this.grid = newGrid;
		this.size = newSize;
	},

	findMatchingRule: function(subgrid, subgridSize)
	{
		var rules = rulesPerSize[subgridSize];

		for (var ruleIdx = 0; ruleIdx < rules.length; ++ruleIdx)
		{
			var rule = rules[ruleIdx];

			for (var patternIdx = 0; patternIdx < rule.from.length; ++patternIdx)
			{
				if (this.testPatternMatch(subgrid, rule.from[patternIdx], subgridSize))
					return rule;
			}
		}

		return null;
	},

	testPatternMatch: function(a, b, size)
	{
		for (var i = 0; i < size * size; ++i)
		{
			if (a[i] != b[i])
				return false;
		}

		return true;
	}
};

for (var i = 0; i < 18; ++i)
{
	if (state.size % 2 == 0)
		state.replacePatterns(2);
	else if (state.size % 3 == 0)
		state.replacePatterns(3);
	else
		console.log('Invalid grid size!');
}

var count = 0;
state.grid.forEach(function(cell)
{
	if (cell)
		++count;
});

console.log(count);