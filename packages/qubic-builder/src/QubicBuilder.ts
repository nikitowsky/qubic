import { getDotenv, getTSConfigAliases, Environment } from '@qubic/dev-utils';
import * as webpack from 'webpack';
import * as merge from 'webpack-merge';

import prodConfig from './config/webpack.config.prod';
import devConfig from './config/webpack.config.dev';

type Options = {
  dotenv: string;
  env: Environment;
  webpackConfig: webpack.Configuration;
};

const defaultOptions = {
  env: 'production' as Environment,
};

class QubicBuilder {
  options: Partial<Options> = {};
  webpackCompiler: webpack.Compiler;

  constructor(options: Partial<Options> = defaultOptions) {
    this.options = {
      ...options,
      // We need to process Webpack configuration after spreading, becaue we gonna add additional information in this
      webpackConfig: this.prepareWebpackConfig(options),
    };

    this.webpackCompiler = this.initWebpackCompiler();
  }

  /**
   * Initialize Webpack compiler
   */
  private initWebpackCompiler = () => {
    return webpack(this.options.webpackConfig);
  };

  /**
   * Prepare Webpack configuration
   */
  private prepareWebpackConfig = (options: Partial<Options>) => {
    const { env, dotenv: incomingDotenv } = options;

    const config = env === 'production' ? prodConfig : devConfig;
    const dotenv = incomingDotenv ? incomingDotenv : env;

    return merge(config, {
      resolve: {
        alias: getTSConfigAliases(),
      },

      plugins: [new webpack.DefinePlugin(getDotenv(dotenv as string))],
    });
  };
}

export default QubicBuilder;
