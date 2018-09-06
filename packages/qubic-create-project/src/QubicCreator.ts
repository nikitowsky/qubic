import { getPackageManager, logger } from '@qubic/dev-utils';
import { spawnSync } from 'child_process';
import * as fs from 'fs-extra';
import * as path from 'path';
import chalk from 'chalk';

interface CreatorConfig {
  /** Project name, will be used as folder name */
  name: string;
}

export default class QubicCreator {
  directory: string;
  name: string;
  templateDirectory: string;

  constructor(options: CreatorConfig) {
    const contextDirectory = process.cwd();

    this.name = options.name;
    this.directory = path.join(contextDirectory, options.name);
    this.templateDirectory = path.join(__dirname, '../template');

    logger.showVersion();
  }

  /**
   * Creatre project directory
   */
  createFolder = (): void => {
    logger.qubic(`Create folder ${chalk.yellow(this.directory)}...`);

    const isDirectoryExists = fs.existsSync(this.directory);

    if (!isDirectoryExists) {
      fs.mkdir(this.directory);
    } else {
      const errorMsg = `Folder ${chalk.white(this.name)} already exists!`;
      throw new Error(errorMsg);
    }
  };

  /**
   * Copy template to project directory
   */
  copyTemplate = (): void => {
    logger.qubic('Copy project template...');

    const filesToCopy = ['src', 'package.json', 'tsconfig.json'];

    filesToCopy.forEach((file) => {
      const pathToCopy = path.join(this.templateDirectory, file);
      const pathToPaste = path.join(this.directory, file);

      fs.copy(pathToCopy, pathToPaste);
    });
  };

  /**
   * Perform `yarn` or `npm install`
   */
  installDependencies = (): void => {
    logger.qubic('Install dependencies...');
    logger.br();

    const packageManager = getPackageManager();

    const packages = [
      '@qubic/builder@2.0.0-beta.12',
      '@types/react-dom',
      '@types/react-hot-loader',
      '@types/react',
      'react-dom',
      'react-hot-loader',
      'react',
      'typescript',
    ];

    type Commands = { [key: string]: string[] };

    const commands: Commands = {
      yarn: ['add', ...packages],
      npm: ['install', '--save', ...packages],
    };

    try {
      const command = commands[packageManager];

      const installation = spawnSync(packageManager, command, {
        cwd: this.directory,
        stdio: 'inherit',
      });

      try {
        // @ts-ignore
        installation.stdout.pipe(process.stdout);
      } catch {
        // Do nothing on errors
      }
    } catch {
      throw new Error('Unable to install depenencies');
    }
  };
}
