import { nanogramsSamples } from "./level-samples.js"
import { boardDisable } from "./board-disabled.js"
import { stopTimer } from "./create-timer.js"

export const checkWin = () => {
	const cells = document.querySelectorAll(".cell")
	let isSolved = true

	const timer = document.querySelector(".timer")
	const time = timer ? timer.textContent : "00 : 00"

	const selectedLevel = document.querySelector(".level.active")?.dataset.level
	const selectedSample = document.querySelector(".sample.active")

	const sampleId = selectedSample.dataset.sampleId
	const sample = nanogramsSamples[selectedLevel]?.[sampleId]

	sample.forEach((row, rowIndex) => {
		row.forEach((cellValue, colIndex) => {
			const cellIndex = rowIndex * sample[0].length + colIndex
			const cell = cells[cellIndex]

			const currentColor = window.getComputedStyle(cell).backgroundColor
			const expectedColor =
				cellValue === 1 ? "rgb(0, 0, 0)" : "rgb(255, 255, 255)"
			if (currentColor !== expectedColor) {
				isSolved = false
			}
		})
	})

	if (isSolved) {
		console.log("Отлично! Вы решили нонограмму!")

		stopTimer()

		const modal = document.createElement("div")
		modal.classList.add("modal")

		const modalContent = document.createElement("div")
		modalContent.classList.add("modal__content")

		const modalTitle = document.createElement("h2")
		modalTitle.classList.add("modal__title")
		modalTitle.textContent = "Great! You've solved the nonogram!"
		modalContent.appendChild(modalTitle)

		const modalText = document.createElement("p")
		modalText.textContent = `Completed the game in ${time}!`
		modalContent.appendChild(modalText)

		const closeButton = document.createElement("button")
		closeButton.classList.add("button", "close__modal")
		closeButton.textContent = "Close"
		closeButton.addEventListener("click", () => {
			modal.remove()
		})

		modalContent.appendChild(closeButton)

		modal.appendChild(modalContent)

		modal.appendChild(modalContent)
		document.body.appendChild(modal)

		const winMessage = document.createElement("div")
		winMessage.classList.add("win-message")
		winMessage.textContent = `Отлично! Вы решили нонограмму за ${time}!`

		const container = document.querySelector(".container__message")
		if (container) {
			container.appendChild(winMessage)
		}

		boardDisable(true)
	}
}
