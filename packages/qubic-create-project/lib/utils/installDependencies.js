const { spawn, spawnSync } = require('child_process');
const semver = require('semver');

/**
 * Decide what package manager to use
 */
const getPackageManager = () => {
  let packageManager;

  try {
    const { stdout } = spawnSync('yarn', ['-v']);

    if (semver.valid(stdout) && semver.major(stdout) >= 1) {
      packageManager = 'yarn';
    }
  } catch (e) {
    packageManager = 'npm';
  }

  return packageManager;
};

/**
 * Install packages
 *
 * @param {string} directory
 */
const installDependencies = (directory) => {
  const packageManager = getPackageManager();

  const packagesToInstall = [
    '@qubic/builder@2.0.0-beta.7',
    'react',
    'react-dom',
    'react-hot-loader',
    '@types/react',
    '@types/react-dom',
    '@types/react-hot-loader',
    'typescript',
  ];

  const commands = {
    yarn: ['yarn', ['add', ...packagesToInstall]],
    npm: ['npm', ['install', '--save', ...packagesToInstall]],
  };

  try {
    return spawnSync(...commands['yarn'], {
      cwd: directory,
      stdio: 'inherit',
    });
  } catch (e) {
    // Do nothing on errors
  }
};

module.exports = installDependencies;
