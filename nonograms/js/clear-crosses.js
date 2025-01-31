export const clearCrosses = () => {
  const cells = document.querySelectorAll(".cell");

  cells.forEach((cell) => {
    const svg = cell.querySelector("svg");
    if (svg) {
      cell.removeChild(svg); 
    }
  });
};