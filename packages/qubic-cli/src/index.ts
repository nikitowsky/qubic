#!/usr/bin/env node

import QubicBuilder from '@qubic/builder';

const builder = new QubicBuilder();

builder.webpackCompiler.run((error, stats) => {
  if (error) {
    console.log(error);
  }

  if (stats.compilation.errors.length > 0) {
    console.log(stats.compilation.errors);
  }
});
