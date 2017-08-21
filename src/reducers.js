import { combineReducers } from 'redux';

const initialUIState = {
  isDrawerOpen: false
};

function ui(state = initialUIState, action) {
  switch(action.type) {
    case 'TOGGLE_DRAWER':
      return { ...state, isDrawerOpen: !state.isDrawerOpen };
    default:
      return state;
  }
}

export default combineReducers({ ui });
