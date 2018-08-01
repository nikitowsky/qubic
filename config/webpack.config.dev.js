const Dotenv = require('dotenv-webpack');
const merge = require('webpack-merge');

const baseConfig = require('./webpack.config.base');
const { buildDotenvPath } = require('./utils');

const devConfig = {
  mode: 'development',

  devtool: 'cheap-module-eval-source-map',

  devServer: {
    historyApiFallback: true,
    noInfo: true,
    open: true,
    overlay: true,
    port: 8000,
  },

  plugins: [
    new Dotenv({
      path: buildDotenvPath('development'),
      silent: true,
    }),
  ],
};

module.exports = merge(baseConfig, devConfig);
