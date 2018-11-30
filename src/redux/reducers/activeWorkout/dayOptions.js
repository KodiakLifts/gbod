export const setCurrentDay = (state, dayId) => {
  const newState = {
    ...state,
    activeWorkout: {
      ...state.activeWorkout,
      day: dayId
    }
  };
  return newState;
};

export const shiftDayDown = (state, dayId) => {
  const activeProgram = state.activeWorkout.program;
  const newDays = Array.from(state.programs[activeProgram].days);

  const dayToShift = newDays[dayId];
  newDays[dayId] = newDays[dayId + 1];
  newDays[dayId + 1] = dayToShift;

  newDays.map((day, index) => {
    day.id = index;
  });

  const newSets = state.programs[activeProgram].sets.map(set => {
    if (set.day === dayId) {
      return { ...set, day: dayId + 1 };
    } else if (set.day === dayId + 1) {
      return { ...set, day: dayId };
    }
    return set;
  });

  newSets.map((set, index) => {
    set.id = index;
  });

  const newExercises = state.programs[activeProgram].exercises.map(exercise => {
    if (exercise.day === dayId) {
      return { ...exercise, day: dayId + 1 };
    } else if (exercise.day === dayId + 1) {
      return { ...exercise, day: dayId };
    }
    return exercise;
  });

  newExercises.map((exercise, index) => {
    exercise.id = index;
  });

  const newState = {
    ...state,
    programs: state.programs.map(program => {
      if (program.id === activeProgram) {
        return {
          ...program,
          sets: newSets,
          exercises: newExercises,
          days: newDays
        };
      }
      return program;
    })
  };
  return newState;
};

export const shiftDayUp = (state, dayId) => {
  const activeProgram = state.activeWorkout.program;
  const newDays = Array.from(state.programs[activeProgram].days);

  const dayToShift = newDays[dayId];
  newDays[dayId] = newDays[dayId - 1];
  newDays[dayId - 1] = dayToShift;

  newDays.map((day, index) => {
    day.id = index;
  });

  const newSets = state.programs[activeProgram].sets.map(set => {
    if (set.day === dayId) {
      return { ...set, day: dayId - 1 };
    } else if (set.day === dayId - 1) {
      return { ...set, day: dayId };
    }
    return set;
  });

  newSets.map((set, index) => {
    set.id = index;
  });

  const newExercises = state.programs[activeProgram].exercises.map(exercise => {
    if (exercise.day === dayId) {
      return { ...exercise, day: dayId - 1 };
    } else if (exercise.day === dayId - 1) {
      return { ...exercise, day: dayId };
    }
    return exercise;
  });

  newExercises.map((exercise, index) => {
    exercise.id = index;
  });

  const newState = {
    ...state,
    programs: state.programs.map(program => {
      if (program.id === activeProgram) {
        return {
          ...program,
          sets: newSets,
          exercises: newExercises,
          days: newDays
        };
      }
      return program;
    })
  };
  return newState;
};

export const dayBarPress = state => {
  const newState = {
    ...state,
    activeWorkout: {
      ...state.activeWorkout,
      dayBarActive: true
    }
  };
  return newState;
};

export const deactivateDayBar = state => {
  const newState = {
    ...state,
    activeWorkout: { ...state.activeWorkout, dayBarActive: false }
  };
  return newState;
};

export const updateActiveDay = (state, dayId) => {
  const activeProgram = state.activeWorkout.program;
  const exercises = state.programs[activeProgram].exercises.filter(exercise => {
    return exercise.day === dayId;
  });

  const currentExercise =
    exercises.length !== 0 ? exercises[0].id : state.activeWorkout.exercise;

  const newState = {
    ...state,
    activeWorkout: {
      ...state.activeWorkout,
      day: dayId,
      currentExercise: currentExercise
    }
  };
  return newState;
};

export const addDay = (state, name) => {
  const activeProgram = state.activeWorkout.program;
  const newId = state.programs[activeProgram].days.length;
  const newDay = { id: newId, name: name };

  const newState = {
    ...state,
    activeWorkout: {
      ...state.activeWorkout,
      day: newId
    },
    programs: state.programs.map(program => {
      if (program.id === activeProgram) {
        return {
          ...program,
          days: [...program.days, newDay]
        };
      }
      return program;
    })
  };
  return newState;
};

export const deleteDay = (state, dayId) => {
  const activeProgram = state.activeWorkout.program;

  let newDays = state.programs[activeProgram].days.filter(
    day => day.id !== dayId
  );
  newDays.map((day, index) => {
    day.id = index;
  });

  let newSets = state.programs[activeProgram].sets.filter(
    set => set.day !== dayId
  );
  newSets.map((set, index) => {
    set.id = index;
    if (set.day >= dayId) {
      set.day--;
    }
  });

  let newExercises = state.programs[activeProgram].exercises.filter(
    exercise => exercise.day !== dayId
  );
  newExercises.map((exercise, index) => {
    newSets.map(set => {
      if (set.exercise === exercise.id) {
        set.exercise = index;
      }
    });
    exercise.id = index;
    if (exercise.day >= dayId) {
      exercise.day--;
    }
  });

  const currentDay = newDays[0].id;
  let currentExercise = 0;
  if (newExercises.length !== 0) {
    currentExercise = newExercises[0].id;
  }

  let newWorkoutLogs = [];
  if (state.workoutLogs.length !== 0) {
    newWorkoutLogs = state.workoutLogs.filter(log => {
      return log.day !== dayId;
    });
    if (newWorkoutLogs.length !== 0) {
      newWorkoutLogs.map((log, index) => {
        log.id = index;
        if (log.day >= dayId) {
          log.day--;
        }
      });
    }
  }

  let newExerciseLibrary = [];
  if (state.exerciseLibrary.length !== 0) {
    newExerciseLibrary = state.exerciseLibrary.map(exercise => {
      let newExercise = Object.assign({}, exercise);
      if (newExercise.logs.length !== 0) {
        newExercise.logs = newExercise.logs.filter(log => {
          return log.day !== dayId;
        });
        newExercise.logs.map((log, index) => {
          log.id = index;
          if (log.day >= dayId) {
            log.day--;
          }
        });
      }

      return newExercise;
    });
  }

  const newState = {
    ...state,
    activeWorkout: {
      ...state.activeWorkout,
      day: currentDay,
      currentExercise: currentExercise
    },
    exerciseLibrary: newExerciseLibrary,
    workoutLogs: newWorkoutLogs,
    programs: state.programs.map(program => {
      if (program.id === activeProgram) {
        return {
          ...program,
          days: newDays,
          exercises: newExercises,
          sets: newSets
        };
      }
      return program;
    })
  };
  return newState;
};

export const updateDayData = (state, dayId, name) => {
  const activeProgram = state.activeWorkout.program;

  const newState = {
    ...state,
    timer: {
      ...state.timer,
      started: false
    },
    programs: state.programs.map(program => {
      if (program.id === activeProgram) {
        return {
          ...program,
          sets: state.programs[activeProgram].sets.map(set => {
            return { ...set, complete: false };
          }),
          days: state.programs[activeProgram].days.map(day => {
            if (day.id === dayId) {
              return { ...day, name: name };
            }
            return day;
          })
        };
      }
      return program;
    })
  };
  return newState;
};
