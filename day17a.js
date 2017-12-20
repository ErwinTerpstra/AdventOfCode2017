var input = 348;

var buffer = [ 0 ];
var currentPosition = 0;
var currentValue = 1;

for (var currentValue = 1; currentValue < 2018; ++currentValue)
{
	currentPosition = (currentPosition + input) % buffer.length;

	++currentPosition;
	buffer.splice(currentPosition, 0, currentValue);
}

console.log(buffer[(currentPosition + 1) % buffer.length]);