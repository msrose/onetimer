import React, { Component } from 'react';
import { MenuItem, MenuList } from 'material-ui/Menu';
import Drawer from 'material-ui/Drawer';
import { connect } from 'react-redux';
import './PuzzleMenu.css';
import { getVisiblePuzzleNames, getActivePuzzle, getSolveCounts } from '../reducers';
import { toggleSwitchPuzzle, setActivePuzzle } from '../actions';

class PuzzleMenuItem extends Component {
  handleClick = () => {
    this.props.onClick(this.props.name);
  };

  render() {
    const { selected, name, count = 0 } = this.props;
    return (
      <MenuItem onClick={this.handleClick} selected={selected}>
        <div className="PuzzleMenuItem-inner-wrapper">
          <span>{name}</span>
          {count > 0 && <span className="PuzzleMenuItem-count">{count} {count === 1 ? 'solve' : 'solves'}</span>}
        </div>
      </MenuItem>
    );
  }
}

const PuzzleMenu = ({ open, onRequestClose, activePuzzle, onChange, puzzles, solveCounts }) => (
  <Drawer open={open} anchor="bottom" onRequestClose={onRequestClose}>
    <MenuList className="PuzzleMenu-menu-list">
      {puzzles.map(name => (
        <PuzzleMenuItem onClick={onChange} name={name} selected={name === activePuzzle} key={name} count={solveCounts[name]} />
      ))}
    </MenuList>
  </Drawer>
);

const mapStateToProps = state => {
  return {
    open: state.ui.isSwitchPuzzleOpen,
    activePuzzle: getActivePuzzle(state),
    puzzles: getVisiblePuzzleNames(state),
    solveCounts: getSolveCounts(state)
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
