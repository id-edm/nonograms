export function createButtons(samples, levels) {
  const buttonGroups = {
    sampleButtons: [],
    levelButtons: []
  };

  const sampleValues = [0, 1, 2, 3, 4];
  const levelValues = ['Easy', 'Medium', 'Hard'];

  sampleValues.forEach((value) => {
    const button = document.createElement('button');
    button.textContent = value;
    button.classList.add('button', 'sample', 'btn-reset');
    buttonGroups.sampleButtons.push(button);
    samples.appendChild(button);
  });

  levelValues.forEach((value) => {
    const button = document.createElement('button');
    button.textContent = value;
    button.classList.add('button', 'level', 'btn-reset');
    buttonGroups.levelButtons.push(button);
    levels.appendChild(button);
  });

  return buttonGroups;
}