const mongoose = require('mongoose')

mongoose.Promise = global.Promise

const DB_URL = 'mongodb://127.0.0.1:27017/cnode'

mongoose.connect(DB_URL, { useMongoClient: true })

mongoose.connection.once('connected', function () {    
    console.log('Mongoose connection open to ' + DB_URL)  
})    

mongoose.connection.on('error',function (err) {    
    console.error('Mongoose connection error: ' + err)  
})    
 
mongoose.connection.once('disconnected', function () {    
    console.log('Mongoose connection disconnected')  
})

// 定义模型组
const models = {
  user: {
    name: { type: String, require: true },
    password: { type: String, require: true },
    accesstoken: { type: String, require: true }
  },
  session: {
    _id: { type: String, require: true },
    session: { type: String, require: true },
    expires: { type: Number, require: true }
  }
}

for(let model in models) {
  mongoose.model(model, new mongoose.Schema(models[model]))
}

module.exports = (model) => (mongoose.model(model))




