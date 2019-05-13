const chai = require('chai');  // Using Assert style
const expect = chai.expect;

const app = require('./index');
const dictionary = require('./cmudict-syllables.json');
const parseArgs = app.parseArgs;

describe("Parse Args -> ", () => {
    it("Given possible combinations of args, expect 3 results", () => {
        expect(parseArgs('dog', 'bullfrog', ['ryhming'])).to.have.lengthOf(3);
        expect(parseArgs('dog', ['bullfrog'], ['ryhming'])).to.have.lengthOf(3);
        expect(parseArgs(['dog'], ['bullfrog'], ['ryhming'])).to.have.lengthOf(3);
        expect(parseArgs('dog', 'bullfrog')).to.have.lengthOf(3);
        expect(parseArgs('dog')).to.have.lengthOf(3);
        expect(parseArgs('dog', null, ['ryhming'])).to.have.lengthOf(3);
    })
    it("Given strings or arrays, expect arrays of strings", () => {
        const strings = parseArgs('dog', 'bullfrog', 'ryhming');
        const arrays = parseArgs(['dog'], ['bullfrog'], ['ryhming']);
        strings.forEach(args => {
            args.forEach(arg => expect(arg).to.be.a('string'))
        })
        arrays.forEach(args => {
            args.forEach(arg => expect(arg).to.be.a('string'))
        })
    })

})

describe("Samples -> ", () => {
    it("Given blue & blow, expect alliteration match", () => {
        const res = app.portmantaeu("blue", 'blow', 'alliteration');
        expect(res).to.have.lengthOf(1);
    })
    it("Given purple & quadruple, expect syllabic match", () => {
        const res = app.portmantaeu("purple", 'quadruple', 'syllabic');
        expect(res).to.have.lengthOf(1);
    })
    it("Given cat & hat, expect perfect-rhyme match", () => {
        console.log(dictionary['CAT'], dictionary["HAT"])
        const res = app.portmantaeu("cat", 'hat', 'perfect-rhyme');
        expect(res).to.have.lengthOf(1);
    })
    it("Given raise & raze, expect rich-rhyme match", () => {
        console.log(dictionary['RAISE'], dictionary["RAZE"])
        const res = app.portmantaeu("raise", 'raze', 'rich-rhyme');
        expect(res).to.have.lengthOf(1);
    })

    it("Given raise & raze, expect rich-rhyme match", () => {
        const res = app.portmantaeu(
            ['blue', 'purple', 'cat', "raise"],
            ['blow', 'quadruple', 'hat', 'raze'],
            ['alliteration', 'syllabic', 'perfect-rhyme', 'rich-rhyme']
        );
        //syllabic is perfect rhyme & rich rhyme is all
        console.log( res )
        expect(res).to.have.lengthOf(9);
    })
})