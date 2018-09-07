import * as webpack from 'webpack';
import * as Dotenv from 'dotenv-webpack';
import * as merge from 'webpack-merge';
import * as path from 'path';

enum Environments {
  PRODUCTION = 'production',
  DEVELOPMENT = 'development',
}

type Environment = Environments.PRODUCTION | Environments.DEVELOPMENT | string;

type WebpackAliases = {
  [key: string]: string;
};

interface BuilderConfig {
  env: Environment;
  webpackConfig: webpack.Configuration;
}

export default class QubicBuilder {
  dotenv: string;
  config: webpack.Configuration;
  compiler: webpack.Compiler;
  environment: Environment;

  constructor(options: BuilderConfig) {
    this.dotenv = this.getDotenvPath(options.env);
    this.config = this.prepareWebpackConfig(options.webpackConfig);
    this.compiler = webpack(this.config);
    this.environment = options.env;
  }

  /**
   * Prepare additional loaders, plugins, etc.
   */
  private prepareWebpackConfig = (config: webpack.Configuration): webpack.Configuration => {
    return merge(config, {
      resolve: {
        alias: this.getWebpackAliases(),
      },

      plugins: [
        new Dotenv({
          path: this.dotenv,
          silent: true,
          systemvars: true,
        }),
      ],
    });
  };

  /**
   * Get path to `.env` file relatively from project context
   */
  getDotenvPath = (environment: Environment): string => {
    const contextDirectory = process.cwd();
    const dotenvDirectory = path.join(contextDirectory, `.env.${environment}`);

    return dotenvDirectory;
  };

  /**
   * Generate Webpack aliases based on tsconfig.json
   */
  getWebpackAliases = (): WebpackAliases => {
    const contextDirectory = process.cwd();

    type CompilerOptions = {
      [key: string]: any;
      baseUrl: string;
      paths: {
        [key: string]: string[];
      };
    };

    const tsConfigPath = path.join(contextDirectory, 'tsconfig.json');
    const tsConfig = require(tsConfigPath);

    const { compilerOptions } = tsConfig;
    const { baseUrl, paths } = compilerOptions as CompilerOptions;

    const webpackAliases: WebpackAliases = {};

    if (baseUrl && paths) {
      // Resolve system-relative path for `baseUrl`
      const rootDirectory = path.join(contextDirectory, baseUrl);

      Object.entries(paths).forEach(([aliasKey, aliasTemplate]) => {
        const key = aliasKey.replace('/*', '');

        // As long Webpack dosen't support array as alias (like tsconfig.json does), we always use first alias path
        const pathToAlias = aliasTemplate[0].replace('/*', '');

        // Build Webpack-friendly alias config
        webpackAliases[key] = path.join(rootDirectory, pathToAlias);
      });
    }

    return webpackAliases;
  };
}
