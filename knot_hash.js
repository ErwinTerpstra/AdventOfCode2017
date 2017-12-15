module.exports = function(input)
{
	var lengths = input.split('').map(function(character)
		{
			return character.charCodeAt(0);
		});

	lengths.push(17, 31, 73, 47, 23);

	var list = [ ];

	for (var i = 0; i < 256; ++i)
		list.push(i);

	var currentPosition = 0;
	var skipSize = 0;

	for (var cycle = 0; cycle < 64; ++cycle)
	{
		for (var lengthIdx = 0; lengthIdx < lengths.length; ++lengthIdx)
		{
			var length = lengths[lengthIdx];

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
	}

	var hash = [ ];

	for (var block = 0; block < 16; ++block)
	{
		var value = 0;

		for (var offset = 0; offset < 16; ++offset)
			value ^= list[block * 16 + offset];

		hash.push(value);
	}

	return hash;
};