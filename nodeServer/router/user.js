const express = require('express')
const userCtrl = require('@controller/user')
const userVildator = require('@validator/user')
// 创建可挂载的路由处理器模块
const user = express.Router()

// 
// user.post('/register', userVildator.register, userCtrl.register)
user.post('/register', userCtrl.register)
user.get('/login', userCtrl.login)

module.exports = user