// module.exports = (message) => message.toUpperCase();
const allWords = require('./src/cmudict-syllables.json');
const defaultTypes = ['rhyme'];

const portmantaeu = (words1, words2, searchTypes = defaultTypes) => {
    words1 = typeof words1 === 'string' ? [words1] : words1;
    words2 = words2 || ['allWords'];
    words2 = typeof words2 === 'string' ? [words2] : words2;
    
    console.log(typeof words1, words1, typeof words2, words2, typeof searchTypes, searchTypes)
}

module.exports = portmantaeu;