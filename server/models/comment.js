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
    type: Date,
    default: Date.now()

  },
  content: {
    imgUrl: { type: String, default: '' },
    vidUrl: { type: String, default: '' },
    textInput: { type: String, default: '' }
  },
  votes: [voteSchema]
})
module.exports = mongoose.model(schemaName, schema)

