export class MyButton extends HTMLElement {
    constructor() {
        super()

        const button = document.createElement("button")
        
        // set button style
        button.style.padding = "0"
        button.style.border = "0"
        button.style.width = "319px"
        button.style.height = "319px"

        button.style.backgroundImage = "url(./smile.jpg)"

        button.addEventListener("pointerdown", this.handlePointerDown.bind(this))
        button.addEventListener("pointerup", this.handlePointerUp.bind(this))

        this.attachShadow({mode: "open"})
        this.shadowRoot.append(button)
    }

    handlePointerDown(e) {
        if (e.pointerType !== "mouse") {
            return
        }

        e.target.setPointerCapture(e.pointerId)
        e.target.style.backgroundImage = "url(./wink.jpg)"
    }

    handlePointerUp(e) {
        if (e.pointerType !== "mouse") {
            return
        }

        e.target.style.backgroundImage = "url(./smile.jpg)"
    }
}
