import { clearConsole, logger } from '@qubic/dev-utils';
import * as Dotenv from 'dotenv-webpack';
import * as merge from 'webpack-merge';
import * as webpack from 'webpack';
import * as WebpackDevServer from 'webpack-dev-server';
import chalk from 'chalk';

import devConfig from '../config/webpack.config.dev';
import { prepareURLs, openTab, buildDotenvPath } from '../config/utils';

/** TODO: Move to dev-utils */
const decorateLink = (link: string) => {
  return chalk.cyan.underline(link);
};

/** Development server config */
type TDevConfig = {
  /** Server url */
  url: string;
  /** Environment variable (default: "development") */
  env?: string;
};

/**
 * Prepare development server config
 */
const prepareDevConfig = (options: TDevConfig) => {
  const config = merge(devConfig, {
    entry: {
      bundle: [`webpack-dev-server/client?${options.url}`, 'webpack/hot/dev-server'],
    },

    plugins: [
      new Dotenv({
        path: buildDotenvPath(options.env),
        silent: true,
        systemvars: true,
      }),
      new webpack.HotModuleReplacementPlugin(),
    ],
  });

  return config;
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
  const env = options.env;

  // Webpack Dev Server options
  const webpackDevServerOptions = {
    historyApiFallback: true,
    host: '0.0.0.0',
    hot: true,
    inline: true,
    noInfo: true,
    overlay: true,
    port: options.port || 8000,
  };

  // Build URLs, use local to open browser tab
  const { local, network } = prepareURLs(webpackDevServerOptions.port);

  // Webpack compiler
  const config = prepareDevConfig({ url: local, env });
  const compiler = webpack(config);

  // Define Webpack Dev Server instance
  const devServer = new WebpackDevServer(compiler, webpackDevServerOptions);

  const isInteractive = process.stdout.isTTY;

  devServer.listen(webpackDevServerOptions.port, webpackDevServerOptions.host, (error) => {
    if (error) {
      logger.error(error);
    }

    try {
      openTab(local);
    } catch (e) {
      logger.warning(e.message, '\n');
    }

    if (isInteractive) {
      clearConsole();
    }

    logger.info('You can visit your development server:\n');
    local && console.log('   Local:  ', decorateLink(local));
    network && console.log('   Network:', decorateLink(network));
    logger.br();

    (['SIGINT', 'SIGTERM'] as NodeJS.Signals[]).forEach((signal) => {
      process.on(signal, () => {
        devServer.close();
        process.exit();
      });
    });
  });
};

export { startServer };
