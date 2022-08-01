import configureStore from '../configure-store';
import { getIsPreparing, getIsReady, getIsTiming } from '../reducers/timer';
import { enterTimer, leaveTimer, MS_TO_READY } from '../actions';

jest.useFakeTimers();

describe('Timer reducer', () => {
  let store, isReady, isPreparing, isTiming;

  beforeEach(() => {
    store = configureStore();
    isPreparing = () => getIsPreparing(store.getState());
    isReady = () => getIsReady(store.getState());
    isTiming = () => getIsTiming(store.getState());
  });

  afterEach(() => {
    // Between tests, get rid of any accumulated setInterval calls from the timer display
    jest.clearAllTimers();
  });

  it('enters the preparing state when the enterTimer action is dispatched', () => {
    expect(isPreparing()).toBe(false);
    store.dispatch(enterTimer());
    expect(isPreparing()).toBe(true);
  });

  it('stops preparing without becoming ready if leaveTimer is dispatched too soon', () => {
    store.dispatch(enterTimer());
    expect(isPreparing()).toBe(true);
    expect(isReady()).toBe(false);
    jest.runTimersToTime(MS_TO_READY - 1);
    expect(isReady()).toBe(false);
    store.dispatch(leaveTimer());
    expect(isTiming()).toBe(false);
  });

  it('enters the ready state if prepared for long enough', () => {
    store.dispatch(enterTimer());
    expect(isReady()).toBe(false);
    jest.runTimersToTime(MS_TO_READY);
    expect(isReady()).toBe(true);
  });

  it('starts timing if leaveTimer is disptched when ready', () => {
    store.dispatch(enterTimer());
    jest.runAllTimers();
    expect(isTiming()).toBe(false);
    store.dispatch(leaveTimer());
    expect(isTiming()).toBe(true);
  });

  it('stops timing when enterTimer is dispatched when timing', () => {
    store.dispatch(enterTimer());
    jest.runAllTimers();
    store.dispatch(leaveTimer());
    expect(isTiming()).toBe(true);
    store.dispatch(enterTimer());
    expect(isTiming()).toBe(false);
  });
});
