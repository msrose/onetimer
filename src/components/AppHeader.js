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
import { getHasActiveSelectedSolves, getSelectedActivePuzzleSolves } from '../reducers';

class AppHeader extends Component {
  handleDeleteClick = () => {
    this.props.onDeleteClick(this.props.selectedSolves);
  };

  render() {
    const { onMenuClick, puzzle, showDelete } = this.props;
    return (
      <div className="AppHeader">
        <AppBar position="fixed" color="default">
          <Toolbar>
            <IconButton onClick={onMenuClick}><MenuIcon /></IconButton>
            <Typography type="headline" className="AppHeader-title">{puzzle}</Typography>
            {showDelete &&
              <Route path="/solves">
                <IconButton onClick={this.handleDeleteClick}><DeleteIcon /></IconButton>
              </Route>
            }
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  puzzle: state.entities.activePuzzle,
  showDelete: getHasActiveSelectedSolves(state),
  selectedSolves: getSelectedActivePuzzleSolves(state)
});

const mapDispatchToProps = {
  onMenuClick: toggleDrawer,
  onDeleteClick: deleteSolves
};

export default connect(mapStateToProps, mapDispatchToProps)(AppHeader);
