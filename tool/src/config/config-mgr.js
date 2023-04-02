const logger = require('../logger')('config:mgr')
const  chalk  = require('chalk');

const { cosmiconfigSync } = require('cosmiconfig')
const  betterAjvErrors = require('better-ajv-errors').default
const configLoader = cosmiconfigSync('tool')
const schema  = require('./schema.json')
const Ajv = require('ajv').default
const ajv = new Ajv()

module.exports = function getConfig(){
    const result = configLoader.search(process.cwd());

    if(!result){
        logger.warning('could not find configuration file, using default')
        return {port: 1234}
    }
    
    else{
        const isValid = ajv.validate(schema, result.config)
        if(!isValid){
            logger.warning('Invalid configuration was supplied')
            console.log( betterAjvErrors(schema, result.config, ajv.errors))
            process.exit(1)
        }
       logger.debug('Found configuration', result.config)
        return result.config
    }
}