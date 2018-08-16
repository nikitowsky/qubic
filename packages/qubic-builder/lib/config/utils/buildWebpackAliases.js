const path = require('path');

const { contextDir } = require('./constants');

/**
 * Builds Webpack-friendly aliases based on your `tsconfig.json`, so we don't need to write
 * two `tsconfig.json` and `webpack.config.js` configs at the same time
 *
 * @returns {object} Webpack aliases
 */
const buildWebpackAliases = () => {
  const tsConfigPath = path.join(contextDir, 'tsconfig.json');
  const tsConfig = require(tsConfigPath);

  const { compilerOptions } = tsConfig;
  const { baseUrl, paths } = compilerOptions;

  const webpackAliases = {};

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

module.exports = buildWebpackAliases;
