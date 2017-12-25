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

for (var tick = 0; tick < 1000; ++tick)
{
	var dead = [ ];

	for (var aIdx = 0; aIdx < particles.length; ++aIdx)
	{
		var a = particles[aIdx];
		var collided = false;

		for (var bIdx = aIdx + 1; bIdx < particles.length; ++bIdx)
		{
			var b = particles[bIdx];

			if (a.position.x == b.position.x && a.position.y == b.position.y && a.position.z == b.position.z)
			{
				if (dead.indexOf(b) == -1)
					dead.push(b);

				collided = true;
			}
		}

		if (collided)
		{
			if (dead.indexOf(a) == -1)
				dead.push(a);
		}
	}

	dead.forEach(function(particle)
	{
		var idx = particles.indexOf(particle);
		particles.splice(idx, 1);
	});

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

console.log(particles.length);