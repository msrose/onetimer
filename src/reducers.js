import { combineReducers } from 'redux';

const initialUIState = {
  isDrawerOpen: false,
  isSwitchPuzzleOpen: false
};

function ui(state = initialUIState, action) {
  switch(action.type) {
    case 'TOGGLE_DRAWER':
      return { ...state, isDrawerOpen: !state.isDrawerOpen };
    case 'TOGGLE_SWITCH_PUZZLE':
      return { ...state, isSwitchPuzzleOpen: !state.isSwitchPuzzleOpen };
    default:
      return state;
  }
}

const initialTimerState = {
  puzzle: '3x3x3'
};

function timer(state = initialTimerState, action) {
  switch(action.type) {
    case 'SET_PUZZLE':
      return { ...state, puzzle: action.puzzle };
    default:
      return state;
  }
}

export default combineReducers({ ui, timer });
