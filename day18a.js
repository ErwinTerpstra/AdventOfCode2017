var fs = require('fs');
var sscanf = require('scanf').sscanf;

var input = fs.readFileSync('day18_input.txt', 'utf8').trim();
var instructions = input.split('\n');

var registers = { };
var pc = 0;

var lastPlayedFrequency = 0;

var opcodes = 
{
	snd: function(frequency)
	{
		lastPlayedFrequency = frequency.value;
	},

	set: function(dst, src)
	{
		dst.value = src.value;
	},

	add: function(dst, src)
	{
		dst.value += src.value;
	},

	mul: function(dst, src)
	{
		dst.value *= src.value;
	},

	mod: function(dst, src)
	{
		dst.value %= src.value;
	},

	rcv: function(condition)
	{
		if (condition.value != 0)
		{
			console.log('Recovered frequency ' + lastPlayedFrequency);
			pc = instructions.length;
		}
	},

	jgz: function(condition, offset)
	{
		if (condition.value > 0)
			pc += offset.value;
		else
			++pc;
	}
}

function parseOperands(input)
{
	var operands = [ ];
	var chunks = input.split(' ');

	for (var operandIdx = 0; operandIdx < chunks.length; ++operandIdx)
	{
		var value = chunks[operandIdx];
		var numericValue = parseInt(value);

		if (isNaN(numericValue))
		{
			var register;

			if (!registers.hasOwnProperty(value))
			{
				register = { value: 0 };
				registers[value] = register;
			}
			else
				register = registers[value];

			operands.push(register);
		}
		else
			operands.push({ value: numericValue });
	}

	return operands;
}

while (pc < instructions.length)
{
	var line = instructions[pc];
	var instruction = sscanf(line, '%s %S', 'opcode', 'operands');

	if (!opcodes.hasOwnProperty(instruction.opcode))
	{
		console.log('Invalid opcode ' + instruction.opcode);
		break;
	}

	var operands = parseOperands(instruction.operands);

	console.log(pc, instruction.opcode, operands);

	opcodes[instruction.opcode].apply(null, operands);

	if (instruction.opcode != 'jgz')
		++pc;
}