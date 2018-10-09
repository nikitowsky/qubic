import { Environment } from '@qubic/dev-utils';
import * as webpack from 'webpack';
import * as merge from 'webpack-merge';

import baseConfig from './config/webpack.config.prod';

type Options = {
  dotenv: Environment;
  env: Environment;
  webpackConfig: webpack.Configuration;
};

const defaultOptions = {
  env: 'production' as Environment,
};

class QubicBuilder {
  options: Partial<Options> = defaultOptions;
  webpackCompiler: webpack.Compiler;

  constructor(options: Partial<Options> = defaultOptions) {
    this.options = {
      ...options,
      // We need to process Webpack configuration after spreading, becaue we gonna add additional information in this
      webpackConfig: this.prepareWebpackConfig(options.webpackConfig),
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
  private prepareWebpackConfig = (config: webpack.Configuration = baseConfig) => {
    return merge(config);
  };
}

export default QubicBuilder;
