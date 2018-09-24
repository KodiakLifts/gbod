import { SET_COMPLETE, SET_INCOMPLETE } from '../actions/setButtonActions';
import { initState } from '../initState';

export default (state = initState, action) => {
  switch (action.type) {
    case SET_COMPLETE:
      return state;
    case SET_INCOMPLETE:
      return state;
    default:
      return state;
  }
};