import { ADD_SOLVES, DELETE_SOLVES, TOGGLE_SOLVES_SELECTED } from '../actions';

export function getSolvesSelected(state) {
  return state.selectedSolves;
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
        .filter(
          recordedAt => !action.solves.some(solve => solve.recordedAt === recordedAt)
        )
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
