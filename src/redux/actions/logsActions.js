export const UPDATE_SELECTED_LOG_DATE = "UPDATE_SELECTED_LOG_DATE";
export const ADD_MEASUREMENT = "ADD_MEASUREMENT";

export const LOGS_ACTIONS = [UPDATE_SELECTED_LOG_DATE, ADD_MEASUREMENT];

export const addMeasurement = (measurementId, ammount) => {
  return {
    type: ADD_MEASUREMENT,
    measurementId,
    ammount
  };
};

export const updateSelectedLogDate = date => {
  return {
    type: UPDATE_SELECTED_LOG_DATE,
    date
  };
};
