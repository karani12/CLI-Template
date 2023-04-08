#!/usr/bin/env node
'use strict';

const chalk = require('chalk');
const getConfig = require('../src/config/config-mgr');
const logger = require('../src/logger')('bin');
const start = require('../src/command/start');
const arg = require('arg');

function parseArgs(rawArgs) {
  const args = arg({
    '--start': Boolean,
    '--build': Boolean,
  }, {
    argv: rawArgs.slice(2),
  });
  return {
    start: args['--start'],
    build: args['--build'],
  };
}

function run(parsedArgs) {
  if (parsedArgs.start) {
    const config = getConfig();
    start(config);
  } else if (parsedArgs.build) {
    // TODO: Implement build command
  } else {
    usage();
  }
}

function usage() {
  console.log(`${chalk.whiteBright('tool [CMD]')}
  ${chalk.greenBright('--start')}\tStarts the app
  ${chalk.greenBright('--build')}\tBuilds the app`);
}

try {
  const parsedArgs = parseArgs(process.argv);
  run(parsedArgs);
} catch (err) {
  logger.warning(err.message);
  process.exit(1);
}
