const { resolve } = require('path');
const express = require('express');
const helmet = require('helmet');
const compression = require('compression');

const app = express();
const port = process.env.PORT || 8000;

app.use(helmet());
app.use(compression());
app.use(express.static('public'));
app.use(express.static('public/dist'));

app.get('/*', (req, res) => {
  res.sendFile(resolve(__dirname, '../public/dist/index.html'));
});

app.listen(port, (err) => {
  if (err) {
    console.log(err);
  }

  console.log(`Listening at http://localhost:${port}/`);
});
