export const shiftExerciseDown = (state, exerciseId) => {
  const activeProgram = state.activeWorkout.program;
  const newExercises = Array.from(state.programs[activeProgram].exercises);

  const exerciseToShift = newExercises[exerciseId];
  newExercises[exerciseId] = newExercises[exerciseId + 1];
  newExercises[exerciseId + 1] = exerciseToShift;

  newExercises.map((exercise, index) => {
    exercise.id = index;
  });

  const currentExercise = state.activeWorkout.currentExercise + 1;

  const newSets = state.programs[activeProgram].sets.map(set => {
    if (set.exercise === exerciseId) {
      return { ...set, exercise: exerciseId + 1 };
    } else if (set.exercise === exerciseId + 1) {
      return { ...set, exercise: exerciseId };
    }
    return set;
  });

  newSets.map((set, index) => {
    set.id = index;
  });

  const newState = {
    ...state,
    activeWorkout: {
      ...state.activeWorkout,
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

export const shiftExerciseUp = (state, exerciseId) => {
  const activeProgram = state.activeWorkout.program;
  const newExercises = Array.from(state.programs[activeProgram].exercises);

  const exerciseToShift = newExercises[exerciseId];
  newExercises[exerciseId] = newExercises[exerciseId - 1];
  newExercises[exerciseId - 1] = exerciseToShift;

  newExercises.map((exercise, index) => {
    exercise.id = index;
  });

  const currentExercise = state.activeWorkout.currentExercise - 1;

  const newSets = state.programs[activeProgram].sets.map(set => {
    if (set.exercise === exerciseId) {
      return { ...set, exercise: exerciseId - 1 };
    } else if (set.exercise === exerciseId - 1) {
      return { ...set, exercise: exerciseId };
    }
    return set;
  });

  newSets.map((set, index) => {
    set.id = index;
  });

  const newState = {
    ...state,
    activeWorkout: {
      ...state.activeWorkout,
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

export const makeCurrentExercise = (state, exerciseId) => {
  const newState = {
    ...state,
    activeWorkout: {
      ...state.activeWorkout,
      currentExercise: exerciseId
    }
  };
  return newState;
};

export const addExercise = (state, libraryId) => {
  const activeProgram = state.activeWorkout.program;
  let exerciseId = state.programs[activeProgram].exercises.length;
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
  const exercises = Array.from(state.programs[activeProgram].exercises);
  let exerciseInsertIndex;
  exercises.map((exercise, index) => {
    if (exercise.day === day) {
      exerciseInsertIndex = index;
    }
  });
  const newExercises = [
    ...exercises.slice(0, exerciseInsertIndex + 1),
    newExercise,
    ...exercises.slice(exerciseInsertIndex + 1)
  ];

  newExercises.map((exercise, index) => {
    if (exercise.day === day) {
      exerciseId = index;
    }
    exercise.id = index;
  });
  const newSetId = state.programs[activeProgram].sets.length;
  const newSet = {
    id: newSetId,
    exercise: exerciseId,
    day: day,
    weight: 0,
    reps: 0,
    type: 1,
    complete: false,
    restMinutes: 0,
    restSeconds: 0,
    timerOn: true
  };
  const sets = Array.from(state.programs[activeProgram].sets);
  let setInsertIndex;
  sets.map((set, index) => {
    if (set.day === day) {
      setInsertIndex = index;
    }
  });
  const newSets = [
    ...sets.slice(0, setInsertIndex + 1),
    newSet,
    ...sets.slice(setInsertIndex + 1)
  ];
  newSets.map((set, index) => {
    set.id = index;
  });
  newSets.map(set => {
    if (set.day > day) {
      set.exercise = set.exercise + 1;
    }
  });

  const newState = {
    ...state,
    activeWorkout: {
      ...state.activeWorkout,
      currentExercise: exerciseId,
      dayBarActive: false
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

  let newSets = [];
  let currentSet = 0;

  newSets = state.programs[activeProgram].sets.filter(set => {
    return set.exercise !== exerciseId;
  });
  if (newSets.length !== 0) {
    newSets.map((set, index) => {
      set.id = index;
    });
    currentSet = newSets[0].id;
  }

  let newExercises = [];
  let currentExercise = 0;

  newExercises = state.programs[activeProgram].exercises.filter(exercise => {
    return exercise.id !== exerciseId;
  });
  if (newExercises.length !== 0) {
    newExercises.map((exercise, index) => {
      newSets.map(set => {
        if (set.exercise === exercise.id) {
          set.exercise = index;
        }
      });
      exercise.id = index;
    });
    currentExercise = newSets[0].id;
  }

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
