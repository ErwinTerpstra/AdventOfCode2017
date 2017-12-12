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

		totalWeight: null,
		requiredWeight: null,
		culprit: null,
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


function calculateWeight(node)
{
	node.totalWeight = node.weight;

	if (node.children != null)
	{
		// Calculate weight for all child nodes and sub total weight for this node
		for (var childIdx = 0; childIdx < node.children.length; ++childIdx)
		{
			var childNode = node.children[childIdx];
			calculateWeight(childNode);

			node.totalWeight += childNode.totalWeight;
		}

		// Find out if there is one node out of balance with the others
		if (node.children[0].totalWeight != node.children[1].totalWeight)
		{
			if (node.children.length > 2)
			{
				if (node.children[1].totalWeight != node.children[2].totalWeight)
				{
					node.culprit = node.children[1];
					node.culprit.requiredWeight = node.children[0].totalWeight;
				}
				else
				{
					node.culprit = node.children[0];
					node.culprit.requiredWeight = node.children[1].totalWeight;
				}
			}
			else
				console.error('Can\'t appoint culprit in node with only 2 children');
		}
		else
		{
			var targetWeight = node.children[0].totalWeight;

			for (var childIdx = 2; childIdx < node.children.length; ++childIdx)
			{
				var childNode = node.children[childIdx];

				if (childNode.totalWeight != targetWeight)
				{
					node.culprit = childNode;
					node.culprit.requiredWeight = targetWeight;
					break;
				}
			}
		}
	}
}

function findCulprit(node)
{
	if (node.culprit != null)
		return findCulprit(node.culprit);

	return node;
}

calculateWeight(rootNode);

var culprit = findCulprit(rootNode);

console.log(culprit);

var requiredWeight = culprit.requiredWeight - (culprit.totalWeight - culprit.weight);
console.log(requiredWeight);