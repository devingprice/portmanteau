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
        'feminine-rhyme': () => {
            //different beginnings but rhymes later syllable
            //tricky + picky | moaning + groaning
        },
        'overlap': () => {
            // end of word matches beginning of next
            // t ao r CH ih k | hh aw n D uw m
            // s k w ET T ah l | aa r K EY N ay n
        },
        'alliteration': (word) => {
            // anything ahead of word containing num by using the spaces   .*(?= (?<=^| )(?=[^ ]*\d)[^ ]+)
            const chunkRegex = /.*?(?= \w*[0-9])/g;
            const chunk = word.match(chunkRegex)[0];
            //return new RegExp('.*?(?=.*(?= \\w*[0-9]))\\w*(' + chunk + ')\\w*');
            //return new RegExp('(?=.*?(?= \\w*[0-9]))('+ chunk + ')')
            return new RegExp('^('+ chunk + ')')
        },
        'slant-rhyme': () => {
            // near rhyme | rhymes final consonants but not vowels
        },
        'consonant-rhyme': () => {
            // rhymes first consonants but not vowels
        },
        'perfect-rhyme': (word) => {
            // ending sounds match
            // cat + hat | egg + beg
            // K AE1 T + HH AE1 T
            const endOfWordWithVowelReg = /(\w*[0-9])[^0-9]*$/g
            const endOfWordWithVowel = word.match(endOfWordWithVowelReg)[0];
            return new RegExp('('+ endOfWordWithVowel +')$');
        },
        'rich-rhyme': (word) => {
            // pronounced the same
            // raise + raze | break + brake | vary + very
            return RegExp('(' + word + ')$')
        },
        'syllabic': (word) => {
            // match any character from end up to - :   (?:-)(.*)$
            //last syllables match
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