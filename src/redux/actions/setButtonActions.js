export const SET_COMPLETE = 'SET_COMPLETE';
export const SET_INCOMPLETE = 'SET_INCOMPLETE';

export const setComplete = (setId) => {
  return {
    type: SET_COMPLETE,
    setId: setId
  };
};

export const setIncomplete = (setId) => {
  return {
    type: SET_INCOMPLETE,
    setId: setId
  };
};