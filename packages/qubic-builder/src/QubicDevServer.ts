import { logger, clearConsole } from '@qubic/dev-utils';
import * as merge from 'webpack-merge';
import * as webpack from 'webpack';
import * as WebpackDevServer from 'webpack-dev-server';
import chalk from 'chalk';
// @ts-ignore
import * as address from 'address';

// TODO: Move to commons
enum Environments {
  PRODUCTION = 'production',
  DEVELOPMENT = 'development',
}

type Environment = Environments.PRODUCTION | Environments.DEVELOPMENT | string;

interface DevServerConfig {
  /** Webpack configuration  */
  webpackConfig: webpack.Configuration;
  /** Environment variable */
  env: Environment;
  /** Development server host */
  host?: string;
  /** Development server port */
  port?: number;
}

export default class QubicDevServer {
  config: webpack.Configuration;
  compiler: webpack.Compiler;
  environment: Environment;
  host: string;
  port: number;
  localURL: string;
  publicURL: string | null;

  constructor(options: DevServerConfig) {
    this.environment = options.env;
    this.host = options.host || '0.0.0.0';
    this.port = options.port || 8000;
    this.localURL = this.getUrls().localURL;
    this.publicURL = this.getUrls().publicURL;
    this.config = this.prepareWebpackConfig(options.webpackConfig);
    this.compiler = this.createCompiler(this.config);
  }

  /**
   * Creates Webpack compiler
   */
  private createCompiler = (config: webpack.Configuration): webpack.Compiler => {
    const compiler = webpack(config);

    compiler.hooks.done.tap('done', this.handleStats);

    return compiler;
  };

  /**
   * Prepare additional loaders, plugins, etc.
   */
  private prepareWebpackConfig = (config: webpack.Configuration): webpack.Configuration => {
    return merge(config, {
      entry: {
        bundle: [`webpack-dev-server/client?${this.localURL}`, 'webpack/hot/dev-server'],
      },

      plugins: [new webpack.HotModuleReplacementPlugin()],
    });
  };

  /**
   * Get development server URL-s
   */
  private getUrls = (): { localURL: string; publicURL: string | null } => {
    const commonHosts = ['127.0.0.1', '0.0.0.0', 'localhost'];
    let local;

    if (commonHosts.includes(this.host)) {
      local = 'localhost';
    }

    const publicIP = address.ip();

    const publicURL = !!publicIP ? encodeURI(`http://${publicIP}:${this.port}`) : null;
    const localURL = encodeURI(`http://${local}:${this.port}`);

    return { localURL, publicURL };
  };

  start = () => {
    const webpackDevServerOptions: WebpackDevServer.Configuration = {
      historyApiFallback: true,
      hot: true,
      inline: true,
      host: this.host,
      port: this.port,

      compress: true,

      overlay: true,
      clientLogLevel: 'none',
      noInfo: true,
      quiet: true,

      stats: false,
    };

    const server = new WebpackDevServer(this.compiler, webpackDevServerOptions);

    return new Promise((resolve, reject) => {
      server.listen(this.port, this.host, (error?: Error) => {
        if (error) {
          reject(error);
        }

        resolve(server);
      });
    });
  };

  /**
   * Prints user's instructions
   */
  printInstructions = () => {
    logger.showVersion();
    logger.qubic(chalk.green('Successfully compiled'));
    logger.br();
    logger.info(`Server started with ${chalk.white(this.environment)} environment.`);
    logger.info('It available on:\n');

    this.localURL && console.log('   Local:  ', chalk.cyan.underline(this.localURL));
    this.publicURL && console.log('   Network:', chalk.cyan.underline(this.publicURL));

    logger.br();
  };

  /**
   * Print errors
   */
  printErrors = (errors: string[]) => {
    logger.showVersion();
    logger.qubic(chalk.red('Compilation failed'));
    logger.br();

    errors.map((message: string) => console.log(message + '\n'));
  };

  /**
   * Handle compilation stats
   */
  handleStats = (stats: webpack.Stats) => {
    const isInteractive = process.stdout.isTTY;

    if (isInteractive) {
      clearConsole();
    }

    const { errors = [] } = stats.toJson();
    const hasErrors = errors.length > 0;

    if (hasErrors) {
      this.printErrors(errors);
    }

    if (isInteractive && !hasErrors) {
      this.printInstructions();
    }
  };
}
