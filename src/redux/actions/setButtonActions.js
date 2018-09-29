export const UPDATE_ACTIVE_WORKOUT = 'UPDATE_ACTIVE_WORKOUT_DATA';

export const updateActiveWorkoutData = (setId, exerciseIndex) => {
  return {
    type: UPDATE_ACTIVE_WORKOUT,
    setId,
    exerciseIndex
  };
};