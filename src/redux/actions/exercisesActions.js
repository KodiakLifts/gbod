export const UPDATE_SELECTED_EXERCISE_CATEGORY = 'UPDATE_SELECTED_EXERCISE_CATEGORY';
export const UPDATE_SELECTED_BODY_PART = 'UPDATE_SELECTED_BODY_PART';
export const DELETE_EXERCISE = 'DELETE_EXERCISE';
export const UPDATE_EXERCISE_DATA = 'UPDATE_EXERCISE_DATA';

export const EXERCISES_ACTIONS = [
  UPDATE_SELECTED_EXERCISE_CATEGORY,
  UPDATE_SELECTED_BODY_PART,
  DELETE_EXERCISE,
  UPDATE_EXERCISE_DATA
];

export const updateSelectedExerciseCategory = (categoryId) => {
  return {
    type: UPDATE_SELECTED_EXERCISE_CATEGORY,
    categoryId
  };
};

export const updateSelectedBodyPart = (bodyPartId) => {
  return {
    type: UPDATE_SELECTED_BODY_PART,
    bodyPartId
  };
};

export const deleteExercise = (libraryId) => {
  return {
    type: DELETE_EXERCISE,
    libraryId
  };
};

export const updateExerciseData = (
  libraryId,
  oneRepMax,
  name,
  category,
  bodyPart,
  favorite
) => {
  return {
    type: UPDATE_EXERCISE_DATA,
    libraryId,
    oneRepMax,
    name,
    category,
    bodyPart,
    favorite
  };
};