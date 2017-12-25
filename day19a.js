var fs = require('fs');
var input = fs.readFileSync('day19_input.txt', 'utf8');

var grid = input.split('\n').map(function(line)
	{
		return line.split('');
	});

function readGrid(position)
{
	var row = grid[position.y] || [ ];
	return row[position.x] || ' ';
}

var position = { x: 0, y: 0 };
var direction = { x: 0, y: 1 };
var result = '';

// Find the start position on the first row
while(readGrid(position) == ' ')
	++position.x;

var inGrid = true;

while (inGrid)
{
	// Advance the position
	position.x += direction.x;
	position.y += direction.y;

	var character = readGrid(position);

	switch (character)
	{
		case ' ':
			// Reached end of grid
			inGrid = false;
			break;

		case '+':
			// Intersection, rotate left or right
			var left = { x: position.x + direction.y, y: position.y - direction.x };
			var right = { x: position.x - direction.y, y: position.y + direction.x };

			if (readGrid(left) != ' ')
			{
				// Rotate left
				var tmp = direction.x;
				direction.x = direction.y;
				direction.y = -tmp;
			} 
			else if (readGrid(right) != ' ')
			{
				// Rotate right
				var tmp = direction.x;
				direction.x = -direction.y;
				direction.y = tmp;
			}
			else
			{
				console.log('Dead Intersection!')
				inGrid = false;
			}

			break;

		case '-':
		case '|':
			// Line characters, continue normally
			break;

		default:
			// Save all other characters to the result
			result += character;
			break;
	}


}


console.log(result);