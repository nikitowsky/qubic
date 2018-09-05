const { logger } = require('@qubic/dev-utils') as any;
const SizePlugin = require('size-plugin') as any;
import * as Dotenv from 'dotenv-webpack';
import * as merge from 'webpack-merge';
import * as ora from 'ora';
import * as webpack from 'webpack';

import prodConfig from '../config/webpack.config.prod';
import { buildDotenvPath } from '../config/utils';

/**
 * Prepare production config
 */
const prepareProdConfig = ({ env = 'production' }) => {
  const config = merge(prodConfig, {
    plugins: [
      new Dotenv({
        path: buildDotenvPath(env),
        silent: true,
        systemvars: true,
      }),
    ],
  });

  return config;
};

/**
 * Build project using Webapck
 */
const startBuild = ({ env = 'production' }) => {
  const config = prepareProdConfig({ env });
  const spinner = ora(`Building ${env}...\n`).start();
  const compiler = webpack(config);

  // No deprecation errors unless built-in webpack.ProgressPlguin dosen't use hooks api
  // @ts-ignore
  process.noDeprecation = true;

  compiler.apply(
    new webpack.ProgressPlugin((precentage) => {
      const computedPrecentage = (precentage * 100).toFixed(0);

      spinner.text = `Building ${env} ${computedPrecentage}%...\n`;
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

export { startBuild };
