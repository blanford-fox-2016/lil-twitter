const mongoose = require('mongoose'),
    Schema = mongoose.Schema

const House = new Schema({
    name: String,
    price: Number,
    rooms: Number,
    address: String,
    image: String
}, {
    timestamps: true
})

module.exports = mongoose.model('House', House)
