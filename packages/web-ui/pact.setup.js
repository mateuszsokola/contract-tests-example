const { Pact } = require('@pact-foundation/pact');
const path = require('path');

global.port = 8080;
global.provider = new Pact({
  port: global.port,
  log: path.resolve(__dirname, '..', '..', 'logs', 'mockserver-integration.log'),
  dir: path.resolve(__dirname, '..', '..', 'pacts'),
  spec: 2,
  cors: true,
  pactfileWriteMode: 'update',
  consumer: 'web-ui',
  provider: 'backend-for-webui',
  logLevel: 'warn'
});
