import React from "react";
import { createStore, combineReducers, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";

import Main from "./src/Main";
import { workoutData } from "./src/redux/reducers";
import { initState } from "./src/redux/initState";

const rootReducer = combineReducers({
  workoutData
});

const store = createStore(rootReducer, initState, applyMiddleware(thunk));

export default () => (
  <Provider store={store}>
    <Main />
  </Provider>
);
