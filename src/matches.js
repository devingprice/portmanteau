// https://examples.yourdictionary.com/examples-of-rhyme.html
// https://regexr.com/
// https://www.regular-expressions.info/lookaround.html
// https://www.rexegg.com/regex-quickstart.html

const regs = {
    firstPhoneme: /^\w*/g,
    lastPhoneme: /\w*$/g,

    firstSyllableOrWholeWord: /^(?<!-)[^-]*/g,
    lastSyllableOrWholeWord: /[^-]*(?!.*-)/g,

    beforeFirstVowel: /^.*?(?=( |-)\w*[0-9])/g, // also before first vowel = /^[^0-9]*(?!\w*[0-9])/g
    firstVowelToEnd: /(\w*[0-9]).*/g,
    afterFirstVowel: /(?<=\w*[0-9]).*/g,

    beforeLastVowel: /^.*(?=( |-)\w*[0-9])/g,
    lastVowelToEnd: /(\w*[0-9])[^0-9]*$/g,
    afterLastVowel: /(?<![0-9])[^0-9]*$/g, // /(\w*)(?!\w*[0-9])$/g,
    
    lastVowel: /(\w*[0-9])(?!.*[0-9])/g,
    firstVowel: /(?<!.*[0-9])(\w*[0-9])/g,

    fails: /(?!)/g
}

module.exports = {
    query: {
        'assonant': (word) => {
            // Assonant: vowels rhyme but different consonants
            // tip limp, dank bat, bowl home
            // "T IH1 P""L IH1 M P" | "D AE1 NG K""B AE1 T" | "B OW1 L""HH OW1 M"

            const eachPhonemeWithoutVowelAfterwards = /(\w*)*(?!.*(\w*[0-9]))/g;
            const match = word.match(eachPhonemeWithoutVowelAfterwards);
            if (match === null) return new RegExp('(?!)');

            //multiple matches returns [1, "", 2, ""], filter those empty out
            let phonemes = match.filter(x=>x.length>0);
            //match if every phoneme is contained at end, even if extras in between
            return new RegExp(`(${phonemes.map(x=>x+"(\\b.*\\b)*").join("")})$`)
        },
        'feminine-rhyme': (word) => {
            //different beginnings but rhymes later syllable
            //tricky "T R IH1-K IY0" + "P IH1-K IY0" picky | moaning "M OW1-N IH0 NG" + "G R OW1-N IH0 NG" groaning
            // perfect ryhmes are included

            const secondToLastVowelToEnd = /(\w*[0-9]).*(\w*[0-9])[^0-9]*$/g;
            const match = word.match(secondToLastVowelToEnd);
            if( match === null ) return new RegExp('(?!)');
            return new RegExp('('+ match[0] +')$');
        },
        'overlap-single': (word) => {
            // end of word matches beginning of next
            // torch "t ao r ch" + "ch ih k" chick | hound "hh aw n d" + "d uw m" doom
            
            // todo: some matches dont sound good. maybe check stress/length

            const match = word.match(regs.lastPhoneme);
            if( match === null ) return new RegExp('(?!)');
            return new RegExp('^('+ match[0] + ')');
        },
        'overlap-vowel': (word) => {
            // end of word matches beginning of next
            // squirt "S K W ER1 T" + "T ER1-T AH0 L" turtle | arcane "AA2 R-K EY1 N" + "K EY1-N AY2 N" canine
            
            const secondToLastVowelToEnd = /(\w*[0-9]).*(\w*[0-9])[^0-9]*$/g;
            const match = word.match(secondToLastVowelToEnd);
            if( match === null ) return new RegExp('(?!)');
            return new RegExp('('+ match[0] +')$');
        },
        'alliteration': (word) => {
            // same initial consonant at the beginning of the words
            // blue and blow, sun and sand, merry and monkey
            const beforeFirstVowelRegex = /^.*?(?=(\w*[0-9]))/g;
            const match = word.match(beforeFirstVowelRegex);
            if( match === null ) return new RegExp('(?!)');
            return new RegExp('^('+ match[0] + ')(?=(\\w*[0-9]))')
        },
        'near-rhyme': (word) => {
            // Near rhyme half/slant: final consonants but not vowel or initial consonants
            // bent rant, quick back
            // "B EH1 N T""R AE1 N T" | "K W IH1 K""B AE1 K"
            
            // todo maybe check if separately if vowel is close enough
            const match = word.match(regs.afterLastVowel);
            if( match === null ) return new RegExp('(?!)');

            return new RegExp('('+ match[0] + ')$')
        },
        'consonant-rhyme': (word) => {
            // rhymes first consonants but not vowels
            // bell "B EH1 L" + "B AO1 L" ball, dump "D AH1 M P" + "D AE1 M P" damp

            // todo focuses on first vowel, do i need second vowel version?
            
            const match1 = word.match(regs.beforeFirstVowel);
            const match2 = word.match(regs.afterLastVowel);
            if( match1 === null || match2 === null) return new RegExp('(?!)');

            return new RegExp('^('+ 
            match1[0] + 
            "( |-)\\w*[0-9]( |-)" +
            match2[0] + //todo, use allAfterFirstVowel so it works on multi syllable
            ')$')
        },
        'perfect-rhyme': (word) => {
            // ending sounds match
            // cat "K AE1 T" + "HH AE1 T" hat | egg "EH1 G" + "B EH1 G" beg
            const endOfWordWithVowelReg = /(\w*[0-9])[^0-9]*$/g

            const match = word.match(endOfWordWithVowelReg);
            if( match === null ) return new RegExp('(?!)');
            return new RegExp('('+ match[0] +')$');
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
        },
        'oblique': (word) => { //todo
            // oblique/imperfect: sounds dont quite match
            // lap shape, fiend mean, gun thumb
            // "L AE1 P""SH EY1 P" | "F IY1 N D""M IY1 N" | "G AH1 N""TH AH1 M"

            return new RegExp('(?!)');
        }
    }
}

/*
match string https://stackoverflow.com/questions/4999064/regex-for-string-contains
do regex on result of another regex https://www.regular-expressions.info/backref.html

match line containing "second" and 7th word of that
https://stackoverflow.com/questions/21485228/regex-match-the-nth-word-of-a-line-containing-a-specific-word


*/