const matches = require('./matches');
const dictionary = require('./cmudict-syllables.json');

const defaultTypes = ['alliteration', 'syllabic'];

function verifyMatches(array1, array2) {
    console.log('inputs',[array1, array2])
    let results = [];
    for (var i = 0; i < array1.length; i++) {
        for (var j = 0; j < array2.length; j++) {
            if (matches.verify["syllabic"](array1[i], array2[j]) ) {
                results.push({
                    word1: array1[i],
                    word2: array2[j],
                    type: "syllabic"
                })
            }
        }
    }
    console.log( results );
    return results;
}
/*
if queries are regex strings,
var reg = RegExp('foo');
reg.test(string) = true|false


*/
 
verifyMatches(
    ['purple'].map(wordStringToCmu), 
    ['quadruple', 'forget'].map(wordStringToCmu)
); 

function checkForMatches(){
    let results = [];
}

function wordStringToCmu(word) {
    word = word.toUpperCase();
    if (!word in dictionary) throw err;
    return { word, syllables: dictionary[word] };
}