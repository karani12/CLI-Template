'use strict';

const chalk = require('chalk');
const logger = require('../logger')('config:mgr');
const { cosmiconfig } = require('cosmiconfig');
const betterAjvErrors = require('better-ajv-errors').default;
const Ajv = require('ajv').default;
const schema = require('./schema.json');

const ajv = new Ajv();
const configLoader = cosmiconfig('tool');

async function loadConfig() {
  const result = await configLoader.search(process.cwd());

  if (!result || !result.config) {
    throw new Error('Could not find or load configuration file');
  }

  return result.config;
}

function validateConfig(config) {
  const isValid = ajv.validate(schema, config);

  if (!isValid) {
    logger.warning('Invalid configuration was supplied');
    console.error(betterAjvErrors(schema, config, ajv.errors));
    process.exit(1);
  }

  logger.debug('Found configuration', config);
}

module.exports = async function getConfig() {
  try {
    const config = await loadConfig();
    validateConfig(config);
    return config;
  } catch (err) {
    logger.error(err.message);
    process.exit(1);
  }
};
