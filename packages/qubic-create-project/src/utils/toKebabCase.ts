/**
 * Converts incoming input to kebab-case string
 */
const toKebabCase = (string: string) => {
  return string
    .replace(/([a-z])([A-Z])/g, '$1-$2')
    .replace(/[\s_]+/g, '-')
    .toLowerCase();
};

export default toKebabCase;
