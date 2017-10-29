const { join } = require('path');
const { HotModuleReplacementPlugin } = require('webpack');

module.exports = {
  devtool: 'cheap-module-eval-source-map',

  entry: {
    bundle: [
      'webpack-hot-middleware/client',
      'babel-polyfill',
      join(__dirname, '../client/src/js/index.jsx'),
      join(__dirname, '../client/src/styles/index.sass'),
    ],
  },

  output: {
    path: join(__dirname, '../client/dist'),
    publicPath: '/',
    filename: '[name].js',
  },

  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
      {
        test: /\.sass$/,
        use: ['style-loader', 'css-loader', 'csso-loader', 'postcss-loader', 'sass-loader'],
      },
    ],
  },

  resolve: {
    extensions: ['.js', '.jsx'],
  },

  plugins: [
    new HotModuleReplacementPlugin(),
  ],
};
