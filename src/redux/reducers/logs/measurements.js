export const addMeasurement = (state, measurementId, ammount) => {
  const measurementLogs = Array.from(state.measurementLogs);

  let currentLog = state.measurementLogs.find(log => {
    return log.date === state.selectedLogDate;
  });

  if (currentLog === undefined) {
    currentLog = {
      id: state.measurementLogs.length,
      date: state.selectedLogDate,
      measurements: [
        { id: 0, measurementCategory: measurementId, ammount: ammount }
      ]
    };
    measurementLogs.push(currentLog);
  } else {
    let newMeasurement = currentLog.measurements.find(measurement => {
      return measurement.measurementCategory === measurementId;
    });
    if (newMeasurement !== undefined) {
      newMeasurement.ammount = ammount;
    } else {
      newMeasurement = {
        id: currentLog.measurements.length,
        measurementCategory: measurementId,
        ammount: ammount
      };
      currentLog.measurements.push(newMeasurement);
    }
    measurementLogs.map(log => {
      if (log.id === currentLog.id) {
        return currentLog;
      } else {
        return log;
      }
    });
  }
  const newState = {
    ...state,
    selectedLogDate: state.selectedLogDate,
    measurementLogs: measurementLogs
  };
  return newState;
};
