#!/usr/bin/env node

import QubicDevServer from '@qubic/dev-server';

const devServer = new QubicDevServer();

devServer
  .listen({ host: '0.0.0.0', port: 8000 })
  .then(() => {
    console.log('Running at http://localhost:8000');
  })
  .catch((e) => console.log(e));
