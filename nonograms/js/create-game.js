import { createColorSwitch } from "./color-switch.js";
import { easySampls } from "./level-samples.js";


export const createElements = () => {
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

 const createButtons = () => {

   Object.keys(easySampls).forEach((key) => {
     const button = document.createElement('button');
     button.textContent = key;
     button.classList.add('button', 'sample', 'btn-reset');
     button.dataset.sampleId = key;
     samples.appendChild(button);
   });

   samples.addEventListener('click', (event) => {
     const target = event.target;

     if (target.classList.contains('sample')) {
       const buttons = document.querySelectorAll('.sample');
       buttons.forEach((button) => button.classList.remove('active'));
       target.classList.add('active');
       const sampleId = target.dataset.sampleId;
       const sample = easySampls[sampleId];
       if (sample) {
         drawBoard(sample);
       }
     }
   });

   const levelValues = ['Easy', 'Medium', 'Hard'];

    levelValues.forEach((value) => {
      const button = document.createElement('button');
      button.textContent = value;
      button.classList.add('button', 'level', 'btn-reset');
      levels.appendChild(button);
    });
  }

  createButtons();

  const createTimer = () => {
    const containerTimer = document.createElement('div');
    containerTimer.classList.add('container__timer');
    containerApp.appendChild(containerTimer);

    const timer = document.createElement('span');
    timer.classList.add('timer');
    timer.textContent = '00 : 00';

    containerTimer.appendChild(timer);
  }

  createTimer()

  // игровое поле
  const gameContainer = document.createElement('div');
  gameContainer.classList.add('container__game');
  containerApp.appendChild(gameContainer);

  const gameBoard = document.createElement('div');
  gameBoard.classList.add('game__board');
  gameContainer.appendChild(gameBoard);

  const drawBoard = (board) => {
    gameBoard.innerHTML = '';
    for (let row = 0; row < board.length; row++) {
      for (let col = 0; col < board[row].length; col++) {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        if (board[row][col] === 1) {
          cell.classList.add('active');
        }
        gameBoard.appendChild(cell);
      }
    }
  }

  drawBoard(easySampls.dog || [[0]]);

  document.body.appendChild(containerApp);
}

