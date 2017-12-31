import configureStore from '../configure-store';
import {
  addSolve,
  addSolves,
  deleteSolves,
  undoLastSolveDelete,
  toggleSolveSelected,
  deleteSelectedSolves,
  deleteLastSolve,
  toggleSolvePenalty,
  toggleSolveDNF,
  setActivePuzzle
} from '../actions';
import {
  getActivePuzzleSolves,
  getActivePuzzle,
  getSolvesByRecordedAt,
  getSelectedActivePuzzleSolves,
  getLastActivePuzzleSolve,
  getActiveSolveSummary,
  Puzzles
} from '../reducers';

describe('Solves reducer', () => {
  let store, activePuzzle, activePuzzleSolves, solvesByRecordedAt,
    selectedActivePuzzleSolves, lastActivePuzzleSolve, activeSolveSummaryValue,
    dispatchAddSolve, recordedAtCounter;

  beforeEach(() => {
    store = configureStore();
    activePuzzle = () => getActivePuzzle(store.getState());
    activePuzzleSolves = () => getActivePuzzleSolves(store.getState());
    solvesByRecordedAt = () => getSolvesByRecordedAt(store.getState());
    selectedActivePuzzleSolves = () => getSelectedActivePuzzleSolves(store.getState());
    lastActivePuzzleSolve = () => getLastActivePuzzleSolve(store.getState());
    activeSolveSummaryValue = () => getActiveSolveSummary(store.getState()).value;
    recordedAtCounter = 0;
    dispatchAddSolve = duration => store.dispatch(addSolve(++recordedAtCounter, duration, activePuzzle()));
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
    expect(activeSolveSummaryValue()).toBe(0);
  });

  it('displays the correct solve summary when five solves are added', () => {
    store.dispatch(addSolve(1, 1000, activePuzzle()));
    store.dispatch(addSolve(2, 1500, activePuzzle()));
    store.dispatch(addSolve(3, 2000, activePuzzle()));
    store.dispatch(addSolve(4, 2500, activePuzzle()));
    store.dispatch(addSolve(5, 1250, activePuzzle()));
    expect(activeSolveSummaryValue()).toBe(1583);
  });

  it('calculates the correct solve summary when a solve has a penalty', () => {
    store.dispatch(addSolve(1, 1000, activePuzzle()));
    store.dispatch(addSolve(2, 1500, activePuzzle()));
    store.dispatch(addSolve(3, 2000, activePuzzle()));
    store.dispatch(addSolve(4, 2500, activePuzzle()));
    store.dispatch(addSolve(5, 1250, activePuzzle()));
    store.dispatch(toggleSolvePenalty(2));
    expect(activeSolveSummaryValue()).toBe(1917);
  });

  it('calculates the correct solve summary when a solve is a DNF', () => {
    store.dispatch(addSolve(1, 1000, activePuzzle()));
    store.dispatch(addSolve(2, 1500, activePuzzle()));
    store.dispatch(addSolve(3, 2000, activePuzzle()));
    store.dispatch(addSolve(4, 2500, activePuzzle()));
    store.dispatch(addSolve(5, 1250, activePuzzle()));
    store.dispatch(toggleSolveDNF(2));
    expect(activeSolveSummaryValue()).toBe(1917);
  });

  it('calculates the correct solve summary when more than one solve is a DNF', () => {
    store.dispatch(addSolve(1, 1000, activePuzzle()));
    store.dispatch(addSolve(2, 1500, activePuzzle()));
    store.dispatch(addSolve(3, 2000, activePuzzle()));
    store.dispatch(addSolve(4, 2500, activePuzzle()));
    store.dispatch(addSolve(5, 1250, activePuzzle()));
    store.dispatch(toggleSolveDNF(2));
    store.dispatch(toggleSolveDNF(3));
    expect(activeSolveSummaryValue()).toBe(Infinity);
  });

  it('calculates the correct solve summary for 6x6x6', () => {
    store.dispatch(setActivePuzzle(Puzzles.SIX_BY_SIX));
    dispatchAddSolve(1000);
    dispatchAddSolve(2003);
    dispatchAddSolve(3000);
    expect(activeSolveSummaryValue()).toBe(2001);
  });

  it('calculates the correct solve summary for 7x7x7', () => {
    store.dispatch(setActivePuzzle(Puzzles.SEVEN_BY_SEVEN));
    dispatchAddSolve(1000);
    dispatchAddSolve(2003);
    dispatchAddSolve(3000);
    expect(activeSolveSummaryValue()).toBe(2001);
  });

  it('calculates the correct solve summary for 3x3x3 Blindfolded', () => {
    store.dispatch(setActivePuzzle(Puzzles.THREE_BLD));
    dispatchAddSolve(1000);
    dispatchAddSolve(2003);
    dispatchAddSolve(3000);
    expect(activeSolveSummaryValue()).toBe(1000);
  });

  it('calculates the correct solve summary for 4x4x4 Blindfolded', () => {
    store.dispatch(setActivePuzzle(Puzzles.FOUR_BLD));
    dispatchAddSolve(1000);
    dispatchAddSolve(2003);
    expect(activeSolveSummaryValue()).toBe(1000);
  });

  it('calculates the correct solve summary for 5x5x5 Blindfolded', () => {
    store.dispatch(setActivePuzzle(Puzzles.FIVE_BLD));
    dispatchAddSolve(1000);
    dispatchAddSolve(2003);
    expect(activeSolveSummaryValue()).toBe(1000);
  });

  it('adds multiple solves when addSolves is dispatched', () => {
    const solves = [{
      recordedAt: 1,
      duration: 1000,
      puzzle: activePuzzle()
    }, {
      recordedAt: 2,
      duration: 2000,
      puzzle: activePuzzle()
    }];
    store.dispatch(addSolves(solves));
    expect(activePuzzleSolves().length).toBe(solves.length);
  });
});
