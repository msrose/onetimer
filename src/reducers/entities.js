import { combineReducers } from 'redux';
import { activePuzzle, puzzles, puzzlesByName } from './puzzles';
import { solves, recordedAtValues } from './solves';

export * from './solves';
export * from './puzzles';

export default combineReducers({
  solves,
  recordedAtValues,
  puzzles,
  activePuzzle,
  puzzlesByName
});
