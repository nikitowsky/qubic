const { join } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  devtool: 'cheap-module-eval-source-map',

  entry: {
    bundle: [
      'babel-polyfill',
      'react-hot-loader/patch',
      join(__dirname, '../client/src/index.jsx'),
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
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: join(__dirname, '../client/src/index.html'),
    }),
  ],
};
