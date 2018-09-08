import { clearConsole, logger } from '@qubic/dev-utils';

import QubicBuilder from '../QubicBuilder';
import QubicDevServer from '../QubicDevServer';

import webpackConfig from '../config/webpack.config.dev';
import { openTab } from '../config/utils';

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

  qubicDevServer.compiler.hooks.invalid.tap('invalid', () => {
    if (isInteractive) {
      clearConsole();
    }

    logger.qubic('Compiling...');
  });

  server
    .then((instance) => {
      if (isInteractive) {
        clearConsole();
        logger.qubic('Compiling...');
      }

      try {
        openTab(qubicDevServer.localURL);
      } catch (e) {
        logger.warning(e.message);
      }

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
