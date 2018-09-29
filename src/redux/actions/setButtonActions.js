export const UPDATE_ACTIVE_WORKOUT = 'UPDATE_ACTIVE_WORKOUT_DATA';
export const UPDATE_SET_DATA = 'UPDATE_SET_DATA';

export const updateActiveWorkoutData = (setId, exerciseId) => {
  return {
    type: UPDATE_ACTIVE_WORKOUT,
    setId,
    exerciseId
  };
};

export const updateSetData = (setId, exerciseId, weight, reps, type) => {

}