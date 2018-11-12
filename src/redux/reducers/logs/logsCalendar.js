export const setSelectedWorkoutLogId = (state, logId) => {
  const newState = {
    ...state,
    selectedWorkoutLogId: logId
  };
  return newState;
};

export const deleteLog = (state, date) => {
  let newMeasurementLogs = [];
  if (state.measurementLogs.length !== 0) {
    newMeasurementLogs = state.measurementLogs.filter(log => {
      return log.date !== date;
    });
    if (newMeasurementLogs.length !== 0) {
      newMeasurementLogs.map((log, index) => {
        newMeasurementLogs[index].id = index;
      });
    }
  }

  let newWorkoutLogs = [];
  if (state.workoutLogs.length !== 0) {
    newWorkoutLogs = state.workoutLogs.filter(log => {
      return log.date !== date;
    });
    if (newWorkoutLogs.length !== 0) {
      newWorkoutLogs.map((log, index) => {
        newWorkoutLogs[index].id = index;
      });
    }
  }

  let newExerciseLibrary = [];
  if (state.exerciseLibrary.length !== 0) {
    newExerciseLibrary = state.exerciseLibrary.map(exercise => {
      let newExercise = Object.assign({}, exercise);
      newExercise.logs = newExercise.logs.filter(log => {
        return log.date !== date;
      });
      newExercise.logs.map((log, index) => {
        newExercise.logs[index].id = index;
      });
      return newExercise;
    });
  }

  const newState = {
    ...state,
    anyLogsSelectedDate: false,
    measurementLogs: newMeasurementLogs,
    workoutLogs: newWorkoutLogs,
    exerciseLibrary: newExerciseLibrary
  };

  return newState;
};

export const updateSelectedLogDate = (state, date) => {
  let anyLogsSelectedDate = false;
  if (
    state.measurementLogs.find(log => log.date === date) !== undefined ||
    state.workoutLogs.find(log => log.date === date) !== undefined
  ) {
    anyLogsSelectedDate = true;
  }
  const newState = {
    ...state,
    selectedLogDate: date,
    anyLogsSelectedDate: anyLogsSelectedDate
  };
  return newState;
};
