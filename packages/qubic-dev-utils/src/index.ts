import getDotenv from './getDotenv';
import getTSConfigAliases from './getTSConfigAliases';
import isFilenameAllowed from './isFilenameAllowed';

/**
 * Default environments
 */
export type Environment = 'production' | 'development';

export { getDotenv, getTSConfigAliases, isFilenameAllowed };
