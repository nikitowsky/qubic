const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const { constants, buildStyleLoader, buildWebpackAliases } = require('./utils');

const baseConfig = {
  entry: {
    bundle: ['@babel/polyfill', constants.paths.source],
  },

  output: {
    path: constants.paths.outputDir,
    filename: '[name].js',
    publicPath: '/',
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
              plugins: ['react-hot-loader/babel'],
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
        use: buildStyleLoader(),
      },
      {
        test: constants.regexp.cssModules,
        use: buildStyleLoader({ cssModules: true }),
      },
      {
        test: constants.regexp.files,
        loader: 'file-loader',
        options: {
          name: '[sha512:hash:base64:7].[ext]',
        },
      },
    ],
  },

  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
    alias: buildWebpackAliases(),
  },

  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: constants.paths.template,
    }),
  ],
};

module.exports = baseConfig;
