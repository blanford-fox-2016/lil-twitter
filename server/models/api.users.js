'use strict'

const mongoose = require('mongoose')
const passportLocalMongoose = require('passport-local-mongoose')
const Schema = mongoose.Schema

let UsersSchema = new Schema({
  username : {
    type      : String,
    required  : true
  },
  password : {
    type: String,
    lowercase : true,
    trim      : true,
    // required : true
  },
  avatar_url: String
})

UsersSchema.plugin(passportLocalMongoose)

module.exports = mongoose.model('Users', UsersSchema)
