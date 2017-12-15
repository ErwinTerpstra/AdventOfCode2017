var knotHash = require('./knot_hash');

var input = 'nbysizxe';
var usedCells = 0;

for (var row = 0; row < 128; ++row)
{
	var rowInput = input + '-' + row;
	var hash = knotHash(rowInput);

	for (var byte = 0; byte < 16; ++byte)
	{
		var binary = hash[byte].toString(2);
		usedCells += binary.replace(/0/g, '').length;
	}
}

console.log(usedCells);