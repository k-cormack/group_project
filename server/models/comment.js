//Comment Model

let mongoose = require('mongoose')
let Schema = mongoose.Schema
let ObjectId = Schema.Types.ObjectId;
let schemaName = 'PostComment'

let voteSchema = new Schema({
  userId: {
    type: ObjectId,
    ref: 'User',
    required: true
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
    type: ObjectId,
    ref: 'User',
    required: true
  },
  postId: {
    type: ObjectId,
    ref: 'Post',
    required: true
  },
  timestamp: {
    type: Number,
    required: true

  },
  content: {
    type: String,
    default: ''
  },
  votes: [voteSchema]
})
module.exports = mongoose.model(schemaName, schema)

