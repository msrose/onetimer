import React, { Component } from 'react';
import MenuIcon from 'material-ui-icons/Menu';
import IconButton from 'material-ui/IconButton';
import { connect } from 'react-redux';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import './AppHeader.css';
import { toggleDrawer, deleteSolves } from '../actions';
import DeleteIcon from 'material-ui-icons/Delete';
import { Route } from 'react-router-dom';
import {
  getHasActiveSelectedSolves, getSelectedActivePuzzleSolves, getActivePuzzle
} from '../reducers';

class AppHeader extends Component {
  handleDeleteClick = () => {
    this.props.onDeleteClick(this.props.selectedSolves);
  };

  render() {
    const { onMenuClick, puzzle, showSolveControls } = this.props;
    return (
      <div className="AppHeader">
        <AppBar position="fixed" color="default">
          <Toolbar>
            <IconButton onClick={onMenuClick}><MenuIcon /></IconButton>
            <Typography type="headline" className="AppHeader-title">{puzzle}</Typography>
            {showSolveControls &&
              <Route
                path="/solves"
                component={() =>
                  <IconButton onClick={this.handleDeleteClick}><DeleteIcon /></IconButton>
                }
              />
            }
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  puzzle: getActivePuzzle(state),
  showSolveControls: getHasActiveSelectedSolves(state),
  selectedSolves: getSelectedActivePuzzleSolves(state)
});

const mapDispatchToProps = {
  onMenuClick: toggleDrawer,
  onDeleteClick: deleteSolves
};

export default connect(mapStateToProps, mapDispatchToProps)(AppHeader);
