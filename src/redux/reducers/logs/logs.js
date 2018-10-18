import { UPDATE_SELECTED_LOG_DATE } from "../../actions/logsActions";
import { updateSelectedLogDate } from "./logsCalendar";

export default function logs(state = {}, action) {
  switch (action.type) {
    case UPDATE_SELECTED_LOG_DATE:
      return updateSelectedLogDate(state, action.date);
    default:
      return state;
  }
}
