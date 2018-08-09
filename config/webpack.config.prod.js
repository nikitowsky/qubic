const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HappyPack = require('happypack');
const Dotenv = require('dotenv-webpack');
const merge = require('webpack-merge');

const baseConfig = require('./webpack.config.base');
const { constants, buildDotenvPath, buildStyleLoader } = require('./utils');

// Forces CLIENT_ENV to be present in production builds
const CLIENT_ENV = process.env.CLIENT_ENV || 'production';

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
        use: 'happypack/loader',
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
    ],
  },

  optimization: {
    splitChunks: {
      chunks: 'all',
    },
  },

  plugins: [
    new HappyPack({
      loaders: [
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
    }),
    new MiniCssExtractPlugin({
      filename: 'style.[hash].css',
    }),
    new Dotenv({
      path: buildDotenvPath(CLIENT_ENV),
      silent: true,
      systemvars: true,
    }),
  ],
};

module.exports = merge.smart(baseConfig, prodConfig);
