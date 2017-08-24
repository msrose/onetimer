import configureStore from '../configure-store';
import { addSolve, deleteSolves, undoLastSolveDelete } from '../actions';
import { getActivePuzzleSolves, getActivePuzzle, getSolvesByRecordedAt } from '../reducers';

describe('Solves reducer', () => {
  let store, activePuzzle, activePuzzleSolves, solvesByRecordedAt;

  beforeEach(() => {
    store = configureStore();
    activePuzzle = () => getActivePuzzle(store.getState());
    activePuzzleSolves = () => getActivePuzzleSolves(store.getState());
    solvesByRecordedAt = () => getSolvesByRecordedAt(store.getState());
  });

  it('adds a solve when addSolve is dispatched', () => {
    store.dispatch(addSolve(1, 1000, activePuzzle()));
    expect(activePuzzleSolves()).toEqual([
      expect.objectContaining({
        recordedAt: 1,
        duration: 1000
      })
    ]);
  });

  it('adds solves in descending timestamp order', () => {
    store.dispatch(addSolve(1, 1000, activePuzzle()));
    store.dispatch(addSolve(3, 1000, activePuzzle()));
    store.dispatch(addSolve(2, 1000, activePuzzle()));
    expect(activePuzzleSolves().map(solve => solve.recordedAt)).toEqual([3, 2, 1]);
  });

  it('removes a solve when deleteSolves is dispatched with one solve', () => {
    store.dispatch(addSolve(1, 1000, activePuzzle()));
    store.dispatch(deleteSolves([1]));
    expect(solvesByRecordedAt()).toEqual({});
    expect(activePuzzleSolves()).toEqual([]);
  });

  it('removes a solve when deleteSolves is dispatch with many solves', () => {
    store.dispatch(addSolve(1, 1000, activePuzzle()));
    store.dispatch(addSolve(2, 1000, activePuzzle()));
    store.dispatch(addSolve(3, 1000, activePuzzle()));
    store.dispatch(deleteSolves([1, 3]));
    expect(activePuzzleSolves()).toEqual([
      expect.objectContaining({
        recordedAt: 2
      })
    ]);
  });

  it('puts back deleted solves when undoLastSolveDelete is dispatched', () => {
    store.dispatch(addSolve(1, 1000, activePuzzle()));
    store.dispatch(addSolve(2, 1000, activePuzzle()));
    store.dispatch(addSolve(3, 1000, activePuzzle()));
    store.dispatch(deleteSolves([1, 3]));
    store.dispatch(undoLastSolveDelete());
    expect(activePuzzleSolves().map(solve => solve.recordedAt)).toEqual([3, 2, 1]);
  });
});
