export const UPDATE_SELECTED_EXERCISE_CATEGORY = 'UPDATE_SELECTED_EXERCISE_CATEGORY';
export const UPDATE_SELECTED_BODY_PART = 'UPDATE_SELECTED_BODY_PART';

export const EXERCISES_ACTIONS = [
  UPDATE_SELECTED_EXERCISE_CATEGORY,
  UPDATE_SELECTED_BODY_PART
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