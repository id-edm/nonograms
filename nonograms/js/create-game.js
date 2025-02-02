import { createColorSwitch } from './color-switch.js';
import { createSvgSound } from './create-svg.js';
import { createSvgBestGame } from './create-svg.js';
import { checkWin } from './win-game.js';
import { handleRightClick } from './click-right.js';
import { clearCrosses } from './clear-crosses.js';
import { resetGame } from './reset-game.js';
import { playSound } from './sounds.js';
import { createTimer, startTimer, resetTimer, stopTimer } from './create-timer.js';
import { nanogramsSamples } from './level-samples.js';


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
    let currentLevel = 'easy';
    const levelsMap = {
      easy: nanogramsSamples.easy,
      medium: nanogramsSamples.medium,
      hard: nanogramsSamples.hard,
    };

    levelValues.forEach((value) => {
      const button = document.createElement('button');
      button.textContent = value.toLocaleUpperCase();
      button.classList.add('button', 'level', 'btn-reset');
      button.setAttribute('data-level', value.toLowerCase());
      levels.appendChild(button);
    });

    const userBtn = document.querySelector('.container__control');
    const btnValues = ['Save game', 'Solutions', 'Reset game', 'Continue last game'];

    btnValues.forEach((value) => {
      const button = document.createElement('button');
      button.textContent = value.toLocaleUpperCase();
      const uniqueClass = value.toLowerCase().replace(/\s+/g, '-');
      button.classList.add('button', 'btn-reset', uniqueClass);
      userBtn.appendChild(button);
    });

    const resetBtn = document.querySelector(".reset-game")
		if (resetBtn) {
			resetBtn.addEventListener("click", resetGame)
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
      const target = event.target;

      if (target.classList.contains('level')) {
        document.querySelectorAll('.level').forEach((btn) => btn.classList.remove('active'));

        target.classList.add('active');
        currentLevel = target.dataset.level;

        updateSamples(levelsMap[currentLevel]);
      }
      resetTimer();
      resetGame();
      playSound('click-btn');
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

  const drawBoard = (board) => {
    gameBoard.innerHTML = '';
    const gridSize = board.length;

    const isLocked = document.body.classList.contains('locked');

    for (let row = 0; row < gridSize; row++) {
      for (let col = 0; col < gridSize; col++) {
        const cell = document.createElement('div');
        cell.classList.add('cell');

        cell.addEventListener('contextmenu', (event) => handleRightClick(event, cell));

        if ((col + 1) % 5 === 0 && col !== gridSize - 1) {
          cell.classList.add('border-right');
        }
        if ((row + 1) % 5 === 0 && row !== gridSize - 1) {
          cell.classList.add('border-bottom');
        }

        if (!isLocked) {
          cell.addEventListener("click", () => {
            if (cell.style.backgroundColor === "black") {
              cell.style.backgroundColor = "white";
              cell.style.boxShadow = "none";
              playSound('clear')
            } else {
              cell.style.backgroundColor = "black";
              cell.style.boxShadow = "inset 0 0 0 1px #ffffff";
              playSound('pencil')
            }
            checkWin();
          });
        }

        gameBoard.appendChild(cell);
      }
    }
  };

}
