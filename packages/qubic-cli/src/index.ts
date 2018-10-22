#!/usr/bin/env node

import QubicDevServer from '@qubic/dev-server';
import { openTab } from '@qubic/dev-utils';

const devServer = new QubicDevServer();

devServer.listen({ host: '0.0.0.0', port: 8000 }).then(() => {
  openTab('http://localhost:8000');
});
