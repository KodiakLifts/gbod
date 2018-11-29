import firebase from "react-native-firebase";
import { firebaseState } from "../redux/firebaseState";
import moment from "moment";

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
          weightUnits: data.weightUnits,
          selectedLogDate: moment(new Date()).format("YYYY-MM-DD")
        }
      };
    } else {
      console.log("No document.");
    }
  })
  .catch(function(error) {
    console.log("Error getting document: ", error);
  });

export default startState;
