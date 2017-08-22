import React from 'react';
import Button from 'material-ui/Button';
import './Timer.css';
import { connect } from 'react-redux';
import SwapIcon from 'material-ui-icons/SwapVert';
import PuzzleMenu from './PuzzleMenu';

const Timer = ({ puzzle, onSwitchPuzzle }) => (
  <div className="Timer">
    <div className="Timer-display">
      00:00.000
    </div>
    <div className="Timer-puzzle">
      {puzzle}
    </div>
    <div className="Timer-swap">
      <Button fab={true} onClick={onSwitchPuzzle}><SwapIcon /></Button>
    </div>
    <PuzzleMenu />
  </div>
);

const mapStateToProps = state => {
  return {
    puzzle: state.timer.puzzle
  };
};

const mapDispatchToProps = {
  onSwitchPuzzle: () => ({ type: 'TOGGLE_SWITCH_PUZZLE' }),
};

export default connect(mapStateToProps, mapDispatchToProps)(Timer);
