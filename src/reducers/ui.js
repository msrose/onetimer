import { TOGGLE_DRAWER, TOGGLE_SWITCH_PUZZLE } from '../actions';

const initialUIState = {
  isDrawerOpen: false,
  isSwitchPuzzleOpen: false
};

function ui(state = initialUIState, action) {
  switch(action.type) {
    case TOGGLE_DRAWER:
      return { ...state, isDrawerOpen: !state.isDrawerOpen };
    case TOGGLE_SWITCH_PUZZLE:
      return { ...state, isSwitchPuzzleOpen: !state.isSwitchPuzzleOpen };
    default:
      return state;
  }
}

export default ui;
