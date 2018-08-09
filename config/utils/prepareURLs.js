const idx = require('idx');
const os = require('os');

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

  // Get Wi-fi network address, so you can visit server by your IP address
  const networkAddress = idx(os.networkInterfaces(), (networks) => networks.en0[1].address);

  if (networkAddress !== undefined && networkAddress !== null) {
    networkUrl = encodeURI(`http://${networkAddress}:${port}`);
    urls.network = networkUrl;
  }

  return urls;
};

module.exports = prepareURLs;
