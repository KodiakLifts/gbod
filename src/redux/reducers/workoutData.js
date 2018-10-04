import { ACTIVE_WORKOUT_ACTIONS } from '../actions/activeWorkoutActions';
import activeWorkout from './activeWorkout';
import { PROGRAMS_ACTIONS } from '../actions/programsActions';
import programs from './programs';

export default function workoutData(state = {}, action) {

  if (ACTIVE_WORKOUT_ACTIONS.includes(action.type)) {
    return activeWorkout(state, action);
  } else if (PROGRAMS_ACTIONS.includes(action.type)) {
    return programs(state, action);
  } else {
    return state;
  }
}