const webpack = require('webpack');
const merge = require('webpack-merge');
const Dotenv = require('dotenv-webpack');
const ora = require('ora');

const prodConfig = require('../config/webpack.config.prod');
const { buildDotenvPath } = require('../config/utils');

/**
 * Prepare production config
 *
 * @param {object} options
 * @param {string} options.env=production environment variable
 */
const prepareProdConfig = (options) => {
  const config = merge(prodConfig, {
    plugins: [
      new Dotenv({
        path: buildDotenvPath(options.env),
        silent: true,
        systemvars: true,
      }),
    ],
  });

  return config;
};

/**
 * Build project using Webapck
 *
 * @param {object} options production config settings
 * @param {string} options.env=development environment variable, useful in .env files
 */
const startBuild = (options) => {
  const config = prepareProdConfig({ env: options.env });

  const spinner = ora(`Building ${options.env}...`).start();

  webpack(config, (error, stats) => {
    if (error || stats.hasErrors()) {
      // Handle errors here
      console.log('Error...');
    }

    // Done processing
    spinner.stop();
  });
};

// const config = prepareProdConfig();

module.exports = {
  startBuild,
};
