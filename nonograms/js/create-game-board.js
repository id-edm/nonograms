export function createGameBoard() {
  const gameBoard = document.createElement('div');
  gameBoard.classList.add('game__board');
  gameBoard.textContent = 'Nonograms!';
  
  return gameBoard;
}