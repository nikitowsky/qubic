const { logger } = require('@qubic/dev-utils');
const WebpackDevServer = require('webpack-dev-server');
const webpack = require('webpack');
const merge = require('webpack-merge');
const Dotenv = require('dotenv-webpack');
const chalk = require('chalk');

const devConfig = require('../config/webpack.config.dev');
const { prepareURLs, openTab, buildDotenvPath } = require('../config/utils');

const decorateLink = (link) => {
  return chalk.cyan.underline(link);
};

/**
 * Prepare development server config
 *
 * @param {object} options
 * @param {string} options.url localhost server url
 * @param {string} options.env=development environment variable
 */
const prepareDevConfig = (options) => {
  const config = merge(devConfig, {
    entry: {
      bundle: [`webpack-dev-server/client?${options.url}`, 'webpack/hot/dev-server'],
    },

    plugins: [
      new Dotenv({
        path: buildDotenvPath(options.env),
        silent: true,
        systemvars: true,
      }),
      new webpack.HotModuleReplacementPlugin(),
    ],
  });

  return config;
};

/**
 * Start development server based on Webpack Dev Server
 *
 * @param {object} options development server settings
 * @param {string} options.env=development environment variable, useful in .env files
 * @param {number} options.port=8000 development server port
 */
const startServer = (options) => {
  // Build URLs, use local to open browser tab
  const { local, network } = prepareURLs(options.port);

  // Define development server default options
  const env = options.env;

  // Webpack Dev Server options
  const webpackDevServerOptions = {
    historyApiFallback: true,
    host: '0.0.0.0',
    hot: true,
    inline: true,
    noInfo: true,
    overlay: true,
    port: options.port,
  };

  // Webpack compiler
  const config = prepareDevConfig({ url: local, env });
  const compiler = webpack(config);

  // Define Webpack Dev Server instance
  const devServer = new WebpackDevServer(compiler, webpackDevServerOptions);

  devServer.listen(webpackDevServerOptions.port, webpackDevServerOptions.host, (error) => {
    if (error) {
      logger.error(error);
    }

    try {
      openTab(local);
    } catch (e) {
      logger.warning(e.message, '\n');
    }

    logger.info('You can visit your development server:\n');
    console.log('   Local:', decorateLink(local));
    network && console.log('   Network:', decorateLink(network));
    console.log('');

    ['SIGINT', 'SIGTERM'].forEach((signal) => {
      process.on(signal, () => {
        devServer.close();
        process.exit();
      });
    });
  });
};

module.exports = {
  startServer,
};
