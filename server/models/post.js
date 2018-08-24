//POST MODEL

let mongoose = require('mongoose')
let Schema = mongoose.Schema
let ObjectId = Schema.Types.ObjectId
let schemaName = 'Post'

let schema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        default: 'No Description Available'
    },
    content: {
        imgUrl: String,
        vidUrl: String,
        textInput: String
    },
    userId: {
        type: String,
        required: true
    },
    timeStamp: {
        type: Date,
        required: true
    },
    comments: {
        type: Array
    },

    voteScore: {
        type: Number
    }
})

module.exports = mongoose.model(schemaName, schema)