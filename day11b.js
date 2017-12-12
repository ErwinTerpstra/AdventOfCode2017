var fs = require('fs');

var input = fs.readFileSync('day11_input.txt', 'utf8').trim();
var steps = input.split(',');

var position = { x: 0, y: 0 };
var maxDistance = 0;

for (var stepIdx = 0; stepIdx < steps.length; ++stepIdx)
{
	var step = steps[stepIdx];

	switch (step)
	{
		case 'n':
			position.y -= 1;
			break;

		case 's':
			position.y += 1;
			break;

		case 'nw':
			if ((position.x & 1) == 0)
				position.y -= 1;

			position.x -= 1;
			break;

		case 'ne':
			if ((position.x & 1) == 0)
				position.y -= 1;
			
			position.x += 1;
			break;

		case 'sw':
			if ((position.x & 1) == 1)
				position.y += 1;

			position.x -= 1;
			break;

		case 'se':
			if ((position.x & 1)== 1)
				position.y += 1;
			
			position.x += 1;
			break;

		default:
			console.log('Invalid input ' + step);
			break;
	}

	maxDistance = Math.max(maxDistance, cube_length(oddq_to_cube(position)));
}

function oddq_to_cube(hex)
{
      var x = hex.x;
      var z = hex.y - (hex.x - (hex.x & 1)) / 2;
      var y = -x - z;

      return { x: x, y: y, z: z };
}

function cube_length(cube)
{
    return Math.max(Math.abs(cube.x), Math.abs(cube.y), Math.abs(cube.z));
}

console.log(position);
console.log(oddq_to_cube(position));
console.log(cube_length(oddq_to_cube(position)));
console.log(maxDistance);