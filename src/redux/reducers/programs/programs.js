import {
  UPDATE_PROGRAM_DATA,
  DELETE_PROGRAM,
  UPDATE_SELECTED_PROGRAM_CATEGORY,
  NEW_PROGRAM
} from "../../actions/programsActions";

import {
  updateProgramData,
  deleteProgram,
  updateSelectedProgramCategory
} from "./programOptions";
import { newProgram } from "./newProgram";

export default function programs(state = {}, action) {
  switch (action.type) {
    case UPDATE_PROGRAM_DATA:
      return updateProgramData(
        state,
        action.programId,
        action.current,
        action.name
      );
    case DELETE_PROGRAM:
      return deleteProgram(state, action.programId);
    case UPDATE_SELECTED_PROGRAM_CATEGORY:
      return updateSelectedProgramCategory(state, action.categoryId);
    case NEW_PROGRAM:
      return newProgram(
        state,
        action.current,
        action.name,
        action.templateId,
        action.categoryId,
        action.description,
        action.favorite
      );
    default:
      return state;
  }
}
