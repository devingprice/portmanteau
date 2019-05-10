// module.exports = (message) => message.toUpperCase();
const dictionary = require('./cmudict-syllables.json');
const defaultTypes = ['feminine-rhyme', 'overlap', 'alliteration', 'slant-rhyme', 'consonant-rhyme', 'perfect-rhyme','rich-rhyme','syllabic'];

const portmantaeu = (words1, words2, searchTypes) => {
    [words1, words2, searchTypes] = parseArgs(words1, words2, searchTypes);

    console.log(typeof words1, words1, typeof words2, words2, typeof searchTypes, searchTypes)
}

const parseArgs = (words1, words2, searchTypes) => {
    words1 = typeof words1 === 'string' ? [words1] : words1;
    words2 = words2 || ['allWords'];
    words2 = typeof words2 === 'string' ? [words2] : words2;
    searchTypes = searchTypes || defaultTypes;
    searchTypes = typeof searchTypes === 'string' ? [searchTypes] : searchTypes;
    return [words1, words2, searchTypes]
}

const wordStringToCmu = (word) => {
    if (!word in dictionary) throw err;
    return { word, syllables: dictionary[word]};
}
module.exports = {
    portmantaeu,
    parseArgs
};