import React from 'react';
import { Timer } from './Timer';
import { mount } from 'enzyme';
import NoSleep from '../no-sleep';
import Puzzles from '../reducers';

jest.mock('../no-sleep');

describe('Timer component', () => {
  let tree;

  beforeEach(() => {
    tree = mount(
      <Timer
        isTiming={false}
        onTimerEnter={jest.fn()}
        onTimerLeave={jest.fn()}
        isReader={false}
        isPreparing={false}
        lastSolveDuration={0}
        displayCounter={0}
        latestBatch={[]}
        activePuzzle={Puzzles.THREE_BY_THREE}
      />
    );
    NoSleep.prototype.enable.mockReset();
    NoSleep.prototype.disable.mockReset();
  });

  it('enables no sleep functionality when the timer starts', () => {
    expect(NoSleep.prototype.enable).not.toHaveBeenCalled();
    tree.setProps({ isTiming: true });
    expect(NoSleep.prototype.enable).toHaveBeenCalled();
  });

  it('disables no sleep functionality when the timer stops', () => {
    expect(NoSleep.prototype.disable).not.toHaveBeenCalled();
    tree.setProps({ isTiming: true });
    tree.setProps({ isTiming: false });
    expect(NoSleep.prototype.disable).toHaveBeenCalled();
  });
});
