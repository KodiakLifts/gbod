import { SET_COMPLETE, SET_INCOMPLETE } from '../actions/setButtonActions';
import { initState } from '../initState';

export default (state = initState, action) => {
  switch (action.type) {
    case SET_COMPLETE:
      return markSetComplete(state, action.setId);
    case SET_INCOMPLETE:
      return markSetIncomplete(state, action.setId);
    default:
      return state;
  }
};

const markSetComplete = (state, setId) => {
  const newState = {
    ...state,
    activeWorkout: {
      ...state.activeWorkout,
      sets: state.activeWorkout.sets.map((set, index) => {
        if (index === setId) {
          return { ...set, ...{ complete: true } };
        }
        return set;
      }),
    }
  };
  console.log(newState);
  return newState;
};

const markSetIncomplete = (state, setId) => {
  const newState = {
    ...state,
    activeWorkout: {
      ...state.activeWorkout,
      sets: state.activeWorkout.sets.map((set, index) => {
        if (index === setId) {
          return { ...set, ...{ complete: false } };
        }
        return set;
      }),
    }
  };
  console.log(newState);
  return newState;
};