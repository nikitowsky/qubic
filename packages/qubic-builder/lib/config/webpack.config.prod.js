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
        test: constants.regexp.typescript,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              cacheDirectory: true,
              presets: ['@babel/react', '@babel/typescript'],
            },
          },
          {
            loader: 'awesome-typescript-loader',
            options: {
              silent: true,
            },
          },
        ],
      },
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
      {
        test: constants.regexp.files,
        loader: 'file-loader',
        options: {
          name: '[sha512:hash:base64:7].[ext]',
        },
      },
      {
        test: constants.regexp.graphql,
        exclude: /node_modules/,
        loader: 'graphql-tag/loader',
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
      filename: '[name].[contenthash:8].css',
      chunkFilename: '[name].[contenthash:8].chunk.css',
    }),
  ],
};

module.exports = merge.smartStrategy({ 'module.rules': 'replace' })(baseConfig, prodConfig);
