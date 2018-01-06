import { combineReducers } from 'redux';
import { puzzles, puzzlesByName } from './puzzles';
import { solves, recordedAtValues } from './solves';

export * from './solves';
export * from './puzzles';

export default combineReducers({
  solves,
  recordedAtValues,
  puzzles,
  puzzlesByName
});
