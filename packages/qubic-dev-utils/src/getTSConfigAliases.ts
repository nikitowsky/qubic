import * as path from 'path';

/**
 * Generate Webpack aliases based on tsconfig.json
 */
const getTSConfigAliases = (): Record<string, string> => {
  const cwd = process.cwd();

  const tsConfigPath = path.join(cwd, 'tsconfig.json');
  const tsConfig = require(tsConfigPath);

  const { compilerOptions } = tsConfig;
  const { baseUrl, paths } = compilerOptions;

  const computedAliases: Record<string, string> = {};

  if (baseUrl && paths) {
    // Resolve system-relative path for `baseUrl`
    const rootDirectory = path.join(cwd, baseUrl);

    Object.entries(paths).forEach(([alias, aliasPath]) => {
      const key = alias.replace('/*', '');

      // As long Webpack dosen't support array as alias (like tsconfig.json does), we always use first alias path
      const computedPath = (aliasPath as Record<string, string>)[0].replace('/*', '');

      // Build Webpack-friendly alias config
      computedAliases[key] = path.join(rootDirectory, computedPath);
    });
  }

  return computedAliases;
};

export default getTSConfigAliases;
