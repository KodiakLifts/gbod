import { INITIALIZE_USER_DATA } from "../../actions/userActions";

export default function user(state = {}, action) {
  switch (action.type) {
    case INITIALIZE_USER_DATA:
      return state;
    default:
      return state;
  }
}

const initializeUserDate = (state, data) => {};
