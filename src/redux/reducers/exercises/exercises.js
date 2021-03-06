import {
  UPDATE_SELECTED_EXERCISE_CATEGORY,
  UPDATE_SELECTED_BODY_PART,
  UPDATE_LIBRARY_EXERCISE_DATA,
  DELETE_LIBRARY_EXERCISE,
  NEW_LIBRARY_EXERCISE,
  UPDATE_MODAL_SELECTED_BODY_PART,
  UPDATE_MODAL_SELECTED_EXERCISE_CATEGORY
} from "../../actions/exercisesActions";
import {
  updateModalSelectedBodyPart,
  updateModalSelectedExerciseCategory,
  updateExerciseData,
  updateSelectedBodyPart,
  updateSelectedExerciseCategory,
  deleteExercise,
  newExercise
} from "./exerciseLibrary";

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
    case NEW_LIBRARY_EXERCISE:
      return newExercise(
        state,
        action.name,
        action.oneRepMax,
        action.category,
        action.bodyPart,
        action.favorite
      );
    case UPDATE_MODAL_SELECTED_BODY_PART:
      return updateModalSelectedBodyPart(state, action.bodyPartId);
    case UPDATE_MODAL_SELECTED_EXERCISE_CATEGORY:
      return updateModalSelectedExerciseCategory(state, action.categoryId);
    default:
      return state;
  }
}
