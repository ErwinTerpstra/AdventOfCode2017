var input = 348;

var length = 1;
var valueAfterZero = - 1;

var currentPosition = 0;

for (var currentValue = 1; currentValue <= 50000000; ++currentValue)
{
	currentPosition = (currentPosition + input) % length;

	++currentPosition;
	++length;

	if (currentPosition == 1)
		valueAfterZero = currentValue;
}

console.log(valueAfterZero);
