//Comment Model

let mongoose = require('mongoose')
let Schema = mongoose.Schema
let ObjectId = Schema.Types.ObjectId;
let schemaName = 'Comment'


let schema = new Schema({
  userId: {
    type: String
  },
  postId: {
    type: String
  },
  timestamp: {
    type: Date
  },
  content: {
    content: String,
    upvotes: Number,
    downvotes: Number,
    voteScore: Number
  }
})
module.exports = mongoose.model(schemaName, schema)

