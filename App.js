import React from 'react';
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';

import Main from './src/Main';
import activeWorkoutReducer from './src/redux/reducers/activeWorkoutReducer';
import rootReducer from './src/redux/reducers/rootReducer';
import { initState } from './src/redux/initState';

const store = createStore(activeWorkoutReducer);

export default () => (
  <Provider store={store}>
    <Main />
  </Provider>
);