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

	for (var wordIdx = 0; wordIdx < words.length; ++wordIdx)
	{
		var word = words[wordIdx];
		word = word.trim();

		if (usedWords.indexOf(word) != -1)
		{
			valid = false;
			break;
		}

		usedWords.push(word);
	}

	if (valid)
		++validPhrases;

	console.log((valid ? 'VALID' : 'INVALID') + ': ' + phrase);

}

console.log('Valid phrases: ' + validPhrases);