#!/usr/bin/env node

import * as program from 'commander';

import * as dev from './commands/dev';
import * as build from './commands/build';
import * as clean from './commands/clean';

program
  .command('dev', 'Run development server')
  .command('build', 'Build application')
  .command('clean', 'Clean dist folder')
  .option('--env <value>', 'Environment variable')
  .option('-p, --port <value>', 'Development server port (default: 8000)');

program.on('command:dev', () => {
  const { env = 'development', port = 8000 } = program;

  dev.startServer({ env, port });
});

program.on('command:build', () => {
  const { env = 'production' } = program;

  // Should be set to 'production' for Webpack
  process.env.BABEL_ENV = 'production';
  process.env.NODE_ENV = 'production';

  build.startBuild({ env });
});

program.on('command:clean', () => {
  clean.startClean();
});

program.parse(process.argv);
