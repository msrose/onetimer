import React from 'react';
import MenuIcon from 'material-ui-icons/Menu';
import IconButton from 'material-ui/IconButton';
import { connect } from 'react-redux';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import './AppHeader.css';
import { toggleDrawer, deleteSelectedSolves } from '../actions';
import DeleteIcon from 'material-ui-icons/Delete';
import { Route } from 'react-router-dom';
import { getHasActiveSelectedSolves, getActivePuzzle } from '../reducers';

const AppHeader = ({ onMenuClick, puzzle, showSolveControls, onDeleteClick }) => (
  <div className="AppHeader">
    <AppBar position="fixed" color="default">
      <Toolbar>
        <IconButton onClick={onMenuClick}><MenuIcon /></IconButton>
        <Typography type="headline" className="AppHeader-title">{puzzle}</Typography>
        {showSolveControls &&
          <Route
            path="/solves"
            component={() =>
              <IconButton onClick={onDeleteClick}><DeleteIcon /></IconButton>
            }
          />
        }
      </Toolbar>
    </AppBar>
  </div>
);

const mapStateToProps = state => ({
  puzzle: getActivePuzzle(state),
  showSolveControls: getHasActiveSelectedSolves(state)
});

const mapDispatchToProps = {
  onMenuClick: toggleDrawer,
  onDeleteClick: deleteSelectedSolves
};

export default connect(mapStateToProps, mapDispatchToProps)(AppHeader);
