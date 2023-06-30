const express = require('express')
const menuCtrl = require('@controller/menu')
const menu = express.Router()

menu.post('/add', menuCtrl.add)
menu.post('/query', menuCtrl.query)
menu.post('/update', menuCtrl.update)
menu.post('/delete', menuCtrl.delete)

module.exports = menu