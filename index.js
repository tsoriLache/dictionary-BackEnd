const serverless = require('serverless-http');
const express = require('express');
const app = express();
// const PORT = process.env.PORT || 8000;
const cors = require('cors');
const wordRouter = require('./routers/wordRouter');
const partRouter = require('./routers/partRouter');
app.use(cors());

app.use('/part-of-speech', partRouter);

app.use('/', wordRouter);

app.get('/', (req, res) => {
  res.json('finally');
});
// app.listen(PORT, () => {
//   console.log(`listening on ${PORT}`);
// });
module.exports.handler = serverless(app);
