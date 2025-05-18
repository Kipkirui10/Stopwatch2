const display = document.getElementById('display');
const startStopButton = document.getElementById('startStop');
const resetButton = document.getElementById('reset');

let timerInterval;
let startTime;
let running = false;

function timeToString(time) {
  let diffInHrs = time / 3600000;
  let hh = Math.floor(diffInHrs);

  let diffInMin = (diffInHrs - hh) * 60;
  let mm = Math.floor(diffInMin);

  let diffInSec = (diffInMin - mm) * 60;
  let ss = Math.floor(diffInSec);

  let diffInMs = (diffInSec - ss) * 100;
  let ms = Math.floor(diffInMs);

  return `${hh.toString().padStart(2, '0')}:${mm.toString().padStart(2, '0')}:${ss.toString().padStart(2, '0')}`;
}

function startStop() {
  if (running) {
    clearInterval(timerInterval);
    startStopButton.textContent = 'Start';
  } else {
    startTime = Date.now() - (startTime ? Date.now() - startTime : 0);
    timerInterval = setInterval(updateDisplay, 10);
    startStopButton.textContent = 'Stop';
  }
   running = !running;
}

function updateDisplay() {
  const elapsedTime = Date.now() - startTime;
  display.textContent = timeToString(elapsedTime);
}

function reset() {
  clearInterval(timerInterval);
  display.textContent = '00:00:00';
  startStopButton.textContent = 'Start';
  running = false;
  startTime = 0;
}

startStopButton.addEventListener('click', startStop);
resetButton.addEventListener('click', reset);