import { combineReducers } from 'redux';
import { puzzles, puzzlesByName } from './puzzles';
import { solves, recordedAtValues } from './solves';

export default combineReducers({
  solves,
  recordedAtValues,
  puzzles,
  puzzlesByName
});
