import { nanogramsSamples } from './level-samples.js';
import { boardDisable } from './board-disabled.js';
import { stopTimer } from './create-timer.js';

export const checkWin = () => {
  const cells = document.querySelectorAll('.cell');
  let isSolved = true;

  const selectedLevel = document.querySelector('.level.active')?.dataset.level;
  const selectedSample = document.querySelector('.sample.active');

  const sampleId = selectedSample.dataset.sampleId;
  const sample = nanogramsSamples[selectedLevel]?.[sampleId];

  sample.forEach((row, rowIndex) => {
    row.forEach((cellValue, colIndex) => {
      const cellIndex = rowIndex * sample[0].length + colIndex;
      const cell = cells[cellIndex];

      const currentColor = window.getComputedStyle(cell).backgroundColor;
      const expectedColor = cellValue === 1 ? 'rgb(0, 0, 0)' : 'rgb(255, 255, 255)';
      if (currentColor !== expectedColor) {
        isSolved = false;
      }
    });
  });

  if (isSolved) {
  	console.log('Отлично! Вы решили нонограмму!');
		stopTimer()
    boardDisable(true);
  }
};
