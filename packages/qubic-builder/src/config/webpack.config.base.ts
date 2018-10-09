import * as path from 'path';
import * as webpack from 'webpack';
import * as HtmlWebpackPlugin from 'html-webpack-plugin';

import modules from './modules';

console.log(process.cwd());

const config: webpack.Configuration = {
  entry: {
    bundle: ['@babel/polyfill', path.join(process.cwd(), 'src', 'index.tsx')],
  },

  output: {
    path: path.join(process.cwd(), 'dist'),
    filename: '[name].[hash:8].js',
    publicPath: '/',
  },

  module: {
    rules: [
      {
        test: modules.tsx,
        exclude: /node_modules/,
        use: [
          {
            loader: require.resolve('babel-loader'),
            options: {
              babelrc: false,
              cacheDirectory: true,
              configFile: false,
              sourceMaps: false,
              // TODO: Move to own preset
              presets: ['@babel/react', '@babel/typescript', ['@babel/env', { modules: false, useBuiltIns: 'usage' }]],
              plugins: ['@babel/proposal-class-properties'],
            },
          },
        ],
      },
    ],
  },

  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
  },

  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: path.join(process.cwd(), 'src', 'index.html'),
    }),
  ],
};

export default config;
