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
            // anything ahead of word containing num by using the spaces   .*(?= (?<=^| )(?=[^ ]*\d)[^ ]+)
            const chunkRegex = /.*?(?= \w*[0-9])/g;
            const chunk = word.match(chunkRegex)[0];
            //return new RegExp('.*?(?=.*(?= \\w*[0-9]))\\w*(' + chunk + ')\\w*');
            //return new RegExp('(?=.*?(?= \\w*[0-9]))('+ chunk + ')')
            return new RegExp('^('+ chunk + ')')
        },
        'slant-rhyme': () => { },
        'consonant-rhyme': () => { },
        'perfect-rhyme': () => { },
        'rich-rhyme': () => { },
        'syllabic': (word) => {
            // match any character from end up to - :   (?:-)(.*)$
            //last syllables match
            //return [-1, word.syllables[word.syllables.length -1]]
            const syllables = word.split('-');
            const syllable = syllables[ syllables.length -1]
            return RegExp('('+ syllable + ')$')
        }
    }
}

/*
match string https://stackoverflow.com/questions/4999064/regex-for-string-contains
do regex on result of another regex https://www.regular-expressions.info/backref.html

match line containing "second" and 7th word of that
https://stackoverflow.com/questions/21485228/regex-match-the-nth-word-of-a-line-containing-a-specific-word


*/