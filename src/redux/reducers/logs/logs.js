import {
  UPDATE_SELECTED_LOG_DATE,
  ADD_MEASUREMENT,
  UPDATE_MEASUREMENT,
  DELETE_MEASUREMENT,
  EDIT_LOG_NOTES,
  DELETE_LOG,
  GENERATE_EDIT_LOG,
  CANCEL_LOG_EDIT,
  FINISH_LOG_EDIT
} from "../../actions/logsActions";
import { updateSelectedLogDate, deleteLog } from "./logsCalendar";
import { generateEditLog, cancelLogEdit, finishLogEdit } from "./editLog";
import {
  addMeasurement,
  updateMeasurement,
  deleteMeasurement
} from "./measurements";
import { editLogNotes } from "./notes";

export default function logs(state = {}, action) {
  switch (action.type) {
    case FINISH_LOG_EDIT:
      return finishLogEdit(state, action.newTitle);
    case CANCEL_LOG_EDIT:
      return cancelLogEdit(state);
    case GENERATE_EDIT_LOG:
      return generateEditLog(state, action.logId);
    case DELETE_LOG:
      return deleteLog(state, action.date);
    case EDIT_LOG_NOTES:
      return editLogNotes(state, action.logId, action.noteText);
    case DELETE_MEASUREMENT:
      return deleteMeasurement(state, action.logId, action.measurementId);
    case UPDATE_MEASUREMENT:
      return updateMeasurement(
        state,
        action.logId,
        action.measurementId,
        action.ammount
      );
    case ADD_MEASUREMENT:
      return addMeasurement(state, action.measurementId, action.ammount);
    case UPDATE_SELECTED_LOG_DATE:
      return updateSelectedLogDate(state, action.date);
    default:
      return state;
  }
}
