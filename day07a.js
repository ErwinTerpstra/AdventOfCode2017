var fs = require('fs');
var sscanf = require('scanf').sscanf;

var input = fs.readFileSync('day07_input.txt', 'utf8');

function parseNode(line)
{
	var name, weight, children;

	if (line.indexOf('->') != -1)
	{
		var chunks = sscanf(line, '%s (%d) -> %S');

		name = chunks[0];
		weight = chunks[1];
		children = chunks[2].split(', ');
	}
	else
	{
		var chunks = sscanf(line, '%s (%d)');

		name = chunks[0];
		weight = chunks[1];
		children = null;
	}

	return {
		name: name,
		weight: weight,
		children: children,
		parent: null,
	}
}

var nodes = input.trim().split('\n').map(parseNode);
var tree = { };

nodes.forEach(function(node)
{
	tree[node.name] = node;
});

nodes.forEach(function(node)
{
	if (node.children != null)
	{
		for (var childIdx = 0; childIdx < node.children.length; ++childIdx)
		{
			var childName = node.children[childIdx];
			var childNode = tree[childName];

			childNode.parent = node;

			node.children[childIdx] = childNode;
		}
	}
})

var rootNode = null;
nodes.forEach(function(node)
{
	if (node.parent == null)
	{
		rootNode = node;
		return false;
	}
});

console.log(rootNode);