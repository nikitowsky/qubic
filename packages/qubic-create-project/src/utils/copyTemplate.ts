import * as fs from 'fs-extra';
import * as path from 'path';

/**
 * Folder where to copy
 *
 * @param {*} directory Path to copy
 * @param {*} projectName Project name
 */
const copyTemplate = (directory: string, projectName: string) => {
  const directoryPath = path.join(directory, projectName);
  const templatePath = path.join(__dirname, '../../template');

  const filesToCopy = ['src', 'package.json', 'tsconfig.json'];

  filesToCopy.forEach((fileName) => {
    const pathToCopy = path.join(templatePath, fileName);
    const pathToPaste = path.join(directoryPath, fileName);

    fs.copy(pathToCopy, pathToPaste);
  });
};

export default copyTemplate;
