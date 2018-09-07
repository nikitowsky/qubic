import * as merge from 'webpack-merge';
import * as webpack from 'webpack';
import * as WebpackDevServer from 'webpack-dev-server';
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
    this.compiler = webpack(this.config);
  }

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
    const webpackDevServerOptions = {
      historyApiFallback: true,
      host: this.host,
      hot: true,
      inline: true,
      noInfo: true,
      overlay: true,
      port: this.port,
    };

    const server = new WebpackDevServer(this.compiler, webpackDevServerOptions);

    return new Promise((resolve, reject) => {
      server.listen(this.port, this.host, (error) => {
        if (error) {
          reject(error);
        }

        resolve(server);
      });
    });
  };
}
