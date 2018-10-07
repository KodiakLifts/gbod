export default (state, setId, exerciseId) => {
  const setState = toggleSetComplete(state, setId, exerciseId);
  const exerciseState = updateExerciseComplete(setState, exerciseId);
  const currentExerciseState = updateCurrentExercise(exerciseState, exerciseId);
  return currentExerciseState;
};

const toggleSetComplete = (state, setId, exerciseId) => {
  const activeProgram = state.activeWorkout.program;

  const setCompleteVal =
    state.programs[activeProgram].sets[setId].complete;

  const setRestMinutes =
    state.programs[activeProgram].sets[setId].restMinutes;
  const setRestSeconds =
    state.programs[activeProgram].sets[setId].restSeconds;

  const newState = {
    ...state,
    timer: {
      ...state.timer,
      ...{ set: setId },
      ...{ minutes: setRestMinutes },
      ...{ seconds: setRestSeconds },
    },
    programs: state.programs.map(program => {
      if (program.id === activeProgram) {
        return {
          ...program,
          sets: state.programs[activeProgram].sets.map(set => {
            if (set.id === setId) {
              return {
                ...set, ...{ complete: !setCompleteVal }
              };
            }
            return set;
          }),
          exercises: state.programs[activeProgram].exercises.map(exercise => {
            if (exerciseId === exercise.id) {
              return {
                ...exercise, ...{ complete: false }
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

const updateExerciseComplete = (state, exerciseId) => {
  const activeProgram = state.activeWorkout.program;
  const sets = state.programs[state.activeWorkout.program].sets;

  const currentSets = sets.filter(set => {
    return set.exercise === exerciseId;
  });

  const exerciseComplete = currentSets.every((set) => {
    return set.complete === true;
  });

  const newState = {
    ...state,
    programs: state.programs.map(program => {
      if (program.id === activeProgram) {
        return {
          ...program,
          exercises: state.programs[activeProgram].exercises.map(exercise => {
            if (exercise.id === exerciseId) {
              return { ...exercise, ...{ complete: exerciseComplete } };
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

const updateCurrentExercise = (state, exerciseId) => {

  const activeProgram = state.activeWorkout.program;
  const exercises = state.programs[activeProgram].exercises.filter(exercise => {
    return exercise.day === state.activeWorkout.day;
  });

  let currentExerciseIndex = exercises.findIndex(exercise => {
    return exercise.id === exerciseId;
  });

  const exerciseComplete = state.programs[activeProgram]
    .exercises[exerciseId].complete;

  let updatedActiveExerciseId = exerciseId;

  if (exerciseComplete) {
    const allExercisesComplete = exercises.every((exercise) => {
      return exercise.complete === true;
    });

    if (!allExercisesComplete) {
      let foundExercise = false;
      let index = (currentExerciseIndex === (exercises.length - 1) ? 0 : currentExerciseIndex++);
      for (let i = index; i < exercises.length; i++) {
        if (!exercises[i].complete) {
          updatedActiveExerciseId = exercises[i].id;
          foundExercise = true;
          break;
        }
      }
      if (!foundExercise) {
        for (let i = 0; i < exercises.length; i++) {
          if (!exercises[i].complete) {
            updatedActiveExerciseId = exercises[i].id;
            foundExercise = true;
            break;
          }
          if (i === currentExerciseIndex) {
            break;
          }
        }
      }
    }
  }

  const newState = {
    ...state,
    activeWorkout: {
      ...state.activeWorkout,
      currentExercise: updatedActiveExerciseId,
    }
  };
  return newState;
};