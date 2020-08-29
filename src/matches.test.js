const chai = require('chai'); // Using Assert style
const expect = chai.expect;

const matches = require('./matches');
const { hypened, testAllQueries, verify } = require('./helper');

//todo: add 1,2,3 syllable words for each applicable

describe('syllabic -> ', () => {
    it('Given should match, expect true', () => {
        expect(verify('syllabic', 'purple', 'quadruple')).to.be.true;

        expect(verify('syllabic', 'beaver', 'silver')).to.be.true;

        expect(verify('syllabic', 'dancing', 'prancing')).to.be.true;
    });

    it('Given not match, expect false', () => {
        expect(verify('syllabic', 'purple', 'forget')).to.be.false;
    });
});

describe('rich -> ', () => {
    // raise "R EY1 Z"  raze | break "B R EY1 K" brake | vary "V EH1","R IY0" very
    it('Given should match, expect true', () => {
        expect(verify('rich', 'raise', 'raze')).to.be.true;

        expect(verify('rich', 'break', 'brake')).to.be.true;

        expect(verify('rich', 'vary', 'very')).to.be.true;

        expect(verify('rich', 'lessen', 'lesson')).to.be.true;
    });

    it('Given not match, expect false', () => {
        expect(verify('rich', 'raise', 'brake')).to.be.false;
    });
});

describe('feminine-rhyme -> ', () => {
    it('Given should match, expect true', () => {
        expect(verify('feminine-rhyme', 'backing', 'hacking')).to.be.true;

        expect(verify('feminine-rhyme', 'tricky', 'picky')).to.be.true;

        expect(verify('feminine-rhyme', 'moaning', 'groaning')).to.be.true;

        expect(verify('feminine-rhyme', 'weasel', 'measel')).to.be.true;

        //this is a triple, it matches a double but I should check for these separately
        expect(verify('feminine-rhyme', 'generate', 'venerate')).to.be.true;
    });

    it('Given not match, expect false', () => {
        //same last vowel
        expect(verify('feminine-rhyme', 'very', 'picky')).to.be.false;
    });
});

describe('overlap-single -> ', () => {
    it('Given should match, expect true', () => {
        expect(verify('overlap-single', 'torch', 'chick')).to.be.true;

        expect(verify('overlap-single', 'hound', 'doom')).to.be.true;

        //todo may want to only get single syllable words
    });

    it('Given not match, expect false', () => {
        expect(verify('overlap-single', 'bear', 'chick')).to.be.false;

        //same last vowel, diff consonent
        expect(verify('overlap-single', 'arcane', 'raze')).to.be.false;
    });
});

describe('overlap-single -> ', () => {
    it('Given should match, expect true', () => {
        expect(verify('overlap-vowel', 'squirt', 'turtle', true)).to.be.true;

        expect(verify('overlap-vowel', 'arcane', 'canine', true)).to.be.true;
    });
});

describe('alliteration -> ', () => {
    it('Given should match, expect true', () => {
        expect(verify('alliteration', 'blue', 'blow')).to.be.true;

        expect(verify('alliteration', 'sun', 'sand')).to.be.true;

        expect(verify('alliteration', 'merry', 'monkey')).to.be.true;
    });

    it('Given not match, expect false', () => {
        // T R IH1 | T IH1
        expect(verify('alliteration', 'trilogy', 'typical')).to.be.false;

        // T R IH1 | R IH1 P
        expect(verify('alliteration', 'trilogy', 'rip')).to.be.false;
    });
});

describe('near-rhyme -> ', () => {
    it('Given should match, expect true', () => {
        expect(verify('near-rhyme', 'bent', 'rant')).to.be.true;

        expect(verify('near-rhyme', 'quick', 'back')).to.be.true;
    });

    it('Given not match, expect false', () => {
        expect(verify('near-rhyme', 'bat', 'back')).to.be.false;
    });
});

describe('consonant-rhyme -> ', () => {
    it('Given should match, expect true', () => {
        // console.log(hypened('ball'), '|', query, '|', hypened('bell'), "||" ,res);
        expect(verify('consonant-rhyme', 'ball', 'bell')).to.be.true;

        // console.log(hypened('dump'), '|', query, '|', hypened('damp'), "||" ,res);
        expect(verify('consonant-rhyme', 'dump', 'damp')).to.be.true;

        expect(verify('consonant-rhyme', 'begging', 'bagging')).to.be.true;
    });

    it('Given not match, expect false', () => {
        expect(verify('consonant-rhyme', 'lip', 'limp')).to.be.false;
    });
});

describe('perfect-rhyme -> ', () => {
    it('Given should match, expect true', () => {
        expect(verify('perfect-rhyme', 'cat', 'hat')).to.be.true;

        expect(verify('perfect-rhyme', 'egg', 'beg')).to.be.true;

        expect(verify('perfect-rhyme', 'ink', 'pink')).to.be.true;

        expect(verify('perfect-rhyme', 'boo', 'true')).to.be.true;

        expect(verify('perfect-rhyme', 'soap', 'dope')).to.be.true;
    });

    it('Given not match, expect false', () => {
        expect(verify('perfect-rhyme', 'dog', 'cat')).to.be.false;

        expect(verify('perfect-rhyme', 'remember', 'bear')).to.be.false;
    });
});

describe('assonant -> ', () => {
    it('Given should match, expect true', () => {
        expect(verify('assonant', 'tip', 'limp')).to.be.true;

        expect(verify('assonant', 'dank', 'bat')).to.be.true;

        expect(verify('assonant', 'bowl', 'home')).to.be.true;
    });

    it('Given not match, expect false', () => {
        expect(verify('assonant', 'tip', 'whale')).to.be.false;
    });
});

describe('assonantContained -> ', () => {
    it('Given should match, expect true', () => {
        // IH1 P vs IH1 M P
        expect(verify('assonantContained', 'tip', 'limp')).to.be.true;
    });

    it('Given not match, expect false', () => {
        //AE1 NG K vs AE1 T
        expect(verify('assonantContained', 'dank', 'bat')).to.be.false;
        //different ending IH1 K vs IH1 KR
        expect(verify('assonantContained', 'tip', 'deer')).to.be.false;
    });
});

describe('similar-overlap -> ', () => {
    it('Given should match, expect true', () => {
        // R IH0-M EH1 M-B ER0     B EH1 R
        expect(verify('similar-overlap', 'remember', 'bear')).to.be.true;
        //AE1 TH-L IY2 T     L EH1-ZH ER0
        expect(verify('similar-overlap', 'athlete', 'leisure')).to.be.true;
    });
});

describe('functions -> ', () => {
    it('Should work: testAllQueries', () => {
        let somethingMatched = testAllQueries('raise', 'raze').matched;
        // testAllQueries("raise", "raze").types.forEach(item=>console.log(item))
        expect(somethingMatched).to.be.true;
    });

    it('Should work: verify', () => {
        expect(verify('overlap-single', 'remember', 'bear')).to.be.false;

        expect(verify('overlap-single', 'bear', 'remember')).to.be.true;

        expect(verify('overlap-single', 'remember', 'bear', true)).to.be.true;

        expect(verify('overlap-single', 'remember', 'duck')).to.be.false;
    });
});

describe('various -> ', () => {
    it('Should find match: remember bear', () => {
        let somethingMatched = testAllQueries('remember', 'bear').matched;
        // testAllQueries("remember", "bear").types.forEach(item=>console.log(item))
        expect(somethingMatched).to.be.true;
    });

    it('Should find match: homosexual whale', () => {
        const word1 = 'homosexual';
        const word2 = 'whale';
        let somethingMatched = testAllQueries(word1, word2).matched;
        // console.log(hypened(word1), hypened(word2))
        // testAllQueries(word1, word2).types.forEach(item=>console.log(item))
        expect(somethingMatched).to.be.true;
    });
    // it("Given should match, expect true", () => {
    //     expect(verify('closeEnough', 'remember', 'bear', true)).to.be.true;
    // })
});
