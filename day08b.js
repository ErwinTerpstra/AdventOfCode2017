var fs = require('fs');
var sscanf = require('scanf').sscanf;

var compareOperators = 
{
	'>': 	function(a, b) { return a > b; },
	'>=': 	function(a, b) { return a >= b; },
	'<': 	function(a, b) { return a < b; },
	'<=': 	function(a, b) { return a <= b; },
	'==': 	function(a, b) { return a == b; },
	'!=': 	function(a, b) { return a != b; },
};

var operators = 
{
	'inc': 	function(a, b) { return a + b; },
	'dec': 	function(a, b) { return a - b; },
};

var instructions = fs.readFileSync('day8_input.txt', 'utf8').trim().split('\n');
var registers = { };

var maxValue = 0;

for (var instructionIdx = 0; instructionIdx < instructions.length; ++instructionIdx)
{
	var line = instructions[instructionIdx];

	var instruction = sscanf(line, '%s %s %d if %s %s %d', 'dstRegister', 'operator', 'operand', 'cmpRegister', 'cmpOperator', 'cmpOperand');
	
	var cmpRegisterValue = registers[instruction.cmpRegister] || 0;

	console.log(instructions[instructionIdx], instruction);
	if (!compareOperators[instruction.cmpOperator](cmpRegisterValue, instruction.cmpOperand))
		continue;

	registers[instruction.dstRegister] = operators[instruction.operator](registers[instruction.dstRegister] || 0, instruction.operand);

	maxValue = Math.max(maxValue, registers[instruction.dstRegister]);
}

console.log(maxValue);