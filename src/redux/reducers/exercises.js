import {
  UPDATE_SELECTED_EXERCISE_CATEGORY,
  UPDATE_SELECTED_BODY_PART
} from '../actions/exercisesActions';

export default function exercises(state = {}, action) {
  switch (action.type) {
    case UPDATE_SELECTED_EXERCISE_CATEGORY:
      return updateSelectedExerciseCategory(state, action.categoryId);
    case UPDATE_SELECTED_BODY_PART:
      return updateSelectedBodyPart(state, action.bodyPartId);
    default:
      return state;
  }
}

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