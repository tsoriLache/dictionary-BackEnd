require('dotenv').config();
const AWS = require('aws-sdk');

let docClient = require('./config');

let counter = 50000;

const words = require('../dictionary.json');

let save = function () {
  for (let i = 0; i < 3000; i++) {
    if (counter === 113375) break;
    var input = {
      word: words[counter].word,
      pos: words[counter].pos,
      definitions: words[counter].definitions,
    };
    counter += 1;
    var params = {
      TableName: 'dictionary',
      Item: input,
    };
    docClient.put(params, function (err, data) {
      if (data) {
        console.log(i);
      }
    });
  }
};

save();
setInterval(() => {
  console.log('finished');
  save();
}, 90000);
