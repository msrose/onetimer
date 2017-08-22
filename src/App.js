import React, { Component } from 'react';
import MainDrawer from './MainDrawer';
import AppHeader from './AppHeader';
import AppContent from './AppContent';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PuzzleMenu from './PuzzleMenu';

class App extends Component {
  render() {
    const { showMenus } = this.props;
    return (
      <div className="App">
        {showMenus && <AppHeader />}
        <AppContent />
        <MainDrawer />
        <PuzzleMenu />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  showMenus: !state.timer.startTime && !state.timer.isReady
});

// wrap in withRouter to get around lost updates
// https://github.com/ReactTraining/react-router/blob/master/packages/react-router/docs/guides/blocked-updates.md
export default withRouter(connect(mapStateToProps)(App));
