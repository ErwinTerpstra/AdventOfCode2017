var fs = require('fs');
var sscanf = require('scanf').sscanf;

var input = fs.readFileSync('day20_input.txt', 'utf8').trim().split('\n');

function dot(a, b)
{
	return a.x * b.x + a.y * b.y + a.z * b.z;
}

function manhattan(position)
{
	return Math.abs(position.x) + Math.abs(position.y) + Math.abs(position.z);
}

var particles = input.map(function(line)
{
	var chunks = sscanf(line, 'p=<%d,%d,%d>, v=<%d,%d,%d>, a=<%d,%d,%d>');
	var particle = 
	{
		position: 		{ x: chunks[0], y: chunks[1], z: chunks[2] },
		velocity: 		{ x: chunks[3], y: chunks[4], z: chunks[5] },
		acceleration: 	{ x: chunks[6], y: chunks[7], z: chunks[8] }
	};

	return particle;
});

for (var tick = 0; tick < 10000; ++tick)
{
	particles.forEach(function(particle, index)
	{
		particle.velocity.x += particle.acceleration.x;
		particle.velocity.y += particle.acceleration.y;
		particle.velocity.z += particle.acceleration.z;

		particle.position.x += particle.velocity.x;
		particle.position.y += particle.velocity.y;
		particle.position.z += particle.velocity.z;
	});
}

var closest = -1;
var closestDistance = 0;

particles.forEach(function(particle, index)
{
	var distance = manhattan(particle.position);

	if (closest == -1 || distance < closestDistance)
	{
		closest = index;
		closestDistance = distance;
	}
});

console.log(closest, closestDistance);