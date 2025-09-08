import { createColorSwitch } from './color-switch.js';
import { createSvgSound, createSvgCross } from './create-svg.js';
import { createSvgBestGame } from './create-svg.js';
import { checkWin } from './win-game.js';
import { clearCrosses } from './clear-crosses.js';
import { boardDisable } from './board-disabled.js';
import { playSound } from './sounds.js';
import { totalTime, setTotalTime, startNewGame } from "./create-timer.js";
import { createTimer, startTimer, resetTimer, stopTimer } from './create-timer.js';
import { nanogramsSamples } from './level-samples.js';

let currentLevel = 'easy';
let currentSample = ''
let currentBoard = [];
window.currentBoard = currentBoard;
const levelsMap = {
  easy: nanogramsSamples.easy,
  medium: nanogramsSamples.medium,
  hard: nanogramsSamples.hard,
};

export const createElements = () => {
  const containerApp = document.createElement('div');
  containerApp.classList.add('container__app');

  const containerTitle = document.createElement('div');
  containerTitle.classList.add('container__title');
  containerApp.appendChild(containerTitle);

  const title = document.createElement('h1');
  title.classList.add('title');
  title.textContent = 'Nanograms!';
  containerTitle.appendChild(title);

  const uiSettings = document.createElement('div');
  uiSettings.classList.add('ui__settings');
  containerApp.appendChild(uiSettings);


  uiSettings.appendChild(createSvgSound())
  uiSettings.appendChild(createColorSwitch());
  uiSettings.appendChild(createSvgBestGame())

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

  const containerControl = document.createElement('div');
  containerControl.classList.add('container__control');
  containerApp.appendChild(containerControl);

  document.body.appendChild(containerApp);

  const createLevelInterface = () => {
    const levels = document.querySelector('.levels');
    const levelValues = ['Easy', 'Medium', 'Hard'];

    levelValues.forEach((value) => {
      const button = document.createElement('button');
      button.textContent = value.toLocaleUpperCase();
      button.classList.add('button', 'level', 'btn-reset');
      button.setAttribute('data-level', value.toLowerCase());
      levels.appendChild(button);
    });

    const userBtn = document.querySelector('.container__control');
    const btnValues = ['Save game', 'Solutions', 'Reset game', 'Continue last game', 'random game'];

    btnValues.forEach((value) => {
      const button = document.createElement('button');
      button.textContent = value.toLocaleUpperCase();
      const uniqueClass = value.toLowerCase().replace(/\s+/g, '-');
      button.classList.add('button', 'btn-reset', uniqueClass);
      userBtn.appendChild(button);
    });

    const resetBtn = document.querySelector(".reset-game")
    if (resetBtn) {
      resetBtn.addEventListener('click', () => {
        resetGame();
      });
    }

    const randomGameBtn = document.querySelector(".random-game")
    if (randomGameBtn) {
      randomGameBtn.addEventListener('click', () => {
        loadRandomLevelAndSample();
      });
    }

    const loadButton = document.querySelector('.continue-last-game');
    if (loadButton) {
      loadButton.addEventListener('click', () => {
        if (gameBoard) {
          gameBoard.classList.remove('locked');
          setTotalTime(gameState.time);
          stopTimer()
          loadBoardGame();
          updateSamples(levelsMap[currentLevel]);
        }
      });
    }

    const saveButton = document.querySelector('.save-game');
    if (saveButton) {
      saveButton.addEventListener('click', (event) => {
        saveGame(event);
      });
    }

    const solutions = document.querySelector(".solutions")
    if (solutions) {
      solutions.addEventListener("click", () => {

        gameBoard.classList.add('locked');

        clearCrosses();
        stopTimer();

        const selectedLevel =
          document.querySelector(".level.active")?.dataset.level
        const selectedSample = document.querySelector(".sample.active")
        if (selectedSample) {
          const sampleId = selectedSample.dataset.sampleId
          const sample = nanogramsSamples[selectedLevel]?.[sampleId]
          if (!sample) {
            return
          }

          colorCells(sample)
        }
      })
    }

    const firstButton = levels.querySelector('.level');
    if (firstButton) {
      firstButton.classList.add('active');
    }

    levels.addEventListener('click', (event) => {
      currentBoard = [];
      const target = event.target;

      if (target.classList.contains('level')) {
        document.querySelectorAll('.level').forEach((btn) => btn.classList.remove('active'));

        target.classList.add('active');
        currentLevel = target.dataset.level;
        switchLevel(currentLevel);
        updateSamples(levelsMap[currentLevel]);
      }

      resetTimer();
      resetGame();
    });

    const updateSamples = (nanogramsSamples) => {
      const samples = document.querySelector('.samples');
      const gameContainer = document.querySelector('.game__board');
      samples.innerHTML = '';

      if (gameContainer) {
        switch (currentLevel) {
          case 'easy':
            gameContainer.style.gridTemplateColumns = 'repeat(5, 30px)';
            gameContainer.style.gridTemplateRows = 'repeat(5, 30px)';
            break;
          case 'medium':
            gameContainer.style.gridTemplateColumns = 'repeat(10, 25px)';
            gameContainer.style.gridTemplateRows = 'repeat(10, 25px)';
            break;
          case 'hard':
            gameContainer.style.gridTemplateColumns = 'repeat(15, 20px)';
            gameContainer.style.gridTemplateRows = 'repeat(15, 20px)';
            break;
        }
      }

      Object.keys(nanogramsSamples).forEach((value, index) => {
        const button = document.createElement('button');
        button.textContent = value.toLocaleUpperCase();
        button.classList.add('button', 'sample', 'btn-reset');
        button.dataset.sampleId = value;
        samples.appendChild(button);
        if (index === 0) {
          button.classList.add('active');
        }
      });

      const firstSample = Object.keys(nanogramsSamples)[0];

      if (firstSample) {
        const sample = nanogramsSamples[firstSample];
        currentSample = sample;
        drawBoard(sample);
        drawHints(sample);
      }

      samples.addEventListener('click', (event) => {
        const target = event.target;

        if (target.classList.contains('sample')) {
          document.querySelectorAll('.sample').forEach((btn) => btn.classList.remove('active'));

          target.classList.add('active');
          const sampleId = target.dataset.sampleId;
          const sample = nanogramsSamples[sampleId];
          currentSample = sample;

          if (sample) {

            drawBoard(sample);
            drawHints(sample);
          }
          resetTimer();
          resetGame();
        }
      });
    };

    updateSamples(levelsMap[currentLevel]);
  };

  document.addEventListener('DOMContentLoaded', () => {
    createLevelInterface();
  });

  createTimer();

  const gameField = document.querySelector(".game__board");
  gameField.addEventListener("click", () => {
    startTimer();
  })

  const drawHints = board => {
    leftHints.innerHTML = ''
    topHints.innerHTML = ''

    board.forEach((row, rowIndex) => {
      const hintRow = document.createElement('div')
      hintRow.classList.add('hint-row')
      if ((rowIndex + 1) % 5 === 0 && rowIndex !== board.length - 1) {
        hintRow.classList.add('border-bottom')
      }

      const hintTextRow =
        row
          .join('')
          .match(/1+/g)
          ?.map(s => s.length) || []
      if (hintTextRow.length === 0) hintTextRow.push(0)

      hintTextRow.forEach(length => {
        const hintDiv = document.createElement('div')
        hintDiv.classList.add('hint-cell')
        hintDiv.textContent = length
        hintRow.appendChild(hintDiv)
      })

      leftHints.appendChild(hintRow)
    })

    for (let col = 0; col < board[0].length; col++) {
      const colCells = board.map(row => row[col])
      const hintCol = document.createElement('div')
      hintCol.classList.add('hint-col')

      const hintTextCol =
        colCells
          .join('')
          .match(/1+/g)
          ?.map(s => s.length) || []
      if (hintTextCol.length === 0) hintTextCol.push(0)

      hintTextCol.forEach(length => {
        const hintDiv = document.createElement('div')
        hintDiv.classList.add('hint-cell')
        hintDiv.textContent = length
        hintCol.appendChild(hintDiv)
      })

      topHints.appendChild(hintCol)
    }

    applyDynamicClasses(board)
  }

  const applyDynamicClasses = board => {
    let sizeClass = null
    if (board.length === 5) {
      sizeClass = 'easy-hints'
    } else if (board.length === 10) {
      sizeClass = 'medium-hints'
    } else if (board.length === 15) {
      sizeClass = 'hard-hints'
    }

    leftHints.classList.remove('hard-hints', 'medium-hints')
    topHints.classList.remove('hard-hints', 'medium-hints')

    leftHints.classList.add(sizeClass)
    topHints.classList.add(sizeClass)
  }

  const colorCells = (sample) => {
    const cells = document.querySelectorAll('.cell');
    sample.forEach((row, rowIndex) => {
      row.forEach((cellValue, colIndex) => {
        const cellIndex = rowIndex * sample[0].length + colIndex;
        const cell = cells[cellIndex];
        if (cellValue === 1) {
          cell.style.backgroundColor = 'black';
          cell.style.boxShadow = 'inset 0 0 0 1px #ffffff';
        } else {
          cell.style.backgroundColor = 'white';
          cell.style.boxShadow = 'none';
        }
      });
    });
  };

  const updateBoardState = (row, col, value) => {
    currentBoard[row][col] = value;
  };

  const drawBoard = (board) => {
    gameBoard.innerHTML = '';
    const gridSize = board.length;

    const isLocked = document.body.classList.contains('locked');

    if (currentBoard.length === 0) {
      for (let i = 0; i < gridSize; i++) {
        currentBoard[i] = [];
        for (let j = 0; j < gridSize; j++) {
          currentBoard[i][j] = 0;
        }
      }
    }

    for (let row = 0; row < gridSize; row++) {
      for (let col = 0; col < gridSize; col++) {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        cell.dataset.row = row;
        cell.dataset.col = col;

        cell.addEventListener('contextmenu', (event) => {
          event.preventDefault();

          const existingSvg = cell.querySelector('svg');

          if (currentBoard[row][col] === 2) {
            updateBoardState(row, col, 0);
            if (existingSvg) {
              cell.removeChild(existingSvg);
            }
            cell.style.backgroundColor = "white";
            playSound('clear');
          } else if (currentBoard[row][col] === 0 || currentBoard[row][col] === 1) {
            cell.style.backgroundColor = "white";
            updateBoardState(row, col, 2);
            const svgCross = createSvgCross();
            cell.appendChild(svgCross);
            playSound('pencil');
          }
        });


        if ((col + 1) % 5 === 0 && col !== gridSize - 1) {
          cell.classList.add('border-right');
        }
        if ((row + 1) % 5 === 0 && row !== gridSize - 1) {
          cell.classList.add('border-bottom');
        }

        if (currentBoard[row][col] === 1) {
          cell.style.backgroundColor = 'black';
          cell.style.boxShadow = 'inset 0 0 0 1px #ffffff';
        } else if (currentBoard[row][col] === 2) {
          cell.style.backgroundColor = 'white';
          cell.style.boxShadow = 'none';
          const svgCross = createSvgCross();
          cell.appendChild(svgCross);
        }

        if (!isLocked) {
          cell.addEventListener("click", () => {
            if (currentBoard[row][col] === 1) {
              updateBoardState(row, col, 0);
              cell.style.backgroundColor = "white";
              cell.style.boxShadow = "none";
              playSound('clear');
            } else {
              updateBoardState(row, col, 1);
              cell.style.backgroundColor = "black";
              cell.style.boxShadow = "inset 0 0 0 1px #ffffff";
              const existingSvg = cell.querySelector('svg');
              if (existingSvg) {
                cell.removeChild(existingSvg);
              }
              playSound('pencil');
            }
            checkWin();
          });
        }

        gameBoard.appendChild(cell);
      }
    }
  };

  const switchLevel = (level) => {
    if (level === currentLevel) return;

    currentLevel = level;
    updateGameGrid(level);

    document.querySelectorAll('.level-button').forEach((button) => {
      button.classList.remove('active');
      if (button.dataset.level === level) {
        button.classList.add('active');
      }
    });

    drawBoard(levelsMap[level]);
    drawHints(levelsMap[level]);
  };

  const loadBoardGame = () => {
    const savedState = localStorage.getItem('lastGame');

    if (savedState) {
      const gameState = JSON.parse(savedState);

      currentBoard = gameState.boardState.map(row => [...row]);
      setTotalTime(gameState.time);
      const savedLevel = gameState.levelState;

      if (savedLevel !== currentLevel) {
        currentLevel = savedLevel;
        updateGameGrid(savedLevel);
      }

      setTimeout(() => {
        document.querySelectorAll('.level').forEach((button) => {
          button.classList.remove('active');
          if (button.dataset.level === savedLevel) {
            button.classList.add('active');
          }
        });
      }, 5);

      const savedSampleName = gameState.sampleName;

      if (savedSampleName !== currentSample) {
        currentSample = savedSampleName;
      }

      setTimeout(() => {
        document.querySelectorAll('.sample').forEach((button) => {
          button.classList.remove('active');
          if (button.dataset.sampleId === savedSampleName) {
            button.classList.add('active');
          }
        });
      }, 5);

      currentSample = savedSampleName;

      drawBoard(currentBoard);
      drawHints(nanogramsSamples[currentLevel][currentSample]);

      const timer = document.querySelector(".timer");
      const seconds = gameState.time;
      const minutes = Math.floor(seconds / 60);
      const remainingSeconds = seconds % 60;

      if (timer) {
        timer.textContent = `${minutes.toString().padStart(2, "0")} : ${remainingSeconds.toString().padStart(2, "0")}`;
      }
      startTimer();
    }
  };

  const updateSampleButtons = (level) => {
    const samplesContainer = document.querySelector('.samples');
    const sampleButtons = samplesContainer.querySelectorAll('.sample');

    const samples = Object.keys(nanogramsSamples[level]);
    sampleButtons.forEach((button, index) => {
      if (samples[index]) {
        button.textContent = samples[index].toUpperCase();
        button.dataset.sampleId = samples[index];
      } else {
        button.remove();
      }
    });

    samples.slice(sampleButtons.length).forEach(sample => {
      const button = document.createElement('button');
      button.classList.add('sample');
      button.dataset.sampleId = sample;
      button.textContent = sample
      samplesContainer.appendChild(button);
    });
  };

  const loadRandomLevelAndSample = () => {
    const levels = Object.keys(nanogramsSamples);
    const randomLevel = levels[Math.floor(Math.random() * levels.length)];

    const samples = Object.keys(nanogramsSamples[randomLevel]);
    const randomSample = samples[Math.floor(Math.random() * samples.length)];

    currentLevel = randomLevel;
    currentSample = randomSample;
    const sampleMatrix = nanogramsSamples[currentLevel][currentSample];
    currentBoard = sampleMatrix.map(row => row.map(() => 0));

    updateGameGrid(currentLevel);
    updateSampleButtons(currentLevel);

    drawBoard(currentBoard);
    drawHints(sampleMatrix);

    document.querySelectorAll('.level').forEach(button => {
      button.classList.remove('active');
      if (button.dataset.level === randomLevel) {
        button.classList.add('active');
      }
    });

    document.querySelectorAll('.sample').forEach(button => {
      button.classList.remove('active');
      if (button.dataset.sampleId.trim() === currentSample.trim()) {
        button.classList.add('active');
      }
    });
  };

  const updateGameGrid = (currentLeve) => {
    const gameContainer = document.querySelector('.game__board');

    if (gameContainer) {
      switch (currentLeve) {
        case 'easy':
          gameContainer.style.gridTemplateColumns = 'repeat(5, 30px)';
          gameContainer.style.gridTemplateRows = 'repeat(5, 30px)';
          break;
        case 'medium':
          gameContainer.style.gridTemplateColumns = 'repeat(10, 25px)';
          gameContainer.style.gridTemplateRows = 'repeat(10, 25px)';
          break;
        case 'hard':
          gameContainer.style.gridTemplateColumns = 'repeat(15, 20px)';
          gameContainer.style.gridTemplateRows = 'repeat(15, 20px)';
          break;
        default:
      }
    }
  };

  const saveGame = () => {
    const isWin = checkWinCondition();
    const gameState = {
      boardState: currentBoard,
      levelState: currentLevel,
      time: totalTime,
      sampleState: currentSample,
      sampleName: getSampleName(currentLevel, currentSample)
    };

    window.gameState = gameState;

    localStorage.setItem('lastGame', JSON.stringify(gameState));

    if (isWin) {
      addToResults(gameState);
    }
  };

  function checkWinCondition() {
    return JSON.stringify(currentBoard) === JSON.stringify(currentSample);
  }

  function getSampleName(level, sampleArray) {
    const levelSamples = nanogramsSamples[level];

    for (let name in levelSamples) {
      if (JSON.stringify(levelSamples[name]) === JSON.stringify(sampleArray)) {
        return name;
      }
    }
    return null;
  }

  window.saveGame = saveGame;

  function addToResults(gameState) {
    let results = JSON.parse(localStorage.getItem('gameResults')) || [];

    results.push(gameState);

    results.sort((a, b) => a.time - b.time);

    if (results.length > 5) {
      results = results.slice(0, 5);
    }

    localStorage.setItem('gameResults', JSON.stringify(results));
  }

  function getSampleName(level, sampleArray) {
    const levelSamples = nanogramsSamples[level];

    for (let name in levelSamples) {
      if (JSON.stringify(levelSamples[name]) === JSON.stringify(sampleArray)) {
        return name;
      }
    }
    return null;
  }

  const createResultsTable = () => {
    document.querySelector(".star__icon").addEventListener("click", () => {
      const modal = document.createElement("div");
      modal.classList.add("modal");

      const modalContent = document.createElement("div");
      modalContent.classList.add("modal__content");

      const modalTitle = document.createElement("h2");
      modalTitle.classList.add("modal__title");
      modalTitle.textContent = "Last 5 wins 🏆";
      modalContent.appendChild(modalTitle);

      const table = document.createElement("table");
      table.classList.add("results__table");

      const thead = document.createElement("thead");
      const headerRow = document.createElement("tr");

      const timeHeader = document.createElement("th");
      timeHeader.textContent = "Level";
      headerRow.appendChild(timeHeader);

      const levelHeader = document.createElement("th");
      levelHeader.textContent = "Sample";
      headerRow.appendChild(levelHeader);

      const movesHeader = document.createElement("th");
      movesHeader.textContent = "Time";
      headerRow.appendChild(movesHeader);

      thead.appendChild(headerRow);
      table.appendChild(thead);

      const tbody = document.createElement("tbody");
      tbody.id = "resultsTable";

      const savedData = localStorage.getItem("gameResults");

      if (savedData) {
        const results = JSON.parse(savedData);

        results.forEach(result => {
          const row = document.createElement("tr");

          const levelCell = document.createElement("td");
          levelCell.textContent = result.levelState.toUpperCase();
          row.appendChild(levelCell);

          const sampleCell = document.createElement("td");
          sampleCell.textContent = result.sampleName.toUpperCase();
          row.appendChild(sampleCell);

          const formatTime = (seconds) => {
            const minutes = Math.floor(seconds / 60);
            const remainingSeconds = seconds % 60;
            return `${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')} sec`;
          };

          const timeCell = document.createElement("td");
          timeCell.textContent = formatTime(result.time);
          row.appendChild(timeCell);

          tbody.appendChild(row);
        });
      }

      table.appendChild(tbody);
      modalContent.appendChild(table);

      const closeButton = document.createElement("button");
      closeButton.classList.add("button", "close__modal");
      closeButton.textContent = "Close";
      closeButton.addEventListener("click", () => {
        modal.remove();
      });

      modalContent.appendChild(closeButton);
      modal.appendChild(modalContent);
      document.body.appendChild(modal);
    });
  };

  document.addEventListener("DOMContentLoaded", () => {
    createResultsTable();
  });

  const resetGame = () => {
    const cells = document.querySelectorAll('.cell');

    currentBoard = currentBoard.map(row => row.map(cell => 0));

    cells.forEach((cell, index) => {
      cell.style.backgroundColor = '';
      cell.style.boxShadow = '';
      cell.textContent = '';
    });
    resetTimer();
    boardDisable(false);
  };
}
