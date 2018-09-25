import activeWorkout from './activeWorkout';
import { combineReducers } from 'redux';

export default combineReducers({
  activeWorkout: activeWorkout
});