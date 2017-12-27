var fs = require('fs');

var input = fs.readFileSync('day22_input.txt', 'utf8').trim().split('\n');

var grid = { };

input.forEach(function(line, y)
{
	line.split('').forEach(function(character, x)
	{
		grid[JSON.stringify({ x: x, y: y })] = character == '#';
	});
});

var center = (input.length - 1) / 2;

var carrier = 
{
	position: { x: center, y: center },
	direction: { x: 0, y: -1 }
};

var infections = 0;

for (var i = 0; i < 10000; ++i)
{
	var key = JSON.stringify(carrier.position);
	if (grid[key])
	{
		var tmp = carrier.direction.x;
		carrier.direction.x = -carrier.direction.y;
		carrier.direction.y = tmp; 

		grid[key] = false;
	}
	else
	{
		var tmp = carrier.direction.x;
		carrier.direction.x = carrier.direction.y;
		carrier.direction.y = -tmp; 

		grid[key] = true;
		++infections;
	}

	carrier.position.x += carrier.direction.x;
	carrier.position.y += carrier.direction.y;

	//console.log(grid);
	//console.log(carrier);
}

console.log(infections);