var rules = 
{
	A:
	[
		{ write: 1, move:  1, continue: 'B' },
		{ write: 0, move: -1, continue: 'C' }
	],

	B:
	[
		{ write: 1, move: -1, continue: 'A' },
		{ write: 1, move:  1, continue: 'C' }
	],

	C:
	[
		{ write: 1, move:  1, continue: 'A' },
		{ write: 0, move: -1, continue: 'D' }
	],

	D:
	[
		{ write: 1, move: -1, continue: 'E' },
		{ write: 1, move: -1, continue: 'C' }
	],

	E:
	[
		{ write: 1, move:  1, continue: 'F' },
		{ write: 1, move:  1, continue: 'A' }
	],

	F:
	[
		{ write: 1, move:  1, continue: 'A' },
		{ write: 1, move:  1, continue: 'E' }
	],
};

var state = 'A';

var tape = { };
var cursor = 0;

for (var step = 0; step < 12261543; ++step)
{
	var current = tape[cursor] || 0;
	var rule = rules[state][current];

	tape[cursor] = rule.write;
	cursor += rule.move;
	state = rule.continue;
}

var checksum = 0;

for (var position in tape)
{
	if (tape[position])
		++checksum;
}

console.log(checksum);