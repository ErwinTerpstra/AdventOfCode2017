var input = '5	1	10	0	1	7	13	14	3	12	8	10	7	12	0	6';
var banks = input.trim().split('\t').map(function(blocks) { return parseInt(blocks); });

var oldStates = [ ];

var duplicate = false;
var cycles = 0;

do
{
	// Save old state
	var state = banks.slice();
	oldStates.push(state);

	// Find bank with most blocks
	var mostBlocks = -1;
	var mostBlocksIdx = -1;

	for (var bankIdx = 0; bankIdx < banks.length; ++bankIdx)
	{
		var blocks = banks[bankIdx];

		if (blocks > mostBlocks)
		{
			mostBlocks = blocks;
			mostBlocksIdx = bankIdx;
		}
	}

	// Balance blocks
	banks[mostBlocksIdx] = 0;

	var blocksLeft = mostBlocks;
	var bankIdx = mostBlocksIdx;

	while (blocksLeft > 0)
	{
		bankIdx = (bankIdx + 1) % banks.length;
		++banks[bankIdx];
		--blocksLeft;
	}

	// Increase cycle count
	++cycles;

	// Check if this state has occurred before
	for (var stateIdx = 0; stateIdx < oldStates.length; ++stateIdx)
	{
		var oldState = oldStates[stateIdx];

		var different = false;

		for (var bankIdx = 0; bankIdx < banks.length; ++bankIdx)
		{
			if (banks[bankIdx] != oldState[bankIdx])
			{
				different = true;
				break;
			}
		}

		if (!different)
		{
			duplicate = true;
			break;
		}
	}
} while (!duplicate);

console.log(cycles);