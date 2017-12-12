var fs = require('fs');

var input = fs.readFileSync('day09_input.txt', 'utf8').trim();

var rootGroup = null;
var currentGroup = null;
var inGarbageGroup = false;
var escaped = true;

var totalScore = 0;

for (var characterIdx = 0; characterIdx < input.length; ++characterIdx)
{
	var character = input.charAt(characterIdx);

	if (inGarbageGroup)
	{
		if (!escaped)
		{
			switch (character)
			{
				case '!':
					escaped = true;
					break;

				case '>':
					inGarbageGroup = false;
					break;
			}
		}
		else
			escaped = false;
	}
	else
	{
		switch (character)
		{
			case '{':
				// Start of new group
				currentGroup = 
				{
					parent: currentGroup,
					children: [ ],	
				};

				if (currentGroup.parent != null)
				{
					currentGroup.parent.children.push(currentGroup);
					currentGroup.score = currentGroup.parent.score + 1;
				}
				else
				{
					currentGroup.score = 1;
					rootGroup = currentGroup;
				}

				totalScore += currentGroup.score;

				break;

			case '}':
				currentGroup = currentGroup.parent;
				break;

			case '<':
				inGarbageGroup = true;
				break;

			case ',':
				break;
		}
	}
}

console.log(totalScore);