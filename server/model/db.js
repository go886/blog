const level = require('level')

const db = level('./mydb')
module.exports = db