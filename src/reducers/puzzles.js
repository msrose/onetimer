import {
  SET_ACTIVE_PUZZLE, TOGGLE_PUZZLE_VISIBLE, START_PUZZLE_REORDER, CHOOSE_NEW_PUZZLE_ORDER
} from '../actions';

export const Puzzles = {
  TWO_BY_TWO: '2x2x2',
  THREE_BY_THREE: '3x3x3',
  FOUR_BY_FOUR: '4x4x4',
  FIVE_BY_FIVE: '5x5x5',
  SIX_BY_SIX: '6x6x6',
  SEVEN_BY_SEVEN: '7x7x7',
  THREE_BLD: '3x3x3 Blindfolded',
  THREE_OH: '3x3x3 One-Handed',
  THREE_FEET: '3x3x3 With Feet',
  MEGAMINX: 'Megaminx',
  PYRAMINX: 'Pyraminx',
  CLOCK: 'Clock',
  SKEWB: 'Skewb',
  SQUARE_1: 'Square-1',
  FOUR_BLD: '4x4x4 Blindfolded',
  FIVE_BLD: '5x5x5 Blindfolded',
  THREE_MULTI_BLD: '3x3x3 Multi-Blind'
};

const puzzleNames = Object.values(Puzzles);

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
  return state.activePuzzle;
};

export const getPuzzleToReorder = state => {
  return state.puzzleToReorder;
};

export function activePuzzle(state = Puzzles.THREE_BY_THREE, action) {
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
