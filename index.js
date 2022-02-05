const express = require('express');
const app = express();
const PORT = process.env.PORT || 8000;
const cors = require('cors');
const wordRouter = require('./routers/wordRouter');
app.use(cors());

app.get('/part-of-speech/:pos', (req, res) =>
  req.query.letter ? randomByLetterAndPOS(req, res) : randomByPos(req, res)
);

app.use('/', wordRouter);

app.listen(PORT, () => {
  console.log(`listening on ${PORT}`);
});
