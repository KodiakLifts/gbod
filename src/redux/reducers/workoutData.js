import { ACTIVE_WORKOUT_ACTIONS } from '../actions/activeWorkoutActions';
import activeWorkout from './activeWorkout';

export default function workoutData(state = {}, action) {

  if (ACTIVE_WORKOUT_ACTIONS.includes(action.type)) {
    return activeWorkout(state, action);
  } else {
    return state;
  }
}