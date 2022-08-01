import React from 'react';
import MenuIcon from 'material-ui-icons/Menu';
import IconButton from 'material-ui/IconButton';
import { connect } from 'react-redux';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import './AppHeader.css';
import { toggleDrawer } from '../actions';
import { Route, Switch } from 'react-router-dom';
import { getHasActiveSelectedSolves, getLastActivePuzzleSolve } from '../reducers/solves';
import { DeleteSelectedSolvesButton, DeleteLastSolveButton } from './DeleteSolvesButton';
import { withRouter } from 'react-router-dom';
import LastSolveOptionsMenu from './LastSolveOptionsMenu';
import PuzzleTitle from './PuzzleTitle';

const AppHeader = ({ onMenuClick, showSolveControls, hasActiveLastSolve }) => (
  <div className="AppHeader">
    <AppBar position="fixed" color="default">
      <Toolbar>
        <IconButton onClick={onMenuClick}><MenuIcon /></IconButton>
        <Typography type="headline" className="AppHeader-title">
          <Switch>
            {/* eslint-disable react/jsx-no-bind */}
            <Route path="/settings" render={() => <span>Settings</span>} />
            <Route component={PuzzleTitle} />
            {/* eslint-enable react/jsx-no-bind */}
          </Switch>
        </Typography>
        {showSolveControls &&
          <Route path="/solves" component={DeleteSelectedSolvesButton} />
        }
        {hasActiveLastSolve && [
          <Route key="delete" path="/timer" component={DeleteLastSolveButton} />,
          <Route key="more" path="/timer" component={LastSolveOptionsMenu} />
        ]}
      </Toolbar>
    </AppBar>
  </div>
);

const mapStateToProps = state => ({
  showSolveControls: getHasActiveSelectedSolves(state),
  hasActiveLastSolve: !!getLastActivePuzzleSolve(state)
});

const mapDispatchToProps = {
  onMenuClick: toggleDrawer
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AppHeader));
