const axios = require('axios')
const md5Pwd = require('../md5pwd')
const UserModel = require('../model/')('user')

module.exports = (req, res, next) => {
  const { name } = req.body
  UserModel.findOne({name},  (err, doc) => {
    if (err) return next(err)
    
    if (doc) {
      res.json({
        success: false,
        msg: '用户名已经存在'
      })
    } else {
      res.json({
        success: true,
        msg: ''
      })
    }
  })
}