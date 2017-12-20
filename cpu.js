var sscanf = require('scanf').sscanf;

var CPU = function(id, instructions, output)
{
	this.instructions = instructions;
	this.output = output;
	this.registers = { p: { value: id } };
	this.pc = 0;

	this.queue = [ ];
	this.blockRegister = null

	this.opcodes = 
	{
		snd: function(src)
		{
			this.output.call(this, src.value);
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

		rcv: function(dst)
		{
			if (this.queue.length == 0)
				this.blockRegister = dst;
			else
				dst.value = this.queue.shift();
		},

		jgz: function(condition, offset)
		{
			if (condition.value > 0)
				this.pc += offset.value;
			else
				++this.pc;
		}
	};

	this.parseOperands = function(input)
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

				if (!this.registers.hasOwnProperty(value))
				{
					register = { value: 0 };
					this.registers[value] = register;
				}
				else
					register = this.registers[value];

				operands.push(register);
			}
			else
				operands.push({ value: numericValue });
		}

		return operands;
	};

	this.step = function()
	{
		var line = this.instructions[this.pc];

		var instruction = sscanf(line, '%s %S', 'opcode', 'operands');

		if (!this.opcodes.hasOwnProperty(instruction.opcode))
		{
			console.log('Invalid opcode ' + instruction.opcode);
			return;
		}

		var operands = this.parseOperands(instruction.operands);
		//console.log(this.pc, line, instruction.opcode, operands);

		this.opcodes[instruction.opcode].apply(this, operands);

		if (instruction.opcode != 'jgz')
			++this.pc;
	};

	this.isTerminated = function()
	{
		return this.pc >= this.instructions.length;
	};

	this.isBlocked = function()
	{
		return this.blockRegister != null;
	};

	this.addValue = function(value)
	{
		if (this.isBlocked())
		{
			this.blockRegister.value = value;
			this.blockRegister = null;
		}
		else
			this.queue.push(value);
	};
};

module.exports = CPU;