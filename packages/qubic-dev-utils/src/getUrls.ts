import * as address from 'address';

type URLs = {
  localURL: string;
  publicURL?: string;
};

/**
 * Returns pair of URLs for development server
 */
const getUrls = (host: string, port: number): URLs => {
  const commonHosts = ['127.0.0.1', '0.0.0.0', 'localhost'];
  let local;

  if (commonHosts.includes(host)) {
    local = 'localhost';
  } else {
    local = host;
  }

  const publicIP = address.ip();

  const publicURL = !!publicIP ? encodeURI(`http://${publicIP}:${port}`) : undefined;
  const localURL = encodeURI(`http://${local}:${port}`);

  return { localURL, publicURL };
};

export default getUrls;
