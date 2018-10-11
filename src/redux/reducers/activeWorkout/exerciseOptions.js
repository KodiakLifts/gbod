export const addExercise = (state, libraryId) => {
  const activeProgram = state.activeWorkout.program;
  const exerciseId = state.programs[activeProgram].exercises.length;
  const day = state.activeWorkout.day;
  const newExercise = {
    id: exerciseId,
    libraryId: libraryId,
    day: day,
    complete: false,
    supersetNext: false,
    includeWarmup: false,
    increaseRule: "",
    barType: "",
    units: "",
    note: ""
  };

  const newState = {
    ...state,
    programs: state.programs.map(program => {
      if (program.id === activeProgram) {
        return {
          ...program,
          exercises: [...program.exercises, newExercise]
        };
      }
      return program;
    })
  };

  console.log(newState);
  return newState;
};

export const updateExerciseData = (
  state,
  exerciseId,
  supersetNext,
  includeWarmup
) => {
  const activeProgram = state.activeWorkout.program;
  const newState = {
    ...state,
    programs: state.programs.map(program => {
      if (program.id === activeProgram) {
        return {
          ...program,
          exercises: state.programs[activeProgram].exercises.map(exercise => {
            if (exercise.id === exerciseId) {
              return {
                ...exercise,
                ...{ supersetNext: supersetNext },
                ...{ includeWarmup: includeWarmup }
              };
            }
            return exercise;
          })
        };
      }
      return program;
    })
  };
  return newState;
};

export const removeExercise = (state, exerciseId) => {
  const activeProgram = state.activeWorkout.program;

  let newSets = state.programs[activeProgram].sets.filter(set => {
    return set.exercise !== exerciseId;
  });
  newSets.forEach((set, index) => {
    set.id = index;
  });

  let newExercises = state.programs[activeProgram].exercises.filter(
    exercise => {
      return exercise.id !== exerciseId;
    }
  );
  newExercises.forEach((exercise, index) => {
    newSets.forEach(set => {
      if (set.exercise === exercise.id) {
        set.exercise = index;
      }
    });
    exercise.id = index;
  });

  const currentSet = newSets[0].id;
  const currentExercise = newSets[0].id;

  const newState = {
    ...state,
    activeWorkout: {
      ...state.activeWorkout,
      set: currentSet,
      currentExercise: currentExercise
    },
    programs: state.programs.map(program => {
      if (program.id === activeProgram) {
        return {
          ...program,
          sets: newSets,
          exercises: newExercises
        };
      }
      return program;
    })
  };
  return newState;
};
