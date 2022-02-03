const express = require('express');
const app = express();
const PORT = process.env.PORT || 8000;
const cors = require('cors');

app.use(cors());

app.listen(PORT, () => {
  console.log(`listening on ${PORT}`);
});
