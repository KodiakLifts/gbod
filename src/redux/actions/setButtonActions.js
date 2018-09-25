export const TOGGLE_SET_COMPLETE = 'TOGGLE_SET_COMPLETE';

export const toggleSetComplete = (setId) => {
  return {
    type: TOGGLE_SET_COMPLETE,
    setId: setId
  };
};