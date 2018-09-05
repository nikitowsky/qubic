"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var address = require('address');
var validateNetworkAddress = function (address) {
    return /^10[.]|^172[.](1[6-9]|2[0-9]|3[0-1])[.]|^192[.]168[.]/.test(address);
};
/**
 * Return active development server URLs
 *
 * @param {number} port development server port
 */
var prepareURLs = function (port) {
    var local = encodeURI("http://localhost:" + port);
    var urls = {
        local: local,
    };
    // Wi-fi network address, so you can visit server by your IP address
    var networkAddress = address.ip();
    if (networkAddress && validateNetworkAddress(networkAddress)) {
        urls.network = encodeURI("http://" + networkAddress + ":" + port);
    }
    return urls;
};
exports.default = prepareURLs;
//# sourceMappingURL=prepareURLs.js.map