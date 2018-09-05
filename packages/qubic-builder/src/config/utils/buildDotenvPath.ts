import * as path from 'path';

import { contextDir } from './constants';

/**
 * Returns path to `.env` file
 *
 * @param {string} env Environment variable (ex. `production`, `stage`, `development`)
 */
const buildDotenvPath = (env: string = 'development'): string => {
  return path.join(contextDir, `.env.${env}`);
};

export default buildDotenvPath;
