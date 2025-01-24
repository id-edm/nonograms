import { createButtons } from "./create-button.js";
import { createColorSwitch } from "./create-color-switch.js";
import { createTimer } from "./create-timer.js";
import { createGameBoard } from "./create-game-board.js";


export function createElements() {
  const containerApp = document.createElement('div');
  containerApp.classList.add('container__app');

  containerApp.appendChild(createColorSwitch());

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

  const containerLevels = document.createElement('div');
  containerLevels.classList.add('container__levels');
  containerSettings.appendChild(containerLevels);

  const titleLevels = document.createElement('h3');
  titleLevels.classList.add('title__level', 'subtitle');
  titleLevels.textContent = 'levels';
  containerLevels.appendChild(titleLevels);

  const levels = document.createElement('div');
  levels.classList.add('levels');
  containerLevels.appendChild(levels);

  createButtons(samples, levels);

  const timer = createTimer();
  containerApp.appendChild(timer);

  const gameBoard = createGameBoard();
  containerApp.appendChild(gameBoard);

  document.body.appendChild(containerApp);
}

