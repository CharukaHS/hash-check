#!/usr/bin/env node
const program = require('commander')
const hash = require('./hash')

program
  .version('0.2.0', '-v, --version')
  .description(`Compare checksum of a file \n Made by CharukaHS`);

program
  .command('match [filename] [checksum]')
  .alias('m')
  .description('Compare the checksum with given value')
  .action((filename, checksum) => {   
    hash(filename, checksum)    
  })
  
program.parse(process.argv)

/*
checksum c <filename> <checksum>
*/
