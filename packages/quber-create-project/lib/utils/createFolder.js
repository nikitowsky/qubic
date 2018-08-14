const path = require('path');
const fs = require('fs-extra');

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

  throw new Error(`Cannot create folder ${projectName}, it's already exists!`);
};

module.exports = createFolder;
