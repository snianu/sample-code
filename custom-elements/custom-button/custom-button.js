// import {style} from "./custom-button.css"

let css = `
:host {
	border: 3px solid gray;
	border-style: outset;
	background-color: #eee;
	padding: 3px;
	user-select: none;
}

:host:hover:active {
	border-style: inset;
}
`
export class CustomButton extends HTMLElement {
	constructor() {
		super()

		this.shadow = this.attachShadow({mode:"closed"})
		// this.shadow.adoptedStylesheets = [style]

		this.shadow.append(document.createElement("style"))
		this.shadow.firstChild.append(css)
	}
}

