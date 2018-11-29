import firebase from "react-native-firebase";
import { firebaseState } from "../redux/firebaseState";
import moment from "moment";

const db = firebase.firestore();

const userData = db.collection("users").doc("3kJAX2XCe1Akg7Prgpg7");

export const addUserExercise = newExerciseLibrary => {
  const exerciseName = newExerciseLibrary[newExerciseLibrary.length - 1].name;

  userData
    .set({
      userExercises: newExerciseLibrary
    })
    .then(() => {
      console.log(exerciseName + " successfully written to database.");
    })
    .catch(error => {
      console.error("Error writing " + exerciseName + " to database.", error);
    });
};
