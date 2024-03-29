import {
  getLastDeletedSolves,
  getSelectedActivePuzzleSolves,
  getLastActivePuzzleSolve,
  getActivePuzzleSolves
} from '../reducers/solves';

import { toggleDeleteSolveMessage } from '../actions';

export const ADD_SOLVES = 'ADD_SOLVES';

export const addSolves = solves => ({
  type: ADD_SOLVES,
  solves: solves.map(({
    recordedAt,
    duration,
    puzzle,
    isDNF = false,
    hasPenalty = false
  }) => ({
    recordedAt,
    duration,
    puzzle,
    isDNF,
    hasPenalty
  }))
});

export const DELETE_SOLVES = 'DELETE_SOLVES';

export const deleteSolves = solves => ({
  type: DELETE_SOLVES,
  solves
});

export const DELETE_LAST_SOLVE = 'DELETE_LAST_SOLVE';

export const deleteLastSolve = () => (dispatch, getState) => {
  dispatch(deleteSolves([getLastActivePuzzleSolve(getState())]));
  dispatch(toggleDeleteSolveMessage());
};

export const undoLastSolveDelete = () => {
  return (dispatch, getState) => {
    const lastDeletedSolves = getLastDeletedSolves(getState());
    dispatch(addSolves(lastDeletedSolves));
    dispatch(toggleDeleteSolveMessage());
  };
};

export const deleteSelectedSolves = () => {
  return (dispatch, getState) => {
    const selectedSolves = getSelectedActivePuzzleSolves(getState());
    dispatch(deleteSolves(selectedSolves));
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

export const TOGGLE_SOLVES_SELECTED = 'TOGGLE_SOLVES_SELECTED';

export const toggleSolvesSelected = recordedAtValues => ({
  type: TOGGLE_SOLVES_SELECTED,
  recordedAtValues
});

export const toggleLastSolveDNF = () => (dispatch, getState) => {
  const { recordedAt } = getLastActivePuzzleSolve(getState());
  dispatch(toggleSolveDNF(recordedAt));
};

export const toggleLastSolvePenalty = () => (dispatch, getState) => {
  const { recordedAt } = getLastActivePuzzleSolve(getState());
  dispatch(toggleSolvePenalty(recordedAt));
};

export const deselectActivePuzzleSolves = () => (dispatch, getState) => {
  const selectedSolves = getSelectedActivePuzzleSolves(getState());
  dispatch(toggleSolvesSelected(selectedSolves.map(solve => solve.recordedAt)));
};

export const selectAllActivePuzzleSolves = () => (dispatch, getState) => {
  const activePuzzleSolves = getActivePuzzleSolves(getState());
  const unselectedSolves = activePuzzleSolves
    .filter(solve => !solve.selected);
  dispatch(toggleSolvesSelected(unselectedSolves.map(solve => solve.recordedAt)));
};
