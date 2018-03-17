const { Pact } = require('@pact-foundation/pact');
const path = require('path');

global.port = 3001;
global.provider = new Pact({
  port: global.port,
  log: path.resolve(__dirname, '..', '..', 'logs', 'mockserver-integration.log'),
  dir: path.resolve(__dirname, '..', '..', 'pacts'),
  spec: 2,
  cors: true,
  pactfileWriteMode: 'update',
  consumer: 'backend-for-webui',
  provider: 'job-service',
  logLevel: 'warn'
});
