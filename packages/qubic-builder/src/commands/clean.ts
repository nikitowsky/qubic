const { logger } = require('@qubic/dev-utils') as any;
import * as rimraf from 'rimraf';
import * as ora from 'ora';

import { constants } from '../config/utils';

const startClean = () => {
  const spinner = ora(`Cleaning ${constants.paths.outputDir}...`).start();

  rimraf(constants.paths.outputDir, () => {
    spinner.stop();
    logger.info('Successfully cleaned');
  });
};

export { startClean };
