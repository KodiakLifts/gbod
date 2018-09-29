import { UPDATE_ACTIVE_WORKOUT } from '../actions/setButtonActions';

export default function programs(state = [], action) {
  return state;
  // switch (action.type) {
  //   case UPDATE_ACTIVE_WORKOUT:
  //     console.log(state);

  //     return updateActiveWorkout(state, action);
  //   default:
  //     return state;
  // }
}

const updateActiveWorkout = (state, action) => {
  const { programId, dayId, setId, exerciseIndex, } = action;
  const setState = toggleSetComplete(state, programId, dayId, setId);
  const exerciseState = updateExerciseComplete(setState, exerciseIndex);
  const currentExerciseState = updateCurrentExercise(exerciseState, exerciseIndex);
  return currentExerciseState;
};

const toggleSetComplete = (state, programId, dayId, setId) => {
  const setCompleteVal =
    state[programId]
      .days[dayId]
      .sets[setId]
      .complete;

  const newState = [
    ...state.slice(0, programId),
    {
      ...state[programId],
      days: state[programId].days.map((day, index) => {
        if (index === dayId) {
          return {
            ...day,
            sets: state[programId].days[dayId].sets[setId].map((set, index) => {
              if (index === setId) {
                return {
                  ...set,
                  ...{ complete: !setCompleteVal }
                };
              }
              return set;
            }
            )
          };
        }
        return day;
      })
    },
    ...state.slice(programId + 1)
  ];





  return newState;
};

const updateExerciseComplete = (state, exerciseIndex) => {
  const sets = state.sets;
  const currentSets = sets.filter(set => {
    return set.exercise === exerciseIndex;
  });
  const exerciseComplete = currentSets.every((set) => {
    return set.complete === true;
  });
  const newState = {
    ...state,
    exercises: state.exercises.map((exercise, index) => {
      if (index === exerciseIndex) {
        return { ...exercise, ...{ complete: exerciseComplete } };
      }
      return exercise;
    }),
  };
  return newState;
};

const updateCurrentExercise = (state, currentExercise) => {
  const exercises = state.exercises;
  const exerciseComplete = state.exercises[currentExercise].complete;

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
    currentExercise: updatedActiveExercise,
  };
  return newState;
};