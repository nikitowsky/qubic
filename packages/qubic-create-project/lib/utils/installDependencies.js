const execa = require('execa');

/**
 * Install packages
 *
 * @param {string} directory
 */
const installDependencies = (directory) => {
  return execa(`yarn`, {
    cwd: directory,
  });
};

module.exports = installDependencies;
