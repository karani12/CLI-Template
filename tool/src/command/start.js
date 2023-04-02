const logger = require('../logger')('command:start')
const  chalk  = require('chalk');


module.exports = function start(config){
   logger.highlight('Starting App.....')
   logger.debug('Received configuration-', config)
}