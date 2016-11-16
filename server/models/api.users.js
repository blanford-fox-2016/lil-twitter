'use strict'

const mongoose = require('mongoose')
const passportLocalMonggose = require('passport-local-mongoose')
const Schema = mongoose.Schema

let UsersSchema = new Schema({
  username : {
    type      : String,
    required  : true
  },
  password : {
    type      : String,
    required  : true,
    lowercase : true,
    trim      : true
  },
  avatar_url: String
})

UsersSchema.plugin(passportLocalMonggose)

module.exports = mongoose.model('Users', UsersSchema)
