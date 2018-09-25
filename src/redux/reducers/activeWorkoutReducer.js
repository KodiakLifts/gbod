import { UPDATE_ACTIVE_WORKOUT_DATA } from '../actions/setButtonActions';
import { initState } from '../initState';

export default (state = initState, action) => {
  switch (action.type) {
    case UPDATE_ACTIVE_WORKOUT_DATA:
      return updateActiveWorkoutData(state, action.setId, action.exerciseId);
    default:
      return state;
  }
};

const updateActiveWorkoutData = (state, setId, exerciseId) => {
  let setState = toggleSetComplete(state, setId);
  let exerciseState = updateExerciseComplete(setState, exerciseId);
  let currentExerciseState = updateCurrentExercise(exerciseState, exerciseId);
  return currentExerciseState;
};

const toggleSetComplete = (state, setId) => {
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

const updateExerciseComplete = (state, exerciseId) => {
  const sets = state.activeWorkout.sets;

  const currentSets = sets.filter(set => {
    return set.exercise === exerciseId;
  });

  const exerciseComplete = currentSets.every((set) => {
    return set.complete === true;
  });

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

const updateCurrentExercise = (state, currentExercise) => {
  const exercises = state.activeWorkout.exercises;
  const exerciseComplete = state.activeWorkout.exercises[currentExercise].complete;

  let updatedActiveExercise = currentExercise;

  if (exerciseComplete) {
    const allExercisesComplete = exercises.every((exercise) => {
      return exercise.complete === true;
    });

    if (!allExercisesComplete) {
      let foundExercise = false;
      let index = (currentExercise === exercises.length - 1 ? 0 : currentExercise + 1);

      for (let i = index; i < exercises.length; i++) {
        if (!exercises[i].complete) {
          updatedActiveExercise = i;
          foundExercise = true;
          break;
        }
      }
      if (!foundExercise) {
        for (let i = 0; i < exercises.length; i++) {
          if (!exercises[i].complete) {
            updatedActiveExercise = i;
            foundExercise = true;
            break;
          }
          if (i === currentExercise) {
            break;
          }
        }
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