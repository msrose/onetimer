import React from 'react';
import Button from 'material-ui/Button';
import './Timer.css';
import { connect } from 'react-redux';
import SwapIcon from 'material-ui-icons/SwapVert';
import Menu, { MenuItem } from 'material-ui/Menu';

const puzzles = [
  '2x2x2', '3x3x3', '4x4x4', '5x5x5', '6x6x6', '7x7x7'
];

const PuzzleMenuItem = ({ onClick, name, selected }) => (
  <MenuItem onClick={() => onClick(name)} selected={selected}>{name}</MenuItem>
);

const Timer = ({ puzzle, onSwitchPuzzle, onChangePuzzle, isSwitchPuzzleOpen }) => (
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
    <Menu open={isSwitchPuzzleOpen} onRequestClose={onSwitchPuzzle}>
      {puzzles.map(name => (
        <PuzzleMenuItem onClick={onChangePuzzle} name={name} selected={name === puzzle} key={name} />
      ))}
    </Menu>
  </div>
);

const mapStateToProps = state => {
  return {
    puzzle: state.timer.puzzle,
    isSwitchPuzzleOpen: state.ui.isSwitchPuzzleOpen
  };
};

const mapDispatchToProps = dispatch => ({
  onSwitchPuzzle: () => dispatch({ type: 'TOGGLE_SWITCH_PUZZLE' }),
  onChangePuzzle: puzzle => {
    dispatch({ type: 'SET_PUZZLE', puzzle });
    dispatch({ type: 'TOGGLE_SWITCH_PUZZLE' });
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Timer);
