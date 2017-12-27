const axios = require('axios')
const queryString = require('query-string')
const SessionModel = require('../model')('session')

module.exports = (req, res) => {
  const { path, method, query, session } = req
  const { needtoken } = query
  const sId = session.id || null
  const user = session.user || {}
  const ret = (method) => needtoken && (req.method === method)

  SessionModel.findById(sId, (err, doc) => {
    if (err) return res.json({success: false, err_msg: err.message})
    
    if (needtoken && !doc) {
      res.status(401).send({
        success: false,
        msg: '未登录'
      })
    } else {
      const query = Object.assign({}, req.query, {
        accesstoken: ret('GET') ? user.accesstoken : ''
      })
      
      if (query.needtoken) delete query.needtoken
      
      axios({
        method,
        baseURL: 'https://cnodejs.org/api/v1',
        url: path,
        params: query,
        data: queryString.stringify({...req.body, accesstoken: ret('POST') ? user.accesstoken : ''}),
        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
      }).then((result) => {
        if (result.status === 200) {
          res.send(result.data)
        } else {
          res.status(result.status).send(result.data)
        }
      }).catch((err) => {
        if (err.result) {
          res.status(500).send(err.result.data)
        } else {
          res.status(500).send('错误跑偏啦O(∩_∩)O')
        }
      })
    }
  })
}
