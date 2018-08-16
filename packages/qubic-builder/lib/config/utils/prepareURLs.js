const address = require('address');
const idx = require('idx');
const os = require('os');

const validateNetworkAddress = (address) => {
  return /^10[.]|^172[.](1[6-9]|2[0-9]|3[0-1])[.]|^192[.]168[.]/.test(address);
};

/**
 * Return active development server URLs
 *
 * @param {number} port development server port
 */
const prepareURLs = (port) => {
  const local = encodeURI(`http://localhost:${port}`);
  let network;

  const urls = {
    local,
  };

  // Wi-fi network address, so you can visit server by your IP address
  let networkAddress = address.ip();

  if (networkAddress && validateNetworkAddress(networkAddress)) {
    networkUrl = encodeURI(`http://${networkAddress}:${port}`);
    urls.network = networkUrl;
  }

  return urls;
};

module.exports = prepareURLs;
