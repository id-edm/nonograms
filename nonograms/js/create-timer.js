export let totalTime = 0;

export const setTotalTime = (time) => {
	totalTime = time;
};

export const createTimer = () => {
	const timer = document.createElement("span");
	timer.classList.add("timer");
	timer.textContent = "00 : 00";

	const containerTimer = document.querySelector(".container__timer");
	containerTimer.appendChild(timer);

	return timer;
};

let timerInterval;
let timerStarted = false;

export const startTimer = () => {
	const timer = document.querySelector(".timer");
	let seconds = totalTime;

	if (timer && !timerStarted) {
		timerStarted = true;

		clearInterval(timerInterval);
		timerInterval = setInterval(() => {
			seconds++;
			totalTime = seconds;
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
	totalTime = 0;
	const timer = document.querySelector(".timer");
	if (timer) {
		timer.textContent = "00 : 00";
	}
};


export const startNewGame = () => {
	resetTimer();
	totalTime = 0;
	startTimer();
};
