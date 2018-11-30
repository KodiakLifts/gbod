import {
  ACTIVE_WORKOUT_ACTIONS,
  DECREMENT_TIMER,
  STOP_TIMER
} from "../actions/activeWorkoutActions";
import activeWorkout from "./activeWorkout/activeWorkout";
import { PROGRAMS_ACTIONS } from "../actions/programsActions";
import programs from "./programs/programs";
import { EXERCISES_ACTIONS } from "../actions/exercisesActions";
import exercises from "./exercises/exercises";
import { LOGS_ACTIONS } from "../actions/logsActions";
import logs from "./logs/logs";
import { USER_ACTIONS } from "../actions/userActions";
import user from "./user/user";
import db from "../../firebase/connectFirebase";

export default function workoutData(state = {}, action) {
  let newState = state;
  if (ACTIVE_WORKOUT_ACTIONS.includes(action.type)) {
    newState = activeWorkout(state, action);
    if (action.type !== DECREMENT_TIMER && action.type !== STOP_TIMER) {
      updateDatabase(newState);
    }
  } else if (PROGRAMS_ACTIONS.includes(action.type)) {
    newState = programs(state, action);
    updateDatabase(newState);
  } else if (EXERCISES_ACTIONS.includes(action.type)) {
    newState = exercises(state, action);
    updateDatabase(newState);
  } else if (LOGS_ACTIONS.includes(action.type)) {
    newState = logs(state, action);
    updateDatabase(newState);
  } else if (USER_ACTIONS.includes(action.type)) {
    newState = user(state, action);
    updateDatabase(newState);
  }
  return newState;
}

const updateDatabase = state => {
  const userData = db.collection("users").doc(state.uid);

  userData
    .set(state)
    .then(() => {
      console.log("Successfully updated user database.");
    })
    .catch(error => {
      console.error("Error writing to database.", error);
    });
};
