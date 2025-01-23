export function createElements() {
  const containerApp = document.createElement('div');
  containerApp.classList.add('container__app');

  const containerTitle = document.createElement('div');
  containerTitle.classList.add('container__title');
  containerApp.appendChild(containerTitle);

  const title = document.createElement('h1');
  title.classList.add('title');
  title.textContent = 'Nonograms!';
  containerTitle.appendChild(title);

  const containerSettings = document.createElement('div');
  containerSettings.classList.add('container__settings');
  containerApp.appendChild(containerSettings);

  const containerSamples = document.createElement('div');
  containerSamples.classList.add('container__samples');
  containerSettings.appendChild(containerSamples);

  const titleSamples = document.createElement('h3');
  titleSamples.classList.add('title__sample', 'subtitle');
  titleSamples.textContent = 'Samples';
  containerSamples.appendChild(titleSamples);

  const samples = document.createElement('div');
  samples.classList.add('samples');
  containerSamples.appendChild(samples);

  for (let i = 0; i <= 4; i++) {
    const sample = document.createElement('button');
    sample.classList.add('button', 'sample', 'btn-reset');
    sample.textContent = [i];
    samples.appendChild(sample);
  }

  const containerlevels = document.createElement('div');
  containerlevels.classList.add('container__samples');
  containerSettings.appendChild(containerlevels);

  const titleLevels = document.createElement('h3');
  titleLevels.classList.add('title__level', 'subtitle');
  titleLevels.textContent = 'levels';
  containerlevels.appendChild(titleLevels);

  const levels = document.createElement('div');
  levels.classList.add('lavels');
  containerlevels.appendChild(levels);

  const levelNames = ['Easy', 'Medium', 'Hard'];
  for (let i = 0; i <= 2; i++) {
    const level = document.createElement('button');
    level.classList.add('button', 'level', 'btn-reset');
    level.classList.add(`level-${levelNames[i].toLowerCase()}`);
    level.textContent = levelNames[i];
    levels.appendChild(level);
  }

  const containerTimer = document.createElement('div');
  containerTimer.classList.add('container__timer');
  containerApp.appendChild(containerTimer);

  const timer = document.createElement('span');
  timer.classList.add('timer');
  timer.textContent = `00 : 00`;
  containerTimer.appendChild(timer);

  const gameBoard = document.createElement('div');
  gameBoard.classList.add('game__board');
  containerApp.appendChild(gameBoard);

  document.body.appendChild(containerApp);
}

