const HappyPack = require('happypack');
const CompressionPlugin = require('compression-webpack-plugin');
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

  plugins: [
    new HappyPack({
      loaders: ['babel-loader'],
    }),
    new webpack.optimize.ModuleConcatenationPlugin(),
    new ExtractTextPlugin('style.[hash].css'),
    new CompressionPlugin({
      test: /\.js$|\.css$|\.html$|\.eot?.+$|\.ttf?.+$|\.woff?.+$|\.svg?.+$/,
      algorithm: 'gzip',
      asset: '[path].gz[query]',
      minRatio: 0.8,
      threshold: 10240,
    }),
  ],
};

module.exports = merge.smart(baseConfig, prodConfig);
