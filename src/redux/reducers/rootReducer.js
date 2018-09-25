import { TOGGLE_SET_COMPLETE } from '../actions/setButtonActions';
import { initState } from '../initState';

export default (state = initState, action) => {
  switch (action.type) {
    case TOGGLE_SET_COMPLETE:
      return toggleSetCompleteReducer(state, action.setId);
    default:
      return state;
  }
};

const toggleSetCompleteReducer = (state, setId) => {
  const completeVal = state.activeWorkout.sets[setId].complete;
  const newState = {
    ...state,
    activeWorkout: {
      ...state.activeWorkout,
      sets: state.activeWorkout.sets.map((set, index) => {
        if (index === setId) {
          return { ...set, ...{ complete: !completeVal } };
        }
        return set;
      }),
    }
  };
  console.log(newState);
  return newState;
};