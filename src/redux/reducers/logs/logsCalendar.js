export const updateSelectedLogDate = (state, date) => {
  const newState = {
    ...state,
    selectedLogDate: date
  };
  return newState;
};
