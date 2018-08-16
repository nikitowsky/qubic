const chalk = require('chalk');

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
  error,
  info,
  warning,
};
