import QubicBuilder from '@qubic/builder';
import * as WebpackDevServer from 'webpack-dev-server';

const defaultDevServerOptions = {
  host: '0.0.0.0',
  port: 8000,
};

class QubicDevServer {
  builder: QubicBuilder;
  private webpackDevServer: WebpackDevServer;

  constructor() {
    this.builder = new QubicBuilder({ env: 'development' });

    this.webpackDevServer = new WebpackDevServer(this.builder.webpackCompiler, {
      clientLogLevel: 'none',
      compress: true,
      historyApiFallback: true,
      hot: true,
      inline: true,
      noInfo: true,
      overlay: true,
      quiet: true,
      stats: false,
    });
  }

  /**
   * Runs WebpackDevServer default listener but in Promise way
   */
  listen = (devServerOptions = defaultDevServerOptions) => {
    const { port, host } = devServerOptions;

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
