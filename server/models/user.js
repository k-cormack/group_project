//USER MODEL

let mongoose = require('mongoose')
let Schema = mongoose.Schema
let ObjectId = Schema.Types.ObjectId
let schemaName = 'User'

let schema = new Schema({
    name: {
        type: String,
        required: true
    },
    userId: {
        type: ObjectId,
        ref: 'User',
        required: true
    },
    password: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model(schemaName, schema)