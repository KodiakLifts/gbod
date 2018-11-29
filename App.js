import React, { Component } from "react";
import { createStore, combineReducers, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import Main from "./src/Main";
import { workoutData } from "./src/redux/reducers";
import { initState } from "./src/redux/initState";
import firebase from "react-native-firebase";
import { firebaseState } from "./src/redux/firebaseState";

const db = firebase.firestore();

const userData = db.collection("users").doc("3kJAX2XCe1Akg7Prgpg7");

let startState = null;

userData
  .get()
  .then(function(doc) {
    if (doc.exists) {
      console.log("Document data: ", doc.data());
      const data = doc.data();
      startState = {
        workoutData: {
          ...firebaseState.workoutData,
          activeProgramId: data.activeProgramId,
          activeWorkout: data.activeWorkout,
          lengthUnits: data.lengthUnits,
          measurementLogs: data.measurementLogs,
          programs: data.programs,
          tmpActiveWorkout: data.tmpActiveWorkout,
          exerciseLibrary: data.userExercises,
          username: data.username,
          weightUnits: data.weightUnits
        }
      };

      store = createStore(rootReducer, startState, applyMiddleware(thunk));
    } else {
      console.log("No document.");
    }
  })
  .catch(function(error) {
    console.log("Error getting document: ", error);
  });

const rootReducer = combineReducers({
  workoutData
});

let store = createStore(rootReducer, initState, applyMiddleware(thunk));

export default class App extends Component {
  state = {
    loading: true,
    loaded: false,
    error: false
  };

  componentDidMount() {
    setTimeout(() => {
      if (startState !== null) {
        this._loaded();
      }
    }, 5000);
  }

  _loaded = () => {
    this.setState({ loading: false, loaded: true });
  };

  render() {
    if (this.state.loading) {
      return null;
    } else {
      return (
        <Provider store={store}>
          <Main />
        </Provider>
      );
    }
  }
}
