const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const Dotenv = require('dotenv-webpack');
const merge = require('webpack-merge');

const baseConfig = require('./webpack.config.base');
const { constants, buildDotenvPath, buildStyleLoader } = require('./utils');

const prodConfig = {
  mode: 'production',

  devtool: 'source-map',

  output: {
    filename: '[name].[hash].js',
  },

  module: {
    rules: [
      {
        test: constants.regexp.css,
        exclude: constants.regexp.cssModules,
        use: buildStyleLoader({ extractFile: true }),
      },
      {
        test: constants.regexp.cssModules,
        use: buildStyleLoader({
          cssModules: true,
          extractFile: true,
        }),
      },
    ],
  },

  optimization: {
    splitChunks: {
      chunks: 'all',
    },
  },

  plugins: [
    new MiniCssExtractPlugin({
      filename: 'style.[hash].css',
    }),
  ],
};

module.exports = merge.smart(baseConfig, prodConfig);
