const mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    passportLocalMonggose = require('passport-local-mongoose')

const User = new Schema({
    username: String,
    email: String,
    password: String
}, {
    timestamps: true
})

User.plugin(passportLocalMonggose)

module.exports = mongoose.model('User', User)