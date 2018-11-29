import firebase from "react-native-firebase";
import { firebaseState } from "../redux/firebaseState";

const db = firebase.firestore();

const userData = db.collection("users").where("name", "==", "DEFAULT");

const data = {
  ...firebaseState.workoutData,
  activeProgramId: userData.activeProgramId,
  activeWorkout: userData.activeWorkout,
  lengthUnits: userData.lengthUnits,
  measurementLogs: userData.measurementLogs,
  programs: userData.programs,
  tmpActiveWorkout: userData.tmpActiveWorkout,
  exerciseLibrary: userData.userExercises,
  username: userData.username,
  weightUnits: userData.weightUnits
};

const startState = {
  workoutData: {
    ...data
  }
};

export default startState;
