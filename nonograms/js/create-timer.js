export const createTimer = () => {
	const timer = document.createElement("span")
	timer.classList.add("timer")
	timer.textContent = "00 : 00"

	const containerTimer = document.querySelector(".container__timer")
	containerTimer.appendChild(timer)

	return timer
}

let timerInterval;
let timerStarted = false;

export const startTimer = () => {
	const timer = document.querySelector(".timer");
	let seconds = 0;

	if (timer && !timerStarted) {
		timerStarted = true;

		clearInterval(timerInterval);
		timerInterval = setInterval(() => {
			seconds++;
			const minutes = Math.floor(seconds / 60);
			const remainingSeconds = seconds % 60;

			timer.textContent = `${minutes.toString().padStart(2, "0")} : ${remainingSeconds.toString().padStart(2, "0")}`;
		}, 1000);
	}
};

export const stopTimer = () => {
  clearInterval(timerInterval);
};

export const resetTimer = () => {
  clearInterval(timerInterval);
  timerStarted = false;
  const timer = document.querySelector(".timer");
  if (timer) {
    timer.textContent = "00 : 00";
  }
};
