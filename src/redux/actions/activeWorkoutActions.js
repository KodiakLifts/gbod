export const SET_PRESS = "SET_PRESS";
export const UPDATE_SET_REPS = "UPDATE_SET_REPS";
export const UPDATE_SET_DATA = "UPDATE_SET_DATA";
export const UPDATE_EXERCISE_DATA = "UPDATE_EXERCISE_DATA";
export const FINISH_WORKOUT = "FINISH_WORKOUT";
export const RESET_WORKOUT = "RESET_WORKOUT";
export const STOP_TIMER = "STOP_TIMER";
export const DECREMENT_TIMER = "DECREMENT_TIMER";
export const SET_TIMER = "SET_TIMER";
export const UPDATE_DAY_DATA = "UPDATE_DAY_DATA";
export const UPDATE_ACTIVE_DAY = "UPDATE_ACTIVE_DAY";
export const DELETE_DAY = "DELETE_DAY";
export const ADD_DAY = "ADD_DAY";
export const REMOVE_EXERCISE = "DELETE_EXERCISE";
export const ADD_SET = "ADD_SET";
export const REMOVE_SET = "REMOVE_SET";
export const ADD_EXERCISE = "ADD_EXERCISE";
export const MAKE_CURRENT_EXERCISE = "MAKE_CURRENT_EXERCISE";
export const SHIFT_EXERCISE_DOWN = "SHIFT_EXERCISE_DOWN";
export const SHIFT_EXERCISE_UP = "SHIFT_EXERCISE_UP";
export const DAY_BAR_PRESS = "DAY_BAR_PRESS";
export const DEACTIVATE_DAY_BAR = "DEACTIVATE_DAY_BAR";
export const SHIFT_DAY_DOWN = "SHIFT_DAY_DOWN";
export const SHIFT_DAY_UP = "SHIFT_DAY_UP";
export const SET_CURRENT_DAY = "SET_CURRENT_DAY";
export const UPDATE_ACTIVE_NOTES = "UPDATE_ACTIVE_NOTES";

export const ACTIVE_WORKOUT_ACTIONS = [
  SET_PRESS,
  UPDATE_SET_DATA,
  FINISH_WORKOUT,
  RESET_WORKOUT,
  UPDATE_EXERCISE_DATA,
  STOP_TIMER,
  DECREMENT_TIMER,
  SET_TIMER,
  UPDATE_DAY_DATA,
  UPDATE_ACTIVE_DAY,
  UPDATE_SET_REPS,
  DELETE_DAY,
  ADD_DAY,
  REMOVE_EXERCISE,
  ADD_SET,
  REMOVE_SET,
  ADD_EXERCISE,
  MAKE_CURRENT_EXERCISE,
  SHIFT_EXERCISE_UP,
  SHIFT_EXERCISE_DOWN,
  DAY_BAR_PRESS,
  DEACTIVATE_DAY_BAR,
  SHIFT_DAY_DOWN,
  SHIFT_DAY_UP,
  SET_CURRENT_DAY,
  UPDATE_ACTIVE_NOTES
];

export const updateActiveNotes = notes => {
  return {
    type: UPDATE_ACTIVE_NOTES,
    notes
  };
};

export const setCurrentDay = dayId => {
  return {
    type: SET_CURRENT_DAY,
    dayId
  };
};

export const shiftDayDown = dayId => {
  return dispatch => {
    dispatch({
      type: SHIFT_DAY_DOWN,
      dayId
    });
    dispatch(setCurrentDay(dayId + 1));
  };
};

export const shiftDayUp = dayId => {
  return dispatch => {
    dispatch({
      type: SHIFT_DAY_UP,
      dayId
    });
    dispatch(setCurrentDay(dayId - 1));
  };
};

export const deactivateDayBar = () => {
  return {
    type: DEACTIVATE_DAY_BAR
  };
};

export const dayBarPress = () => {
  return {
    type: DAY_BAR_PRESS
  };
};

export const shiftExerciseDown = exerciseId => {
  return {
    type: SHIFT_EXERCISE_DOWN,
    exerciseId
  };
};

export const shiftExerciseUp = exerciseId => {
  return {
    type: SHIFT_EXERCISE_UP,
    exerciseId
  };
};

export const makeCurrentExercise = exerciseId => {
  return {
    type: MAKE_CURRENT_EXERCISE,
    exerciseId
  };
};

export const addExercise = libraryId => {
  return {
    type: ADD_EXERCISE,
    libraryId
  };
};

export const addSet = exerciseId => {
  return {
    type: ADD_SET,
    exerciseId
  };
};

export const addDay = name => {
  return dispatch => {
    clearInterval(this.timer);
    dispatch({ type: ADD_DAY, name });
    dispatch(setTimer(0, 0));
  };
};

export const updateActiveDay = dayId => {
  return dispatch => {
    clearInterval(this.timer);
    dispatch({ type: UPDATE_ACTIVE_DAY, dayId });
    dispatch(setTimer(0, 0));
  };
};

export const removeSet = (setId, exerciseId, currentSets) => {
  return {
    type: REMOVE_SET,
    setId,
    exerciseId,
    currentSets
  };
};

export const removeExercise = exerciseId => {
  return {
    type: REMOVE_EXERCISE,
    exerciseId
  };
};

export const deleteDay = dayId => {
  return {
    type: DELETE_DAY,
    dayId
  };
};

export const updateDayData = (dayId, name, remove) => {
  return dispatch => {
    dispatch({ type: UPDATE_DAY_DATA, dayId, name });
    if (remove) {
      clearInterval(this.timer);
      dispatch(deleteDay(dayId));
      dispatch(setTimer(0, 0));
    }
  };
};

export const updateWorkoutAndTimer = (
  setId,
  exerciseId,
  complete,
  min,
  sec,
  timerOn
) => {
  return (dispatch, getState) => {
    dispatch(setPress(setId, exerciseId, complete, min, sec, timerOn));
    if (timerOn) {
      dispatch(handleTimer(!complete));
    }
  };
};

export const handleTimer = setComplete => {
  this.timer;
  return (dispatch, getState) => {
    clearInterval(this.timer);
    if (setComplete) {
      this.timer = setInterval(() => {
        dispatch(decrementTimer());
        const started = getState().workoutData.timer.started;
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

export const decrementTimer = setId => {
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

export const setPress = (setId, exerciseId, complete, min, sec, timerOn) => {
  return {
    type: SET_PRESS,
    setId,
    exerciseId,
    complete,
    min,
    sec,
    timerOn
  };
};

export const updateSetReps = (setId, reps) => {
  return {
    type: UPDATE_SET_REPS,
    setId,
    reps
  };
};

export const updateSetData = (
  setId,
  weight,
  reps,
  setType,
  min,
  sec,
  timerOn
) => {
  return {
    type: UPDATE_SET_DATA,
    setId,
    weight,
    reps,
    setType,
    min,
    sec,
    timerOn
  };
};

export const updateExerciseData = (
  exerciseId,
  weightChange,
  supersetNext,
  includeWarmup
) => {
  return {
    type: UPDATE_EXERCISE_DATA,
    exerciseId,
    weightChange,
    supersetNext,
    includeWarmup
  };
};

export const finishWorkout = () => {
  return dispatch => {
    clearInterval(this.timer);
    dispatch({ type: FINISH_WORKOUT });
    dispatch(setTimer(0, 0));
  };
};

export const resetWorkout = () => {
  return dispatch => {
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
