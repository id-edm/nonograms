export const boardDisable = (isDisabled) => {
	const gameBoard = document.querySelector('.game__board');
	if (isDisabled) {
		gameBoard.classList.add('locked');
	} else {
		gameBoard.classList.remove('locked');
	}
};