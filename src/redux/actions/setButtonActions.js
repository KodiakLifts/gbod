export const UPDATE_ACTIVE_WORKOUT_DATA = 'UPDATE_ACTIVE_WORKOUT_DATA';

export const updateActiveWorkoutData = (setId, exerciseId) => {
  return {
    type: UPDATE_ACTIVE_WORKOUT_DATA,
    setId: setId,
    exerciseId: exerciseId
  };
};