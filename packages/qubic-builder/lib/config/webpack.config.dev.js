const merge = require('webpack-merge');
const { CheckerPlugin } = require('awesome-typescript-loader');

const baseConfig = require('./webpack.config.base');

const devConfig = {
  mode: 'development',

  devtool: 'cheap-module-eval-source-map',

  plugins: [new CheckerPlugin()],
};

module.exports = merge(baseConfig, devConfig);
