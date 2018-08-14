const path = require('path');
const fs = require('fs-extra');

/**
 * Folder where to copy
 *
 * @param {*} directory
 * @param {*} projectName
 */
const copyTemplate = (directory, projectName) => {
  const directoryPath = path.join(directory, projectName);
  const templatePath = path.join(__dirname, '../../template');

  const filesToCopy = ['src', 'package.json', 'tsconfig.json'];

  filesToCopy.forEach((fileName) => {
    const pathToCopy = path.join(templatePath, fileName);
    const pathToPaste = path.join(directoryPath, fileName);

    fs.copy(pathToCopy, pathToPaste);
  });
};

module.exports = copyTemplate;
