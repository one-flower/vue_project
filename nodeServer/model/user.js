const mongoose = require('mongoose')
const baseModel = require('./base-model')
const md5 = require('@util/md5')
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true,
    set: value => md5(value),
    select: false,
  },
  sex: {
    type: String,
    default: null
  },
  email: {
    type: String,
    default: null
  },
  img: {
    type: String,
    default: null
  },
  ...baseModel,
})

module.exports = userSchema