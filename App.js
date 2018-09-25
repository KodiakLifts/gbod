import React from 'react';
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';

import Main from './src/Main';
import activeWorkout from './src/redux/reducers/activeWorkout';
import rootReducer from './src/redux/reducers/rootReducer';
import { initState } from './src/redux/initState';

const store = createStore(activeWorkout);

export default () => (
  <Provider store={store}>
    <Main />
  </Provider>
);