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

export const START_PUZZLE_REORDER = 'START_PUZZLE_REORDER';

export const startPuzzleReorder = name => ({
  type: START_PUZZLE_REORDER,
  name
});

export const CHOOSE_NEW_PUZZLE_ORDER = 'CHOOSE_NEW_PUZZLE_ORDER';

export const chooseNewPuzleOrder = (reorderPuzzle, insertBeforePuzzle) => ({
  type: CHOOSE_NEW_PUZZLE_ORDER,
  reorderPuzzle,
  insertBeforePuzzle
});
