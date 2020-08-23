const dictionary = require('./cmudict-syllables.json');
const matches = require('./matches');

const camelCased = (string) => string.replace(/-([a-z])/g, function (g) { return g[1].toUpperCase(); });
const hypened = (string) => dictionary[string.toUpperCase()].join('-');
//console.log(hypened('raise'), '|', hypened('raze'), "|| rich-rhyme=",res);
      
const verify = (type, word1, word2, reversable = false) => {
    if(matches.query[type] !== undefined && word1 !== undefined && word2 !== undefined) {
        let query = matches.query[type](hypened(word1));
        let res = query.test(hypened(word2));
        
        if (!reversable || res) return res; 

        query = matches.query[type](hypened(word2));
        res = query.test(hypened(word1)); 
        return res;
    }
}

const hierarchy = {
    
};
// for now, if types contains rich+syllabic+perfect+assonant+near, condense into rich
// later, might test in certain order and exclude tests that aren't needed

//if rich rhyme then it is syllablic
//  if syllabic then it is perfect-rhyme
//      if perfect-rhyme then it is assonant
//      if perfect-rhyme then it is near-rhyme
//if rich-rhyme then it is feminine
//  if feminine then it is perfect /near/assonant
//todo

const descriptions = {
    'assonant': "last vowel matches and consonants contained",
    'feminine-rhyme': "first vowel to end matches",
    'overlap-single': "last phoneme of word matches first phoneme of next word",
    'overlap-vowel': "todo",
    'alliteration': "consonants before first vowel match",
    'near-rhyme': "consonants after last vowel match",
    'consonant-rhyme': "all but first vowel matches",
    'perfect-rhyme': "last vowel to end matches",
    'rich-rhyme': "pronunciation identical",
    'syllabic': "last syllable matches",
    'oblique': "todo"
}

const formats = {
    'assonant': [""],
    'feminine-rhyme': [""],
    'overlap-single': "non direct match: d a D = D a d | d a d-d a D = D a d-d a d",
    'overlap-vowel': "non direct match todo",
    'alliteration': ["D a d", "D a d-d a d", "D a d-d a d-d a d"],
    'near-rhyme': [""],
    'consonant-rhyme': [""],
    'perfect-rhyme': ["d A D", "d a d-d A D", "d a d-d a d-d A D"],
    'rich-rhyme': ["D A D", "D A D-D A D", "D A D-D A D-D A D"],
    'syllabic': [""],
    'oblique': [""]
}

//#region 
//dont know if I can get another rhyme to catch these
const closeEnough = {
    'B ER0': ['B EH1 R'],
    'B EH1 R': ['B ER0']
    //burr B ER1
    //so B ER# = B EH# R
    // order dare = A01 R-D ER# | D EH# R
}

function addCloseEnough(str1, str2){
    if(closeEnough[str1] && typeof closeEnough[str1] === 'array'){
        if(closeEnough[str1].indexOf(str2) !== -1){
            closeEnough[str1].push(str2)
        }
    }
    if(closeEnough[str2] && typeof closeEnough[str2] === 'array'){
        if(closeEnough[str2].indexOf(str1) !== -1){
            closeEnough[str2].push(str1)
        }
    }
}

function checkForCloseEnough(str){
    if(closeEnough[str] && typeof closeEnough[str] === 'array'){
        return closeEnough[str]
    }
    return null;
}
//#endregion

function testAllQueries(word1, word2){
    let somethingMatched = false;
    let types = [];
    for (const [key,value] of Object.entries(matches.query)){
        let query = value(hypened(word1));
        let res = query.test(hypened(word2));
        if (res === true) {
            somethingMatched = true
            types.push(`${key} ${word1} ${word2}`)
        };

        query = value(hypened(word2));
        res = query.test(hypened(word1))
        if (res === true) {
            somethingMatched = true;
            types.push(`${key} ${word2} ${word1}`)
        }
    }
    // console.log(types)
    return {
        matched: somethingMatched,
        types
    }
}

module.exports = {
    camelCased, hypened, testAllQueries, verify
}


/* https://examples.yourdictionary.com/examples-of-rhyme.html 
http://www.literarydevices.com/dactyl/
1 0 0 

http://www.literarydevices.com/anapest/
0 0 1

eye rhyme
spelled the same but not sound
move love | cough bough | food good | death wreath

identical rhyme
with same word but different meaning

masculine rhyme
In this rhyme, the stress in on the final syllable in both words. Examples include support and report, dime and sublime, divulge and bulge.

Oblique - This is an imperfect rhyme because the sounds do not quite match. Sometimes these are called half, approximate, near, off, or slant rhymes. Examples are lap and shape, fiend and mean, gun and thumb.

Scarce rhyme - This refers to words that have very few other words that rhyme with them. Examples are lips and whisp, oceanless and motionless.

Semirhyme - In this rhyme, one word has and extra syllable. Examples are mend and ending, rye and buying, lick and pickle.

Wrenched rhyme - This is an imperfect rhyme which rhymes a stressed with an unstressed syllable. Examples are caring and wing, lady and a bee.



*/