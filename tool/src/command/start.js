const logger = require('../logger')('command:start');
const chalk = require('chalk');

module.exports = function start(config) {
  console.time('Startup time');
  logger.highlight(`Starting app on port ${config.port}...`);
  logger.debug('Received configuration:', config);

  // Start the app here...

  console.timeEnd('Startup time');
  
  // Handle startup errors
  process.on('uncaughtException', (err) => {
    logger.error('App startup failed:', err);
    process.exit(1);
  });
};
