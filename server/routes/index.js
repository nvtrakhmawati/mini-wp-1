const express = require('express')
const router = express.Router()
const users = require('./user')
const post = require('./post')

router.use('/users', users)
router.use('/posts', post)

module.exports = router