#!/usr/bin/env node
const program = require('commander')
const matchHash = require('./match-hash')
const createHash = require('./create-hash')

program
  .version('0.2.0', '-v, --version')
  .description(`Compare checksum of a file \n Made by CharukaHS`);

program
  .command('match [filename] [checksum]')
  .alias('m')
  .description('Compare the checksum with given value')
  .action((filename, checksum) => {   
    matchHash(filename, checksum)    
  })

program
  .command('create [filename] [algorithm]')
  .alias('c')
  .description('Create a hash for mentioned file')
  .action((filename, algorithm) => {
    createHash(filename, algorithm)
  })
  
program.parse(process.argv)

/*
checksum c <filename> <checksum>
*/
