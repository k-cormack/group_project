//Comment Model

let mongoose = require('mongoose')
let Schema = mongoose.Schema
let ObjectId = Schema.Types.ObjectId;
let schemaName = 'Comment'

let voteSchema = new Schema({
  userId: {
    type: ObjectId,
    ref: 'User',
    required: true,
    unique: true
  },
  value: {
    type: Number,
    min: -1,
    max: 1,
    required: true
  }
})


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
  },
    votes: [voteSchema]
})
module.exports = mongoose.model(schemaName, schema)

