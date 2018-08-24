//Model for downvote
let mongoose = require('mongoose')
let Schema = mongoose.Schema
let ObjectId = Schema.Types.ObjectId;
let schemaName = 'Downvote'

let schema = new Schema({
  userId: {
    type: String
  },
  postId: {
    type: String
  },
  commentId: {
    type: String
  }
})