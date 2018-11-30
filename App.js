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

const rootReducer = combineReducers({
  workoutData
});

let store = createStore(rootReducer, firebaseState, applyMiddleware(thunk));

export default class App extends Component {
  state = {
    loading: true,
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
                  const startState = {
                    workoutData: {
                      ...data
                    }
                  };
                  store = createStore(
                    rootReducer,
                    startState,
                    applyMiddleware(thunk)
                  );
                  this.setState({ loading: false, loaded: true });
                } else {
                  userData
                    .set({ ...firebaseState.workoutData, uid: uid })
                    .then(() => {
                      this.setState({ loading: false, loaded: true });
                    })
                    .catch(error => {
                      console.log("Error writing to database: ", error);
                      this.setState({
                        error: true,
                        loading: false,
                        loaded: false
                      });
                    });
                }
              })
              .catch(function(error) {
                console.log("Error getting document: ", error);
                this.setState({ error: true, loading: false, loaded: false });
              });
          } else {
            console.log("User is signed out.");
          }
        })
      )
      .catch(error => {
        console.log("Error signing in anonymously.", error);
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
      Alert.alert("Error", "Failed to initialize.");
    }
  }
}
