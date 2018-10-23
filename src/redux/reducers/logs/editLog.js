export const generateEditLog = (state, logId) => {
  const date = state.selectedLogDate;
  const title = state.workoutLogs[logId].title;
  let exercises = [];
  let sets = [];
  state.workoutLogs[logId].libraryExercises.forEach(libId => {
    const currentLibraryExercise = state.exerciseLibrary.find(libExercise => {
      return libExercise.id === libId;
    });

    const exercise = currentLibraryExercise.logs.find(log => {
      return log.date === date && log.title === title;
    });

    if (exercise.title === title && exercise.date === date) {
      exercise.libraryId = exercise.id;
      exercise.id = exercises.length;
      exercises = exercises.concat([exercise]);
      let tmpSets = exercise.sets;
      tmpSets.forEach(set => {
        set.exercise = exercise.id;
      });
      sets = sets.concat(tmpSets);
    }
  });
  exercises.map((exercise, index) => {
    exercises[index].libraryId = exercise.id;
    exercises[index].id = index;
    exercises[index].complete = false;
  });
  sets.map((set, index) => {
    sets[index].id = index;
    sets[index].complete = false;
  });

  const newState = {
    ...state,
    selectedWorkoutLogId: logId,
    programs: state.programs.map(program => {
      if (program.name === "EditLogProgram") {
        return {
          ...program,
          sets: sets,
          exercises: exercises
        };
      }
      return program;
    })
  };

  return newState;
};
