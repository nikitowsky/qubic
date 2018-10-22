import chalk from 'chalk';

import logger from './logger';

const printErrors = (errors: string[]) => {
  logger.showVersion('2.0.0-next.0');
  console.log(chalk.red('Compilation failed'));
  logger.newline();

  errors.forEach((message: string) => console.log(message + '\n'));
};

export default printErrors;
