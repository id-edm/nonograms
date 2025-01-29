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

  const containerTimer = document.createElement('div');
  containerTimer.classList.add('container__timer');
  containerApp.appendChild(containerTimer);

  const gameContainer = document.createElement('div');
  gameContainer.classList.add('container__game');
  containerApp.appendChild(gameContainer);

  const wrapperGameBoardLeft = document.createElement('div');
  wrapperGameBoardLeft.classList.add('wrapper__hints-left');
  gameContainer.appendChild(wrapperGameBoardLeft);

  const wrapperGameBoardRight = document.createElement('div');
  wrapperGameBoardRight.classList.add('wrapper__hints-right');
  gameContainer.appendChild(wrapperGameBoardRight);

  const gameBoard = document.createElement('div');
  gameBoard.classList.add('game__board');
  wrapperGameBoardRight.appendChild(gameBoard);

  const leftHints = document.createElement('div');
  leftHints.classList.add('hints', 'hints-left');
  wrapperGameBoardLeft.appendChild(leftHints);

  const topHints = document.createElement('div');
  topHints.classList.add('hints', 'hints-top');
  wrapperGameBoardRight.appendChild(topHints);

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
            gameContainer.style.gridTemplateColumns = "repeat(5, 30px)";
            gameContainer.style.gridTemplateRows = "repeat(5, 30px)";
            break;
          case "medium":
            gameContainer.style.gridTemplateColumns = "repeat(10, 30px)";
            gameContainer.style.gridTemplateRows = "repeat(10, 30px)";
            break;
          case "hard":
            gameContainer.style.gridTemplateColumns = "repeat(15, 30px)";
            gameContainer.style.gridTemplateRows = "repeat(15, 30px)";
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
        const sample = easySamples[firstSample];
        drawBoard(sample);
        drawHints(sample);
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
            drawHints(sample);
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
    const timer = document.createElement('span');
    timer.classList.add('timer');
    timer.textContent = '00 : 00';

    containerTimer.appendChild(timer);
  }

  createTimer()

  const drawBoard = (board) => {
    gameBoard.innerHTML = '';
    const gridSize = board.length;

    for (let row = 0; row < gridSize; row++) {
      for (let col = 0; col < gridSize; col++) {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        if (board[row][col] === 1) {
          cell.classList.add('color-cell');
        }
        if ((col + 1) % 5 === 0 && col !== gridSize - 1) {
          cell.classList.add('border-right');
        }
        if ((row + 1) % 5 === 0 && row !== gridSize - 1) {
          cell.classList.add('border-bottom');
        }

        gameBoard.appendChild(cell);
      }
    }
  };

  drawBoard(easySamples.Dog);

  const drawHints = (board) => {
    leftHints.innerHTML = '';
    topHints.innerHTML = '';

    board.forEach((row, rowIndex) => {
      const hintRow = document.createElement('div');
      hintRow.classList.add('hint-row');
      if ((rowIndex + 1) % 5 === 0 && rowIndex !== board.length - 1) {
        hintRow.classList.add('border-bottom');
      }

      const hintTextRow = row.join('').match(/1+/g)?.map((s) => s.length) || [0];

      hintTextRow.forEach(length => {
        const hintDiv = document.createElement('div');
        hintDiv.classList.add('hint-cell');
        hintDiv.textContent = length;
        hintRow.appendChild(hintDiv);
      });

      leftHints.appendChild(hintRow);
    });

    for (let col = 0; col < board[0].length; col++) {
      const colCells = board.map((row) => row[col]);
      const hintCol = document.createElement('div');
      hintCol.classList.add('hint-col');

      const hintTextCol = colCells.join('').match(/1+/g)?.map((s) => s.length) || [0];

      hintTextCol.forEach(length => {
        const hintDiv = document.createElement('div');
        hintDiv.classList.add('hint-cell');
        hintDiv.textContent = length;
        hintCol.appendChild(hintDiv);
      });

      topHints.appendChild(hintCol);
    }
  };


  document.body.appendChild(containerApp);
}

