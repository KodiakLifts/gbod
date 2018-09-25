export const TOGGLE_SET_COMPLETE = 'TOGGLE_SET_COMPLETE';
export const UPDATE_CURRENT_EXERCISE = 'UPDATE_CURRENT_EXERCISE';

export const toggleSetComplete = (setId) => {
  return {
    type: TOGGLE_SET_COMPLETE,
    setId: setId
  };
};

export const updateCurrentExercise = (currentExercise) => {
  return {
    type: UPDATE_CURRENT_EXERCISE,
    currentExercise: currentExercise
  };
};