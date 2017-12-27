const utility = require('utility')
const key = require('./key')

module.exports = (pwd) => utility.md5(utility.md5(pwd + key))