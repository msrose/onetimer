import React, { Component } from 'react';
import { MenuItem, MenuList } from 'material-ui/Menu';
import Drawer from 'material-ui/Drawer';
import { connect } from 'react-redux';
import './PuzzleMenu.css';
import { getPuzzleNames } from './reducers';

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
  onRequestClose: () => dispatch({ type: 'TOGGLE_SWITCH_PUZZLE' }),
  onChange: puzzle => {
    dispatch({ type: 'SET_ACTIVE_PUZZLE', puzzle });
    dispatch({ type: 'TOGGLE_SWITCH_PUZZLE' });
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(PuzzleMenu);
