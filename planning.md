FROM pkmnnames project
args = {
    array1 not null, array2 optional, types optional
}
[word1],[word2],[types]
'word1','word2',[types]
'word1', null, [types]
'word1'
[word1],'word2'


require(portmantaeu)
const matches = portmantaeu(arr1, arr2, types)

FROM portmantaeu
needs strings or arrays
types like "rhyme", "end match beginning", etc
returns [{
    word1, word2, type of match, (maybe estimated output)
}]