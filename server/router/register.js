const axios = require('axios')
const md5pwd = require('../md5pwd')
const UserModel = require('../model')('user')

async function userRegister(req, res) {
  try {
    const { name, accesstoken } = req.body
    
    const query = {
      $or: [{ name }, { accesstoken }],
    }
    
    const findDoc = await findRegisterInfo(query)
    
    if (findDoc.length) {
      res.json({
        success: false,
        msg: '用户名或token已经存在'
      })
      return
    }

    const checkTokenResult = await checkToken(accesstoken)

    if (!checkTokenResult.success) {
      res.json({
        success: false,
        msg: '错误的token信息'
      })
      return
    }
    
    const createDoc = await createUserInfo(req.body)
    
    res.json({
      success: true,
      msg: '注册成功'
    })
  } catch (e) {
    res.json({
      success: false,
      msg: e
    })
  }
}

const findRegisterInfo = (query) => {
  return UserModel.find(query).exec()
}

const checkToken = (accesstoken) => {
  return new Promise((resolve, reject) => {
    axios.post('https://cnodejs.org/api/v1/accesstoken', {
      accesstoken
    }).then((res) => {
      if (res.status === 200 && res.data.success) {
        resolve(res.data)
      } else {
        resolve(res.data)
      }
    }).catch((err) => {
      if (err.response) {
        resolve(err.response.data)
      } else {
        reject(err.message)
      }
    })
  })
}

const createUserInfo = ({ name, password, accesstoken }) => {
  return UserModel.create({name, accesstoken, password: md5pwd(password)})
}

module.exports = userRegister

