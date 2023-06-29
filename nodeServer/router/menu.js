const express = require('express')
const menuCtrl = require('@controller/menu')
const menu = express.Router()

menu.post('/add', menuCtrl.add)
menu.post('/query', menuCtrl.query)

module.exports = menu