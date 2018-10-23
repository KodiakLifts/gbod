const EDIT_LOG_PROGRAM_ID = 2;

export const generateEditLog = (state, logId) => {
  const date = state.selectedLogDate;
  const title = state.workoutLogs[logId].title;
  const tmpActiveWorkout = Object.assign({}, state.activeWorkout);

  let exercises = [];
  let sets = [];
  state.workoutLogs[logId].libraryExercises.map(libId => {
    const currentLibraryExercise = state.exerciseLibrary.find(libExercise => {
      return libExercise.id === libId;
    });

    const exercise = currentLibraryExercise.logs.find(log => {
      return log.date === date && log.title === title;
    });

    if (exercise.title === title && exercise.date === date) {
      exercise.libraryId = currentLibraryExercise.id;
      exercise.id = exercises.length;
      exercise.day = 0;
      exercises = exercises.concat([exercise]);
      let tmpSets = exercise.sets;
      tmpSets.forEach(set => {
        set.exercise = exercise.id;
      });
      sets = sets.concat(tmpSets);
    }
  });
  sets.map((set, index) => {
    sets[index].id = index;
    sets[index].day = 0;
  });

  const newState = {
    ...state,
    tmpActiveWorkout: tmpActiveWorkout,
    activeWorkout: {
      program: EDIT_LOG_PROGRAM_ID,
      day: 0,
      currentExercise: 0,
      dayBarActive: false,
      notes: state.workoutLogs[logId].notes
    },
    selectedWorkoutLogId: logId,
    programs: state.programs.map(program => {
      if (program.id === EDIT_LOG_PROGRAM_ID) {
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

export const finishLogEdit = state => {
  const activeProgram = state.activeWorkout.program;
  const currentActiveDay = state.activeWorkout.day;
  const date = state.selectedLogDate;
  const updatedSets = Array.from(state.programs[activeProgram].sets);
  const logTitle = state.workoutLogs[state.selectedWorkoutLogId].title;
  const exercisesToLog = [];
  let newExerciseLibrary = Array.from(state.exerciseLibrary);
  let anyLogsSelectedDate = true;
  let updatedWorkoutLog = null;

  const setsToLog = updatedSets.filter(set => {
    return set.day === currentActiveDay && set.complete;
  });

  if (setsToLog.length !== 0) {
    const daysExercises = state.programs[activeProgram].exercises.filter(
      exercise => {
        return exercise.day === currentActiveDay;
      }
    );

    daysExercises.forEach(exercise => {
      const setExercise = setsToLog.find(set => {
        return set.exercise === exercise.id;
      });
      if (setExercise !== undefined) {
        const found = exercisesToLog.find(e => {
          exercise === e;
        });
        if (found === undefined) {
          exercisesToLog.push(exercise);
        }
      }
    });

    if (exercisesToLog.length !== 0) {
      exercisesToLog.forEach(exercise => {
        newExerciseLibrary = newExerciseLibrary.map(libraryExercise => {
          if (libraryExercise.id === exercise.libraryId) {
            return {
              ...libraryExercise,
              logs: state.exerciseLibrary[exercise.libraryId].logs.map(log => {
                if (log.title === logTitle && log.date === date) {
                  return {
                    ...log,
                    supersetNext: exercise.supersetNext,
                    includeWarmup: exercise.includeWarmup,
                    workoutsToIncrease: exercise.workoutsToIncrease,
                    increaseAmmount: exercise.increaseAmmount,
                    barType: exercise.barType,
                    units: exercise.units,
                    sets: setsToLog.filter(set => {
                      if (set.exercise === exercise.id) {
                        return {
                          reps: set.reps,
                          weight: set.weight,
                          type: set.type,
                          restMinutes: set.restMinutes,
                          restSeconds: set.restSeconds,
                          timerOn: set.timerOn,
                          percentage: set.percentage,
                          percent: set.percent
                        };
                      }
                    })
                  };
                }
                return log;
              })
            };
          }
          return libraryExercise;
        });
      });
    }

    updatedWorkoutLog = {
      ...state.workoutLogs[state.selectedWorkoutLogId],
      notes: state.activeWorkout.notes,
      libraryExercises: exercisesToLog.map(exercise => {
        return exercise.libraryId;
      })
    };
  } else {
    anyLogsSelectedDate = false;
  }

  let newWorkoutLogs = Array.from(state.workoutLogs);

  if (updatedWorkoutLog !== null) {
    newWorkoutLogs = state.workoutLogs.map(log => {
      if (log.id === state.selectedWorkoutLogId) {
        return updatedWorkoutLog;
      }
      return log;
    });
  }

  const newState = {
    ...state,
    activeWorkout: Object.assign({}, state.tmpActiveWorkout),
    anyLogsSelectedDate: anyLogsSelectedDate,
    exerciseLibrary: newExerciseLibrary,
    workoutLogs: newWorkoutLogs
  };
  return newState;
};

export const cancelLogEdit = state => {
  const newState = {
    ...state,
    activeWorkout: Object.assign({}, state.tmpActiveWorkout)
  };
  return newState;
};
