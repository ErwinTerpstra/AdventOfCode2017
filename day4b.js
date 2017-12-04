var fs = require('fs');
var input = fs.readFileSync('day4_input.txt', 'utf8');

var phrases = input.split('\n');
var validPhrases = 0;

for (var phraseIdx = 0; phraseIdx < phrases.length; ++phraseIdx)
{
	var usedWords = [ ];

	var phrase = phrases[phraseIdx];
	var words = phrase.split(' ');

	var valid = true;

	for (var wordIdx = 0; wordIdx < words.length - 1; ++wordIdx)
	{
		var word = words[wordIdx];
		word = word.trim();

		var characters = word.split('');

		console.log(JSON.stringify(characters));

		for (var otherWordIdx = wordIdx + 1; otherWordIdx < words.length; ++otherWordIdx)
		{
			var otherWord = words[otherWordIdx];
			otherWord = otherWord.trim();

			if (word.length != otherWord.length)
				continue;

			var otherCharacters = otherWord.split('');
			console.log(JSON.stringify(otherCharacters));

			var anagram = true;

			for (var characterIdx = 0; characterIdx < characters.length; ++characterIdx)
			{
				var otherCharacterIdx = otherCharacters.indexOf(characters[characterIdx]);
				if (otherCharacterIdx == -1)
				{
					anagram = false;
					break;
				}

				otherCharacters.splice(otherCharacterIdx, 1);
			}

			if (anagram)
			{
				valid = false;
				break;
			}

		}

		if (!valid)
			break;

		usedWords.push(word);
	}

	if (valid)
		++validPhrases;

	console.log((valid ? 'VALID' : 'INVALID') + ': ' + phrase);

}

console.log('Valid phrases: ' + validPhrases);