const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HappyPack = require('happypack');
const merge = require('webpack-merge');

const baseConfig = require('./webpack.config.base');
const { regexp, buildStyleLoader } = require('./utils');

const prodConfig = {
  mode: 'production',

  devtool: 'source-map',

  output: {
    filename: '[name].[hash].js',
  },

  module: {
    rules: [
      {
        test: regexp.typescript,
        exclude: /node_modules/,
        use: 'happypack/loader',
      },
      {
        test: regexp.css,
        exclude: regexp.cssModules,
        use: buildStyleLoader({ extractFile: true }),
      },
      {
        test: regexp.cssModules,
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
      loaders: ['babel-loader'],
    }),
    new MiniCssExtractPlugin({
      filename: 'style.[hash].css',
    }),
  ],
};

module.exports = merge.smart(baseConfig, prodConfig);
