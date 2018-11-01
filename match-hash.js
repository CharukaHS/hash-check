const fs = require('fs')
const path = require('path')
const crypto = require('crypto')
const chalk = require('chalk')

let startTime, endTime, file

const validateInput = (filename, checksum) => {
  if (!filename || !checksum) { return console.log(chalk.bgRed('Empty Inputs!')) }
  file = path.join(process.cwd(), filename)
  if( !fs.statSync(file).isFile() ) { return console.log(chalk.bgRed(`Cannot find file ${filename}`))}

  console.log(chalk.green(`File found ${filename}`))

  createChecksum(file, checksum.toLowerCase())
}

const createChecksum = (filename, checksum) => {
  let algorithm
  switch (checksum.length) {
    case 32:
      algorithm = 'md5'
      break;

    case 40:
      algorithm = 'sha1'
      break;

    case 64:
      algorithm = 'sha256'
      break;

    case 128:
      algorithm = 'sha512'
      break
  
    default:
      return console.log(chalk.bgRed('Checksum error'))
  }

  console.log(`Algorithm = ${algorithm}`)
  console.log(`Checksum = ${checksum}`)
  console.log(`Solving ...`)

  startTime = new Date()

  const stream = fs.createReadStream(filename)
  const hash = crypto.createHash(algorithm)
  stream.on('data', (data) => {
    hash.update(data, 'utf8')
  })
  stream.on('end', () => {
    compareChecksums(checksum, hash.digest('hex'), algorithm)
  })
}

const compareChecksums = (given, created) => {
  if (given === created) {
    console.log(chalk.bgGreen.bold('Matching Checksums'))
  } else {
    console.log(chalk.bgRed.bold(`Checksums doesn't match!`))
    console.log(chalk.bgWhite.black(created))
  }
  endTime = new Date()
  console.log(`Solved in ${endTime - startTime}ms`)
}

module.exports = (filename, checksum) => {
  validateInput(filename, checksum)
}