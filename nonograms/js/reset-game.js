import { resetTimer } from './create-timer.js';
import { boardDisable } from './board-disabled.js';

export const resetGame = () => {
  const cells = document.querySelectorAll('.cell');

  cells.forEach((cell) => {
    cell.style.backgroundColor = 'white';
    cell.style.boxShadow = 'none';
    cell.textContent = '';
  });
	resetTimer();
	boardDisable(false);
};

