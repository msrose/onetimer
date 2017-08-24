import { TOGGLE_DRAWER, TOGGLE_SWITCH_PUZZLE, TOGGLE_DELETE_SOLVE_MESSAGE } from '../actions';

const initialUIState = {
  isDrawerOpen: false,
  isSwitchPuzzleOpen: false,
  isDeleteSolveMessageOpen: false
};

function ui(state = initialUIState, action) {
  switch(action.type) {
    case TOGGLE_DRAWER:
      return { ...state, isDrawerOpen: !state.isDrawerOpen };
    case TOGGLE_SWITCH_PUZZLE:
      return { ...state, isSwitchPuzzleOpen: !state.isSwitchPuzzleOpen };
    case TOGGLE_DELETE_SOLVE_MESSAGE:
      return { ...state, isDeleteSolveMessageOpen: !state.isDeleteSolveMessageOpen };
    default:
      return state;
  }
}

export default ui;
