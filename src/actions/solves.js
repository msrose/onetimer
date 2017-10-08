import {
  getLastDeletedSolves,
  getSelectedActivePuzzleSolves,
  getLastActivePuzzleSolve
} from '../reducers';

import { toggleDeleteSolveMessage } from '../actions';

export const ADD_SOLVE = 'ADD_SOLVE';

export const addSolve = (recordedAt, duration, puzzle) => ({
  type: ADD_SOLVE,
  solve: {
    recordedAt,
    duration,
    puzzle,
    selected: false,
    isDNF: false,
    hasPenalty: false
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
  recordedAtMap: recordedAtValues.reduce(
    (map, value) => Object.assign(map, { [value]: true }),
    {}
  )
});

export const DELETE_LAST_SOLVE = 'DELETE_LAST_SOLVE';

export const deleteLastSolve = () => (dispatch, getState) => {
  dispatch(deleteSolves([getLastActivePuzzleSolve(getState()).recordedAt]));
  dispatch(toggleDeleteSolveMessage());
};

export const undoLastSolveDelete = () => {
  return (dispatch, getState) => {
    const lastDeleted = getLastDeletedSolves(getState());
    // TODO: bulk add?
    lastDeleted.forEach(solve =>
      dispatch(addSolve(solve.recordedAt, solve.duration, solve.puzzle))
    );
    dispatch(toggleDeleteSolveMessage());
  };
};

export const deleteSelectedSolves = () => {
  return (dispatch, getState) => {
    const selectedSolves = getSelectedActivePuzzleSolves(getState());
    dispatch(deleteSolves(selectedSolves.map(solve => solve.recordedAt)));
    dispatch(toggleDeleteSolveMessage());
  };
};

export const TOGGLE_SOLVE_DNF = 'TOGGLE_LAST_SOLVE_DNF';

export const toggleSolveDNF = recordedAt => ({
  type: TOGGLE_SOLVE_DNF,
  recordedAt
});

export const TOGGLE_SOLVE_PENALTY = 'TOGGLE_LAST_SOLVE_PENALTY';

export const toggleSolvePenalty = recordedAt => ({
  type: TOGGLE_SOLVE_PENALTY,
  recordedAt
});

export const toggleLastSolveDNF = () => (dispatch, getState) => {
  const { recordedAt } = getLastActivePuzzleSolve(getState());
  dispatch(toggleSolveDNF(recordedAt));
};

export const toggleLastSolvePenalty = () => (dispatch, getState) => {
  const { recordedAt } = getLastActivePuzzleSolve(getState());
  dispatch(toggleSolvePenalty(recordedAt));
};
