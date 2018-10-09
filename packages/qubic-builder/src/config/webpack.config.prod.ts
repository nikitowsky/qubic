import * as autoprefixer from 'autoprefixer';
import * as path from 'path';
import * as webpack from 'webpack';
import * as HtmlWebpackPlugin from 'html-webpack-plugin';
import * as MiniCssExtractPlugin from 'mini-css-extract-plugin';

import modules from './modules';

const config: webpack.Configuration = {
  mode: 'production',

  bail: true,

  devtool: 'source-map',

  entry: {
    bundle: [require.resolve('@babel/polyfill'), path.join(process.cwd(), 'src', 'index.tsx')],
  },

  output: {
    path: path.join(process.cwd(), 'dist'),
    filename: '[name].[hash:8].js',
    chunkFilename: '[name].[chunkhash:8].chunk.js',
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
      {
        oneOf: [
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
          /**
           * Compile ".(graphql|gql)" files to AST
           */
          {
            test: modules.graphql,
            exclude: /node_modules/,
            loader: require.resolve('graphql-tag/loader'),
          },
          /**
           * Load any other resource as file, so we can access to it directly
           */
          {
            loader: require.resolve('file-loader'),
            exclude: [modules.jsx, modules.tsx, /\.(html|json)$/],
            options: {
              name: '[name].[hash:8].[ext]',
            },
          },
        ],
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
