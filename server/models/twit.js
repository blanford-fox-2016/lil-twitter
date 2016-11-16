const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Twit = new Schema({
    avatar_url: {
        type: String
    },
    content: {
        type: String
    },
    createdAt: {
        type: String
    },
    updatedAt: {
        type: String
    },
    username: {
        type: String
    },
    hashtag_names: []
}, {
    timestamps: true
})

module.exports = mongoose.model('Twit', Twit)