const express = require('express')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const session = require('express-session')
const MongoStore = require('connect-mongo')(session)
// const favicon = require('serve-favicon')
// const path = require('path')

const app = express()

// app.use(favicon(path.resolve(__dirname, '../public/favicon.ico'))

app.use(cookieParser())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.use(session({
  maxAge: 10 * 1000 * 60,
  resave: false,
  secret: 'iqjmvh-178fd-fwh8f-cfenp',
  saveUninitialized: false,
  store: new MongoStore({
    url: 'mongodb://127.0.0.1:27017/cnode'
  })
}))

app.use('/api/user/login', require('./router/login'))
app.use('/api/user/logout', require('./router/logout'))
app.use('/api/user/register', require('./router/register'))
app.use('/api', require('./router/cnode'))

app.use((err, req, res, next) => {
  console.log(err)
  res.status(500).send('500 Server Error.')
})

const port = process.env.PORT || 8080

app.listen(port, () => {
  console.log(`Server is running at port %d`, port)
})
