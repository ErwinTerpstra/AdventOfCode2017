function isPrime(n)
{
	if (n <= 1)
		return false;

	if (n <= 3)
		return true;

	if ((n % 2) == 0 || (n % 3) == 0)
		return false;

	for (var i = 5; i * i <= n; i += 6)
	{
		if ((n % i) == 0 || (n % (i + 2)) == 0)
			return false;
	}

	return true;
 }

var a = 1;
var b = 0, c = 0, d = 0, e = 0, f = 0, g = 0, h = 0;

b = 84
c = b

if (a != 0)
{
	b *= 100;
	b += 100000;
	c = b;
	c += 17000;
}

// b = 108400
// c = 125400

for (; b <= c; b += 17)
{
	if (!isPrime(b))
		++h;
}

console.log(h);