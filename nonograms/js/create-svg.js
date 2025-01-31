export const createSvgSound = () => {
	const svgNS = "http://www.w3.org/2000/svg"

	const svg = document.createElementNS(svgNS, "svg")
	svg.classList.add("icon", "sound__icon")
	svg.setAttribute("xmlns", "http://www.w3.org/2000/svg")
	svg.setAttribute("version", "1.1")
	svg.setAttribute("xmlns:xlink", "http://www.w3.org/1999/xlink")
	svg.setAttribute("width", "24")
	svg.setAttribute("height", "24")
	svg.setAttribute("x", "0")
	svg.setAttribute("y", "0")
	svg.setAttribute("viewBox", "0 0 24 24")
	svg.setAttribute("style", "enable-background:new 0 0 512 512")
	svg.setAttribute("xml:space", "preserve")

	const g1 = document.createElementNS(svgNS, "g")

	const g2 = document.createElementNS(svgNS, "g")
	// g2.setAttribute("fill", "#000")

	const path1 = document.createElementNS(svgNS, "path")
	path1.setAttribute(
		"d",
		"M15.104 3.49a1 1 0 0 1 1.341-.45A10 10 0 0 1 22 12a10 10 0 0 1-5.555 8.96 1 1 0 1 1-.89-1.791A8 8 0 0 0 20 12a8 8 0 0 0-4.445-7.169 1 1 0 0 1-.45-1.34zM6 8H4a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h2l4.36 3.633a1 1 0 0 0 1.64-.768V5.135a1 1 0 0 0-1.64-.768z"
	)
	// path1.setAttribute("fill", "#2f4d6d")
	// path1.setAttribute("opacity", "1")
	// path1.setAttribute("data-original", "#000000")

	const path2 = document.createElementNS(svgNS, "path")
	path2.setAttribute(
		"d",
		"M16.8 8.4a1 1 0 1 0-1.6 1.2c.503.669.8 1.498.8 2.4s-.297 1.731-.8 2.4a1 1 0 0 0 1.6 1.2c.753-1.002 1.2-2.25 1.2-3.6s-.447-2.598-1.2-3.6z"
	)
	// path2.setAttribute("fill", "#2f4d6d")
	// path2.setAttribute("opacity", "1")
	// path2.setAttribute("data-original", "#000000")

	g2.appendChild(path1)
	g2.appendChild(path2)
	g1.appendChild(g2)
	svg.appendChild(g1)

	const addCrossLine = () => {
		const line = document.createElementNS(svgNS, "line")
		line.setAttribute("x1", "2")
		line.setAttribute("y1", "2")
		line.setAttribute("x2", "22")
		line.setAttribute("y2", "22")
		line.setAttribute("stroke", "red")
		line.setAttribute("stroke-width", "2")
		svg.appendChild(line)
		return line
	}

	let isCrossed = false
	let crossLine = null

	svg.addEventListener("click", () => {
		if (isCrossed) {
			if (crossLine) {
				svg.removeChild(crossLine)
				crossLine = null
			}
		} else {
			crossLine = addCrossLine()
		}
		isCrossed = !isCrossed
	})

	return svg
}

export const createSvgBestGame = () => {
	const svgNS = "http://www.w3.org/2000/svg"

	const svg = document.createElementNS(svgNS, "svg")
	svg.classList.add("icon", "star__icon")
	svg.setAttribute("xmlns", svgNS)
	svg.setAttribute("version", "1.1")
	svg.setAttribute("xmlns:xlink", "http://www.w3.org/1999/xlink")
	svg.setAttribute("width", "24")
	svg.setAttribute("height", "24")
	svg.setAttribute("x", "0")
	svg.setAttribute("y", "0")
	svg.setAttribute("viewBox", "0 0 512 512")
	svg.setAttribute("style", "enable-background:new 0 0 512 512")
	svg.setAttribute("xml:space", "preserve")

	const g = document.createElementNS(svgNS, "g")

	const path = document.createElementNS(svgNS, "path")
	path.setAttribute(
		"d",
		"M371.409 83.814a16.763 16.763 0 0 0-13.521-11.4l-59.984-8.718-26.835-54.362A16.73 16.73 0 0 0 256.055 0a16.732 16.732 0 0 0-15.015 9.334l-26.835 54.363-59.994 8.718a16.762 16.762 0 0 0-13.521 11.4 16.736 16.736 0 0 0 4.242 17.169l43.421 42.314-10.26 59.744a16.745 16.745 0 0 0 6.663 16.384c5.169 3.762 12.006 4.225 17.643 1.276l53.66-28.209 53.649 28.209a16.748 16.748 0 0 0 17.643-1.276 16.742 16.742 0 0 0 6.663-16.378l-10.25-59.75 43.41-42.314a16.768 16.768 0 0 0 4.235-17.17zM322.995 255.185h-133.99c-9.25 0-16.749 7.499-16.749 16.749V512h167.488V271.934c0-9.25-7.499-16.749-16.749-16.749zM21.517 322.18c-9.25 0-16.749 7.499-16.749 16.749v159.829c0 7.314 5.929 13.242 13.242 13.242h120.749V322.18H21.517zM490.483 389.175H373.242V512h120.749c7.314 0 13.242-5.929 13.242-13.242v-92.834c-.001-9.25-7.5-16.749-16.75-16.749z"
	)
	// path.setAttribute("fill", "#2f4d6d")
	// path.setAttribute("opacity", "1")
	// path.setAttribute("data-original", "#000000")

	g.appendChild(path)
	svg.appendChild(g)

	return svg
}
