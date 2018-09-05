import * as HtmlWebpackPlugin from 'html-webpack-plugin';

import { constants, buildStyleLoader, buildWebpackAliases } from './utils';

const baseConfig = {
  entry: {
    bundle: [constants.paths.source],
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
            loader: 'awesome-typescript-loader',
            options: {
              silent: true,
              useTranspileModule: true,
              useBabel: true,
              babelOptions: {
                babelrc: false,
                plugins: ['react-hot-loader/babel'],
              },
              babelCore: '@babel/core',
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
      {
        test: constants.regexp.graphql,
        exclude: /node_modules/,
        loader: 'graphql-tag/loader',
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

export default baseConfig;
