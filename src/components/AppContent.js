import React from 'react';
import { Route } from 'react-router-dom';
import Timer from './Timer';
import Solves from './Solves';

import AppBarMargin from './AppBarMargin';

const Graphs = () => <AppBarMargin>Graphs</AppBarMargin>;

const AppContent = () => (
  <div className="AppContent">
    <Route exact={true} path="/" component={Timer} />
    <Route path="/timer" component={Timer} />
    <Route path="/solves" component={Solves} />
    <Route path="/graphs" component={Graphs} />
  </div>
);

export default AppContent;
