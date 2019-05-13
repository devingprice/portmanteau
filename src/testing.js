const matches = require('./matches');
const dictionary = require('./cmudict-syllables.json');

const defaultTypes = ['alliteration', 'syllabic'];

function verifyMatches(array1, array2) {
    console.log('inputs', [array1, array2])
    let results = [];
    for (var i = 0; i < array1.length; i++) {
        for (var j = 0; j < array2.length; j++) {
            if (matches.verify["syllabic"](array1[i], array2[j])) {
                results.push({
                    word1: array1[i],
                    word2: array2[j],
                    type: "syllabic"
                })
            }
        }
    }
    console.log(results);
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

function syllabicQuery(syllable){
    return new RegExp('('+ syllable + ')$')
}
function alliterationQuery(wordPronunc){
    //  (?=.*(?=w*[0-9]))\w*(B L)\w*
    const chunkRegex = /.+?(?= \w*[0-9])/g;
    const chunk = wordPronunc.match(chunkRegex)[0];
    return new RegExp('(?=.*(?= \\w*[0-9]))\\w*('+ chunk + ')\\w*');
}
function findAllitChunk(string){
    const regex = /.+?(?= \w*[0-9])/g;
    return string.match(regex)[0]
}

function verifyMatches2(word, array) {
    let results = [];
    
    const syllableToMatch = dictionary[word][dictionary[word].length -1];
    const reg = syllabicQuery(syllableToMatch);
    console.log(syllableToMatch, reg)

    for (var j = 0; j < array.length; j++) {
        const pronunc = dictionary[array[j]].join('-');
        const match = reg.test(pronunc);
        console.log(pronunc, match);

        if( match ){
            results.push({
                word,
                word2: array[j],
                type: 'syllabic'
            })
        }
    }

    console.log(results);
    return results;
}

verifyMatches2(
    'purple'.toUpperCase(),
    ['quadruple'.toUpperCase(), 'forget'.toUpperCase()]
);

function verifyAllit(word, array) {
    let results = [];
    
    //const syllableToMatch = findAllitChunk( dictionary[word].join('-') )
    //const reg = alliterationQuery(syllableToMatch);
    const reg = alliterationQuery( dictionary[word].join('-') )
    //console.log(syllableToMatch, reg)
    console.log( reg )

    for (var j = 0; j < array.length; j++) {
        const pronunc = dictionary[array[j]].join('-');
        const match = reg.test(pronunc);
        console.log(pronunc, match);

        if( match ){
            results.push({
                word,
                word2: array[j],
                type: 'allit'
            })
        }
    }

    console.log(results);
    return results;
}
verifyAllit(
    'blue'.toUpperCase(),
    ['forget'.toUpperCase(), 'blow'.toUpperCase()]
);

function wordStringToCmu(word) {
    word = word.toUpperCase();
    if (!word in dictionary) throw err;
    return { word, syllables: dictionary[word] };
}


const typesDirectional = {
    'alliteration': false, 
    'syllabic': false
}

const testarray = [
    'blue', 'blow', 'purple', 'quadruple', 'forget'
].map(str=> str.toUpperCase());

function runChecksAgainstSingleArray( array ){
    let regs = {};
    for(var i=0; i < array.length; i++){
        regs[ array[i] ] = defaultTypes.map( type => {
            return {type, reg: matches.query[type]( dictionary[array[i]].join('-') ) }
        })
    }
    console.log(regs)

    let results = [];
    
    for(const [word,queries] of Object.entries(regs) ){
        for(const query of queries){
            //console.log( query.type, query.reg)

            for(const arrayWord of array){
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
    console.log( results )
    //return array;
}
runChecksAgainstSingleArray(testarray);




const testarray1 = [
    'blue', 'purple'
].map(str=> str.toUpperCase());
const testarray2 = [
    'blow', 'quadruple', 'forget'
].map(str=> str.toUpperCase());

function checkForMatches( array1, array2 ){
    let regs = {};
    for(var i=0; i < array1.length; i++){
        regs[ array1[i] ] = defaultTypes.map( type => {
            return {type, reg: matches.query[type]( dictionary[array1[i]].join('-') ) }
        })
    }
    console.log(regs)

    let results = [];
    
    for(const [word,queries] of Object.entries(regs) ){
        for(const query of queries){

            for(const arrayWord of array2){
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
    console.log( results )
    //return array;
}
checkForMatches(testarray1,testarray2)
