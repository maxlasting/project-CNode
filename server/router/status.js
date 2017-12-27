const axios = require('axios')
const SessionModel = require('../model')('session')

module.exports = (req, res) => {
  const user = req.session.user || {}
  
  if (!user.accesstoken) return res.json({ success: false, isLogin: false})
  
  axios.post('https://cnodejs.org/api/v1/accesstoken', {
    accesstoken: user.accesstoken
  }).then((result) => {
    const { data, status } = result
    if (status === 200 && data.success === true) {
      res.json(data)
    } else {
      res.status(status).json({
        success: false,
        msg: data.err_msg
      })
    }
  })
}