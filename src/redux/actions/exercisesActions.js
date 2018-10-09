export const UPDATE_SELECTED_EXERCISE_CATEGORY =
  "UPDATE_SELECTED_EXERCISE_CATEGORY";
export const UPDATE_SELECTED_BODY_PART = "UPDATE_SELECTED_BODY_PART";
export const DELETE_LIBRARY_EXERCISE = "DELETE_LIBRARY_EXERCISE";
export const UPDATE_LIBRARY_EXERCISE_DATA = "UPDATE_LIBRARY_EXERCISE_DATA";
export const NEW_LIBRARY_EXERCISE = "NEW_LIBRAR_EXERCISE";

export const EXERCISES_ACTIONS = [
  UPDATE_SELECTED_EXERCISE_CATEGORY,
  UPDATE_SELECTED_BODY_PART,
  DELETE_LIBRARY_EXERCISE,
  UPDATE_LIBRARY_EXERCISE_DATA,
  NEW_LIBRARY_EXERCISE
];

export const newExercise = (name, oneRepMax, category, bodyPart, favorite) => {
  return {
    type: NEW_LIBRARY_EXERCISE,
    name,
    oneRepMax,
    category,
    bodyPart,
    favorite
  };
};

export const updateSelectedExerciseCategory = categoryId => {
  return {
    type: UPDATE_SELECTED_EXERCISE_CATEGORY,
    categoryId
  };
};

export const updateSelectedBodyPart = bodyPartId => {
  return {
    type: UPDATE_SELECTED_BODY_PART,
    bodyPartId
  };
};

export const deleteExercise = libraryId => {
  return {
    type: DELETE_LIBRARY_EXERCISE,
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
    type: UPDATE_LIBRARY_EXERCISE_DATA,
    libraryId,
    oneRepMax,
    name,
    category,
    bodyPart,
    favorite
  };
};
