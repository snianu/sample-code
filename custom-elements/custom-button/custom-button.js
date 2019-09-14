// import {style} from "./custom-button.css"

// instead of import of CSS module use CSS as JS string
let css = `
:host {
	border: 3px solid gray;
	border-style: outset;
	background-color: #eee;
	padding: 3px;
	user-select: none;
}

:host(:hover:active) {
	border-style: inset;
}
`
export class CustomButton extends HTMLElement {
	constructor() {
		super()

		this.shadow = this.attachShadow({mode:"closed"})
		// this.shadow.adoptedStylesheets = [style]

		// instead of adopted imported style create a style element in the shadow tree
		this.shadow.append(document.createElement("style"))
		this.shadow.firstChild.append(css)

		// ideally we wouldn't need a shadow DOM at all for this scenario
		// I just want a place to write :host rules for my custom button
		this.shadow.append(document.createElement("slot"))
	}
}

