const chai = require('chai');  // Using Assert style
const expect = chai.expect;

const dictionary = require('./cmudict-syllables.json');
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
})

describe("Rich -> ", () => {
    // raise "R EY1 Z"  raze | break "B R EY1 K" brake | vary "V EH1","R IY0" very
    it("Given should match, expect true", () => {
        const raise = dictionary["RAISE"].join('-');
        const raiseQuery = matches.query['rich-rhyme'](raise);
        const raze = dictionary["RAZE"].join('-');
        const raiseMatchRaze = raiseQuery.test(raze)
        expect(raiseMatchRaze).to.be.true;

        const breakW = dictionary["BREAK"].join('-');
        const breakQuery = matches.query['rich-rhyme'](breakW);
        const brake = dictionary["BRAKE"].join('-');
        const breakMatchBrake = breakQuery.test(brake)
        expect(breakMatchBrake).to.be.true;

        const vary = dictionary["VARY"].join('-');
        const varyQuery = matches.query['rich-rhyme'](vary);
        const very = dictionary["VERY"].join('-');
        const varyMatchVery = varyQuery.test(very)
        expect(varyMatchVery).to.be.true;
    })
    it("Given not match, expect false", () => {
        const raise = dictionary["RAISE"].join('-');
        const raiseQuery = matches.query['rich-rhyme'](raise);
        const brake = dictionary["BRAKE"].join('-');
        const raiseMatchBrake = raiseQuery.test(brake);
        expect(raiseMatchBrake).to.be.false;
    })
})