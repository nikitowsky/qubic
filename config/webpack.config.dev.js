const merge = require('webpack-merge');
const baseConfig = require('./webpack.config.base');

const devConfig = {
  devtool: 'cheap-module-eval-source-map',

  entry: {
    bundle: [
      'react-hot-loader/patch',
    ],
  },

  devServer: {
    historyApiFallback: true,
    noInfo: true,
    open: true,
    overlay: true,
    port: 8000,
  },
};

module.exports = merge.strategy({ entry: 'prepend' })(baseConfig, devConfig);
