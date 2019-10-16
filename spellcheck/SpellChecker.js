class SpellCheckResult {
    #word
    #result

    constructor(word, result) {
        this.#word = word
        this.#result = result
    }

    get start() {
        return this.#word.start
    }

    get end() {
        return this.#word.end
    }

    get replacement() {
        if (this.#result instanceof Array)
            return null

        return this.#result
    }

    get correctiveAction() {
        if (this.#result instanceof Array)
            return "suggest"

        return "replace"
    }

    getSuggestions() {
        if (this.#result instanceof Array)
            return Promise.resolve(this.#result)

        return Promise.resolve([this.#result])
    }
}


export default class SpellChecker {
    static spellCheckText(text, languages) {
        let results = []
        let words = getSpellCheckableWordsFromText(text)
        for (let word of words) {
            let result = checkSpellingOfWord(word)
            if (result) {
                results.push(new SpellCheckResult(word, result))
            }
        }

        return Promise.resolve(results)
    }

    static spellCheckRange(range, languages) {
        return Promise.resolve([])
    }

    static getSpellCheckLanguages() {
        return ["en-US"]
    }
}


function getSpellCheckableWordsFromText(text) {
    let i = 0
    let start = 0
    let end = 0

    let words = []

    while (true) {
        while(i < text.length && text.charAt(i) === " ") {
            i++
        }

        if (i === text.length)
            break;

        start = i
        while(i < text.length && text.charAt(i) !== " ") {
            i++
        }

        end = i
        const spellcheckableWord = new SpellCheckableWord(start, end, text.substring(start, end))
        words.push(spellcheckableWord)
    }

    return words
}

const dictionaryOfBadWords = {
    "teh" : "the",
    "Teh" : "The",
    "quck" : ["quick", "quack"]
}

function checkSpellingOfWord(word) {
    return dictionaryOfBadWords[word]
}


class SpellCheckableWord {
    constructor(start, end, text) {
        this.start = start
        this.end = end
        this.text = text
    }

    toString() {
        return this.text
    }
}