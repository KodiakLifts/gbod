export const updateActiveNotes = (state, notes) => {
  const newState = {
    ...state,
    activeWorkout: {
      ...state.activeWorkout,
      notes: notes
    }
  };
  console.log(newState);
  return newState;
};
