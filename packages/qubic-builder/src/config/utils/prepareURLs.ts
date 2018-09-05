const address = require('address') as any;

const validateNetworkAddress = (address: string) => {
  return /^10[.]|^172[.](1[6-9]|2[0-9]|3[0-1])[.]|^192[.]168[.]/.test(address);
};

type URLs = {
  local: string;
  network?: string;
};

/**
 * Return active development server URLs
 *
 * @param {number} port development server port
 */
const prepareURLs = (port: number): URLs => {
  const local = encodeURI(`http://localhost:${port}`);

  const urls: URLs = {
    local,
  };

  // Wi-fi network address, so you can visit server by your IP address
  const networkAddress = address.ip();

  if (networkAddress && validateNetworkAddress(networkAddress)) {
    urls.network = encodeURI(`http://${networkAddress}:${port}`);
  }

  return urls;
};

export default prepareURLs;
