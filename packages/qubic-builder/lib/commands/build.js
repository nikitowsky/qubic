const { logger } = require('@qubic/dev-utils');
const webpack = require('webpack');
const merge = require('webpack-merge');
const Dotenv = require('dotenv-webpack');
const SizePlugin = require('size-plugin');
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
  const spinner = ora(`Building ${options.env}...\n`).start();
  const compiler = webpack(config);

  // No deprecation errors unless built-in webpack.ProgressPlguin dosen't use hooks api
  process.noDeprecation = true;

  compiler.apply(
    new webpack.ProgressPlugin((precentage) => {
      const computedPrecentage = (precentage * 100).toFixed(0);

      spinner.text = `Building ${options.env} ${computedPrecentage}%...\n`;
    }),
  );

  compiler.hooks.afterEmit.tap('Qubic', () => {
    spinner.stop();
  });

  compiler.run((error, stats) => {
    if (error || stats.hasErrors()) {
      // Handle errors here
      logger.br();
      logger.error('Compilation failed, reason:\n');

      spinner.stop();
      return console.log(error || 'Unknown error :(');
    }

    // Done processing
    spinner.stop();
  });

  compiler.apply(new SizePlugin());
};

module.exports = {
  startBuild,
};
