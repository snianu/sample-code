class Word {
    #text
    #start
    #end 

    constructor(text, start, end) {
        this.#text = text
        this.#start = start
        this.#end = end
    }

    toString() {
        return this.#text.substring(this.#start, this.#end)
    }

    get text() {
        return this.#text
    }

    get start() {
        return this.#start
    }

    get end() {
        return this.#end
    }
}

function wordFromPosition(text, position) {
    console.assert(!WordBreaker.isWordBreakCharacter(text.charCodeAt(position)))

    let i = position
    while(
        i > 0 && 
        !WordBreaker.isWordBreakCharacter(text.charCodeAt(i - 1))
    ) {
        i--
    }

    let start = i
    i = position

    while(
        i < text.length && 
        !WordBreaker.isWordBreakCharacter(text.charCodeAt(i))
    ) {
        i++
    }

    let end = i
    return new Word(text, start, end)
}

function previousWordFromStart(text, start) {
    let i = start
    while(
        i > 0 && 
        WordBreaker.isWordBreakCharacter(text.charCodeAt(i - 1))
    ) {
        i--
    }

    if (i === 0)
        return null

    let end = i

    while(
        i > 0 && 
        !WordBreaker.isWordBreakCharacter(text.charCodeAt(i - 1))
    ) {
        i--
    }    

    start = i
    return new Word(text, start, end)
}

function nextWordFromEnd(text, end) {
    let i = end
    while(
        i < text.length && 
        WordBreaker.isWordBreakCharacter(text.charCodeAt(i))
    ) {
        i++
    }

    if (i === text.length)
        return null

    let start = i

    while(
        i < text.length && 
        !WordBreaker.isWordBreakCharacter(text.charCodeAt(i))
    ) {
        i++
    }    

    end = i
    return new Word(text, start, end)
}

export default class WordBreaker {
    static nextWordFromPosition(text, position) {
        // grab the word in which position occurs
        if (!WordBreaker.isWordBreakCharacter(text.charCodeAt(position)))
            return wordFromPosition(text, position)

        // if position is at a word break character, grab the next word
        return nextWordFromEnd(text, position)
    }

    static previousWordFromPosition(text, position) {
        // grab the word in which position occurs
        if (!WordBreaker.isWordBreakCharacter(text.charCodeAt(position)))
            return wordFromPosition(text, position)

        // if position is at a word break character, grab the previous word
        return previousWordFromStart(text, position)
    }

    static nextWord(currentWord) {
        return nextWordFromEnd(currentWord.text, currentWord.end)
    }

    static previousWord(currentWord) {
        return previousWordFromStart(currentWord.text, currentWord.start)
    }

    static isWordBreakCharacter(charCode) {
        return " ".charCodeAt(0) === charCode
    }
}
