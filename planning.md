
Bugs
    abstruse show is matching
    overlap needs to get whole phonemes in test (include space)
        "words": "ABSTRUSE - SHOW",
        "pro": "AH0 B-S T R UW1 S   |    SH OW1"
    Alliteration is matching for everything that starts with vowel
        "words": "OBSCURE - ERUPTING",
        "pro": "AH0 B-S K Y UH1 R   |    IH0-R AH1 P-T IH0 NG"
    overlap-vowel
        "words": "MURKY - DOGGY",
        "pro": "M ER1-K IY0   |    D AO1-G IY0"
    syllabic
        test isn't checking for before term
        "words": "SHADOWY - PUPPY",
        "pro": "SH AE1-D OW0-IY0   |    P AH1-P IY0"

matches i liked but got incorrectly
    shadow doggy = shadowggy

TODO
    setup db for storing popular search terms (on another project dir)
    functions to call datamuse api and wordassociations api

    may add (word, loose=false) to queries to replace spaces/dashes/numbers

    make more rhyming types for various formats not covered

    Make object for rhyming/similar phonemes

    some types will always be another, check in an order then exclude

    change ""+var+"" to `${var}` in matches funcs

    use https://github.com/nlp-compromise/nlp-syllables 
    to put words together for result

    add async funcs to request word associations

Expansions
    two words put together equals another
        just ass = justice (similar vowel)
        straw bear = strawberr-y (match with extra)
        show for = chauffer
        arse skin = asking (similar)

    double word
        hind_sight = heinz_sight (only a cons replaced)

    double word 
        noodle arm = nude alarm (direct match if loose)

    only a consonant replaced
        bicep bisexual
        B AY2-S EH1 P    B AY2-S EH1 K-SH UW0-AH0 L

    double vowel
        both vowels match final two vowels
        helps to have similar number of consonants in between and none after
        digger, quicker, mixture, disfigure
    
    word contained loose similar (maybe too complicated to remove syllables like this)
        apologies contains paul with similar vowel

        incenerator   IH0 N-S IH1-N ER0-EY2-T ER0
        roar   R AO1 R
    
    assonant contained loose but also with prior, syllabic contained
        s Ah1 m = s aa1 l m
    
    resin resonate (direct contained if loose, multiple syllables)




Terms:
Phoneme = 39 with extra variations for lexical stress
Not "Pun" = puns are using multiple meanings of a word
Blend
Mesh
lexeme = from same root, run/runs/ran/running



result [portmanteauObject]
portmanteauObject {
    word1, word1pho, word2, word2pho
    type, overlapped(syllables with overlap), 
    estimation(of how it is spelled)
}









ROM pkmnnames project
args = {
    array1 not null, array2 optional, types optional
}
[word1],[word2],[types]
'word1','word2',[types]
'word1', null, [types]
'word1'
[word1],'word2'


require(portmanteau)
const matches = portmanteau(arr1, arr2, types)

FROM portmanteau
needs strings or arrays
types like "rhyme", "end match beginning", etc
returns [{
    word1, word2, type of match, (maybe estimated output)
}]




index:
portmanteau([word1],?[word2],?[types]) base function
    returns array of matches
parseArgs() handles different portmanteau args
checkForMatches() does the work
    returns array of matches
    regs{
        word (from arr1): [{type, reg:regExp},...]
    } this is a list of words and what regExp is needed to match that type
    for each word+query in regs
    for each regExp needed
    for each word in array2 check if same word and if passes regExp
        push it into results

matches:
_regs = common reg selectors
verify() check if words match this type
query() return regExp needed for match

testing: 






https://en.wikipedia.org/wiki/List_of_portmanteaus

'remember bear ',                          
R IH0-M EH1 M-B ER0   B EH1 R, 
B ER0 = B EH1 R

'athlete leisure  ',                                
'AE1 TH-L IY2 T   L EH1-ZH ER0',   


'fur thermal  ',                                             
'F ER1    TH ER1-M AH0 L',  
F ER1 = TH ER1

'homosexual whale   ',        
'HH OW2-M OW0-S EH1 K-SH AH0-W AH0 L    W EY1 L',     
W AH0 L = W EY1 L

'ARSE skin   asking  ',                           
'AA1 R S    S K IH1 N',                                        
'AE1-S K IH0 NG',    
AA1 R = AE1

'noodle arm  nude alarm ',                                  
'N UW1-D AH0 L    AA1 R M',                                         
'N UW1 D    AH0-L AA1 R M',
N UW1 D AH0 L AA1 R M

'bro protocol   ',
'B R OW1    P R OW1-T AH0-K AA2 L',
B|P R OW1;

'horrific whore   ',
'HH AO0-R IH1-F IH0 K    HH AO1 R' 
HH AO# R

'arcane canine',
AA2 R-K EY1 N    K EY1-N AY2 N

'squirt turtle'
S K W ER1 T    T ER1-T AH0 L

par barbecue = parbecue
par mitzvah | jurassic par | pardon the interruption

microcomputer software = microsoft
lion tiger = liger
America track = amtrack
Bill hillary = billary




Links
https://regexr.com/ 
https://www.rexegg.com/regex-quickstart.html 
https://www.regular-expressions.info/lookaround.html
