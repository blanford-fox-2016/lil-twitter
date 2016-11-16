'use strict'

const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence');
let connection = mongoose.createConnection(process.env.DATABASE);
let twitSchema = new mongoose.Schema({
    twitId: {
        type: Number
    },
    avatar_url: {
        type: String
    },
    content: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    hashtag: [{ type: String }]
}, {
    timestamps: true
});


twitSchema.plugin(AutoIncrement, { inc_field: 'twitId' });
let Twit = connection.model('Twit', twitSchema);
module.exports = Twit
