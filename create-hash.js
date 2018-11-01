const fs = require('fs')
const path = require('path')
const crypto = require('crypto')
const chalk = require('chalk')

const validateInput = (filename, algorithm) => {
  if (!filename) {
    return console.log(chalk.bgRed('Empty Inputs!'))
  }
  file = path.join(process.cwd(), filename)
  if (!fs.statSync(file).isFile()) {
    return console.log(chalk.bgRed(`Cannot find file ${filename}`))
  }

  if (algorithm) algorithm = algorithm.toLowerCase()

  const algos = ['md5', 'sha1', 'sha256', 'sha512']
  if (algorithm && algos.indexOf(algorithm) == -1) {
    return console.log(chalk.bgRed(`Algorithm ${algorithm} is invalid`))
  }

  createChecksum(file, algorithm)
}

const createChecksum = (file, algorithm) => {
  const algos = algorithm ? [algorithm] : ['md5', 'sha1', 'sha256', 'sha512']
  algos.forEach(element => {
    const stream = fs.createReadStream(file)
    const hash = crypto.createHash(element)
    stream.on('data', (data) => {
      hash.update(data, 'utf8')
    })
    stream.on('end', () => {
      console.log(chalk.black.bgWhite(element))
      console.log(chalk.green(element,hash.digest('hex')))
    })
  })

}

module.exports = (filename, algorithm) => {
  validateInput(filename, algorithm)
}