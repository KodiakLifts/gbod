import {
  UPDATE_SELECTED_LOG_DATE,
  ADD_MEASUREMENT,
  UPDATE_MEASUREMENT,
  DELETE_MEASUREMENT,
  EDIT_LOG_NOTES
} from "../../actions/logsActions";
import { updateSelectedLogDate } from "./logsCalendar";
import {
  addMeasurement,
  updateMeasurement,
  deleteMeasurement
} from "./measurements";
import { editLogNotes } from "./notes";

export default function logs(state = {}, action) {
  switch (action.type) {
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
