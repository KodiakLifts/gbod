import {
  UPDATE_SELECTED_LOG_DATE,
  ADD_MEASUREMENT,
  UPDATE_MEASUREMENT,
  DELETE_MEASUREMENT
} from "../../actions/logsActions";
import { updateSelectedLogDate } from "./logsCalendar";
import {
  addMeasurement,
  updateMeasurement,
  deleteMeasurement
} from "./measurements";

export default function logs(state = {}, action) {
  switch (action.type) {
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
