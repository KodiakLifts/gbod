export const UPDATE_SELECTED_LOG_DATE = "UPDATE_SELECTED_LOG_DATE";

export const LOGS_ACTIONS = [UPDATE_SELECTED_LOG_DATE];

export const updateSelectedLogDate = date => {
  return {
    type: UPDATE_SELECTED_LOG_DATE,
    date
  };
};
