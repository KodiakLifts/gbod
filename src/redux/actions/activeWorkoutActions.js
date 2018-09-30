export const UPDATE_ACTIVE_WORKOUT_UI = 'UPDATE_ACTIVE_WORKOUT_UI';
export const UPDATE_SET_DATA = 'UPDATE_SET_DATA';

export const updateActiveWorkoutUI = (setId, exerciseId) => {
  return {
    type: UPDATE_ACTIVE_WORKOUT_UI,
    setId,
    exerciseId
  };
};

export const updateSetData = (setId, exerciseId, weight, reps, type) => {

}