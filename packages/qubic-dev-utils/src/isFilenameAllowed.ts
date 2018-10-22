/**
 * Detects disallowed symbols in string
 *
 * @returns Is filename has no disallowed symbols
 */
const isFilenameAllowed = (filename: string): boolean => {
  const disallowedChars = '/\\:*?"\'<>|';

  if (filename === '') {
    return false;
  }

  return !filename.includes(disallowedChars);
};

export default isFilenameAllowed;
