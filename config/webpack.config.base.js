const HtmlWebpackPlugin = require('html-webpack-plugin');

const { paths, regexp, buildStyleLoader } = require('./utils');

const baseConfig = {
  entry: {
    bundle: ['@babel/polyfill', paths.source],
  },

  output: {
    path: paths.outputDir,
    filename: '[name].js',
  },

  module: {
    rules: [
      {
        test: regexp.typescript,
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
        test: regexp.css,
        exclude: regexp.cssModules,
        use: buildStyleLoader(),
      },
      {
        test: regexp.cssModules,
        use: buildStyleLoader({ cssModules: true }),
      },
      {
        test: regexp.files,
        loader: 'file-loader',
        options: {
          name: '[sha512:hash:base64:7].[ext]',
        },
      },
    ],
  },

  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
  },

  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: paths.template,
    }),
  ],
};

module.exports = baseConfig;
