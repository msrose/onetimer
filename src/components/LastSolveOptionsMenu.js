import React, { PureComponent } from 'react';
import MoreVertIcon from 'material-ui-icons/MoreVert';
import { connect } from 'react-redux';
import IconButton from 'material-ui/IconButton';
import { toggleLastSolveOptionsMenu, toggleLastSolveDNF, toggleLastSolvePenalty } from '../actions';
import { getLastActivePuzzleSolve } from '../reducers';
import Popover from 'material-ui/Popover';
import List, { ListItem, ListItemText } from 'material-ui/List';
import Checkbox from 'material-ui/Checkbox';

class LastSolveOptionsMenu extends PureComponent {
  anchorRef = null;

  getAnchorRef = element => {
    this.anchorRef = element;
  };

  handlePenalty = () => {
    this.props.onPenalty();
    this.props.onRequestClose();
  };

  handleDNF = () => {
    this.props.onDNF();
    this.props.onRequestClose();
  };

  render() {
    const { onClick, open, lastSolve, onRequestClose } = this.props;
    return (
      <div ref={this.getAnchorRef}>
        <IconButton onClick={onClick}>
          <MoreVertIcon />
        </IconButton>
        <Popover
          open={open}
          onRequestClose={onRequestClose}
          anchorEl={this.anchorRef}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center'
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right'
          }}
        >
          <List>
            <ListItem button={true} dense={true} onClick={this.handlePenalty}>
              <Checkbox checked={lastSolve && lastSolve.hasPenalty} disableRipple={true} />
              <ListItemText primary="+2" />
            </ListItem>
            <ListItem button={true} dense={true} onClick={this.handleDNF}>
              <Checkbox checked={lastSolve && lastSolve.isDNF} disableRipple={true} />
              <ListItemText primary="DNF" />
            </ListItem>
          </List>
        </Popover>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  open: state.ui.isLastSolveOptionsMenuOpen,
  lastSolve: getLastActivePuzzleSolve(state)
});

const mapDispatchToProps = {
  onClick: toggleLastSolveOptionsMenu,
  onDNF: toggleLastSolveDNF,
  onPenalty: toggleLastSolvePenalty,
  onRequestClose: toggleLastSolveOptionsMenu
};

export default connect(mapStateToProps, mapDispatchToProps)(LastSolveOptionsMenu);
