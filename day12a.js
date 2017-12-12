var fs = require('fs');
var sscanf = require('scanf').sscanf;

var input = fs.readFileSync('day12_input.txt', 'utf8').trim();
var lines = input.split('\n');

var nodes = [ ];

lines.forEach(function(line)
{
	var chunks = sscanf(line, '%d <-> %S');
	var node = 
	{
		id: chunks[0],
		pipes: chunks[1].split(',').map(function(id) { return parseInt(id.trim()); })
	};

	nodes.push(node);
});


var closedList = [ ];
var openList = [ 0 ];

while (openList.length > 0)
{
	var currentID = openList.pop();
	var current = nodes[currentID];

	if (closedList.indexOf(current) !== -1)
		continue;

	closedList.push(current);
	Array.prototype.push.apply(openList, current.pipes);
}


console.log(closedList.length);