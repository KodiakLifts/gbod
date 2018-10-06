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
  DELETE_DAY,
  REMOVE_EXERCISE,
  REMOVE_SET
} from '../../actions/activeWorkoutActions';

import { updateActiveWorkoutUI } from './updateActiveWorkoutUI';

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

    case REMOVE_SET:
      return removeSet(state, action.setId, action.exerciseId);

    case REMOVE_EXERCISE:
      return removeExercise(state, action.exerciseId);

    default:
      return state;
  }
}

const removeExercise = (state, exerciseId) => {
  const activeProgram = state.activeWorkout.program;

  let newSets = state.programs[activeProgram].sets.filter(set => {
    return set.exercise !== exerciseId;
  });
  newSets.forEach((set, index) => {
    set.id = index;
  });

  let newExercises = state.programs[activeProgram].exercises.filter(exercise => {
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

  const currentSet = newSets[0].id;
  const currentExercise = newSets[0].id;

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

const removeSet = (state, setId, exerciseId) => {
  const activeProgram = state.activeWorkout.program;
  let currentExercise = state.activeWorkout.currentExercise;
  let newExercises = state.programs[activeProgram].exercises;

  let newSets = state.programs[activeProgram].sets.filter(set =>
    set.id !== setId
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

const deleteDay = (state, dayId) => {
  const activeProgram = state.activeWorkout.program;

  let newDays =
    state.programs[activeProgram].days.filter(day => day.id !== dayId);
  newDays.forEach((day, index) => {
    day.id = index;
  });

  let newSets = state.programs[activeProgram].sets.filter(set =>
    set.day !== dayId
  );
  newSets.forEach((set, index) => {
    set.id = index;
    if (set.day >= dayId) {
      set.day--;
    }
  });

  let newExercises =
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
  };
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