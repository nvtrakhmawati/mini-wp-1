const route = require('express').Router()
const PostController = require('../controllers/postController')
const { authentication, authorization } = require('../middlewares/auth')


// AUTHENTICATION
route.use(authentication)

// CREATE
route.post('/', PostController.create)

// READ
route.get('/', PostController.findAll)
route.get('/findMine', PostController.findMine)
route.get('/:id', authorization, PostController.findOne)

// UPDATE
route.patch('/:id', PostController.update)

// DELETE
route.delete('/:id', authorization, PostController.delete)

module.exports = route