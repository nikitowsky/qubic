const merge = require('webpack-merge');

const baseConfig = require('./webpack.config.base');

const devConfig = {
  mode: 'development',

  devtool: 'cheap-module-eval-source-map',
};

module.exports = merge(baseConfig, devConfig);
