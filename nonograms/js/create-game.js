import { createColorSwitch } from "./color-switch.js";
import { easySamples } from "./level-samples.js";
import { mediumSamples } from "./level-samples.js";
import { hardSamples } from "./level-samples.js";


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

  const createSamples = () => {

    Object.keys(easySamples).forEach((key) => {
      const button = document.createElement("button");
      button.textContent = key;
      button.classList.add("button", "sample", "btn-reset");
      button.dataset.sampleId = key;
      samples.appendChild(button);
    });

    samples.addEventListener("click", (event) => {
      const target = event.target;

      if (target.classList.contains("sample")) {
        document.querySelectorAll(".sample").forEach((btn) => btn.classList.remove("active"));

        target.classList.add("active");
        const sampleId = target.dataset.sampleId;
        const sample = easySamples[sampleId];

        if (sample) {
          drawBoard(sample);
        }
      }
    });
  };

  const createLevels = () => {
    const levels = document.querySelector(".levels");
    const levelValues = ["Easy", "Medium", "Hard"];
    let currentLevel = "easy";
    const levelsMap = {
      easy: easySamples,
      medium: mediumSamples,
      hard: hardSamples,
    };

    levelValues.forEach((value) => {
      const button = document.createElement("button");
      button.textContent = value;
      button.classList.add("button", "level", "btn-reset");
      button.setAttribute("data-level", value.toLowerCase());
      levels.appendChild(button);
    });

    const firstButton = levels.querySelector(".level");
    if (firstButton) {
      firstButton.classList.add("active");
    }

    levels.addEventListener("click", (event) => {
      const target = event.target;

      if (target.classList.contains("level")) {
        document.querySelectorAll(".level").forEach((btn) => btn.classList.remove("active"));

        target.classList.add("active");

        currentLevel = target.dataset.level;
        console.log(`Выбран уровень: ${currentLevel}`);

        updateSamples(levelsMap[currentLevel]);
      }
    });

    const updateSamples = (easySamples) => {
      const samples = document.querySelector(".samples");
      const gameContainer = document.querySelector(".game__board");
      samples.innerHTML = '';

      if (gameContainer) {
        switch (currentLevel) {
          case "easy":
            gameContainer.style.gridTemplateColumns = "repeat(5, 35px)";
            gameContainer.style.gridTemplateRows = "repeat(5, 35px)";
            break;
          case "medium":
            gameContainer.style.gridTemplateColumns = "repeat(10, 35px)";
            gameContainer.style.gridTemplateRows = "repeat(10, 35px)";
            break;
          case "hard":
            gameContainer.style.gridTemplateColumns = "repeat(15, 35px)";
            gameContainer.style.gridTemplateRows = "repeat(15, 35px)";
            break;
        }
      }

      Object.keys(easySamples).forEach((key) => {
        const button = document.createElement("button");
        button.textContent = key;
        button.classList.add("button", "sample", "btn-reset");
        button.dataset.sampleId = key;
        samples.appendChild(button);
      });

      const firstSample = Object.keys(easySamples)[0];
      if (firstSample) {
        drawBoard(easySamples[firstSample]);
      }

      samples.addEventListener("click", (event) => {
        const target = event.target;

        if (target.classList.contains("sample")) {
          document.querySelectorAll(".sample").forEach((btn) => btn.classList.remove("active"));

          target.classList.add("active");
          const sampleId = target.dataset.sampleId;
          const sample = easySamples[sampleId];

          if (sample) {
            drawBoard(sample);
          }
        }
      });
    };

    updateSamples(levelsMap[currentLevel]);
  };

  document.addEventListener("DOMContentLoaded", () => {
    createSamples();
    createLevels();
  });

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

  drawBoard(easySamples.Dog || [[0]]);

  document.body.appendChild(containerApp);
}

