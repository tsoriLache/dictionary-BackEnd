express = require('express');
router = express.Router();
const DynamoDB = require('../dynamoDB/config');
const posDict = require('../helpers/part-of-speech-dict');

// GET /part-of-speech/:pos or /part-of-speech/:pos?letter=X -
// random word data in part-of-speech (specific letter optional)
router.get('/:pos', (req, res) => {
  const { pos } = req.params;
  const { letter } = req.query;
  const params = getParams(letter, pos);
  DynamoDB.scan(params, function (err, data) {
    if (err) {
      res
        .status('500')
        .json('we`re having some problems.. please try again later');
    } else {
      if (data.Count === 0) {
        res.status('404').json('error in search query');
      } else {
        res.json(data.Items[Math.floor(Math.random() * data.Items.length)]);
      }
    }
  });
});

const getParams = (letter, pos) => {
  return letter
    ? {
        TableName: 'dictionary',
        FilterExpression: 'pos = :pos and begins_with (word , :letter)',
        ExpressionAttributeValues: {
          ':pos': `${posDict[pos]}.`,
          ':letter': `${letter.toUpperCase()}`,
        },
      }
    : {
        TableName: 'dictionary',
        FilterExpression: 'pos = :pos',
        ExpressionAttributeValues: { ':pos': `${posDict[pos]}.` },
      };
};
module.exports = router;
