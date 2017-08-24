import React from 'react';
import MenuIcon from 'material-ui-icons/Menu';
import IconButton from 'material-ui/IconButton';
import { connect } from 'react-redux';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import './AppHeader.css';
import { toggleDrawer } from '../actions';
import { Route } from 'react-router-dom';
import { getHasActiveSelectedSolves, getActivePuzzle } from '../reducers';
import DeleteSolvesButton from './DeleteSolvesButton';
import { withRouter } from 'react-router-dom';

const AppHeader = ({ onMenuClick, puzzle, showSolveControls }) => (
  <div className="AppHeader">
    <AppBar position="fixed" color="default">
      <Toolbar>
        <IconButton onClick={onMenuClick}><MenuIcon /></IconButton>
        <Typography type="headline" className="AppHeader-title">{puzzle}</Typography>
        {showSolveControls &&
          <Route path="/solves" component={DeleteSolvesButton} />
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
  onMenuClick: toggleDrawer
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AppHeader));
