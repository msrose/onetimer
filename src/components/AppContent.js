import React from 'react';
import { Route } from 'react-router-dom';
import Timer from './Timer';
import Solves from './Solves';
import Settings from './Settings';
import Sync from './Sync';

import AppBarMargin from './AppBarMargin';

const Graphs = () => <AppBarMargin>Graphs</AppBarMargin>;

const AppContent = () => (
  <div className="AppContent">
    <Route exact={true} path="/" component={Timer} />
    <Route path="/timer" component={Timer} />
    <Route path="/solves" component={Solves} />
    <Route path="/graphs" component={Graphs} />
    <Route path="/settings" component={Settings} />
    <Route path="/sync" component={Sync} />
  </div>
);

export default AppContent;
