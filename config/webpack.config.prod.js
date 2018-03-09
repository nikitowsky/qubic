const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const HappyPack = require('happypack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const webpack = require('webpack');
const merge = require('webpack-merge');
const baseConfig = require('./webpack.config.base');

const prodConfig = {
  devtool: 'source-map',

  output: {
    filename: '[name].[hash].js',
  },

  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: 'happypack/loader',
      },
      {
        test: /\.s?css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              query: {
                modules: true,
                localIdentName: '[name]__[local]___[hash:base64:5]',
              },
            },
            'csso-loader',
            'postcss-loader',
            'sass-loader',
          ],
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
    new ExtractTextPlugin('style.[hash].css'),
    new BundleAnalyzerPlugin({
      analyzerMode: 'static',
    }),
  ],
};

module.exports = merge.smart(baseConfig, prodConfig);
