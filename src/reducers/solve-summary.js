import { Puzzles } from '../reducers';

const getSolveValue = solve => {
  // Returning Infinity for DNF so avgeage calculation works out
  // Maybe a bit hacky, but it works fine so just deal with it.
  return (solve.isDNF ? Infinity : solve.duration) + (solve.hasPenalty ? 2000 : 0);
};

const getAverage = nums => {
  return Math.round(nums.reduce((sum, value) => sum + value) / nums.length);
};

const getAverageOfFive = solves => {
  return solves.length < 5 ?
    0 :
    getAverage(
      solves
        .slice(0, 5)
        .map(getSolveValue)
        .sort((a, b) => a - b)
        .slice(1, 4)
    );
};

const getMeanOfThree = solves => {
  return solves.length < 3 ?
    0 :
    getAverage(
      solves
        .slice(0, 3)
        .map(getSolveValue)
    );
};

const getBestOfN = (solves, n) => {
  return solves.length < n ?
    0 :
    Math.min(...solves.slice(0, n).map(getSolveValue));
};

export const getSummaryDescriptor = puzzle => {
  let valueCalculator, description;
  switch(puzzle) {
    case Puzzles.SIX_BY_SIX:
    case Puzzles.SEVEN_BY_SEVEN:
    case Puzzles.THREE_FEET:
      valueCalculator = getMeanOfThree;
      description = 'Mean of 3';
      break;
    case Puzzles.THREE_BLD:
      valueCalculator = solves => getBestOfN(solves, 3);
      description = 'Best of 3';
      break;
    case Puzzles.FOUR_BLD:
    case Puzzles.FIVE_BLD:
      valueCalculator = solves => getBestOfN(solves, 2);
      description = 'Best of 2';
      break;
    default:
      valueCalculator = getAverageOfFive;
      description = 'Avg. of 5';
      break;
  }
  return {
    valueCalculator,
    description
  };
};
