const chai = require('chai');  // Using Assert style
const expect = chai.expect; 

const app = require('./index');
//const portmantaeu = app.portmantaeu;
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