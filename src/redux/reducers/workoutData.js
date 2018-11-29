import { ACTIVE_WORKOUT_ACTIONS } from "../actions/activeWorkoutActions";
import activeWorkout from "./activeWorkout/activeWorkout";
import { PROGRAMS_ACTIONS } from "../actions/programsActions";
import programs from "./programs/programs";
import { EXERCISES_ACTIONS } from "../actions/exercisesActions";
import exercises from "./exercises/exercises";
import { LOGS_ACTIONS } from "../actions/logsActions";
import logs from "./logs/logs";
import { USER_ACTIONS } from "../actions/userActions";
import user from "./user/user";

export default function workoutData(state = {}, action) {
  if (ACTIVE_WORKOUT_ACTIONS.includes(action.type)) {
    return activeWorkout(state, action);
  } else if (PROGRAMS_ACTIONS.includes(action.type)) {
    return programs(state, action);
  } else if (EXERCISES_ACTIONS.includes(action.type)) {
    return exercises(state, action);
  } else if (LOGS_ACTIONS.includes(action.type)) {
    return logs(state, action);
  } else if (USER_ACTIONS.includes(action.type)) {
    return user(state, action);
  } else {
    return state;
  }
}
