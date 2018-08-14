/**
 * Converts incoming input to kebab-case string
 *
 * @param {string} string
 */
const toKebabCase = (string) => {
  return string
    .replace(/([a-z])([A-Z])/g, '$1-$2')
    .replace(/[\s_]+/g, '-')
    .toLowerCase();
};

module.exports = toKebabCase;
