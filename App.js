import React, { Component } from "react";
import { Alert } from "react-native";
import { createStore, combineReducers, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import Main from "./src/Main";
import { workoutData } from "./src/redux/reducers";
import firebase from "react-native-firebase";
import { firebaseState } from "./src/redux/firebaseState";
import LoadingScreen from "./src/screens/LoadingScreen";
import db from "./src/firebase/connectFirebase";
import moment from "moment";

const rootReducer = combineReducers({
  workoutData
});

let store = null;
let startState = null;

export default class App extends Component {
  state = {
    loaded: false,
    error: false,
    isAuthenticated: false
  };

  componentDidMount() {
    let uid;
    let userData;

    firebase
      .auth()
      .signInAnonymously()
      .then(() => {
        this.setState({ isAuthenticated: true });
      })
      .then(
        firebase.auth().onAuthStateChanged(user => {
          if (user) {
            uid = user.uid;
            userData = db.collection("users").doc(uid);
            userData
              .get()
              .then(doc => {
                if (doc.exists) {
                  const data = doc.data();
                  startState = {
                    workoutData: {
                      ...data.workoutData,
                      selectedLogDate: moment(new Date()).format("YYYY-MM-DD")
                    }
                  };
                  store = createStore(
                    rootReducer,
                    startState,
                    applyMiddleware(thunk)
                  );
                  this.setState({ loaded: true });
                } else {
                  startState = {
                    workoutData: {
                      ...firebaseState.workoutData,
                      uid: uid,
                      selectedLogDate: moment(new Date()).format("YYYY-MM-DD")
                    }
                  };
                  store = createStore(
                    rootReducer,
                    startState,
                    applyMiddleware(thunk)
                  );
                  userData
                    .set(startState)
                    .then(() => {
                      this.setState({
                        loaded: true
                      });
                    })
                    .catch(error => {
                      this.setState({
                        error: true,
                        loaded: false
                      });
                    });
                }
              })
              .catch(function(error) {
                this.setState({ error: true, loaded: false });
              });
          }
        })
      )
      .catch(error => {
        Alert.alert("Error", "Failed to load or create new data.");
      });
  }

  _loaded = () => {
    this.setState({ loading: false });
  };

  render() {
    if (!this.state.loaded) {
      return <LoadingScreen />;
    } else if (this.state.loaded) {
      return (
        <Provider store={store}>
          <Main />
        </Provider>
      );
    } else if (this.state.error) {
      Alert.alert("Error", "Failed to initialize.");
    }
  }
}
