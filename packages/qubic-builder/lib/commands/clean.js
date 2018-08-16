const { logger } = require('@qubic/dev-utils');
const rimraf = require('rimraf');
const ora = require('ora');

const { constants } = require('../config/utils');

const startClean = () => {
  const spinner = ora(`Cleaning ${constants.paths.outputDir}...`).start();

  rimraf(constants.paths.outputDir, () => {
    spinner.stop();
    logger.info('Successfully cleaned');
  });
};

module.exports = {
  startClean,
};
