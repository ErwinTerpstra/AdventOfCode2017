var fs = require('fs');
var sscanf = require('scanf').sscanf;

var input = fs.readFileSync('day12_input.txt', 'utf8').trim();

var lines = input.split('\n');

var nodes = { };

lines.forEach(function(line)
{
	var chunks = sscanf(line, '%d <-> %S');
	var node = 
	{
		id: chunks[0],
		pipes: chunks[1].split(',').map(function(id) { return parseInt(id.trim()); })
	};

	nodes[node.id] = node;
});


var groups = [ ];
var nodesLeft = Object.keys(nodes).map(function(id) { return parseInt(id); });

while (nodesLeft.length > 0)
{
	var openList = [ nodesLeft.pop() ];
	var group = [ ];

	while (openList.length > 0)
	{
		var currentID = openList.pop();

		if (group.indexOf(currentID) !== -1)
			continue;

		var nodeIdx = nodesLeft.indexOf(currentID);
		if (nodeIdx >= 0)
			nodesLeft.splice(nodeIdx, 1);

		group.push(currentID);

		var current = nodes[currentID];
		Array.prototype.push.apply(openList, current.pipes);
	}

	groups.push(group);
}

console.log(groups);
console.log(groups.length);