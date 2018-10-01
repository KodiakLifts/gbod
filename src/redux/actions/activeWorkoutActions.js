export const UPDATE_ACTIVE_WORKOUT_UI = 'UPDATE_ACTIVE_WORKOUT_UI';
export const UPDATE_SET_DATA = 'UPDATE_SET_DATA';
export const UPDATE_EXERCISE_DATA = 'UPDATE_EXERCISE_DATA';
export const FINISH_WORKOUT = 'FINISH_WORKOUT';
export const RESET_WORKOUT = 'RESET_WORKOUT';
export const START_TIMER = 'START_TIMER';
export const STOP_TIMER = 'STOP_TIMER';
export const DECREMENT_TIMER = 'DECREMENT_TIMER';


export const updateWorkoutAndTimer = (setId, exerciseId) => {
  return (dispatch, getState) => {
    dispatch(updateActiveWorkoutUI(setId, exerciseId));
    const setComplete = getState()
      .workoutData
      .programs[getState().workoutData.activeWorkout.program]
      .sets[setId].complete;
    dispatch(handleTimer(setComplete));
  };
};

export const handleTimer = (setComplete) => {
  return (dispatch, getState) => {
    let started = getState().workoutData.timer.started;
    if (setComplete && started) {
      dispatch(stopTimer());
      clearInterval(this.timer);
    }
    started = getState().workoutData.timer.started;
    if (setComplete && !started) {
      this.timer = setInterval(() => {
        dispatch(decrementTimer());
        started = getState().workoutData.timer.started;
        if (!started) {
          dispatch(stopTimer());
          clearInterval(this.timer);
        }
      }, 1000);
    } else {
      dispatch(stopTimer());
      clearInterval(this.timer);
    }

  };
};

export const decrementTimer = () => {
  return {
    type: DECREMENT_TIMER
  };
};

export const stopTimer = () => {
  return {
    type: STOP_TIMER
  };
};

export const startTimer = () => {
  return {
    type: START_TIMER
  };
};

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