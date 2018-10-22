import * as path from 'path';
import { execSync } from 'child_process';
import opn from 'opn';

const OSX_CHROME = 'google chrome';
const WIN_CHROME = 'chrome';

/**
 * Open new tab or use existing with localhost development serevr
 */
const openTab = (url: string) => {
  const encodedURI = encodeURI(url);
  const browser = process.env.BROWSER;

  const shouldUseAppleScript = process.platform === 'darwin' && (typeof browser !== 'string' || browser === OSX_CHROME);
  const pathToAppleScript = path.join(__dirname, '../chrome.applescript');

  if (shouldUseAppleScript) {
    try {
      execSync('ps cax | grep "Google Chrome"');
      execSync(`osascript ${pathToAppleScript} "${encodedURI}"`, {
        cwd: __dirname,
        stdio: 'ignore',
      });
    } catch (e) {
      throw new Error('Cannot find browser to open, do it manually.');
    }
  } else {
    switch (process.platform) {
      case 'darwin': {
        opn(encodedURI, { app: OSX_CHROME });
        break;
      }

      case 'win32': {
        opn(encodedURI, { app: WIN_CHROME });
        break;
      }

      default: {
        throw new Error('Cannot find browser to open, do it manually.');
      }
    }
  }
};

export default openTab;
