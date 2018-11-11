export const editLogNotes = (state, logId, noteText) => {
  const newState = {
    ...state,
    workoutLogs: state.workoutLogs.map(log => {
      if (log.id === logId) {
        return { ...log, notes: noteText };
      } else {
        return log;
      }
    })
  };

  return newState;
};
