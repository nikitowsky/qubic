import { clearConsole, logger } from '@qubic/dev-utils';
import chalk from 'chalk';

import QubicBuilder from '../QubicBuilder';
import QubicDevServer from '../QubicDevServer';

import webpackConfig from '../config/webpack.config.dev';
import { openTab } from '../config/utils';

/** Make link looks like web link */
const decorateLink = (link: string) => {
  return chalk.cyan.underline(link);
};

type DevServerOptions = {
  /** Development environment variable, useful in .env files */
  env?: string;
  /** Development server port */
  port?: number;
};

/**
 * Start development server based on Webpack Dev Server
 */
const startServer = (options: DevServerOptions) => {
  // Define development server default options
  const env = options.env || 'development';

  const qubicBuilder = new QubicBuilder({ env, webpackConfig });
  const qubicDevServer = new QubicDevServer({ env, webpackConfig: qubicBuilder.config });

  const server = qubicDevServer.start();
  const isInteractive = process.stdout.isTTY;

  server
    .then((instance) => {
      try {
        openTab(qubicDevServer.localURL);
      } catch (e) {
        logger.warning(e.message);
      }

      if (isInteractive) {
        clearConsole();
      }

      logger.showVersion();
      logger.info(`Server started with ${chalk.white(env)} environment.`);
      logger.info('It available on:\n');

      qubicDevServer.localURL && console.log('   Local:  ', decorateLink(qubicDevServer.localURL));
      qubicDevServer.publicURL && console.log('   Network:', decorateLink(qubicDevServer.publicURL));

      logger.br();

      (['SIGINT', 'SIGTERM'] as NodeJS.Signals[]).forEach((signal) => {
        process.on(signal, () => {
          // @ts-ignore
          instance.close();
          process.exit();
        });
      });
    })
    .catch((error: Error) => {
      logger.error(error.message);
    });
};

export { startServer };
