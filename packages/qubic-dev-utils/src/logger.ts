import chalk from 'chalk';

const br = () => {
  console.log('');
};

const error = (...message: any[]) => {
  console.log(chalk.red('error'), ...message);
};

const info = (...message: any[]) => {
  console.log(chalk.blue('info'), ...message);
};

const qubic = (...message: any[]) => {
  console.log(chalk.dim('[qubic]'), ...message);
};

const warning = (...message: any[]) => {
  console.log(chalk.yellow('warning'), ...message);
};

const showVersion = () => {
  // TODO: Get version from package.json
  const message = chalk.bold('2.0.0-beta.13');
  qubic(message);
};

export default {
  br,
  error,
  info,
  qubic,
  showVersion,
  warning,
};
