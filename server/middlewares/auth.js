const User = require('../models/user');
const Post = require('../models/post');
const Helper = require('../helpers/helper')


module.exports = {
    authentication: function (req, res, next) {
        try {
            const token = req.headers.accesstoken
            if (token) {
                const decoded = Helper.verifyJWT(req.headers.accesstoken)
                req.authenticatedUser = decoded

                if (process.env.NODE_ENV === 'test') {
                    next();
                } else {
                    User.findById(req.authenticatedUser._id)
                        .then(user => {
                            if (user) {
                                next();
                            } else {
                                res.status(401).json({message: 'Token is not valid'})
                            }
                        })
                        .catch(err => {
                            res.status(500).json({message: err.message})
                        })
                }
            } else {
                res.status(401).json({message: 'Please login to continue'})
            }
        } catch (err) {
            res.status(401).json({message: 'Please login to continue'})
        }
    },

    authorization: function (req, res, next) {
        Post.findById(req.params.id)
            .then(todo => {
                if (todo) {
                    if (String(post.user) !== req.authenticatedUser._id) {
                        res.status(403).json({message: 'Forbidden'})
                    } else {
                        next()
                    }
                } else {
                    res.status(404).json({message: 'Post not found'})
                }
            })
            .catch(err => {
                res.status(500).json({message: 'Internal Server Error'})
            })
    },
}