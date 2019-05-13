// module.exports = (message) => message.toUpperCase();
const matches = require('./matches');
const dictionary = require('./cmudict-syllables.json');
const defaultTypes = ['feminine-rhyme', 'overlap', 'alliteration', 'slant-rhyme', 'consonant-rhyme', 'perfect-rhyme','rich-rhyme','syllabic'];

const portmantaeu = (words1, words2, searchTypes) => {
    [words1, words2, searchTypes] = parseArgs(words1, words2, searchTypes);

    return checkForMatches( words1, words2, searchTypes);
    //console.log(typeof words1, words1, typeof words2, words2, typeof searchTypes, searchTypes)
}

const parseArgs = (words1, words2, searchTypes) => {
    words1 = typeof words1 === 'string' ? [words1] : words1;
    words2 = words2 || ['allWords']; //TODO : make actually use dictionary
    words2 = typeof words2 === 'string' ? [words2] : words2;
    searchTypes = searchTypes || defaultTypes;
    searchTypes = typeof searchTypes === 'string' ? [searchTypes] : searchTypes;
    return [words1, words2, searchTypes]
}

const checkForMatches = ( array1, array2, types ) =>{
    let regs = {};
    for(let i=0; i < array1.length; i++){
        const word = array1[i].toUpperCase();
        regs[ word ] = types.map( type => {
            return {type, reg: matches.query[type]( dictionary[ word ].join('-') ) }
        })
    }
    console.log(regs)

    let results = [];
    
    for(const [word,queries] of Object.entries(regs) ){
        for(const query of queries){

            for(let arrayWord of array2){
                arrayWord = arrayWord.toUpperCase();
                if( word !== arrayWord && query.reg.test( dictionary[arrayWord] ) ){

                    results.push({
                        word1: word,
                        word2: arrayWord,
                        type: query.type
                    })
                    
                }
            }
        }
    }
    //console.log( results )
    //console.log('inputs', array1, array2, 'search for', types, 'regs', regs, 'results', results)
    return results;
    //return array;
}
// const wordStringToCmu = (word) => {
//     if (!word in dictionary) throw err;
//     return { word, syllables: dictionary[word]};
// }
module.exports = {
    portmantaeu,
    parseArgs
};