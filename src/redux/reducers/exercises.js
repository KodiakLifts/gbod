import {
  UPDATE_SELECTED_EXERCISE_CATEGORY,
  UPDATE_SELECTED_BODY_PART,
  UPDATE_LIBRARY_EXERCISE_DATA,
  DELETE_LIBRARY_EXERCISE,
} from '../actions/exercisesActions';

export default function exercises(state = {}, action) {
  switch (action.type) {
    case UPDATE_SELECTED_EXERCISE_CATEGORY:
      return updateSelectedExerciseCategory(state, action.categoryId);
    case UPDATE_SELECTED_BODY_PART:
      return updateSelectedBodyPart(state, action.bodyPartId);
    case UPDATE_LIBRARY_EXERCISE_DATA:
      return updateExerciseData(
        state,
        action.libraryId,
        action.oneRepMax,
        action.name,
        action.category,
        action.bodyPart,
        action.favorite
      );
    case DELETE_LIBRARY_EXERCISE:
      return deleteExercise(state, action.libraryId);
    default:
      return state;
  }
}

const deleteExercise = (state, libraryId) => {
  let newLibrary = state.exerciseLibrary.filter(exercise => {
    return exercise.id !== libraryId;
  });

  let removedExerciseId;

  let newPrograms = state.programs;

  newPrograms.forEach(program => {

    let newExercises = program.exercises.filter(exercise => {
      if (exercise.libraryId === libraryId) {
        removedExerciseId = exercise.id;
      }
      return exercise.libraryId !== libraryId;
    });

    let newSets = program.sets.filter(set => {
      return set.exercise !== removedExerciseId;
    });
    newSets.forEach((set, index) => {
      set.id = index;
    });

    newExercises.forEach((exercise, index) => {
      newSets.forEach(set => {
        if (set.exercise === exercise.id) {
          set.exercise = index;
        }
      });
      exercise.id = index;

      let tmpLibId = newLibrary.findIndex(e => e.id === exercise.libraryId);
      exercise.libraryId = tmpLibId;
    });

    program.sets = newSets;
    program.exercises = newExercises;
  });

  newLibrary.forEach((exercise, index) => {
    exercise.id = index;
  });

  const newState = {
    ...state,
    activeWorkout: {
      ...state.activeWorkout,
      set: 0,
      currentExercise: 0
    },
    programs: newPrograms,
    exerciseLibrary: newLibrary
  };
  return newState;
};

const updateExerciseData = (
  state,
  libraryId,
  oneRepMax,
  name,
  category,
  bodyPart,
  favorite
) => {
  const newState = {
    ...state,
    exerciseLibrary: state.exerciseLibrary.map(exercise => {
      if (exercise.id === libraryId) {
        return {
          ...exercise,
          oneRepMax,
          name,
          category,
          bodyPart,
          favorite
        };
      }
      return exercise;
    })
  };
  return newState;
};

const updateSelectedExerciseCategory = (state, categoryId) => {
  const newState = {
    ...state,
    selectedExerciseCategory: categoryId
  };
  return newState;
};

const updateSelectedBodyPart = (state, bodyPartId) => {
  const newState = {
    ...state,
    selectedBodyPart: bodyPartId
  };
  return newState;
};