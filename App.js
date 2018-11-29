import React, { Component } from "react";
import { Alert } from "react-native";
import { createStore, combineReducers, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import Main from "./src/Main";
import { workoutData } from "./src/redux/reducers";
import { initState } from "./src/redux/initState";
import firebase from "react-native-firebase";
import { firebaseState } from "./src/redux/firebaseState";
import moment from "moment";
import LoadingScreen from "./src/screens/LoadingScreen";

const db = firebase.firestore();

const userData = db.collection("users").doc("3kJAX2XCe1Akg7Prgpg7");

let startState = null;

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
    let promise = userData.get();

    promise
      .then(doc => {
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
              weightUnits: data.weightUnits,
              selectedLogDate: moment(new Date()).format("YYYY-MM-DD")
            }
          };
          store = createStore(rootReducer, startState, applyMiddleware(thunk));
          this.setState({ loading: false, loaded: true });
        } else {
          console.log("No document.");
          this.setState({ loading: false, loaded: false });
        }
      })
      .catch(function(error) {
        console.log("Error getting document: ", error);
        this.setState({ error: true, loading: false, loaded: false });
      });
  }

  _loaded = () => {
    this.setState({ loading: false });
  };

  render() {
    if (this.state.loading) {
      return <LoadingScreen />;
    } else if (this.state.loaded) {
      return (
        <Provider store={store}>
          <Main />
        </Provider>
      );
    } else if (this.state.error) {
      Alert.alert("Error", "Failed to load data from database.");
    }
  }
}
