//https://examples.yourdictionary.com/examples-of-rhyme.html

const camelCased = (string) => string.replace(/-([a-z])/g, function (g) { return g[1].toUpperCase(); });

const regs = {
    first: /^\w*/g,
    last: /\w*$/g,
    beforeFirstVowel: /.*?(?= \w*[0-9])/g,
    firstVowelToEnd: /(\w*[0-9]).*/g,
    lastSyllable: /(?:-)(.*)$/g,
    lastVowelToEnd: /(\w*[0-9])[^0-9]*$/g,
}

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
            //tricky "T R IH1-K IY0" + "P IH1-K IY0" picky | moaning "M OW1-N IH0 NG" + "G R OW1-N IH0 NG" groaning
            // perfect ryhmes are included
            return new RegExp('('+ word.match(regs.firstVowelToEnd)[0] +')$');
        },
        'overlap-single': (word) => {
            // end of word matches beginning of next
            // torch "t ao r ch" + "ch ih k" chick | hound "hh aw n d" + "d uw m" doom
            //const lastPhoneme = word.match(/\w*$/g)[0];
            return new RegExp('^('+ word.match(regs.last)[0] + ')');
        },
        'overlap-vowel': (word) => {
            // end of word matches beginning of next
            // squirt "S K W ER1 T" + "T ER1-T AH0 L" turtle | arcane "AA2 R-K EY1 N" + "K EY1-N AY2 N" canine
            
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
            // tip limp, dank bat, bowl home

        },
        'consonant-rhyme': () => {
            // rhymes first consonants but not vowels
            // bell "B EH1 L" + "B AO1 L" ball, dump "D AH1 M P" + "D AE1 M P" damp
        },
        'perfect-rhyme': (word) => {
            // ending sounds match
            // cat "K AE1 T" + "HH AE1 T" hat | egg "EH1 G" + "B EH1 G" beg
            const endOfWordWithVowelReg = /(\w*[0-9])[^0-9]*$/g
            const endOfWordWithVowel = word.match(endOfWordWithVowelReg)[0];
            return new RegExp('('+ endOfWordWithVowel +')$');
        },
        'rich-rhyme': (word) => {
            // pronounced the same
            // raise "R EY1 Z" raze | break "B R EY1 K" brake | vary "V EH1-R IY0" very
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