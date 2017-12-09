const { resolve } = require('path');
const express = require('express');
const expressStaticGzip = require('express-static-gzip');

const app = express();
const port = process.env.PORT || 8000;

app.use(express.static('public'));
app.use(express.static('client/dist'));
app.use(expressStaticGzip('public'));
app.use(expressStaticGzip('client'));

app.get('/*', (req, res) => {
  res.sendFile(resolve(__dirname, '../client/dist/index.html'));
});

app.listen(port, (err) => {
  if (err) {
    console.log(err);
  }

  console.log(`Listening at http://localhost:${port}/`);
});
