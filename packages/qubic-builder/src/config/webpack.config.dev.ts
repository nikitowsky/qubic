import * as merge from 'webpack-merge';
import { Configuration } from 'webpack';
import { CheckerPlugin } from 'awesome-typescript-loader';

import baseConfig from './webpack.config.base';

const devConfig: Configuration = {
  mode: 'development',

  devtool: 'cheap-module-eval-source-map',

  plugins: [new CheckerPlugin()],
};

export default merge(baseConfig, devConfig);
