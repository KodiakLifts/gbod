import {
  UPDATE_ACTIVE_WORKOUT_UI,
  UPDATE_SET_DATA,
  FINISH_WORKOUT,
  RESET_WORKOUT,
  UPDATE_EXERCISE_DATA,
  STOP_TIMER,
  START_TIMER,
  DECREMENT_TIMER
} from '../actions/activeWorkoutActions';

export default function workoutData(state = {}, action) {
  switch (action.type) {
    case UPDATE_ACTIVE_WORKOUT_UI:
      return updateActiveWorkoutUI(state, action.setId, action.exerciseId);
    case UPDATE_SET_DATA:
      return updateSetData(state, action.setId, action.weight, action.reps, action.setType);
    case UPDATE_EXERCISE_DATA:
      return updateExerciseData(state, action.exerciseId, action.supersetNext, action.includeWarmup);
    case FINISH_WORKOUT:
      return finishWorkout(state);
    case RESET_WORKOUT:
      return resetWorkout(state);
    case STOP_TIMER:
      return stopTimer(state);
    case START_TIMER:
      return startTimer(state);
    case DECREMENT_TIMER:
      return decrementTimer(state);
    default:
      return state;
  }
}


const startTimer = (state) => {
  const newState = {
    ...state,
    timer: {
      ...state.timer,
      ...{ started: true }
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

const decrementTimer = (state) => {
  let newMin = state.timer.minutes;
  let newSec = state.timer.seconds;
  let started = state.timer.started;
  started = true;

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
      ...{ seconds: newSec }
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

const updateSetData = (state, setId, weight, reps, setType) => {
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
                ...{ type: setType }
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