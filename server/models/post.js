//POST MODEL

let mongoose = require('mongoose')
let Schema = mongoose.Schema
let ObjectId = Schema.Types.ObjectId
let schemaName = 'Post'


let voteSchema = new Schema({
    userId: { type: ObjectId, ref: 'User', required: true },
    value: { type: Number, min: -1, max: 1, required: true }
})

let schema = new Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        imgUrl: { type: String, default: '' },
        textInput: { type: String, default: '' }
    },
    userId: {
        type: ObjectId,
        ref: 'User',
        required: true
    },
    timestamp: {
        type: Number,
        required: true
    },
    comments: {
        type: Array
    },
    userName: {
        type: String,
        required: true
    },

    votes: [voteSchema]
})


module.exports = mongoose.model(schemaName, schema)