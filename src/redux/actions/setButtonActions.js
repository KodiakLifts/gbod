export const SET_COMPLETE = 'SET_COMPLETE';
export const SET_INCOMPLETE = 'SET_INCOMPLETE';

export const setComplete = (setNum) => {
  return {
    type: SET_COMPLETE,
    setNum
  };
};

export const setIncomplete = (setNum) => {
  return {
    type: SET_INCOMPLETE,
    setNum
  };
};