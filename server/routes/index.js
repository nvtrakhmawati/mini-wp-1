const express = require('express')
const router = express.Router()
const users = require('./user')
const article = require('./article')

router.use('/users', users)
router.use('/articles', article)

module.exports = router