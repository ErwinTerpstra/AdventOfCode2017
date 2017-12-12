var input = 289326;

// Find out which level our input is at
var level = 0;
var size = 1;
var min = 1;
var max = 1;
var amount = 1;

while (max < input)
{
	++level;

	size = 2 * level + 1;
	amount = 2 * size + 2 * (size - 2);

	min = max + 1;
	max += amount;
}

console.log('Input is at level ' + level);

//var center = min + Math.floor(size / 2) - 1;
var previousCorner = min - 1;

var nextCorner;
var center;
var quadrant = 0;

do
{
	nextCorner = previousCorner + size - 1;
	center = (nextCorner + previousCorner) / 2;

	previousCorner = nextCorner;
	++quadrant;
} while (input > nextCorner);

// Move fully to the middle point first and then up or down from there
var steps = level + Math.abs(input - center);

console.log('Steps required: ' + steps);
console.log('Quadrant: ' + quadrant);