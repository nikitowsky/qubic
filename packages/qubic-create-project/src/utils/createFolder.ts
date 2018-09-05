import * as fs from 'fs-extra';
import * as path from 'path';
import chalk from 'chalk';

/**
 * Creates project folder
 *
 * @param {*} directory Where to create folder
 * @param {*} projectName Folder name
 */
const createFolder = (directory: string, projectName: string) => {
  const directoryPath = path.join(directory, projectName);
  const directoryAlreadyExist = fs.existsSync(directoryPath);

  if (!directoryAlreadyExist) {
    return fs.mkdir(directoryPath);
  }

  throw new Error(`Folder ${chalk.white(projectName)} already exists!`);
};

export default createFolder;
