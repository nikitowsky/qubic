import * as autoprefixer from 'autoprefixer';
import * as webpack from 'webpack';
import * as HtmlWebpackPlugin from 'html-webpack-plugin';

import paths from './paths';
import modules from './modules';

const config: webpack.Configuration = {
  mode: 'development',

  bail: true,

  devtool: 'cheap-module-source-map',

  entry: {
    bundle: [
      require.resolve('webpack-dev-server/client') + '?/',
      require.resolve('webpack/hot/dev-server'),
      require.resolve('@babel/polyfill'),
      paths.entry,
    ],
  },

  output: {
    path: paths.dist,
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
              plugins: ['@babel/proposal-class-properties', 'react-hot-loader/babel'],
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
              require.resolve('style-loader'),
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
              require.resolve('style-loader'),
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
      template: paths.template,
    }),
    new webpack.HotModuleReplacementPlugin(),
  ],
};

export default config;
