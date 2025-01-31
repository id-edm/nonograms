
import { createSvgCross } from './create-svg.js';

export const handleRightClick = (event, cell) => {
  event.preventDefault();

  if (cell.style.backgroundColor !== 'black') {
    const existingSvg = cell.querySelector('svg');
    if (existingSvg) {
      cell.removeChild(existingSvg);
    } else {
      const svgCross = createSvgCross();
      cell.appendChild(svgCross);
    }
  }
};
