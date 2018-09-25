import { TOGGLE_SET_COMPLETE, UPDATE_EXERCISE_COMPLETE, UPDATE_CURRENT_EXERCISE } from '../actions/setButtonActions';
import { initState } from '../initState';



export default (state = initState, action) => {
  switch (action.type) {
    case TOGGLE_SET_COMPLETE:
      return toggleSetCompleteReducer(state, action.setId);
    case UPDATE_EXERCISE_COMPLETE:
      return updateExerciseCompleteReducer(state, action.exerciseId);
    case UPDATE_CURRENT_EXERCISE:
      return updateCurrentExerciseReducer(state, action.exerciseId);
    default:
      return state;
  }
};

const toggleSetCompleteReducer = (state, setId) => {
  const setCompleteVal = state.activeWorkout.sets[setId].complete;

  console.log("Set " + setId + " complete: " + setCompleteVal);
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

const updateExerciseCompleteReducer = (state, exerciseId) => {
  const sets = state.activeWorkout.sets;

  const currentSets = sets.filter(set => {
    return set.exercise === exerciseId;
  });

  const exerciseComplete = currentSets.every((set) => {
    return set.complete === true;
  });

  console.log("Exercise Complete: " + exerciseComplete)

  const newState = {
    ...state,
    activeWorkout: {
      ...state.activeWorkout,
      exercises: state.activeWorkout.exercises.map((exercise, index) => {
        if (index === exerciseId) {
          return { ...exercise, ...{ complete: exerciseComplete } };
        }
        return exercise;
      }),
    }
  };

  return newState;
};

const updateCurrentExerciseReducer = (state, currentExercise) => {
  const exercises = state.activeWorkout.exercises;
  const exerciseComplete = state.activeWorkout.exercises[currentExercise].complete;

  let updatedActiveExercise = currentExercise;

  if (exerciseComplete) {
    const allExercisesComplete = exercises.every((exercise) => {
      return exercise.complete === true;
    });
    console.log("AllExercisesComplete: " + allExercisesComplete)
    if (!allExercisesComplete) {
      let foundExercise = false;
      let i = (currentExercise === exercises.length - 1 ? 0 : currentExercise + 1);
      console.log("Starting Index: " + i)
      while (!foundExercise) {
        console.log("Current Index: " + i)
        if (i === currentExercise) {
          foundExercise = true;
        }
        if (!exercises[i].complete) {
          updatedActiveExercise = i;
          foundExercise = true;
        }
        i = (i === exercises.length - 1 ? 0 : i++);
      }
    }
  }

  const newState = {
    ...state,
    activeWorkout: {
      ...state.activeWorkout,
      currentExercise: updatedActiveExercise,
    }
  };

  return newState;
};