// module.exports = (message) => message.toUpperCase();
const matches = require('./matches');
const dictionary = require('./cmudict-syllables.json');
const defaultTypes = [
    'feminine-rhyme',
    'overlap',
    'alliteration',
    'slant-rhyme',
    'consonant-rhyme',
    'perfect-rhyme',
    'rich',
    'syllabic',
];

const portmanteau = (words1, words2, searchTypes) => {
    [words1, words2, searchTypes] = parseArgs(words1, words2, searchTypes);

    return checkForMatches(words1, words2, searchTypes);
    //console.log(typeof words1, words1, typeof words2, words2, typeof searchTypes, searchTypes)
};

const parseArgs = (words1, words2, searchTypes) => {
    words1 = typeof words1 === 'string' ? [words1] : words1;
    words2 = words2 || ['allWords']; //TODO : make actually use dictionary
    words2 = typeof words2 === 'string' ? [words2] : words2;
    searchTypes = searchTypes || Object.keys(matches.query); // || defaultTypes;
    searchTypes = typeof searchTypes === 'string' ? [searchTypes] : searchTypes;
    return [words1, words2, searchTypes];
};

const checkForMatches = (array1, array2, types) => {
    let regs = {};
    for (let i = 0; i < array1.length; i++) {
        const word = array1[i].toUpperCase();
        const dict = dictionary[word];
        if (dict !== undefined) {
            regs[word] = types.map((type) => {
                return { type, reg: matches.query[type](dict.join('-')) };
            });
        }
    }
    // console.log(regs)

    let results = [];

    for (const [word, queries] of Object.entries(regs)) {
        for (const query of queries) {
            for (let arrayWord of array2) {
                arrayWord = arrayWord.toUpperCase();
                const dict = dictionary[arrayWord];
                if (word !== arrayWord && dict !== undefined) {
                    if (query.reg.test(dict.join('-'))) {
                        results.push({
                            word1: word,
                            word1pho: dictionary[word],
                            word2: arrayWord,
                            word2pho: dict,
                            type: query.type,
                        });
                    }
                }
            }
        }
    }
    //console.log( results )
    //console.log('inputs', array1, array2, 'search for', types, 'regs', regs, 'results', results)
    return results;
    //return array;
};
// const wordStringToCmu = (word) => {
//     if (!word in dictionary) throw err;
//     return { word, syllables: dictionary[word]};
// }
module.exports = {
    portmanteau,
    parseArgs,
};
