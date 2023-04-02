#!/usr/bin/env node
const logger = require('../src/logger')('bin')
const arg = require('arg')


const  getConfig = require('../src/config/config-mgr')
const  start = require('../src/command/start');
const  chalk  = require('chalk');


try{

const args = arg({
    '--start':Boolean,
    '--build':Boolean
});

if(args['--start']){
  
    const config = getConfig()
    start(config)
}
} catch(e){
    logger.warning(e.message)
    console.log()
    usage()
}

function usage(){
    console.log(`${chalk.whiteBright('tool [CMD]')}
    ${chalk.greenBright('--start')}\tStarts the app
    ${chalk.greenBright('--build')}\tBuilds the app`)

}