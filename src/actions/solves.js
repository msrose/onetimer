export const ADD_SOLVE = 'ADD_SOLVE';

export const addSolve = (recordedAt, duration, puzzle) => ({
  type: ADD_SOLVE,
  recordedAt,
  duration,
  puzzle
});
