let mongoose = require('mongoose')


const connectionString = 'mongodb://kcormack:<Abcd6789>@ds020208.mlab.com:20208/hackathon_project'
let connection = mongoose.connection

mongoose.connect(connectionString, {
  useNewUrlParser: true
})

connection.on('error', err => {
  console.log("DATABASE ERROR: ", err)
})

connection.once('open', () => {
  console.log("Connected to Database")
})