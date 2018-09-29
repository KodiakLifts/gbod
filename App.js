import React from 'react';
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';

import Main from './src/Main';
import { activeWorkout, programs } from './src/redux/reducers';
import { initState } from './src/redux/initState';

const rootReducer = combineReducers({
  activeWorkout,
  programs
});

const store = createStore(rootReducer, initState);

export default () => (
  <Provider store={store}>
    <Main />
  </Provider>
);