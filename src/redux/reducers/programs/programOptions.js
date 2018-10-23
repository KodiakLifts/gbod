const ACTIVE_PROGRAM = 0;

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

  let newWorkoutLogs = [];
  if (state.workoutLogs.length !== 0) {
    newWorkoutLogs = state.workoutLogs.filter(log => {
      return log.program !== programId;
    });
    if (newWorkoutLogs.length !== 0) {
      newWorkoutLogs.map((log, index) => {
        log.id = index;
        if (log.program >= programId) {
          log.program--;
        }
      });
    }
  }

  let newExerciseLibrary = [];
  if (state.exerciseLibrary.length !== 0) {
    newExerciseLibrary = state.exerciseLibrary.map(exercise => {
      let newExercise = Object.assign({}, exercise);
      newExercise.logs = newExercise.logs.filter(log => {
        return log.program !== programId;
      });
      newExercise.logs.map((log, index) => {
        log.id = index;
        if (log.program >= programId) {
          log.program--;
        }
      });
      return newExercise;
    });
  }

  const newState = {
    ...state,
    activeWorkout: {
      ...state.activeWorkout,
      program: activeProgram
    },
    programs: newPrograms,
    workoutLogs: newWorkoutLogs,
    exerciseLibrary: newExerciseLibrary
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
  let activeProgram = state.programs[ACTIVE_PROGRAM];
  let activeWorkout = state.activeWorkout;
  if (current && state.activeProgramId !== programId) {
    activeProgram = {
      ...activeProgram,
      name: name,
      sets: state.programs[programId].sets,
      exercises: state.programs[programId].exercises,
      days: state.programs[programId].days
    };
    activeWorkout = {
      program: ACTIVE_PROGRAM,
      day: 0,
      currentExercise: 0,
      dayBarActive: false,
      notes: ""
    };
  }

  const newState = {
    ...state,
    activeProgramId: current ? programId : state.activeProgramId,
    activeWorkout: activeWorkout,
    programs: state.programs.map(program => {
      if (program.id === ACTIVE_PROGRAM) {
        return activeProgram;
      }
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
  console.log(newState);
  return newState;
};
