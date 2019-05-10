//https://examples.yourdictionary.com/examples-of-rhyme.html

const camelCased = (string) => string.replace(/-([a-z])/g, function (g) { return g[1].toUpperCase(); });

module.exports = {
    verify: {
        'feminine-rhyme': () => { },
        'overlap': () => { },
        'alliteration': () => { },
        'slant-rhyme': () => { },
        'consonant-rhyme': () => { },
        'perfect-rhyme': () => { },
        'rich-rhyme': () => { },
        'syllabic': (word1, word2) => {
            return word1.syllables[word1.syllables.length - 1] === word2.syllables[word2.syllables.length - 1]
        }
    },
    query: {
        'feminine-rhyme': () => { },
        'overlap': () => { },
        'alliteration': (word) => {
            //find part before first vowel sound
            //check if matches
        },
        'slant-rhyme': () => { },
        'consonant-rhyme': () => { },
        'perfect-rhyme': () => { },
        'rich-rhyme': () => { },
        'syllabic': (word) => {
            //last syllables match
            //return [-1, word.syllables[word.syllables.length -1]]
        }
    }
}

/*
match string https://stackoverflow.com/questions/4999064/regex-for-string-contains
do regex on result of another regex https://www.regular-expressions.info/backref.html

match line containing "second" and 7th word of that
https://stackoverflow.com/questions/21485228/regex-match-the-nth-word-of-a-line-containing-a-specific-word


*/