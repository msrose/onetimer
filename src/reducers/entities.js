const initialEntityState = {
  solves: {},
  solvesByRecordedAt: [],
  activePuzzle: '3x3x3'
};

export const getActivePuzzleSolves = state => {
  const { solves, solvesByRecordedAt, activePuzzle } = state.entities;
  return solvesByRecordedAt
    .map(recordedAt => solves[recordedAt])
    .filter(solve => solve.puzzle === activePuzzle);
};

export const getLastSolve = state => {
  const { solves, solvesByRecordedAt } = state.entities;
  return solves[solvesByRecordedAt[0]] || null;
};

export const getLastSolveDuration = state => {
  const lastSolve = getLastSolve(state);
  return lastSolve ? lastSolve.duration : 0;
};

function entities(state = initialEntityState, action) {
  switch(action.type) {
    case 'ADD_SOLVE':
      return {
        ...state,
        solves: {
          ...state.solves,
          [action.recordedAt]: {
            recordedAt: action.recordedAt,
            duration: action.duration,
            puzzle: action.puzzle
          }
        },
        solvesByRecordedAt: [action.recordedAt].concat(state.solvesByRecordedAt)
      }
    case 'SET_ACTIVE_PUZZLE':
      return { ...state, activePuzzle: action.puzzle };
    default:
      return state;
  }
}

export default entities;
