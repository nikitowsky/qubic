const path = require('path');
const autoprefixer = require('autoprefixer');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

/**
 * Important files paths
 */
const paths = {
  envProduction: path.join(__dirname, '../.env.production'),
  envDevelopment: path.join(__dirname, '../.env.development'),
  source: path.join(__dirname, '../src/index.tsx'),
  template: path.join(__dirname, '../src/index.html'),
  outputDir: path.join(__dirname, '../dist'),
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

/**
 * Returns path to .env file
 *
 * @param {string} env environment (ex. `production`, `stage`, `development`)
 */
const buildDotenvPath = (env = 'development') => path.join(__dirname, `../.env.${env}`);

/**
 * Returns list of loaders for specific situation
 *
 * @param {object} options extra settings for loaders
 * @param {object} options.cssModules if `true` enables css-modules classname resolution
 * @param {boolean} options.extractFile if `true` returns an *.css file during build
 * @returns {string[]} configured list of loaders
 */
const buildStyleLoader = (options = {}) => {
  const { cssModules = false, extractFile = false } = options;

  const cssModulesOptions = cssModules
    ? {
        modules: true,
        localIdentName: '[local]___[hash:base64:5]',
      }
    : {};

  const cssLoader = {
    loader: 'css-loader',
    options: {
      ...cssModulesOptions,
      importLoaders: 1,
    },
  };

  const postcssLoader = {
    loader: 'postcss-loader',
    options: {
      plugins: () => [autoprefixer()],
    },
  };

  const endpointLoader = extractFile ? MiniCssExtractPlugin.loader : 'style-loader';
  const loaders = [endpointLoader, cssLoader, 'csso-loader', postcssLoader, 'sass-loader'];

  return loaders;
};

module.exports = {
  paths,
  regexp,
  buildDotenvPath,
  buildStyleLoader,
};
