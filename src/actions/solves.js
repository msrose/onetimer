export const ADD_SOLVE = 'ADD_SOLVE';

export const addSolve = (recordedAt, duration, puzzle) => ({
  type: ADD_SOLVE,
  solve: {
    recordedAt,
    duration,
    puzzle,
    selected: false
  }
});

export const TOGGLE_SOLVE_SELECTED = 'TOGGLE_SOLVE_SELECTED';

export const toggleSolveSelected = recordedAt => ({
  type: TOGGLE_SOLVE_SELECTED,
  recordedAt
});

export const DELETE_SOLVES = 'DELETE_SOLVES';

export const deleteSolves = recordedAtValues => ({
  type: DELETE_SOLVES,
  // Create a map here since it saves a search in reducers
  recordedAtMap: recordedAtValues.reduce((map, value) => {
    map[value] = true;
    return map;
  }, {})
});
