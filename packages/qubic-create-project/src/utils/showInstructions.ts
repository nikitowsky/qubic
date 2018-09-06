import { logger } from '@qubic/dev-utils';
import chalk from 'chalk';

/**
 * Show instructions what you can do with project
 */
const showInstructions = () => {
  logger.br();
  logger.info('Now you can start by following these commands:');
  logger.br();
  console.log(`   ${chalk.white(`cd ${name}`)}`);
  logger.br();
  console.log(`   ${chalk.white('yarn start')} - start development server`);
  console.log(`   ${chalk.white('yarn build')} - build project`);
  console.log(`   ${chalk.white('yarn clean')} - clean ${chalk.yellow('dist')} folder`);
};

export default showInstructions;
