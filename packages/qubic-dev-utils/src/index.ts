/**
 * Default environments
 */
export type Environment = 'production' | 'development';

/**
 * Detects disallowed symbols in string
 *
 * @returns Is filename has no disallowed symbols
 */
export const isFilenameAllowed = (filename: string): boolean => {
  const disallowedChars = '/\\:*?"\'<>|';

  if (filename === '') {
    return false;
  }

  return !filename.includes(disallowedChars);
};
