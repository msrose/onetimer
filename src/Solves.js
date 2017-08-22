import React from 'react';
import { connect } from 'react-redux';
import AppBarMargin from './AppBarMargin';
import { getSolves } from './reducers';

const Solves = ({ solves }) => (
  <AppBarMargin>
    <ul>
      {solves.map(({ duration, recordedAt, puzzle }) => (
        <li key={recordedAt}>{puzzle}: {duration} ({recordedAt})</li>
      ))}
    </ul>
  </AppBarMargin>
);

const mapStateToProps = state => ({
  solves: getSolves(state)
})

export default connect(mapStateToProps)(Solves);
