'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema
const Increment = require('mongoose-sequence')

let spreaderSchema = new Schema ({
  username: String,
  avatar : String,
  content : String,
  createdAt: {type: Date, default: Date.now},
  hastags: [String]
})

spreaderSchema.plugin(Increment, { inc_field: 'spreader_id' });
module.exports = mongoose.model('Spreader', spreaderSchema)
