import React, { Component } from 'react';
import MainDrawer from './MainDrawer';
import AppHeader from './AppHeader';
import AppContent from './AppContent';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PuzzleMenu from './PuzzleMenu';
import Button from 'material-ui/Button';
import SwapIcon from 'material-ui-icons/SwapVert';
import './App.css';

class App extends Component {
  render() {
    const { showMenus, onSwitchPuzzle } = this.props;
    return (
      <div className="App">
        {showMenus && <AppHeader />}
        <AppContent />
        <MainDrawer />
        {showMenus &&
          <div className="App-swap-puzzle">
            <Button fab={true} onClick={onSwitchPuzzle}><SwapIcon /></Button>
          </div>
        }
        <PuzzleMenu />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  showMenus: !state.timer.startTime && !state.timer.isReady
});

const mapDispatchToProps = {
  onSwitchPuzzle: () => ({ type: 'TOGGLE_SWITCH_PUZZLE' })
};

// wrap in withRouter to get around lost updates
// https://github.com/ReactTraining/react-router/blob/master/packages/react-router/docs/guides/blocked-updates.md
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
