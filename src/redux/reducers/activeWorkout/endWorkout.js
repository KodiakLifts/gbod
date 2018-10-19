import moment from "moment";

export const resetWorkout = state => {
  const activeProgram = state.activeWorkout.program;
  const activeDay = state.activeWorkout.day;
  const exercises = state.programs[activeProgram].exercises.filter(exercise => {
    return exercise.day === activeDay;
  });

  const currentExercise = exercises[0].id;

  const newState = {
    ...state,
    timer: {
      ...state.timer,
      started: false
    },
    activeWorkout: {
      ...state.activeWorkout,
      currentExercise: currentExercise
    },
    programs: state.programs.map((program, index) => {
      if (index === activeProgram) {
        return {
          ...program,
          sets: state.programs[activeProgram].sets.map(set => {
            return { ...set, ...{ complete: false } };
          })
        };
      }
      return program;
    })
  };
  return newState;
};

export const finishWorkout = state => {
  const activeProgram = state.activeWorkout.program;
  const currentActiveDay = state.activeWorkout.day;
  const date = moment(new Date()).format("YYYY-MM-DD");
  const updatedSets = Array.from(state.programs[activeProgram].sets);

  const setsToLog = updatedSets.filter(set => {
    return set.day === currentActiveDay && set.complete;
  });

  const daysExercises = state.programs[activeProgram].exercises.filter(
    exercise => {
      return exercise.day === currentActiveDay;
    }
  );

  const exercisesToLog = [];
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

  let newExerciseLibrary = Array.from(state.exerciseLibrary);
  if (exercisesToLog.length !== 0) {
    exercisesToLog.forEach(exercise => {
      newExerciseLibrary = state.exerciseLibrary.map(e => {
        if (e.id === exercise.libraryId) {
          let workoutsTowardsIncrease = exercise.workoutsTowardsIncrease;
          if (exercise.complete) {
            workoutsTowardsIncrease++;
          }
          if (workoutsTowardsIncrease === exercise.workoutsToIncrease) {
            workoutsTowardsIncrease = 0;
            updatedSets.forEach(set => {
              if (set.exercise === exercise.id) {
                set.weight += exercise.increaseAmmount;
              }
            });
          }
          return {
            ...e,
            logs: state.exerciseLibrary[exercise.libraryId].logs.concat([
              {
                id: state.exerciseLibrary[exercise.libraryId].logs.length,
                date: date,
                program: activeProgram,
                day: currentActiveDay,
                supersetNext: exercise.supersetNext,
                includeWarmup: exercise.includeWarmup,
                workoutsToIncrease: exercise.workoutsToIncrease,
                increaseAmmount: exercise.increaseAmmount,
                workoutsTowardsIncrease: workoutsTowardsIncrease,
                barType: exercise.barType,
                units: exercise.units,
                sets: setsToLog.map(set => {
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
              }
            ])
          };
        }
        return e;
      });
    });
  }

  const newWorkoutLog = {
    id: state.workoutLogs.length,
    date: date,
    program: state.activeWorkout.program,
    day: state.activeWorkout.day,
    notes: state.activeWorkout.notes,
    libraryExercises: exercisesToLog.map(exercise => {
      return exercise.libraryId;
    })
  };

  const days = Array.from(state.programs[activeProgram].days);

  let nextActiveDay = currentActiveDay;
  nextActiveDay === days.length - 1 ? (nextActiveDay = 0) : nextActiveDay++;

  const nextExercises = state.programs[activeProgram].exercises.filter(
    exercise => {
      return exercise.day === nextActiveDay;
    }
  );

  let currentExercise = 0;
  if (nextExercises.length !== 0) {
    currentExercise = nextExercises[0].id;
  }

  updatedSets.forEach(set => {
    set.complete = false;
  });

  const newState = {
    ...state,
    timer: {
      ...state.timer,
      started: false
    },
    activeWorkout: {
      ...state.activeWorkout,
      day: nextActiveDay,
      currentExercise: currentExercise,
      dayBarActive: false,
      notes: ""
    },
    programs: state.programs.map(program => {
      if (program.id === activeProgram) {
        return {
          ...program,
          sets: updatedSets
        };
      }
      return program;
    }),
    exerciseLibrary: newExerciseLibrary,
    workoutLogs: state.workoutLogs.concat(newWorkoutLog)
  };
  console.log(newState);

  return newState;
};
