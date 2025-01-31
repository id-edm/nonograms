export const boardDisable = (isDisabled) => {
	const cells = document.querySelectorAll('.cell');
	cells.forEach((cell) => {
		if (isDisabled) {
			cell.style.pointerEvents = 'none';
		} else {
			cell.style.pointerEvents = 'auto';
		}
	});
};