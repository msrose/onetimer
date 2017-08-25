export const SET_ACTIVE_PUZZLE = 'SET_ACTIVE_PUZZLE';

export const setActivePuzzle = puzzle => ({
  type: SET_ACTIVE_PUZZLE,
  puzzle
});

export const TOGGLE_PUZZLE_VISIBLE = 'TOGGLE_PUZZLE_VISIBLE';

export const togglePuzzleVisible = name => ({
  type: TOGGLE_PUZZLE_VISIBLE,
  name
});
