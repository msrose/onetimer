import React, { Component } from 'react';
import { MenuItem, MenuList } from 'material-ui/Menu';
import Drawer from 'material-ui/Drawer';
import { connect } from 'react-redux';
import './PuzzleMenu.css';
import { getPuzzleNames } from '../reducers';
import { toggleSwitchPuzzle, setActivePuzzle } from '../actions';

class PuzzleMenuItem extends Component {
  handleClick = () => {
    this.props.onClick(this.props.name);
  };

  render() {
    const { selected, name } = this.props;
    return <MenuItem onClick={this.handleClick} selected={selected}>{name}</MenuItem>
  }
}

const PuzzleMenu = ({ open, onRequestClose, activePuzzle, onChange, puzzles }) => (
  <Drawer open={open} anchor="bottom" onRequestClose={onRequestClose}>
    <MenuList className="PuzzleMenu-menu-list">
      {puzzles.map(name => (
        <PuzzleMenuItem onClick={onChange} name={name} selected={name === activePuzzle} key={name} />
      ))}
    </MenuList>
  </Drawer>
);

const mapStateToProps = state => {
  return {
    open: state.ui.isSwitchPuzzleOpen,
    activePuzzle: state.entities.activePuzzle,
    puzzles: getPuzzleNames(state)
  };
};

const mapDispatchToProps = dispatch => ({
  onRequestClose: () => dispatch(toggleSwitchPuzzle()),
  onChange: puzzle => {
    dispatch(setActivePuzzle(puzzle));
    dispatch(toggleSwitchPuzzle());
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(PuzzleMenu);
