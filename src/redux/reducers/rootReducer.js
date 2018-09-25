import activeWorkoutReducer from './activeWorkoutReducer';
import { combineReducers } from 'redux';
import { initState } from '../initState';

export default combineReducers({
  activeWorkout: activeWorkoutReducer
});