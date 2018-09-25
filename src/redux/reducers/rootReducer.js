import { TOGGLE_SET_COMPLETE, UPDATE_CURRENT_EXERCISE } from '../actions/setButtonActions';
import { initState } from '../initState';



export default (state = initState, action) => {
  switch (action.type) {
    case TOGGLE_SET_COMPLETE:
      return toggleSetCompleteReducer(state, action.setId);
    case UPDATE_CURRENT_EXERCISE:
      return updateCurrentExerciseReducer(state, action.currentExercise);
    default:
      return state;
  }
};

const toggleSetCompleteReducer = (state, setId) => {
  const setCompleteVal = state.activeWorkout.sets[setId].complete;

  const newState = {
    ...state,
    activeWorkout: {
      ...state.activeWorkout,
      sets: state.activeWorkout.sets.map((set, index) => {
        if (index === setId) {
          return { ...set, ...{ complete: !setCompleteVal } };
        }
        return set;
      }),
    }
  };

  return newState;
};

const updateCurrentExerciseReducer = (state, currentExercise) => {
  const sets = state.activeWorkout.sets;
  const exercises = state.activeWorkout.exercises;

  let updatedActiveExercise = currentExercise;

  const currentSets = sets.filter(set => {
    return set.exercise === currentExercise;
  });
  const exerciseComplete = currentSets.every((set) => {
    return set.complete === true;
  });

  if (exerciseComplete) {
    for (let i = currentExercise + 1; i < exercises.length; i++) {
      if (i === currentExercise) {
        break;
      }
      if (!state.activeWorkout.exercises[i].complete) {
        updatedActiveExercise = i;
        break;
      }
      if (i === exercises.length - 1) {
        i = 0;
      }
    }
  }

  const newState = {
    ...state,
    activeWorkout: {
      ...state.activeWorkout,
      currentExercise: updatedActiveExercise,
      exercises: state.activeWorkout.exercises.map((exercise, index) => {
        if (index === currentExercise) {
          return { ...exercise, ...{ complete: exerciseComplete } };
        }
        return exercise;
      }),
    }
  };
  console.log(newState);
  return newState;
};