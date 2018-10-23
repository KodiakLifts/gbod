export const updateActiveNotes = (state, notes) => {
  let newState;

  if (state.editLogMode) {
    newState = {
      ...state,
      workoutLogs: state.workoutLogs.map(log => {
        if (log.id === state.selectedWorkoutLogId) {
          return {
            ...log,
            notes: notes
          };
        }
        return log;
      })
    };
  } else {
    newState = {
      ...state,
      activeWorkout: {
        ...state.activeWorkout,
        notes: notes
      }
    };
  }

  return newState;
};
