import configureStore from '../configure-store';
import {
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
    dispatchAddSolve, recordedAtCounter, addSolve;

  beforeEach(() => {
    store = configureStore();
    activePuzzle = () => getActivePuzzle(store.getState());
    activePuzzleSolves = () => getActivePuzzleSolves(store.getState());
    solvesByRecordedAt = () => getSolvesByRecordedAt(store.getState());
    selectedActivePuzzleSolves = () => getSelectedActivePuzzleSolves(store.getState());
    lastActivePuzzleSolve = () => getLastActivePuzzleSolve(store.getState());
    activeSolveSummaryValue = () => getActiveSolveSummary(store.getState()).value;
    recordedAtCounter = 0;
    addSolve = (recordedAt, duration, puzzle) =>
      addSolves([{ recordedAt, duration, puzzle }]);
    dispatchAddSolve = (duration = 1000) => {
      store.dispatch(addSolve(++recordedAtCounter, duration, activePuzzle()));
      return recordedAtCounter;
    };
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
    const recordedAt = dispatchAddSolve();
    store.dispatch(deleteSolves([recordedAt]));
    expect(solvesByRecordedAt()).toEqual({});
    expect(activePuzzleSolves()).toEqual([]);
  });

  it('removes a solve when deleteSolves is dispatch with many solves', () => {
    const recordedAt1 = dispatchAddSolve();
    const recordedAt2 = dispatchAddSolve();
    const recordedAt3 = dispatchAddSolve();
    store.dispatch(deleteSolves([recordedAt1, recordedAt3]));
    expect(activePuzzleSolves()).toEqual([
      expect.objectContaining({
        recordedAt: recordedAt2
      })
    ]);
  });

  it('puts back deleted solves when undoLastSolveDelete is dispatched', () => {
    const recordedAt1 = dispatchAddSolve();
    const recordedAt2 = dispatchAddSolve();
    const recordedAt3 = dispatchAddSolve();
    store.dispatch(deleteSolves([recordedAt1, recordedAt3]));
    store.dispatch(undoLastSolveDelete());
    expect(activePuzzleSolves().map(solve => solve.recordedAt)).toEqual(
      [recordedAt3, recordedAt2, recordedAt1]
    );
  });

  it('toggles the selected state of a solve when toggleSolveSelected is dispatched', () => {
    const recordedAt = dispatchAddSolve();
    store.dispatch(toggleSolveSelected(recordedAt));
    expect(selectedActivePuzzleSolves()).toEqual([
      expect.objectContaining({ recordedAt })
    ]);
  });

  it('deletes the selected puzzles when deleteSelectedSolves is dispatched', () => {
    const recordedAt = dispatchAddSolve();
    store.dispatch(toggleSolveSelected(recordedAt));
    store.dispatch(deleteSelectedSolves());
    expect(selectedActivePuzzleSolves()).toEqual([]);
  });

  it('deletes the last solve when deleteLastSolve is dispatched', () => {
    const recordedAt1 = dispatchAddSolve();
    const recordedAt2 = dispatchAddSolve();
    expect(lastActivePuzzleSolve()).toEqual(expect.objectContaining({ recordedAt: recordedAt2 }));
    store.dispatch(deleteLastSolve());
    expect(lastActivePuzzleSolve()).toEqual(expect.objectContaining({ recordedAt: recordedAt1 }));
  });

  it('displays the correct solve summary when there are less than five solves', () => {
    dispatchAddSolve(1000);
    dispatchAddSolve(1500);
    dispatchAddSolve(2000);
    dispatchAddSolve(2500);
    expect(activeSolveSummaryValue()).toBe(0);
  });

  it('displays the correct solve summary when five solves are added', () => {
    dispatchAddSolve(1000);
    dispatchAddSolve(1500);
    dispatchAddSolve(2000);
    dispatchAddSolve(2500);
    dispatchAddSolve(1250);
    expect(activeSolveSummaryValue()).toBe(1583);
  });

  it('calculates the correct solve summary when a solve has a penalty', () => {
    dispatchAddSolve(1000);
    const recordedAt = dispatchAddSolve(1500);
    dispatchAddSolve(2000);
    dispatchAddSolve(2500);
    dispatchAddSolve(1250);
    store.dispatch(toggleSolvePenalty(recordedAt));
    expect(activeSolveSummaryValue()).toBe(1917);
  });

  it('calculates the correct solve summary when a solve is a DNF', () => {
    dispatchAddSolve(1000);
    const recordedAt = dispatchAddSolve(1500);
    dispatchAddSolve(2000);
    dispatchAddSolve(2500);
    dispatchAddSolve(1250);
    store.dispatch(toggleSolveDNF(recordedAt));
    expect(activeSolveSummaryValue()).toBe(1917);
  });

  it('calculates the correct solve summary when more than one solve is a DNF', () => {
    dispatchAddSolve(1000);
    const recordedAt1 = dispatchAddSolve(1500);
    const recordedAt2 = dispatchAddSolve(2000);
    dispatchAddSolve(2500);
    dispatchAddSolve(1250);
    store.dispatch(toggleSolveDNF(recordedAt1));
    store.dispatch(toggleSolveDNF(recordedAt2));
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
