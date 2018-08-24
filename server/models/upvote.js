//UPVOTE MODEL

let mongoose = require('mongoose')
let Schema = mongoose.Schema
let ObjectId = Schema.Types.ObjectId
let schemaName = 'Upvote'

let schema = new Schema({
    userId: {
        type: String,
        required: true
    },
    postId: {
        type: String,
        required: true
    },
    commentId: {
        type: String
    }
})

module.exports = mongoose.model(schemaName, schema)
