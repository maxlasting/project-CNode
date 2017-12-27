const axios = require('axios')
const UserModel = require('../model')('user')
const md5Pwd = require('../md5pwd')

module.exports = (req, res, next) => {
  const { name, password } = req.body

  UserModel.findOne({name, password: md5Pwd(password)}, (err, doc) => {
    if (err) {
      res.json({
        success: false,
        msg: '用户名或密码错误',
      })
      return
    }

    const { accesstoken } = doc
    
    axios.post('https://cnodejs.org/api/v1/accesstoken', {
      accesstoken
    }).then((result) => {
      const { data, status } = result
      if (status === 200 && data.success === true) {
        req.session.user = {
          accesstoken
        }
        res.json({
          ...data,
          msg: ''
        })
      } else {
        res.status(status).json({
          success: false,
          msg: data.err_msg
        })
      }
    })
  })
}

