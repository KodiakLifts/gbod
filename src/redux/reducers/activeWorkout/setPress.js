export default (
  state,
  setId,
  exerciseId,
  setCompleteVal,
  setRestMinutes,
  setRestSeconds,
  timerOn
) => {
  const activeProgram = state.editLogMode ? 0 : state.activeWorkout.program;

  const newSets = state.programs[activeProgram].sets.map(set => {
    if (set.id === setId) {
      return {
        ...set,
        ...{ complete: !setCompleteVal }
      };
    }
    return set;
  });

  const currentSets = newSets.filter(set => {
    return set.exercise === exerciseId;
  });

  const exerciseComplete = currentSets.every(set => {
    return set.complete === true;
  });

  const newExercises = state.programs[activeProgram].exercises.map(exercise => {
    if (exerciseId === exercise.id) {
      return {
        ...exercise,
        ...{ complete: exerciseComplete }
      };
    }
    return exercise;
  });

  let currentExerciseIndex = newExercises.findIndex(exercise => {
    return exercise.id === exerciseId;
  });

  let updatedActiveExerciseId = exerciseId;

  if (exerciseComplete) {
    const allExercisesComplete = newExercises.every(exercise => {
      return exercise.complete === true;
    });

    if (!allExercisesComplete) {
      let foundExercise = false;
      let index =
        currentExerciseIndex === newExercises.length - 1
          ? 0
          : currentExerciseIndex++;
      for (let i = index; i < newExercises.length; i++) {
        if (!newExercises[i].complete) {
          updatedActiveExerciseId = newExercises[i].id;
          foundExercise = true;
          break;
        }
      }
      if (!foundExercise) {
        for (let i = 0; i < newExercises.length; i++) {
          if (!newExercises[i].complete) {
            updatedActiveExerciseId = newExercises[i].id;
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
      dayBarActive: false
    },
    timer: timerOn
      ? {
          ...state.timer,
          set: setId,
          minutes: setRestMinutes,
          seconds: setRestSeconds
        }
      : state.timer,
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
