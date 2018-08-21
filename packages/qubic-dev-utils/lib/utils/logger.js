const chalk = require('chalk');

const br = () => {
  console.log('');
};

const error = (...message) => {
  console.log(chalk.red('error'), ...message);
};

const info = (...message) => {
  console.log(chalk.blue('info'), ...message);
};

const warning = (...message) => {
  console.log(chalk.yellow('warning'), ...message);
};

module.exports = {
  br,
  error,
  info,
  warning,
};
