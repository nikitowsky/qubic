const chalk = require('chalk');
const fs = require('fs-extra');
const path = require('path');

/**
 * TODO: Describe function
 *
 * @param {*} directory
 * @param {*} projectName
 */
const createFolder = (directory, projectName) => {
  const directoryPath = path.join(directory, projectName);
  const directoryAlreadyExist = fs.existsSync(directoryPath);

  if (!directoryAlreadyExist) {
    return fs.mkdir(directoryPath);
  }

  throw new Error(`Folder ${chalk.white(projectName)} already exists!`);
};

module.exports = createFolder;
