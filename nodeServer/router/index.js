const express = require('express')
const router = express.Router()

router.use('/user', require('./user'))
router.use('/menu', require('./menu'))

module.exports = router