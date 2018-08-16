const path = require('path');

const { contextDir } = require('./constants');

/**
 * Returns path to .env file
 *
 * @param {string} env environment (ex. `production`, `stage`, `development`)
 */
const buildDotenvPath = (env = 'development') => path.join(contextDir, `.env.${env}`);

module.exports = buildDotenvPath;
