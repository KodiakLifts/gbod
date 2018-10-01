const INTERVAL = 1000;

export function toggleTimer
  (
  started,
  minutes,
  seconds,
  stopTimer,
  startTimer,
  complete,
  special = false
  ) {

  if (!started && complete) {
    timeInterval(minutes, seconds, started, stopTimer, startTimer);
  } else if (special) {
    timeInterval(minutes, seconds, started, stopTimer, startTimer);
  } else {
    stopTimer();
    clearInterval(this.timer);
  }
}

function timeInterval(minutes, seconds, started, stopTimer, startTimer) {
  this.timer = setInterval(() => {
    if ((minutes === 0 && seconds === 0) || started) {
      stopTimer();
      clearInterval(this.timer);
    } else {
      startTimer();
    }
  }, INTERVAL);
}
