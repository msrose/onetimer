import React, { Component } from 'react';
import Menu, { MenuItem } from 'material-ui/Menu';
import { connect } from 'react-redux';

class PuzzleMenuItem extends Component {
  handleClick = () => {
    this.props.onClick(this.props.name);
  };

  render() {
    const { selected, name } = this.props;
    return <MenuItem onClick={this.handleClick} selected={selected}>{name}</MenuItem>
  }
}

const puzzles = [
  '2x2x2', '3x3x3', '4x4x4', '5x5x5', '6x6x6', '7x7x7'
];

const PuzzleMenu = ({ open, onRequestClose, puzzle, onChange }) => (
  <Menu open={open} onRequestClose={onRequestClose}>
    {puzzles.map(name => (
      <PuzzleMenuItem onClick={onChange} name={name} selected={name === puzzle} key={name} />
    ))}
  </Menu>
);

const mapStateToProps = state => {
  return {
    open: state.ui.isSwitchPuzzleOpen,
    puzzle: state.timer.puzzle
  };
};

const mapDispatchToProps = dispatch => ({
  onRequestClose: () => dispatch({ type: 'TOGGLE_SWITCH_PUZZLE' }),
  onChange: puzzle => {
    dispatch({ type: 'SET_PUZZLE', puzzle });
    dispatch({ type: 'TOGGLE_SWITCH_PUZZLE' });
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(PuzzleMenu);
