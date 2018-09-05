import { spawnSync } from 'child_process';

/**
 * Decide what package manager to use
 */
const getPackageManager = (): string => {
  let packageManager = 'npm';

  const { stdout } = spawnSync('yarn', ['-v']);
  const version = stdout.toString();
  const major = parseInt(version[0]);

  if (version && major >= 1) {
    packageManager = 'yarn';
  }

  return packageManager;
};

/**
 * Install packages
 *
 * @param {string} directory
 */
const installDependencies = (directory: string) => {
  const packageManager = getPackageManager();

  const packagesToInstall = [
    '@qubic/builder@2.0.0-beta.12',
    'react',
    'react-dom',
    'react-hot-loader',
    '@types/react',
    '@types/react-dom',
    '@types/react-hot-loader',
    'typescript',
  ];

  type Commands = {
    [key: string]: string[];
  };

  const commands: Commands = {
    yarn: ['add', ...packagesToInstall],
    npm: ['install', '--save', ...packagesToInstall],
  };

  try {
    const command = commands[packageManager];

    return spawnSync(packageManager, command, {
      cwd: directory,
      stdio: 'inherit',
    });
  } catch (e) {
    throw new Error('Unable to install depenencies, check out your internet connection');
  }
};

export default installDependencies;
