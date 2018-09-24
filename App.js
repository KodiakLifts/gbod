import React from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';

import Main from './src/Main';
import rootReducer from './src/reducers/rootReducer';

const store = createStore(rootReducer);

export default () => (
  <Provider store={store}>
    <Main />
  </Provider>
);