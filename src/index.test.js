const chai = require('chai'); // Using Assert style
const expect = chai.expect;

const app = require('./index');
const dictionary = require('./cmudict-syllables.json');
const parseArgs = app.parseArgs;

const { logChunk } = require('./helper');

describe('Parse Args -> ', () => {
    it('Given possible combinations of args, expect 3 results', () => {
        expect(parseArgs('dog', 'bullfrog', ['ryhming'])).to.have.lengthOf(3);
        expect(parseArgs('dog', ['bullfrog'], ['ryhming'])).to.have.lengthOf(3);
        expect(parseArgs(['dog'], ['bullfrog'], ['ryhming'])).to.have.lengthOf(3);
        expect(parseArgs('dog', 'bullfrog')).to.have.lengthOf(3);
        expect(parseArgs('dog')).to.have.lengthOf(3);
        expect(parseArgs('dog', null, ['ryhming'])).to.have.lengthOf(3);
    });
    it('Given strings or arrays, expect arrays of strings', () => {
        const strings = parseArgs('dog', 'bullfrog', 'ryhming');
        const arrays = parseArgs(['dog'], ['bullfrog'], ['ryhming']);

        strings.forEach((args) => {
            args.forEach((arg) => expect(arg).to.be.a('string'));
        });

        arrays.forEach((args) => {
            args.forEach((arg) => expect(arg).to.be.a('string'));
        });
    });
});

describe('Samples -> ', () => {
    it('Given blue & blow, expect alliteration match', () => {
        const res = app.portmanteau('blue', 'blow', 'alliteration');
        expect(res).to.have.lengthOf(1);
    });

    it('Given purple & quadruple, expect syllabic match', () => {
        const res = app.portmanteau('purple', 'quadruple', 'syllabic');
        expect(res).to.have.lengthOf(1);
    });

    it('Given cat & hat, expect perfect-rhyme match', () => {
        // console.log(dictionary['CAT'], dictionary["HAT"])
        const res = app.portmanteau('cat', 'hat', 'perfect-rhyme');
        expect(res).to.have.lengthOf(1);
    });

    it('Given raise & raze, expect rich match', () => {
        // console.log(dictionary['RAISE'], dictionary["RAZE"])
        const res = app.portmanteau('raise', 'raze', 'rich');
        expect(res).to.have.lengthOf(1);
    });

    it('Given arrays of previous, expect prior matches', () => {
        const res = app.portmanteau(
            ['blue', 'cat', 'raise'],
            ['blow', 'hat', 'raze'],
            ['alliteration', 'perfect-rhyme', 'rich']
        );
        // syllabic is perfect rhyme & rich is all
        // console.log( res )
        expect(res).to.have.lengthOf(5);
    });
});

let str = `
remember bear;
athlete leisure;
thermodynamics fur;
infuriating fuhrer;
resin resonate;
oregan trail trail mix;
arse skin asking;
show for chauffer;
noodle arm nude alarm;
poo pacasso;
apologies paul;
exercise exorcism;
come get some psalm;
bro protocol;
bro nomenclature;
ping kingdom;
roar incinerator;
bicep bisexual;
horrific whore;
nigger disfigure knicker mixture digger quicker;
whipped whooped;
hind sight heinz sight;
tree tremendous;
justice just ass;
strawberry straw bear;
`;
logChunk(str);

/*
remember bear;  R IH0-M EH1 M-B ER0     B EH1 R
    last syllable: d (A D)(replace rhyming) match with first syllable of next
    more specific that may get atheleisure as well
        also match consonants before vowel
athlete leisure; AE1 TH-L IY2 T     L EH1-ZH ER0
thermodynamics fur; TH ER1-M OW0   F ER1
infuriating fuhrer;
resin resonate;  R EH1-Z AH0 N     R EH1-Z AH0-N EY2 T
oregan trail trail mix;
arse skin asking;
show for chauffer;
noodle arm nude alarm;
poo pacasso;
apologies paul;
exercise exorcism;
come get some psalm;
bro protocol;
bro nomenclature;
ping kingdom;
roar incinerator;
bicep bisexual;
horrific whore;
nigger disfigure knicker mixture digger quicker;
whipped whooped;
hind sight heinz sight;
tree tremendous;
justice just ass;
strawberry straw bear;
*/
