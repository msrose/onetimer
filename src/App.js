import React, { Component } from 'react';
import MainDrawer from './MainDrawer';
import AppHeader from './AppHeader';
import AppContent from './AppContent';
import { withRouter } from 'react-router-dom';

class App extends Component {
  render() {
    return (
      <div className="App">
        <AppHeader />
        <AppContent />
        <MainDrawer />
      </div>
    );
  }
}

// wrap in withRouter to get around lost updates
// https://github.com/ReactTraining/react-router/blob/master/packages/react-router/docs/guides/blocked-updates.md
export default withRouter(App);
