import {
  SET_PRESS,
  UPDATE_SET_DATA,
  FINISH_WORKOUT,
  RESET_WORKOUT,
  UPDATE_EXERCISE_DATA,
  STOP_TIMER,
  DECREMENT_TIMER,
  SET_TIMER,
  UPDATE_ACTIVE_DAY,
  UPDATE_DAY_DATA,
  UPDATE_SET_REPS,
  DELETE_DAY,
  ADD_DAY,
  REMOVE_EXERCISE,
  ADD_EXERCISE,
  ADD_SET,
  REMOVE_SET,
  MAKE_CURRENT_EXERCISE,
  SHIFT_EXERCISE_DOWN,
  SHIFT_EXERCISE_UP,
  DAY_BAR_PRESS,
  DEACTIVATE_DAY_BAR
} from "../../actions/activeWorkoutActions";

import setPress from "./setPress";
import { finishWorkout, resetWorkout } from "./endWorkout";
import { setTimer, stopTimer, decrementTimer } from "./timer";
import { updateSetData, updateSetReps, removeSet, addSet } from "./setOptions";
import {
  updateExerciseData,
  removeExercise,
  addExercise,
  makeCurrentExercise,
  shiftExerciseDown,
  shiftExerciseUp
} from "./exerciseOptions";
import {
  updateDayData,
  deleteDay,
  updateActiveDay,
  addDay,
  dayBarPress,
  deactivateDayBar
} from "./dayOptions";

export default function activeWorkout(state = {}, action) {
  switch (action.type) {
    case SET_PRESS:
      return setPress(state, action.setId, action.exerciseId);

    case UPDATE_SET_DATA:
      return updateSetData(
        state,
        action.setId,
        action.weight,
        action.reps,
        action.setType,
        action.min,
        action.sec
      );
    case UPDATE_EXERCISE_DATA:
      return updateExerciseData(
        state,
        action.exerciseId,
        action.supersetNext,
        action.includeWarmup
      );
    case FINISH_WORKOUT:
      return finishWorkout(state);
    case RESET_WORKOUT:
      return resetWorkout(state);
    case STOP_TIMER:
      return stopTimer(state);
    case DECREMENT_TIMER:
      return decrementTimer(state, action.setId);
    case SET_TIMER:
      return setTimer(state, action.minutes, action.seconds);
    case UPDATE_ACTIVE_DAY:
      return updateActiveDay(state, action.dayId);
    case UPDATE_DAY_DATA:
      return updateDayData(state, action.dayId, action.name);
    case DELETE_DAY:
      return deleteDay(state, action.dayId);
    case ADD_DAY:
      return addDay(state, action.name);
    case UPDATE_SET_REPS:
      return updateSetReps(state, action.setId, action.reps);
    case ADD_SET:
      return addSet(state, action.exerciseId);
    case REMOVE_SET:
      return removeSet(state, action.setId, action.exerciseId);
    case REMOVE_EXERCISE:
      return removeExercise(state, action.exerciseId);
    case ADD_EXERCISE:
      return addExercise(state, action.libraryId);
    case MAKE_CURRENT_EXERCISE:
      return makeCurrentExercise(state, action.exerciseId);
    case SHIFT_EXERCISE_DOWN:
      return shiftExerciseDown(state, action.exerciseId);
    case SHIFT_EXERCISE_UP:
      return shiftExerciseUp(state, action.exerciseId);
    case DAY_BAR_PRESS:
      return dayBarPress(state);
    case DEACTIVATE_DAY_BAR:
      return deactivateDayBar(state);
    default:
      return state;
  }
}
