import getDotenv from './getDotenv';
import isFilenameAllowed from './isFilenameAllowed';

/**
 * Default environments
 */
export type Environment = 'production' | 'development';

export { getDotenv, isFilenameAllowed };
