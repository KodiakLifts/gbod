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
      return deleteExercise(state, action.libraryId)
    default:
      return state;
  }
}

const deleteExercise = (state, libraryId) => {
  return state;
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
  const newState = Object.assign({},
    state,
    {
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
    });
  return newState;
};

const updateSelectedExerciseCategory = (state, categoryId) => {
  const newState = Object.assign({},
    state,
    {
      selectedExerciseCategory: categoryId
    });
  return newState;
};

const updateSelectedBodyPart = (state, bodyPartId) => {
  const newState = Object.assign({},
    state,
    {
      selectedBodyPart: bodyPartId
    });
  return newState;
};