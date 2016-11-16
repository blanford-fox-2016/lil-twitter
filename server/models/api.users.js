'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema

let UsersSchema = new Schema({
  username : {
    type      : String,
    required  : true
  },
  password : {
    type      : String,
    requires  : true,
    lowercase : true,
    trim      : true
  }
})

module.exports = mongoose.model('Users', UsersSchema)
