const chai = require('chai');  // Using Assert style
const expect = chai.expect;

const matches = require('./matches');

describe("Syllabic -> ", () => {
    const purple = { word: "PURPLE", syllables: ["P ER1","P AH0 L"] };
    const quadruple = { word: "QUADRUPLE", syllables: ["K W AA0","D R UW1","P AH0 L"] };
    const forget = { word: "FORGET", syllables: ["F ER0","G EH1 T"] };
    it("Given should match, expect true", () => {
        const ple = matches.verify['syllabic'](purple,quadruple);
        expect(ple).to.be.true;
    })
    it("Given not match, expect false", () => {
        const notMatch = matches.verify['syllabic'](purple, forget);
        expect(notMatch).to.be.false;
    })

    // it("Test find", () => {
    //     const searchParam = matches.query['syllabic'](purple);
    //     console.log(searchParam);
    //     const array = [quadruple, forget];
        

    //     for(var i=0; i < array.length; i++){
    //         let index = searchParam[0] < 0 ? 
    //             array[i].syllables.length + searchParam[0] : 
    //             searchParam[0];
    //         console.log(array[i].syllables, index)
    //         if( array[i].syllables[index] === searchParam[1]){
    //             results.push({
    //                 word1: purple,
    //                 word2: array[i],
    //                 type: "syllabic"
    //             })
    //         }
    //     }
    //     console.log(results)
    //     expect( results.length ).to.equal(1);
    // })
})
