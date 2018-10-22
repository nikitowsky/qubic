import * as webpack from 'webpack';

/**
 * Returns Webpack compiler with additional hooks
 */
const withHooks = (hooks: Record<string, (...params: any) => any>) => (compiler: webpack.Compiler) => {
  Object.keys(hooks).forEach((hook) => {
    const handler = hooks[hook];

    (compiler.hooks as any)[hook].tap(hook, handler);
  });

  return compiler;
};

export default withHooks;
