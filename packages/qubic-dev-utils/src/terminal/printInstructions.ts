import chalk from 'chalk';

import logger from './logger';
import getUrls from '../getUrls';

const printInstructions = (env: string, host: string, port: number) => {
  const { localURL, publicURL } = getUrls(host, port);

  logger.showVersion('2.0.0-next.0');
  console.log(chalk.green('Successfully compiled'));
  logger.newline();
  console.log(`Server started with ${chalk.white(env)} environment.`);
  console.log('It available on:');
  logger.newline();

  localURL && console.log('   Local:  ', chalk.cyan.underline(localURL));
  publicURL && console.log('   Network:', chalk.cyan.underline(publicURL));

  logger.newline();
};

export default printInstructions;
