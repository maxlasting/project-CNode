const router = require('express').Router()
const axios = require('axios')
const SessionModel = require('../model')('session')

module.exports = (req, res) => {
  const sId = req.session.id

  SessionModel.findByIdAndRemove(sId, (err, doc) => {
    if (err) throw err
    res.json({
      success: true,
      msg: '退出登陆'
    })
  })
}

