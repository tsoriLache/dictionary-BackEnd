const express = require('express');
const app = express();
const PORT = process.env.PORT || 8000;
const cors = require('cors');
const DynamoDB = require('./dynamoDB/config');
const posDict = require('./helpers/part-of-speech-dict');
app.use(cors());

// GET /part-of-speech/:pos - random word data in part-of-speech
app.get('/part-of-speech/:pos', (req, res) => {
  const { pos } = req.params;
  //TODO validation and error handling
  const params = {
    TableName: 'dictionary',
    FilterExpression: 'pos = :pos',
    ExpressionAttributeValues: { ':pos': `${posDict[pos]}.` },
  };
  DynamoDB.scan(params, function (err, data) {
    res.json(
      err ? err : data.Items[Math.floor(Math.random() * data.Items.length)]
    );
  });
});

// GET /:word -  if word has more than one parts of speech will return all words part of speech, else, will return a word + definition + part of speech.
app.get('/:word', (req, res) => {
  const { word } = req.params;
  //TODO validation
  const params = {
    TableName: 'dictionary',
    KeyConditionExpression: 'word = :word',
    ExpressionAttributeValues: { ':word': `${word.toUpperCase()}` },
  };
  DynamoDB.query(params, function (err, data) {
    res.json(
      err
        ? err
        : data.Count === 0
        ? {}
        : data.Count === 1
        ? data.Items[0]
        : data.Items.map((item) => item.pos)
    );
  });
});
//GET /:word/:partOfSpeech
app.get('/:word/:pos', (req, res) => {
  const { word, pos } = req.params;
  //TODO validation
  const params = {
    TableName: 'dictionary',
    KeyConditionExpression: 'word = :word and pos = :pos',
    ExpressionAttributeValues: {
      ':word': `${word.toUpperCase()}`,
      ':pos': `${pos}.`,
    },
  };
  DynamoDB.query(params, function (err, data) {
    res.json(err ? err : data.Items[0]);
  });
});

app.listen(PORT, () => {
  console.log(`listening on ${PORT}`);
});
