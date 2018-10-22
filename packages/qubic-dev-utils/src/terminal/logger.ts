import chalk from 'chalk';

class Logger {
  error = (...logs: any[]) => {
    console.log(chalk.red('error'), ...logs);
  };

  info = (...logs: any[]) => {
    console.log(chalk.blue('info'), ...logs);
  };

  warning = (...logs: any[]) => {
    console.log(chalk.yellow('warning'), ...logs);
  };

  withQubic = (...logs: any[]) => {
    console.log(chalk.dim('[qubic]'), ...logs);
  };

  newline = () => {
    console.log('');
  };

  showVersion = (version: string) => {
    const logs = chalk.bold(version);
    this.withQubic(logs);
  };
}

const logger = new Logger();

export default logger;
