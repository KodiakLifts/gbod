export const updateSetData = (
  state,
  setId,
  weight,
  reps,
  setType,
  min,
  sec
) => {
  const activeProgram = state.activeWorkout.program;

  const newState = {
    ...state,
    programs: state.programs.map((program, index) => {
      if (index === activeProgram) {
        return {
          ...program,
          sets: state.programs[activeProgram].sets.map(set => {
            if (set.id === setId) {
              return {
                ...set,
                ...{ weight: weight },
                ...{ reps: reps },
                ...{ type: setType },
                ...{ restMinutes: min },
                ...{ restSeconds: sec }
              };
            }
            return set;
          })
        };
      }
      return program;
    })
  };
  return newState;
};

export const updateSetReps = (state, setId, reps) => {
  const activeProgram = state.activeWorkout.program;
  const newState = {
    ...state,
    programs: state.programs.map((program, index) => {
      if (index === activeProgram) {
        return {
          ...program,
          sets: state.programs[activeProgram].sets.map(set => {
            if (set.id === setId) {
              return {
                ...set,
                ...{ reps: reps }
              };
            }
            return set;
          })
        };
      }
      return program;
    })
  };
  return newState;
};

export const removeSet = (state, setId, exerciseId) => {
  const activeProgram = state.activeWorkout.program;
  let currentExercise = state.activeWorkout.currentExercise;
  let newExercises = state.programs[activeProgram].exercises;

  let newSets = state.programs[activeProgram].sets.filter(
    set => set.id !== setId
  );
  newSets.forEach((set, index) => {
    set.id = index;
  });

  let currentSet = newSets.find(set => {
    return set.exercise === exerciseId;
  });

  if (currentSet === undefined) {
    currentSet = newSets[0].id;

    newExercises = newExercises.filter(exercise => {
      return exercise.id !== exerciseId;
    });

    newExercises.forEach((exercise, index) => {
      newSets.forEach(set => {
        if (set.exercise === exercise.id) {
          set.exercise = index;
        }
      });
      exercise.id = index;
    });

    currentExercise = newExercises[0].id;
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
