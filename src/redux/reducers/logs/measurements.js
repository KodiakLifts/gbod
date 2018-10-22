export const deleteMeasurement = (state, logId, measurementId) => {
  let measurementLogs = Array.from(state.measurementLogs);
  let currentLog = Object.assign({}, state.measurementLogs[logId]);
  let updatedMeasurements = currentLog.measurements.slice(0, logId);

  updatedMeasurements = updatedMeasurements.concat(
    currentLog.measurements.slice(
      measurementId + 1,
      currentLog.measurements.length
    )
  );

  if (updatedMeasurements.length !== 0) {
    updatedMeasurements.map((m, index) => {
      updatedMeasurements[index].id = index;
    });
    currentLog.measurements = updatedMeasurements;
    measurementLogs = measurementLogs.map(log => {
      if (log.id === logId) {
        return currentLog;
      } else {
        return log;
      }
    });
  } else {
    measurementLogs = measurementLogs
      .slice(0, logId)
      .concat(measurementLogs.slice(logId + 1, measurementLogs.length));
    measurementLogs.map((l, index) => {
      measurementLogs[index].id = index;
    });
  }
  const newState = {
    ...state,
    measurementLogs: measurementLogs
  };
  return newState;
};

export const updateMeasurement = (state, logId, measurementId, ammount) => {
  const currentLog = Object.assign({}, state.measurementLogs[logId]);
  currentLog.measurements[measurementId].ammount = ammount;

  const newState = {
    ...state,
    measurementLogs: state.measurementLogs.map(log => {
      if (log.id === logId) {
        return currentLog;
      } else {
        return log;
      }
    })
  };
  return newState;
};

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
    anyLogsSelectedDate: true,
    measurementLogs: measurementLogs
  };
  return newState;
};
