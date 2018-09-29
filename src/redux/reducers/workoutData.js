import { UPDATE_ACTIVE_WORKOUT } from '../actions/setButtonActions';
import { FINISH_WORKOUT } from '../actions/finishButtonActions';

export default function workoutData(state = {}, action) {
  switch (action.type) {
    case UPDATE_ACTIVE_WORKOUT:
      return updateActiveWorkout(state, action.setId, action.exerciseIndex);
    case FINISH_WORKOUT:
      return nextWorkout(state, action);
    default:
      return state;
  }
}

const nextWorkout = (state, action) => {
  return state;
};

const updateActiveWorkout = (state, setId, exerciseIndex) => {
  const setState = toggleSetComplete(state, setId);
  const exerciseState = updateExerciseComplete(setState, exerciseIndex);
  const currentExerciseState = updateCurrentExercise(exerciseState, exerciseIndex);
  return currentExerciseState;
};

const toggleSetComplete = (state, setId) => {
  const program = state.activeWorkout.program;

  const setCompleteVal =
    state
      .programs[state.activeWorkout.program]
      .days[state.activeWorkout.day]
      .sets[setId];

  const newState = {
    ...state,
    programs: state.programs[program].map((program, index) => {
      if (index === program) {
        return {
          ...program,
          sets: state.programs[program].sets.map((set, index) => {
            if (index === set) {
              return {
                ...set, ...{ complete: !setCompleteVal }
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



const updateExerciseComplete = (state, exerciseIndex) => {
  const program = state.activeWorkout.program;
  const sets = state.programs[state.activeWorkout.program].sets;

  const currentSets = sets.filter(set => {
    return set.exercise === exerciseIndex;
  });

  const exerciseComplete = currentSets.every((set) => {
    return set.complete === true;
  });

  const newState = {
    programs: state.programs[program].map((program, index) => {
      if (index === program) {
        return {
          ...program,
          exercises: state.programs[program].exercises.map((exercise, index) => {
            if (index === exerciseIndex) {
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
  const program = state.activeWorkout.program;
  const exercises = state.programs[program].exercises;
  const exerciseComplete = state.programs[program]
    .exercises[currentExercise].complete;

  let updatedActiveExercise = currentExercise;

  if (exerciseComplete) {
    const allExercisesComplete = exercises.every((exercise) => {
      return exercise.complete === true;
    });

    if (!allExercisesComplete) {
      let foundExercise = false;
      let index = (currentExercise === exercises.length - 1 ? 0 : currentExercise + 1);

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
  return newState;
};