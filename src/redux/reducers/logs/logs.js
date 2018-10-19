import {
  UPDATE_SELECTED_LOG_DATE,
  ADD_MEASUREMENT
} from "../../actions/logsActions";
import { updateSelectedLogDate } from "./logsCalendar";
import { addMeasurement } from "./measurements";

export default function logs(state = {}, action) {
  switch (action.type) {
    case ADD_MEASUREMENT:
      return addMeasurement(state, action.measurementId, action.ammount);
    case UPDATE_SELECTED_LOG_DATE:
      return updateSelectedLogDate(state, action.date);
    default:
      return state;
  }
}
