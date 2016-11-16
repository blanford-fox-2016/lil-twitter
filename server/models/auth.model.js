var mongoose = require('mongoose');
var passportLocalMongoose = require('passport-local-mongoose');
const AutoIncrement = require('mongoose-sequence');

var userSchema = mongoose.Schema({
    UserId: Number,
    name: String,
    email: String,
    username: String,
    password: String
});

userSchema.plugin(AutoIncrement, { inc_field: 'UserId' });
userSchema.plugin(passportLocalMongoose)

module.exports = mongoose.model('User', userSchema);
