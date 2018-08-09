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
  },

  module: {
    rules: [
      {
        test: constants.regexp.typescript,
        exclude: /node_modules/,
        use: [
          {
            loader: 'awesome-typescript-loader',
            options: {
              silent: true,
            },
          },
          {
            loader: 'babel-loader',
            options: {
              plugins: [
                '@babel/plugin-syntax-typescript',
                '@babel/plugin-syntax-decorators',
                '@babel/plugin-syntax-jsx',
                'react-hot-loader/babel',
              ],
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
