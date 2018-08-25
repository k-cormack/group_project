//POST MODEL

let mongoose = require('mongoose')
let Schema = mongoose.Schema
let ObjectId = Schema.Types.ObjectId
let schemaName = 'Post'


let voteSchema = new Schema({
    userId: { type: ObjectId, ref: 'User', required: true, unique: true },
    value: { type: Number, min: -1, max: 1, required: true }
})

let schema = new Schema({
    title: {
        type: String,
        required: true
    },
    // description: {
    //     type: String,
    //     default: 'No Description Available'
    // },
    content: {
        imgUrl: { type: String, default: '' },
        vidUrl: { type: String, default: '' },
        textInput: { type: String, default: '' }
    },
    userId: {
        type: ObjectId,
        ref: 'User',
        required: true
    },
    timeStamp: {
        type: String,
        required: true,
        default: Date.now()
    },
    comments: {
        type: Array
    },

    votes: [voteSchema]
})


module.exports = mongoose.model(schemaName, schema)