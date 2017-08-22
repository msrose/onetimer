import React, { Component } from 'react';
import { MenuItem, MenuList } from 'material-ui/Menu';
import Drawer from 'material-ui/Drawer';
import { connect } from 'react-redux';
import './PuzzleMenu.css';

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
  '2x2x2', '3x3x3', '4x4x4', '5x5x5', '6x6x6', '7x7x7',
  '3x3x3 OH', '3x3x3 BLD', 'Skewb', 'Clock', '3x3x3 Multi BLD',
  'Pyraminx', 'Megaminx'
];

const PuzzleMenu = ({ open, onRequestClose, puzzle, onChange }) => (
  <Drawer open={open} anchor="bottom" onRequestClose={onRequestClose}>
    <MenuList className="PuzzleMenu-menu-list">
      {puzzles.map(name => (
        <PuzzleMenuItem onClick={onChange} name={name} selected={name === puzzle} key={name} />
      ))}
    </MenuList>
  </Drawer>
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
