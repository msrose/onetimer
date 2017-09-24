import {
  SET_ACTIVE_PUZZLE, TOGGLE_PUZZLE_VISIBLE, START_PUZZLE_REORDER, CHOOSE_NEW_PUZZLE_ORDER
} from '../actions';

const puzzleNames = [
  '3x3x3', '2x2x2', '4x4x4', '5x5x5', '6x6x6', '7x7x7',
  '3x3x3 Blindfolded', '3x3x3 One-Handed', '3x3x3 With Feet',
  'Megaminx', 'Pyraminx', 'Clock', 'Skewb', 'Square-1',
  '4x4x4 Blindfolded', '5x5x5 Blindfolded', '3x3x3 Multi-Blind'
];

export const getPuzzleNames = state => {
  return state.entities.puzzlesByName;
};

export const getPuzzles = state => {
  return getPuzzleNames(state).map(name => state.entities.puzzles[name]);
};

export const getVisiblePuzzleNames = state => {
  return getPuzzles(state).filter(puzzle => puzzle.visible).map(puzzle => puzzle.name);
};

export const getActivePuzzle = state => {
  return state.entities.activePuzzle;
};

export const getPuzzleToReorder = state => {
  return state.entities.puzzleToReorder;
};

export function activePuzzle(state = puzzleNames[0], action) {
  switch(action.type) {
    case SET_ACTIVE_PUZZLE:
      return action.puzzle;
    default:
      return state;
  }
}

export function puzzleToReorder(state = null, action) {
  switch(action.type) {
    case START_PUZZLE_REORDER:
      return action.name;
    case CHOOSE_NEW_PUZZLE_ORDER:
      return null;
    default:
      return state;
  }
}

const initialPuzzleState = puzzleNames.reduce((map, puzzle) => {
  map[puzzle] = { name: puzzle, visible: true };
  return map;
}, {});

export function puzzles(state = initialPuzzleState, action) {
  switch(action.type) {
    case TOGGLE_PUZZLE_VISIBLE:
      return {
        ...state,
        [action.name]: {
          ...state[action.name],
          visible: !state[action.name].visible
        }
      };
    default:
      return state;
  }
}

export function puzzlesByName(state = puzzleNames, action) {
  switch(action.type) {
    case CHOOSE_NEW_PUZZLE_ORDER: {
      const nextOrder = state.filter(name => name !== action.reorderPuzzle);
      const nextIndex = nextOrder.findIndex(name => name === action.insertBeforePuzzle);
      nextOrder.splice(nextIndex, 0, action.reorderPuzzle);
      return nextOrder;
    }
    default:
      return state;
  }
}