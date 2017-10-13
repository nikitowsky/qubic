const { join } = require('path');
const express = require('express');

const app = express();
const port = process.env.PORT || 3000;
const env = process.env.NODE_ENV;

if (env !== 'production') {
  /* eslint-disable */
  const devMiddleware = require('webpack-dev-middleware');
  const hotMiddleware = require('webpack-hot-middleware');
  const webpack = require('webpack');
  const config = require('../config/webpack.config.dev');
  const compiler = webpack(config);

  app.use(devMiddleware(compiler, {
    publicPath: config.output.publicPath,
    historyApiFallback: true,
  }));

  app.use(hotMiddleware(compiler));
  /* eslint-enable */
}

app.set('views', join(__dirname, '../views'));
app.set('view engine', 'pug');

app.use(express.static('client/dist'));

app.get('/*', (req, res) => {
  res.render('index');
});

app.listen(port, (err) => {
  if (err) {
    console.log(err);
  }

  console.log(`Listening at http://localhost:${port}/`);
});
