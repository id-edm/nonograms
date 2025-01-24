export function createTimer() {
  const containerTimer = document.createElement('div');
  containerTimer.classList.add('container__timer');

  const timer = document.createElement('span');
  timer.classList.add('timer');
  timer.textContent = '00 : 00';

  containerTimer.appendChild(timer);

  return containerTimer;
}