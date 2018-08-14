#!/usr/bin/env node

const program = require('commander');

const dev = require('./commands/dev');
const build = require('./commands/build');
const clean = require('./commands/clean');

program
  .command('dev', 'Run development server')
  .command('build', 'Build application')
  .command('clean', 'Clean dist folder')
  .option('--env <value>', 'Environment variable (default: development (dev), production (build))')
  .option('-p, --port <value>', 'Development server port (default: 8000)');

program.on('command:dev', () => {
  const { env = 'development', port = 8000 } = program;

  dev.startServer({ env, port });
});

program.on('command:build', () => {
  const { env = 'production' } = program;

  build.startBuild({ env });
});

program.on('command:clean', () => {
  clean.startClean();
});

program.parse(process.argv);
