import { uniq } from 'lodash';
import configureStore from '../configure-store';
import {
  Puzzles,
  getActivePuzzle,
  getVisiblePuzzleNames,
  getPuzzleToReorder,
  getPuzzleNames
} from '../reducers/puzzles';
import {
  setActivePuzzle,
  togglePuzzleVisible,
  startPuzzleReorder,
  chooseNewPuzzleOrder
} from '../actions';

describe('Puzzles map', () => {
  it('has all unique values', () => {
    const values = Object.values(Puzzles);
    expect(values).toEqual(uniq(values));
  });
});

describe('Puzzles state', () => {
  let store;

  beforeEach(() => {
    store = configureStore();
  });

  it('changes the active puzzle', () => {
    store.dispatch(setActivePuzzle(Puzzles.FOUR_BY_FOUR));
    expect(getActivePuzzle(store.getState())).toBe(Puzzles.FOUR_BY_FOUR);
    store.dispatch(setActivePuzzle(Puzzles.FIVE_BY_FIVE));
    expect(getActivePuzzle(store.getState())).toBe(Puzzles.FIVE_BY_FIVE);
  });

  it('toggles the visibility of a puzzle', () => {
    store.dispatch(togglePuzzleVisible(Puzzles.FOUR_BY_FOUR));
    expect(getVisiblePuzzleNames(store.getState())).not.toContain(Puzzles.FOUR_BY_FOUR);
    store.dispatch(togglePuzzleVisible(Puzzles.FOUR_BY_FOUR));
    expect(getVisiblePuzzleNames(store.getState())).toContain(Puzzles.FOUR_BY_FOUR);
  });

  it('marks a puzzle to be reordered', () => {
    store.dispatch(startPuzzleReorder(Puzzles.FOUR_BY_FOUR));
    expect(getPuzzleToReorder(store.getState())).toBe(Puzzles.FOUR_BY_FOUR);
  });

  it('reorders the puzzles', () => {
    const puzzleNames = getPuzzleNames(store.getState());
    const firstPuzzle = puzzleNames[0];
    const lastPuzzle = puzzleNames[puzzleNames.length - 1];
    store.dispatch(chooseNewPuzzleOrder(lastPuzzle, firstPuzzle));
    const nextPuzzleNames = getPuzzleNames(store.getState());
    expect(puzzleNames).not.toEqual(nextPuzzleNames);
    expect(nextPuzzleNames[0]).toBe(lastPuzzle);
    expect(nextPuzzleNames[1]).toBe(firstPuzzle);
  });
});
