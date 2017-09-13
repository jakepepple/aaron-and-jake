const express = require('express');
require('dotenv').config();

const app = express();

app.get('/', (req, res) => {
  res.send('hello world');
});

const port = process.env.PORT;

app.listen(port, () => {
  console.log(`app listening on port ${port}`);
});
