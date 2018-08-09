const { execSync } = require('child_process');
const opn = require('opn');

/**
 * Open new tab or use existing with localhost development serevr
 *
 * @param {string} url development server url
 */
const openTab = (url) => {
  const encodedUrl = encodeURI(url);

  try {
    execSync('ps cax | grep "Google Chrome"');
    execSync(`osascript chrome.applescript "${encodedUrl}"`, {
      cwd: __dirname,
      stdio: 'ignore',
    });
  } catch (e) {
    opn(encodedUrl, { app: 'google chrome' });
  }
};

module.exports = openTab;
