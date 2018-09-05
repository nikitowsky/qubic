import { Loader } from 'webpack';
import * as autoprefixer from 'autoprefixer';
import * as MiniCssExtractPlugin from 'mini-css-extract-plugin';

type BSLOptions = {
  /** Should we execute sytles as CSS-Modules object (https://github.com/css-modules/css-modules) */
  cssModules?: boolean;
  /** Should we extract .css file */
  extractFile?: boolean;
};

type CSSLoaderSettings = {
  loader: string;
  options: {
    importLoaders?: number;
    localIdentName?: string;
    modules?: boolean;
  };
};

/**
 * Returns list of loaders for specific situation
 */
const buildStyleLoader = (options: BSLOptions = {}): Loader[] => {
  const { cssModules = false, extractFile = false } = options;

  const CSSLoader: CSSLoaderSettings = {
    loader: 'css-loader',
    options: {
      importLoaders: 1,
    },
  };

  const PostCSSLoader = {
    loader: 'postcss-loader',
    options: {
      plugins: () => [autoprefixer()],
    },
  };

  if (cssModules) {
    CSSLoader.options = {
      ...CSSLoader.options,
      localIdentName: '[local]___[hash:base64:5]',
      modules: true,
    };
  }

  // Use inline styles in development, extract files in production
  const endpointLoader = extractFile ? MiniCssExtractPlugin.loader : 'style-loader';
  const loaders = [endpointLoader, CSSLoader, 'csso-loader', PostCSSLoader, 'sass-loader'];

  return loaders;
};

export default buildStyleLoader;
