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

  // Wi-fi network address, so you can visit server by your IP address
  let networkAddress;

  switch (process.platform) {
    case 'darwin': {
      networkAddress = idx(os.networkInterfaces(), (networks) => networks.en0[1].address);
      break;
    }

    case 'win32': {
      networkAddress = idx(os.networkInterfaces(), (networks) => networks.Ethernet[1].address);
      break;
    }

    default: {
      throw new Error('Cannot find public network.');
    }
  }

  if (networkAddress !== undefined && networkAddress !== null) {
    networkUrl = encodeURI(`http://${networkAddress}:${port}`);
    urls.network = networkUrl;
  }

  return urls;
};

module.exports = prepareURLs;
