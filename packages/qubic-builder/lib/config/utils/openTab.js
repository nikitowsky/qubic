"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var path = require("path");
var child_process_1 = require("child_process");
var opn = require("opn");
var OSX_CHROME = 'google chrome';
var WIN_CHROME = 'chrome';
/**
 * Open new tab or use existing with localhost development serevr
 *
 * @param {string} url development server url
 */
var openTab = function (url) {
    var encodedUrl = encodeURI(url);
    var browser = process.env.BROWSER;
    var shouldUseAppleScript = process.platform === 'darwin' && (typeof browser !== 'string' || browser === OSX_CHROME);
    var pathToAppleScript = path.join(__dirname, '../../../chrome.applescript');
    if (shouldUseAppleScript) {
        try {
            child_process_1.execSync('ps cax | grep "Google Chrome"');
            child_process_1.execSync("osascript " + pathToAppleScript + " \"" + encodedUrl + "\"", {
                cwd: __dirname,
                stdio: 'ignore',
            });
        }
        catch (e) {
            throw new Error('Cannot find browser to open, do it manually.');
        }
    }
    else {
        switch (process.platform) {
            case 'darwin': {
                opn(encodedUrl, { app: OSX_CHROME });
                break;
            }
            case 'win32': {
                opn(encodedUrl, { app: WIN_CHROME });
                break;
            }
            default: {
                throw new Error('Cannot find browser to open, do it manually.');
            }
        }
    }
};
exports.default = openTab;
//# sourceMappingURL=openTab.js.map