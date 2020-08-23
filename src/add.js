const dictionary = require('./cmudict-syllables.json');
const fs = require('fs');
const stringify = require("json-stringify-pretty-compact");

function add(first, second){
  let word1 = first.toUpperCase();
  let word2 = second.toUpperCase();
  let obj = {
    first: {
      word: word1,
      syllables: dictionary[word1]
    },
    second: {
      word: word2,
      syllables: dictionary[word2]
    }
  }
  console.log(obj)
  addToJson(obj)
}

function jsonReader(filePath, cb) {
  fs.readFile(filePath, (err, fileData) => {
    if (err) {
      return cb && cb(err)
    }
    try {
      const object = JSON.parse(fileData)
      return cb && cb(null, object)
    } catch(err) {
      return cb && cb(err)
    }
  })
}

function addToJson(obj){
  jsonReader('./bin/examples.json', (err, currFile) => {
    if (err) {
      console.log(err);
      return;
    }

    console.log(typeof currFile)

    if(currFile.examples.find(item=> item.first.word === obj.first.word 
      && item.first.word === obj.first.word)){
      console.log("already in array")
      return;
    } else {
      currFile.examples.push(obj);
    }
    
    let jsonString = stringify(currFile, null, 2);

    fs.writeFile('./bin/examples.json', jsonString, err => {
      if (err) {
        console.log('Error writing file', err)
      } 
    })
  })
}




//run with     npm run-script addWord first second
const words = process.argv.slice(2);
console.log(words);

if(words.length !== 2 ){
  console.log('Error: doesnt have 2 arguments')
} else {
  if(words[0] && words[1]){
    add(words[0], words[1])
  } else {
    console.log('err')
  }
}
