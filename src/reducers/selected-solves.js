import { ADD_SOLVES, DELETE_SOLVES, TOGGLE_SOLVES_SELECTED } from '../actions';

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
    case TOGGLE_SOLVES_SELECTED:
      return {
        ...state,
        ...action.recordedAtValues.reduce(
          (selectedMap, recordedAt) => ({
            ...selectedMap,
            [recordedAt]: !state[recordedAt]
          }),
          {}
        )
      };
    default:
      return state;
  }
}
