var fs = require('fs');
var sscanf = require('scanf').sscanf;
var PImage = require('pureimage');

var input = fs.readFileSync('infi_input.txt', 'utf8').trim();

var robots = [ ];

while (input.charAt(0) == '[')
{
	var chunk = input.substring(0, input.indexOf(']') + 1);
	input = input.substring(chunk.length);

	var position = sscanf(chunk, '[%d, %d]', 'x', 'y');
	robots.push(position);
}

var image = PImage.make(500, 500);
var ctx = image.getContext('2d');
ctx.fillStyle = 'rgba(255, 255, 255, 1.0)';

var collisions = 0;

while (input.length > 0 && input.charAt(0) == '(')
{
	// Perform the next step for all robots
	for (var robotIdx = 0; robotIdx < robots.length; ++robotIdx)
	{
		var chunk = input.substring(0, input.indexOf(')') + 1);
		input = input.substring(chunk.length);

		var offset = sscanf(chunk, '(%d, %d)', 'x', 'y');

		var robotPosition = robots[robotIdx];

		robotPosition.x += offset.x;
		robotPosition.y += offset.y;

	}

	// Check if all robots occupy the same space
	var collision = true;
	for (var robotIdx = 1; robotIdx < robots.length; ++robotIdx)
	{
		if (robots[robotIdx].x != robots[0].x || robots[robotIdx].y != robots[0].y)
		{
			collision = false;
			break;
		}
	}

	if (collision)
	{
		++collisions;
		ctx.fillRect(robots[0].x * 10, robots[0].y * 10, 10, 10);
	}
}

console.log(collisions);

PImage.encodePNGToStream(image, fs.createWriteStream('infi.png'));