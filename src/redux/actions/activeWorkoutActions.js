export const UPDATE_ACTIVE_WORKOUT_UI = 'UPDATE_ACTIVE_WORKOUT_UI';
export const UPDATE_SET_DATA = 'UPDATE_SET_DATA';
export const UPDATE_EXERCISE_DATA = 'UPDATE_EXERCISE_DATA';
export const FINISH_WORKOUT = 'FINISH_WORKOUT';
export const RESET_WORKOUT = 'RESET_WORKOUT';

export const updateActiveWorkoutUI = (setId, exerciseId) => {
  return {
    type: UPDATE_ACTIVE_WORKOUT_UI,
    setId,
    exerciseId
  };
};

export const updateSetData = (setId, weight, reps, setType) => {
  return {
    type: UPDATE_SET_DATA,
    setId,
    weight,
    reps,
    setType
  };
};

export const updateExerciseData = (exerciseId, supersetNext, includeWarmup) => {
  return {
    type: UPDATE_EXERCISE_DATA,
    exerciseId,
    supersetNext,
    includeWarmup
  };
};

export const finishWorkout = () => {
  return {
    type: FINISH_WORKOUT
  };
};

export const resetWorkout = () => {
  return {
    type: RESET_WORKOUT
  };
};

