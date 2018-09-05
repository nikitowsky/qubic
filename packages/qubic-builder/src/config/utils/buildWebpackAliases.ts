import * as path from 'path';

import { contextDir } from './constants';

type CompilerOptions = {
  [key: string]: any;
  baseUrl: string;
  paths: {
    [key: string]: string[];
  };
};

type WebpackAliases = {
  [key: string]: string;
};

/**
 * Builds Webpack-friendly aliases based on your `tsconfig.json`
 */
const buildWebpackAliases = (): WebpackAliases => {
  const tsConfigPath = path.join(contextDir, 'tsconfig.json');
  const tsConfig = require(tsConfigPath);

  const { compilerOptions } = tsConfig;
  const { baseUrl, paths } = compilerOptions as CompilerOptions;

  const webpackAliases: WebpackAliases = {};

  if (baseUrl && paths) {
    // Resolve system-relative path for `baseUrl`
    const sourcesRootDir = path.join(contextDir, baseUrl);

    Object.entries(paths).forEach((alias) => {
      const key = alias[0].replace('/*', '');

      // As long Webpack dosen't support array as alias (like tsConfig does), we always use first alias path
      const pathToAlias = alias[1][0].replace('/*', '');

      // Build Webpack-friendly alias config
      webpackAliases[key] = path.join(sourcesRootDir, pathToAlias);
    });
  }

  return webpackAliases;
};

export default buildWebpackAliases;
