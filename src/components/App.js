import React from 'react';
import MainDrawer from './MainDrawer';
import AppHeader from './AppHeader';
import AppContent from './AppContent';
import { withRouter, Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import PuzzleMenu from './PuzzleMenu';
import SwitchPuzzleButton from './SwitchPuzzleButton';
import { getIsTiming, getIsReady } from '../reducers';

const App = ({ showGlobalControls }) => (
  <div className="App">
    {showGlobalControls && <AppHeader />}
    <AppContent />
    <MainDrawer />
    {showGlobalControls &&
      <Switch>
        <Route path="/settings" component={null} />
        <Route component={SwitchPuzzleButton} />
      </Switch>
    }
    <PuzzleMenu />
  </div>
);

const mapStateToProps = state => ({
  showGlobalControls: !getIsTiming(state) && !getIsReady(state)
});

// wrap in withRouter to get around lost updates
// https://github.com/ReactTraining/react-router/blob/master/packages/react-router/docs/guides/blocked-updates.md
export default withRouter(connect(mapStateToProps)(App));
