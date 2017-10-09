import configureStore from '../configure-store';
import {
  addSolve,
  deleteSolves,
  undoLastSolveDelete,
  toggleSolveSelected,
  deleteSelectedSolves,
  deleteLastSolve,
  toggleSolvePenalty,
  toggleSolveDNF
} from '../actions';
import {
  getActivePuzzleSolves,
  getActivePuzzle,
  getSolvesByRecordedAt,
  getSelectedActivePuzzleSolves,
  getLastActivePuzzleSolve,
  getActiveSolveSummary
} from '../reducers';

describe('Solves reducer', () => {
  let store, activePuzzle, activePuzzleSolves, solvesByRecordedAt,
    selectedActivePuzzleSolves, lastActivePuzzleSolve, activeSolveSummary;

  beforeEach(() => {
    store = configureStore();
    activePuzzle = () => getActivePuzzle(store.getState());
    activePuzzleSolves = () => getActivePuzzleSolves(store.getState());
    solvesByRecordedAt = () => getSolvesByRecordedAt(store.getState());
    selectedActivePuzzleSolves = () => getSelectedActivePuzzleSolves(store.getState());
    lastActivePuzzleSolve = () => getLastActivePuzzleSolve(store.getState());
    activeSolveSummary = () => getActiveSolveSummary(store.getState());
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

  it('toggles the selected state of a solve when toggleSolveSelected is dispatched', () => {
    store.dispatch(addSolve(1, 1000, activePuzzle()));
    store.dispatch(toggleSolveSelected(1));
    expect(selectedActivePuzzleSolves()).toEqual([
      expect.objectContaining({ recordedAt: 1 })
    ]);
  });

  it('deletes the selected puzzles when deleteSelectedSolves is dispatched', () => {
    store.dispatch(addSolve(1, 1000, activePuzzle()));
    store.dispatch(toggleSolveSelected(1));
    store.dispatch(deleteSelectedSolves());
    expect(selectedActivePuzzleSolves()).toEqual([]);
  });

  it('deletes the last solve when deleteLastSolve is dispatched', () => {
    store.dispatch(addSolve(1, 1000, activePuzzle()));
    store.dispatch(addSolve(2, 1000, activePuzzle()));
    expect(lastActivePuzzleSolve()).toEqual(expect.objectContaining({ recordedAt: 2 }));
    store.dispatch(deleteLastSolve());
    expect(lastActivePuzzleSolve()).toEqual(expect.objectContaining({ recordedAt: 1 }));
  });

  it('displays the correct solve summary when there are less than five solves', () => {
    store.dispatch(addSolve(1, 1000, activePuzzle()));
    store.dispatch(addSolve(2, 1500, activePuzzle()));
    store.dispatch(addSolve(3, 2000, activePuzzle()));
    store.dispatch(addSolve(4, 2500, activePuzzle()));
    expect(activeSolveSummary()).toBe(0);
  });

  it('displays the correct solve summary when five solves are added', () => {
    store.dispatch(addSolve(1, 1000, activePuzzle()));
    store.dispatch(addSolve(2, 1500, activePuzzle()));
    store.dispatch(addSolve(3, 2000, activePuzzle()));
    store.dispatch(addSolve(4, 2500, activePuzzle()));
    store.dispatch(addSolve(5, 1250, activePuzzle()));
    expect(activeSolveSummary()).toBe(1583);
  });

  it('calculates the correct solve summary when a solve has a penalty', () => {
    store.dispatch(addSolve(1, 1000, activePuzzle()));
    store.dispatch(addSolve(2, 1500, activePuzzle()));
    store.dispatch(addSolve(3, 2000, activePuzzle()));
    store.dispatch(addSolve(4, 2500, activePuzzle()));
    store.dispatch(addSolve(5, 1250, activePuzzle()));
    store.dispatch(toggleSolvePenalty(2));
    expect(activeSolveSummary()).toBe(1917);
  });

  it('calculates the correct solve summary when a solve is a DNF', () => {
    store.dispatch(addSolve(1, 1000, activePuzzle()));
    store.dispatch(addSolve(2, 1500, activePuzzle()));
    store.dispatch(addSolve(3, 2000, activePuzzle()));
    store.dispatch(addSolve(4, 2500, activePuzzle()));
    store.dispatch(addSolve(5, 1250, activePuzzle()));
    store.dispatch(toggleSolveDNF(2));
    expect(activeSolveSummary()).toBe(1917);
  });

  it('calculates the correct solve summary when more than one solve is a DNF', () => {
    store.dispatch(addSolve(1, 1000, activePuzzle()));
    store.dispatch(addSolve(2, 1500, activePuzzle()));
    store.dispatch(addSolve(3, 2000, activePuzzle()));
    store.dispatch(addSolve(4, 2500, activePuzzle()));
    store.dispatch(addSolve(5, 1250, activePuzzle()));
    store.dispatch(toggleSolveDNF(2));
    store.dispatch(toggleSolveDNF(3));
    expect(activeSolveSummary()).toBe(Infinity);
  });
});
