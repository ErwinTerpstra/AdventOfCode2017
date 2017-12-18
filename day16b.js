var fs = require('fs');
var sscanf = require('scanf').sscanf;

var input = fs.readFileSync('day16_input.txt', 'utf8').trim();
var moves = input.split(',');

var programs = [ ];
for (var programIdx = 0; programIdx < 16; ++programIdx)
	programs.push(String.fromCharCode(97 + programIdx));

var states = { };
var totalIterations = 1000000000;

for (var iteration = 0; iteration < totalIterations; ++iteration)
{
	for (var moveIdx = 0; moveIdx < moves.length; ++moveIdx)
	{
		var moveText = moves[moveIdx];

		switch (moveText.charAt(0))
		{
			case 's':
				var amount = parseInt(moveText.substring(1));
				var subset = programs.splice(programs.length - amount, amount);
				subset.unshift(0);
				subset.unshift(0);
				Array.prototype.splice.apply(programs, subset);
				break;

			case 'x':
				var operands = sscanf(moveText.substring(1), '%d/%d', 'a', 'b');
				var tmp = programs[operands.a];
				programs[operands.a] = programs[operands.b]
				programs[operands.b] = tmp;
				break;

			case 'p':
				var operands = sscanf(moveText.substring(1), '%s/%s', 'a', 'b');

				operands.a = programs.indexOf(operands.a);
				operands.b = programs.indexOf(operands.b);

				var tmp = programs[operands.a];
				programs[operands.a] = programs[operands.b]
				programs[operands.b] = tmp;
				break;

			default:
				console.error('Invalid move ' + moveText);
				break;
		}
	}

	var state = programs.join('');
	if (states.hasOwnProperty(state))
	{
		var previousIteration = states[state];
		console.log(iteration + ' has same state as iteration ' + previousIteration);

		if (previousIteration == 0)
		{
			iteration = Math.floor(totalIterations / iteration) * iteration;

			console.log('Skipping to iteration ' + iteration);
		}
	}
	else
		states[state] = iteration;
}

console.log(programs.join(''));