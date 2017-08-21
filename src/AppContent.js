import React from 'react';
import { Route } from 'react-router-dom';

const Timer = () => <div>Timer</div>;
const Solves = () => <div>Solves</div>;
const Graphs = () => <div>Graphs</div>;

const AppContent = () => (
  <div className="AppContent">
    <Route path="/timer" component={Timer} />
    <Route path="/solves" component={Solves} />
    <Route path="/graphs" component={Graphs} />
  </div>
);

export default AppContent;
