const path = require('path');

/** Script execution folder (project folder) */
const contextDir = process.cwd();

/**
 * Important files paths
 */
const paths = {
  source: path.join(contextDir, 'src/index.tsx'),
  template: path.join(contextDir, 'src/index.html'),
  outputDir: path.join(contextDir, 'dist'),
};

/**
 * Regular expressions for Webpack
 */
const regexp = {
  typescript: /\.(ts|tsx)$/,
  css: /\.(css|scss|sass)$/,
  cssModules: /\.module\.(css|scss|sass)$/,
  files: /\.(png|jpg|gif|svg|woff|woff2|eot|ttf)$/,
};

module.exports = {
  contextDir,
  paths,
  regexp,
};
