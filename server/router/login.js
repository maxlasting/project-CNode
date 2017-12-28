const axios = require('axios')
const UserModel = require('../model')('user')
const md5Pwd = require('../md5pwd')

module.exports = async (req, res, next) => {
  const { name, password, check } = req.body
  
  if (check) {
    const user = req.session.user || {}
    if (!user.accesstoken) return res.json({ success: false, isLogin: false})
    return userLogin(user.accesstoken, req, res)
  }

  UserModel.findOne({name, password: md5Pwd(password)}, (err, doc) => {
    if (err) {
      res.json({
        success: false,
        msg: '用户名或密码错误',
      })
      return
    }
    userLogin(doc.accesstoken, req, res)
  })
}

const userLogin = (accesstoken, req, res) => {
  axios.post('https://cnodejs.org/api/v1/accesstoken', {
    accesstoken
  }).then((result) => {
    const { data, status } = result
    if (status === 200 && data.success === true) {
      req.session.user = {
        accesstoken
      }
      res.json(data)
    } else {
      res.status(status).json({
        success: false,
        msg: data.err_msg
      })
    }
  }).catch((err) => {
    if (err.response) {
      res.json(err.response.data)
    } else {
      res.json({
        success: false,
        msg: err.message
      })
    }
  })
}





























