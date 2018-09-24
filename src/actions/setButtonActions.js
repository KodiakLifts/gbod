

export const setComplete = (setNum) => {
  return {
    type: 'SET_COMPLETE',
    setNum
  };
};

export const setIncomplete = (setNum) => {
  return {
    type: 'SET_INCOMPLETE',
    setNum
  };
};