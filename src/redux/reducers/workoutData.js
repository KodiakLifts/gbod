import { UPDATE_ACTIVE_WORKOUT } from '../actions/setButtonActions';
import { FINISH_WORKOUT } from '../actions/finishButtonActions';

export default function workoutData(state = {}, action) {
  switch (action.type) {
    case UPDATE_ACTIVE_WORKOUT:
      return updateActiveWorkout(state, action.setId, action.exerciseId);
    case FINISH_WORKOUT:
      return nextWorkout(state);
    default:
      return state;
  }
}

const nextWorkout = (state) => {
  const activeProgram = state.activeWorkout.program;
  const days = state.programs[activeProgram].days;
  let activeDay = state.activeWorkout.day;
  activeDay === days.length - 1 ? activeDay = 0 : activeDay++;

  const newState = {
    ...state,
    activeWorkout: {
      ...state.activeWorkout,
      day: activeDay
    },
    programs: state.programs.map((program, index) => {
      if (index === activeProgram) {
        return {
          ...program,
          sets: state.programs[activeProgram].sets.map((set, index) => {
            return { ...set, ...{ complete: false } };
          })
        }
      }
      return program;
    })
  }
  return newState;
};


const updateActiveWorkout = (state, setId, exerciseId) => {
  const setState = toggleSetComplete(state, setId);
  const exerciseState = updateExerciseComplete(setState, exerciseId);
  const currentExerciseState = updateCurrentExercise(exerciseState, exerciseId);
  return currentExerciseState;
};

const toggleSetComplete = (state, setId) => {
  const activeProgram = state.activeWorkout.program;

  const setCompleteVal =
    state.programs[state.activeWorkout.program].sets[setId].complete;

  const newState = {
    ...state,
    programs: state.programs.map((program, index) => {
      if (index === activeProgram) {
        return {
          ...program,
          sets: state.programs[activeProgram].sets.map((set, index) => {
            if (index === setId) {
              return {
                ...set, ...{ complete: !setCompleteVal }
              };
            }
            return set;
          }),
          exercises: state.programs[activeProgram].exercises.map((exercise, index) => {
            if (index === exercise.id) {
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
    programs: state.programs.map((program, index) => {
      if (index === activeProgram) {
        return {
          ...program,
          exercises: state.programs[activeProgram].exercises.map((exercise, index) => {
            if (index === exerciseId) {
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

const updateCurrentExercise = (state, currentExercise) => {
  const activeProgram = state.activeWorkout.program;
  const exercises = state.programs[activeProgram].exercises.filter(exercise => {
    return exercise.day === state.activeWorkout.day;
  });

  const exerciseComplete = state.programs[activeProgram]
    .exercises[currentExercise].complete;

  let updatedActiveExercise = currentExercise;

  if (exerciseComplete) {
    const allExercisesComplete = exercises.every((exercise) => {
      return exercise.complete === true;
    });

    if (!allExercisesComplete) {
      let foundExercise = false;
      let index = (currentExercise === exercises[exercises.length - 1].id ? 0 : currentExercise + 1);

      for (let i = index; i < exercises.length; i++) {
        if (!exercises[i].complete) {
          updatedActiveExercise = i;
          foundExercise = true;
          break;
        }
      }
      if (!foundExercise) {
        for (let i = 0; i < exercises.length; i++) {
          if (!exercises[i].complete) {
            updatedActiveExercise = i;
            foundExercise = true;
            break;
          }
          if (i === currentExercise) {
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
      currentExercise: updatedActiveExercise,
    }
  };
  console.log(newState)
  return newState;
};