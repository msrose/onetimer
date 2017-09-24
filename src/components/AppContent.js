import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import Timer from './Timer';
import Solves from './Solves';
import Settings from './Settings';
import Sync from './Sync';
import DeletedSolveMessage from './DeletedSolveMessage';

// import AppBarMargin from './AppBarMargin';

// const Graphs = () => <AppBarMargin>Graphs</AppBarMargin>;

const AppContent = () => (
  <div className="AppContent">
    <Switch>
      <Route path="/timer" component={Timer} />
      <Route path="/solves" component={Solves} />
      {/* <Route path="/graphs" component={Graphs} /> */}
      <Route path="/settings" component={Settings} />
      <Route path="/sync" component={Sync} />
      <Redirect to="/timer" />
    </Switch>
    <DeletedSolveMessage />
  </div>
);

export default AppContent;
