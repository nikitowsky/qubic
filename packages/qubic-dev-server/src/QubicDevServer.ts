import { terminal, withHooks } from '@qubic/dev-utils';
import QubicBuilder from '@qubic/builder';
import * as ora from 'ora';
import * as webpack from 'webpack';
import * as WebpackDevServer from 'webpack-dev-server';

/**
 * Development server options
 */
type DevServerConfig = {
  host: string;
  port: number;
};

/**
 * Webpack Dev Server options
 */
const WDSConfig: WebpackDevServer.Configuration = {
  clientLogLevel: 'none',
  compress: true,
  historyApiFallback: true,
  hot: true,
  inline: true,
  noInfo: true,
  overlay: true,
  quiet: true,
  stats: false,
};

class QubicDevServer {
  dotenv: string;
  host: string;
  port: number;
  private spinner: any;
  private webpackDevServer: WebpackDevServer;

  constructor(options: Record<string, any> = {}) {
    this.dotenv = options.dotenv || 'development';
    this.host = '0.0.0.0';
    this.port = 8000;

    const { webpackCompiler } = new QubicBuilder({ env: 'development', dotenv: this.dotenv });
    const compiler = withHooks({
      invalid: this.handleStatsInvalid,
      done: this.handleStatsDone,
    })(webpackCompiler);

    this.webpackDevServer = new WebpackDevServer(compiler, WDSConfig);
  }

  private handleStatsInvalid = () => {
    const isInteractive = process.stdout.isTTY;

    if (isInteractive) {
      terminal.clear();
    }

    this.spinner = ora('Compiling...').start();
  };

  private handleStatsDone = (stats: webpack.Stats) => {
    const isInteractive = process.stdout.isTTY;

    this.spinner.stop();

    if (isInteractive) {
      terminal.clear();
    }

    const { errors = [] } = stats.toJson();
    const hasErrors = errors.length > 0;

    if (hasErrors) {
      terminal.printErrors(errors);
    }

    if (isInteractive && !hasErrors) {
      terminal.printInstructions(this.dotenv, this.host, this.port);
    }
  };

  /**
   * Runs WebpackDevServer default listener but in Promise way
   */
  listen = (configuration: DevServerConfig) => {
    const { port, host } = configuration;

    this.host = host;
    this.port = port;

    this.handleStatsInvalid();

    return new Promise((resolve, reject) => {
      this.webpackDevServer.listen(port, host, (error: any) => {
        if (error) {
          reject(error);
        }

        resolve();
      });
    });
  };
}

export default QubicDevServer;
