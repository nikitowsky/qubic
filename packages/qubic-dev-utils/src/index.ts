import getDotenv from './getDotenv';
import getTSConfigAliases from './getTSConfigAliases';
import isFilenameAllowed from './isFilenameAllowed';
import openTab from './openTab';
import terminal from './terminal';
import withHooks from './withHooks';

/**
 * Default environments
 */
export type Environment = 'production' | 'development';

export { getDotenv, getTSConfigAliases, isFilenameAllowed, openTab, terminal, withHooks };
