express = require('express');
router = express.Router();
const DynamoDB = require('../dynamoDB/config');

// GET /:word -  if word has more than one parts of speech will return all words part of speech, else, will return a word + definition + part of speech.
router.get('/:word', (req, res) => {
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
        ? { err }
        : data.Count === 0
        ? { err: { code: 'NOT FOUND', message: 'hahaha' } }
        : data.Count === 1
        ? { res: data.Items[0] }
        : { pos: data.Items.map((item) => item.pos) }
    );
  });
});
//GET /:word/:partOfSpeech
router.get('/:word/:pos', (req, res) => {
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

module.exports = router;
