var knotHash = require('./knot_hash');
var input = '31,2,85,1,80,109,35,63,98,255,0,13,105,254,128,33';

var hash = knotHash(input);

var result = '';

for (var idx = 0; idx < hash.length; ++idx)
{
	var hex = hash[idx].toString(16);
	if (hex.length == 1)
		hex = '0' + hex;

	result += hex;
}

console.log(result);