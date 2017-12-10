var input = '31,2,85,1,80,109,35,63,98,255,0,13,105,254,128,33';

var lengths = input.split(',');

var list = [ ];

for (var i = 0; i < 256; ++i)
	list.push(i);

var currentPosition = 0;
var skipSize = 0;

for (var lengthIdx = 0; lengthIdx < lengths.length; ++lengthIdx)
{
	var length = parseInt(lengths[lengthIdx]);

	for (var offset = 0; offset < Math.floor(length / 2); ++offset)
	{
		var from = (currentPosition + offset) % list.length;
		var to = (currentPosition + length - 1 - offset) % list.length;

		var tmp = list[from];
		list[from] = list[to];
		list[to] = tmp;
	}

	currentPosition = (currentPosition + length + skipSize) % list.length;
	++skipSize;
}

console.log(list[0] * list[1]);