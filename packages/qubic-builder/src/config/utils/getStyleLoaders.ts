import * as webpack from 'webpack';
import * as autoprefixer from 'autoprefixer';
import * as MiniCssExtractPlugin from 'mini-css-extract-plugin';

type GetStyleLoadersConfig = {
  /** Should we execute sytles as CSS-Modules object (https://github.com/css-modules/css-modules) */
  useCSSModules?: boolean;
  /** Should we extract .css file or not */
  extractFile?: boolean;
};

/**
 * Get style loaders for Webpack config
 */
const getStyleLoaders = (options = {} as GetStyleLoadersConfig): webpack.Loader[] => {
  const useCSSModules = options.useCSSModules || false;
  const extractFile = options.extractFile || false;

  const localIdentName = '[local]___[hash:base64:5]';
  let StyleLoaderOrExtract: webpack.Loader = 'style-loader';

  type CSSLoaderSettings = {
    loader: string;
    options: {
      importLoaders?: number;
      localIdentName?: string;
      modules?: boolean;
    };
  };

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

  if (useCSSModules) {
    CSSLoader.options = {
      ...CSSLoader.options,
      localIdentName,
      modules: true,
    };
  }

  if (extractFile) {
    StyleLoaderOrExtract = MiniCssExtractPlugin.loader;
  }

  const loaders = [StyleLoaderOrExtract, CSSLoader, 'csso-loader', PostCSSLoader, 'sass-loader'];

  return loaders;
};

export default getStyleLoaders;
