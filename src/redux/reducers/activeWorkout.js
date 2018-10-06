import {
  UPDATE_ACTIVE_WORKOUT_UI,
  UPDATE_SET_DATA,
  FINISH_WORKOUT,
  RESET_WORKOUT,
  UPDATE_EXERCISE_DATA,
  STOP_TIMER,
  DECREMENT_TIMER,
  SET_TIMER,
  UPDATE_DAY_DATA,
  UPDATE_SET_REPS,
  DELETE_DAY
} from '../actions/activeWorkoutActions';

export default function activeWorkout(state = {}, action) {
  switch (action.type) {

    case UPDATE_ACTIVE_WORKOUT_UI:
      return updateActiveWorkoutUI(state, action.setId, action.exerciseId);

    case UPDATE_SET_DATA:
      return updateSetData(
        state,
        action.setId,
        action.weight,
        action.reps,
        action.setType,
        action.min,
        action.sec
      );

    case UPDATE_EXERCISE_DATA:
      return updateExerciseData(
        state,
        action.exerciseId,
        action.supersetNext,
        action.includeWarmup
      );

    case FINISH_WORKOUT:
      return finishWorkout(state);

    case RESET_WORKOUT:
      return resetWorkout(state);

    case STOP_TIMER:
      return stopTimer(state);

    case DECREMENT_TIMER:
      return decrementTimer(state, action.setId);

    case SET_TIMER:
      return setTimer(state, action.minutes, action.seconds);

    case UPDATE_DAY_DATA:
      return updateDayData(state, action.dayId, action.name);

    case DELETE_DAY:
      return deleteDay(state, action.dayId);

    case UPDATE_SET_REPS:
      return updateSetReps(state, action.setId, action.reps);

    default:
      return state;
  }
}

const deleteDay = (state, dayId) => {
  const activeProgram = state.activeWorkout.program;

  const newDays =
    state.programs[activeProgram].days.filter(day => day.id !== dayId);
  newDays.forEach((day, index) => {
    day.id = index;
  });

  const newSets = state.programs[activeProgram].sets.filter(set =>
    set.day !== dayId
  );
  newSets.forEach((set, index) => {
    set.id = index;
    if (set.day >= dayId) {
      set.day--;
    }
  });

  const newExercises =
    state.programs[activeProgram].exercises.filter(exercise =>
      exercise.day !== dayId
    );
  newExercises.forEach((exercise, index) => {
    newSets.forEach(set => {
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
  const currentExercise = newExercises[0].id;

  const newState = {
    ...state,
    activeWorkout: {
      ...state.activeWorkout,
      day: currentDay,
      currentExercise: currentExercise
    },
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

const updateDayData = (state, dayId, name) => {
  const activeProgram = state.activeWorkout.program;

  const exercises = state.programs[activeProgram].exercises.filter(exercise => {
    return exercise.day === dayId;
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
      day: dayId,
      currentExercise: currentExercise
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

const setTimer = (state, minutes, seconds) => {
  const newState = {
    ...state,
    timer: {
      ...state.timer,
      minutes,
      seconds
    }
  };
  return newState;
};

const stopTimer = (state) => {
  const newState = {
    ...state,
    timer: {
      ...state.timer,
      ...{ started: false }
    }
  };
  return newState;
};

const decrementTimer = (state, setId) => {
  let newMin = state.timer.minutes;
  let newSec = state.timer.seconds;
  let started = true;

  if (newMin === 0 && newSec === 0) {
    started = false;
  } else if (newMin === 0 && newSec !== 0) {
    newSec--;
  } else if (newMin !== 0 && newSec !== 0) {
    newSec--;
  } else if (newMin !== 0 && newSec === 0) {
    newMin--;
    newSec = 59;
  }

  const newState = {
    ...state,
    timer: {
      ...state.timer,
      ...{ started: started },
      ...{ minutes: newMin },
      ...{ seconds: newSec },
      ...{ set: setId }
    }
  };

  return newState;
};

const updateExerciseData = (state, exerciseId, supersetNext, includeWarmup) => {
  const activeProgram = state.activeWorkout.program;
  const newState = {
    ...state,
    programs: state.programs.map((program, index) => {
      if (index === activeProgram) {
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

const updateSetReps = (state, setId, reps) => {
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
                ...{ reps: reps },
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

const updateSetData = (state, setId, weight, reps, setType, min, sec) => {
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

const resetWorkout = (state) => {
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
  }
  return newState;
};

const finishWorkout = (state) => {
  const activeProgram = state.activeWorkout.program;
  const days = state.programs[activeProgram].days;

  let activeDay = state.activeWorkout.day;
  activeDay === days.length - 1 ? activeDay = 0 : activeDay++;

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
      day: activeDay,
      currentExercise: currentExercise
    },
    programs: state.programs.map(program => {
      if (program.id === activeProgram) {
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

const updateActiveWorkoutUI = (state, setId, exerciseId) => {
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