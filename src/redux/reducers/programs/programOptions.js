export const updateSelectedProgramCategory = (state, categoryId) => {
  const newState = {
    ...state,
    selectedProgramCategory: categoryId
  };
  return newState;
};

export const deleteProgram = (state, programId) => {
  let activeProgram = state.activeWorkout.program;

  let newPrograms = state.programs.filter(program => program.id !== programId);
  newPrograms.map((program, index) => {
    program.id = index;
  });

  if (activeProgram === programId) {
    activeProgram = newPrograms[0].id;
  }

  const newState = {
    ...state,
    activeWorkout: {
      ...state.activeWorkout,
      program: activeProgram
    },
    programs: newPrograms
  };
  return newState;
};

export const updateProgramData = (
  state,
  programId,
  current,
  name,
  categoryId,
  favorite
) => {
  let activeProgram;
  current
    ? (activeProgram = programId)
    : (activeProgram = state.activeWorkout.program);

  const newState = {
    ...state,
    activeWorkout: {
      ...state.activeWorkout,
      program: activeProgram
    },
    programs: state.programs.map(program => {
      if (program.id === programId) {
        return {
          ...program,
          name: name,
          category: categoryId,
          favorite: favorite
        };
      }
      return program;
    })
  };
  console.log(newState.programs);
  return newState;
};
