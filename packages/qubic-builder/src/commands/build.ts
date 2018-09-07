import { logger } from '@qubic/dev-utils';
import * as ora from 'ora';
import * as webpack from 'webpack';
// @ts-ignore
import * as SizePlugin from 'size-plugin';
import chalk from 'chalk';

import QubicBuilder from '../QubicBuilder';
import webpackConfig from '../config/webpack.config.prod';

/**
 * Build project using Webapck
 */
const startBuild = ({ env = 'production' }) => {
  const qubicBuilder = new QubicBuilder({ env, webpackConfig });

  logger.showVersion();
  logger.br();

  const spinner = ora(`Building ${env}...\n`).start();
  const { compiler } = qubicBuilder;

  // No deprecation errors unless built-in webpack.ProgressPlguin dosen't use hooks api
  // @ts-ignore
  process.noDeprecation = true;

  compiler.apply(
    new webpack.ProgressPlugin((precentage) => {
      const computedPrecentage = (precentage * 100).toFixed(0);

      spinner.text = `Building ${chalk.white(env)} ${computedPrecentage}%...\n`;
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
      return console.log(error.message || 'Unknown error :(');
    }

    // Done processing
    spinner.stop();
  });

  compiler.apply(new SizePlugin());
};

export { startBuild };
