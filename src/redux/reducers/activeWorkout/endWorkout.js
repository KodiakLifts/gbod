import moment from "moment";

export const finishWorkout = state => {
  const activeProgram = state.activeWorkout.program;
  const currentActiveDay = state.activeWorkout.day;
  const date = moment(new Date()).format("YYYY-MM-DD");
  const updatedSets = Array.from(state.programs[activeProgram].sets);
  const logTitle =
    "" +
    state.programs[activeProgram].name +
    " - " +
    state.programs[activeProgram].days[currentActiveDay].name;
  const exercisesToLog = [];
  let newExerciseLibrary = Array.from(state.exerciseLibrary);
  const days = Array.from(state.programs[activeProgram].days);
  let anyLogsSelectedDate = true;
  let newWorkoutLog = null;

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
        newExerciseLibrary = state.exerciseLibrary.map(libraryExercise => {
          if (libraryExercise.id === exercise.libraryId) {
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
              ...libraryExercise,
              logs: state.exerciseLibrary[exercise.libraryId].logs.concat([
                {
                  id: state.exerciseLibrary[exercise.libraryId].logs.length,
                  date: date,
                  title: logTitle,
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
          return libraryExercise;
        });
      });
    }
    newWorkoutLog = {
      id: state.workoutLogs.length,
      date: date,
      title: logTitle,
      notes: state.activeWorkout.notes,
      libraryExercises: exercisesToLog.map(exercise => {
        return exercise.libraryId;
      })
    };
  } else {
    anyLogsSelectedDate = false;
  }

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
    anyLogsSelectedDate: anyLogsSelectedDate,
    exerciseLibrary: newExerciseLibrary,
    workoutLogs:
      newWorkoutLog !== null
        ? state.workoutLogs.concat([newWorkoutLog])
        : state.workoutLogs
  };
  return newState;
};
