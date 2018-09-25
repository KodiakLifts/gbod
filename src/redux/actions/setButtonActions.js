export const TOGGLE_SET_COMPLETE = 'TOGGLE_SET_COMPLETE';
export const UPDATE_EXERCISE_COMPLETE = 'UPDATE_EXERCISE_COMPLETE';
export const UPDATE_CURRENT_EXERCISE = 'UPDATE_CURRENT_EXERCISE';

export const toggleSetComplete = (setId) => {
  return {
    type: TOGGLE_SET_COMPLETE,
    setId: setId
  };
};

export const updateExerciseComplete = (exerciseId) => {
  return {
    type: UPDATE_EXERCISE_COMPLETE,
    exerciseId: exerciseId
  };
};

export const updateCurrentExercise = (exerciseId) => {
  return {
    type: UPDATE_CURRENT_EXERCISE,
    exerciseId: exerciseId
  };
};