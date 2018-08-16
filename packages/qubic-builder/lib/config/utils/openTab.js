const { execSync } = require('child_process');
const opn = require('opn');

const OSX_CHROME = 'google chrome';
const WIN_CHROME = 'chrome';

/**
 * Open new tab or use existing with localhost development serevr
 *
 * @param {string} url development server url
 */
const openTab = (url) => {
  const encodedUrl = encodeURI(url);
  const browser = process.env.BROWSER;

  const shuldUseAppleScript = process.platform === 'darwin' && (typeof browser !== 'string' || browser === OSX_CHROME);

  if (shuldUseAppleScript) {
    try {
      execSync('ps cax | grep "Google Chrome"');
      execSync(`osascript chrome.applescript "${encodedUrl}"`, {
        cwd: __dirname,
        stdio: 'ignore',
      });
    } catch (e) {
      throw new Error('Cannot find browser to open, do it manually.');
    }
  } else {
    switch (process.platform) {
      case 'darwin': {
        return opn(encodedUrl, { app: OSX_CHROME });
      }

      case 'win32': {
        return opn(encodedUrl, { app: WIN_CHROME });
      }

      default: {
        throw new Error('Cannot find browser to open, do it manually.');
      }
    }
  }
};

module.exports = openTab;
