#!/usr/bin/env node

const fs = require('fs')
const path = require('path')
const crypto = require('crypto')
const program = require('commander')

const validateInput = (filename, checksum, algorithm) => {
  file = path.join(__dirname, filename)
  if (!filename || !checksum) { return console.error('Empty Inputs!') }
  if( !fs.statSync(file).isFile() ) { return console.log(`Cannot find file ${filename}`)}

  const validAlgos = ['md5', 'sha1', 'sha256', 'sha512']
  if (algorithm) {
    algorithm = algorithm.toLowerCase()
    if (validAlgos.indexOf(algorithm) == -1) {
      return console.log('invalid algorithm')      
    }
  }

  createChecksum(file, checksum, algorithm)
}

const createChecksum = (filename, checksum, algorithm = 'sha256') => {
  console.log(filename, checksum, algorithm)

  const stream = fs.createReadStream(filename)
  const hash = crypto.createHash(algorithm)
  stream.on('data', (data) => {
    hash.update(data, 'utf8')
  })
  stream.on('end', () => {
    compareChecksums(checksum, hash.digest('hex'), algorithm)
  })
}

const compareChecksums = (given, created, algo) => {
  console.log(created)
  if (given === created) {
    console.log('Matching Checksums')
  } else {
    console.log(`Checksums doesn't match!`)
    console.log(`Algorithm = ${algo}`)
  }
}

program
  .version('0.1.0', '-v, --version')
  .description('Compare checksum of a file');

program
  .command('match [filename] [checksum] [algorithm]')
  .alias('m')
  .description('Compare the checksum with given value')
  .action((filename, checksum, algorithm) => {   
    validateInput(filename, checksum, algorithm)    
  })
  
program.parse(process.argv)

/*
checksum c <filename> <checksum> <algorithm -optional -default sha256>
*/