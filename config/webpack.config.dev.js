const Dotenv = require('dotenv-webpack');
const merge = require('webpack-merge');

const baseConfig = require('./webpack.config.base');
const { prepareURLs, openTab, buildDotenvPath } = require('./utils');

// Forces CLIENT_PORT to be present in production builds
const CLIENT_PORT = process.env.CLIENT_PORT || 8000;

const devConfig = {
  mode: 'development',

  devtool: 'cheap-module-eval-source-map',

  devServer: {
    historyApiFallback: true,
    host: '0.0.0.0',
    noInfo: true,
    overlay: true,
    port: CLIENT_PORT,
    after: () => {
      const { local, network } = prepareURLs(CLIENT_PORT);

      // Open tab with development server in Google Chrome
      openTab(local);

      console.log('You can visit your development server:\n');
      console.log('Local:', local);
      network && console.log('Network:', network);
    },
  },

  plugins: [
    new Dotenv({
      path: buildDotenvPath('development'),
      silent: true,
      systemvars: true,
    }),
  ],
};

module.exports = merge(baseConfig, devConfig);
