
export const resetGame = () => {
  const cells = document.querySelectorAll('.cell');

  currentBoard = currentBoard.map(row => row.map(cell => 0));

  cells.forEach((cell, index) => {
    cell.style.backgroundColor = '';
    cell.style.boxShadow = '';
    cell.textContent = '';
  });
	resetTimer();
	boardDisable(false);
};

