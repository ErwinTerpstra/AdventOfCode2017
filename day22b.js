var fs = require('fs');

var input = fs.readFileSync('day22_input.txt', 'utf8').trim().split('\n');

var States = 
{
	CLEAN: 0,
	WEAKENED: 1,
	INFECTED: 2,
	FLAGGED: 3,
}

var grid = { };

input.forEach(function(line, y)
{
	line.split('').forEach(function(character, x)
	{
		grid[JSON.stringify({ x: x, y: y })] = (character == '#') ? States.INFECTED : States.CLEAN;
	});
});

var center = (input.length - 1) / 2;

var carrier = 
{
	position: { x: center, y: center },
	direction: { x: 0, y: -1 }
};

var infections = 0;

for (var i = 0; i < 10000000; ++i)
{
	var key = JSON.stringify(carrier.position);
	var state = grid[key] || States.CLEAN;

	switch (state)
	{
		case States.CLEAN:
			var tmp = carrier.direction.x;
			carrier.direction.x = carrier.direction.y;
			carrier.direction.y = -tmp; 
			break;

		case States.WEAKENED:
			++infections;
			break;

		case States.INFECTED:
			var tmp = carrier.direction.x;
			carrier.direction.x = -carrier.direction.y;
			carrier.direction.y = tmp; 
			break;

		case States.FLAGGED:
			carrier.direction.x = -carrier.direction.x;
			carrier.direction.y = -carrier.direction.y;
			break;
	}

	grid[key] = (state + 1) % 4;

	carrier.position.x += carrier.direction.x;
	carrier.position.y += carrier.direction.y;

	//console.log(grid);
	//console.log(carrier);
}

console.log(infections);