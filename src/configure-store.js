import { createStore } from 'redux';

import reducer from './reducers';

export default function() {
  const store = createStore(reducer);
  return store;
};
