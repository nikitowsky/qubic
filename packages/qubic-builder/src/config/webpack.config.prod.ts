import * as autoprefixer from 'autoprefixer';
import * as path from 'path';
import * as webpack from 'webpack';
import * as HtmlWebpackPlugin from 'html-webpack-plugin';
import * as MiniCssExtractPlugin from 'mini-css-extract-plugin';

import modules from './modules';

const config: webpack.Configuration = {
  mode: 'production',

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
      /**
       * Compile .ts and .tsx files
       */
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
      /**
       * Compile ".(css|scss|sass)" files as usual
       */
      {
        test: modules.css,
        exclude: modules.cssModules,
        use: [
          MiniCssExtractPlugin.loader,
          require.resolve('css-loader'),
          require.resolve('csso-loader'),
          {
            loader: require.resolve('postcss-loader'),
            options: {
              plugins: () => [autoprefixer()],
            },
          },
          require.resolve('sass-loader'),
        ],
      },
      /**
       * Compile ".module.(css|scss|sass)" files as CSS Modules
       * Spec: https://github.com/css-modules/css-modules
       */
      {
        test: modules.cssModules,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: require.resolve('css-loader'),
            options: {
              localIdentName: '[local]___[hash:base64:5]',
              modules: true,
            },
          },
          require.resolve('csso-loader'),
          {
            loader: require.resolve('postcss-loader'),
            options: {
              plugins: () => [autoprefixer()],
            },
          },
          require.resolve('sass-loader'),
        ],
      },
      {
        test: modules.graphql,
        exclude: /node_modules/,
        loader: require.resolve('graphql-tag/loader'),
      },
    ],
  },

  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
  },

  /**
   * Code splitting
   */
  optimization: {
    splitChunks: {
      chunks: 'all',
    },
  },

  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: path.join(process.cwd(), 'public', 'index.html'),
    }),
    /**
     * Extract css as files
     */
    new MiniCssExtractPlugin({
      filename: '[name].[contenthash:8].css',
      chunkFilename: '[name].[contenthash:8].chunk.css',
    }),
  ],
};

export default config;
