export const setTimer = (state, minutes, seconds) => {
  const newState = {
    ...state,
    timer: {
      ...state.timer,
      minutes,
      seconds
    }
  };
  return newState;
};

export const stopTimer = (state) => {
  const newState = {
    ...state,
    timer: {
      ...state.timer,
      ...{ started: false }
    }
  };
  return newState;
};

export const decrementTimer = (state, setId) => {
  let newMin = state.timer.minutes;
  let newSec = state.timer.seconds;
  let started = true;

  if (newMin === 0 && newSec === 0) {
    started = false;
  } else if (newMin === 0 && newSec !== 0) {
    newSec--;
  } else if (newMin !== 0 && newSec !== 0) {
    newSec--;
  } else if (newMin !== 0 && newSec === 0) {
    newMin--;
    newSec = 59;
  }

  const newState = {
    ...state,
    timer: {
      ...state.timer,
      ...{ started: started },
      ...{ minutes: newMin },
      ...{ seconds: newSec },
      ...{ set: setId }
    }
  };

  return newState;
};