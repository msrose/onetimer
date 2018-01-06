import { TOGGLE_SOLVE_SELECTED, ADD_SOLVES, DELETE_SOLVES, TOGGLE_SOLVES_SELECTED } from '../actions';
import { toggleObjectProperty } from './helpers';

export function getSolveSelected(state, recordedAt) {
  return state.selectedSolves[recordedAt];
}

const initialSelectedSolvesState = {};

export default function(state = initialSelectedSolvesState, action) {
  switch(action.type) {
    case ADD_SOLVES:
      return {
        ...state,
        ...action.solves.reduce(
          (recordedAtMap, { recordedAt }) => ({
            ...recordedAtMap,
            [recordedAt]: false
          }),
          {}
        )
      };
    case DELETE_SOLVES:
      return Object
        .keys(state)
        .filter(recordedAt => !action.recordedAtMap[recordedAt])
        .reduce(
          (selectedSolves, recordedAt) => ({
            ...selectedSolves,
            [recordedAt]: state[recordedAt]
          }),
          {}
        );
    case TOGGLE_SOLVE_SELECTED:
      return toggleObjectProperty(state, action.recordedAt);
    case TOGGLE_SOLVES_SELECTED:
      return Object
        .keys(state)
        .reduce(
          (selectedSolves, recordedAt) => ({
            ...selectedSolves,
            [recordedAt]: action.recordedAtValues.includes(Number(recordedAt)) ? !state[recordedAt] : state[recordedAt]
          }),
          {}
        );
    default:
      return state;
  }
}
