export const UPDATE_ACTIVE_WORKOUT = 'UPDATE_ACTIVE_WORKOUT_DATA';

export const updateActiveWorkoutData = (setId, exerciseIndex, programId, dayId, setOptions, exerciseOptions) => {
  return {
    type: UPDATE_ACTIVE_WORKOUT,
    setId,
    exerciseIndex,
    programId,
    dayId,
    setOptions,
    exerciseOptions
  };
};