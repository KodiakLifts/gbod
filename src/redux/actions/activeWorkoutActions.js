export const UPDATE_ACTIVE_WORKOUT_UI = 'UPDATE_ACTIVE_WORKOUT_UI';
export const UPDATE_SET_REPS = 'UPDATE_SET_REPS';
export const UPDATE_SET_DATA = 'UPDATE_SET_DATA';
export const UPDATE_EXERCISE_DATA = 'UPDATE_EXERCISE_DATA';
export const FINISH_WORKOUT = 'FINISH_WORKOUT';
export const RESET_WORKOUT = 'RESET_WORKOUT';
export const STOP_TIMER = 'STOP_TIMER';
export const DECREMENT_TIMER = 'DECREMENT_TIMER';
export const SET_TIMER = 'SET_TIMER';
export const UPDATE_DAY_DATA = 'UPDATE_DAY_DATA';

export const updateDayData = (dayId) => {
  return (dispatch) => {
    clearInterval(this.timer);
    dispatch({ type: UPDATE_DAY_DATA, dayId });
    dispatch(setTimer(0, 0));
  };
};

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
  this.timer;
  return (dispatch, getState) => {
    let started = getState().workoutData.timer.started;

    clearInterval(this.timer);
    dispatch(stopTimer());

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
      clearInterval(this.timer);
      dispatch(stopTimer());
    }
  };
};

export const decrementTimer = (setId) => {
  return {
    type: DECREMENT_TIMER,
    setId
  };
};

export const stopTimer = () => {
  clearInterval(this.timer);
  return {
    type: STOP_TIMER
  };
};

export const updateActiveWorkoutUI = (setId, exerciseId) => {
  return {
    type: UPDATE_ACTIVE_WORKOUT_UI,
    setId,
    exerciseId
  };
};

export const updateSetReps = (setId, reps) => {
  return {
    type: UPDATE_SET_REPS,
    setId,
    reps
  };
};

export const updateSetData = (setId, weight, reps, setType, min, sec) => {
  return {
    type: UPDATE_SET_DATA,
    setId,
    weight,
    reps,
    setType,
    min,
    sec
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
  return (dispatch) => {
    clearInterval(this.timer);
    dispatch({ type: FINISH_WORKOUT });
    dispatch(setTimer(0, 0));
  };
};

export const resetWorkout = () => {
  return (dispatch) => {
    clearInterval(this.timer);
    dispatch({ type: RESET_WORKOUT });
    dispatch(setTimer(0, 0));
  };
};

export const setTimer = (minutes, seconds) => {
  return {
    type: SET_TIMER,
    minutes,
    seconds
  };
};