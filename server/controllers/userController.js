const User = require('../models/user')
const Helper = require('../helpers/helper')
const generatePassword = require('../helpers/password-generator')
const { OAuth2Client } = require('google-auth-library')
const CLIENT_ID = process.env.CLIENT_ID
const client = new OAuth2Client(CLIENT_ID)

class UserController {
    static register(req, res) {
      console.log(req.body)
        User.create(req.body)
            .then(newUser => {
                const token = Helper.generateJWT({
                    _id: newUser._id,
                    name: newUser.name,
                    email: newUser.email
                })

                res.status(200).json({accesstoken: token})
            })
            .catch(err => {
                console.log(err)
                res.status(500).json({ message: err.message })
            })
    }

    static login(req, res) {
        User.findOne({
                email: req.body.email
            })
            .then(foundUser => {
                if (!foundUser) {
                    res.status(404).json({ message: 'User not found'})
                } else {
                    if (Helper.comparePassword(req.body.password, foundUser.password)) {
                        const token = Helper.generateJWT({
                            _id: foundUser._id,
                            email: foundUser.email,
                            name: foundUser.name
                        })

                        res.status(200).json({accesstoken: token})
                    } else {
                        res.status(401).json({ message: 'Wrong password'})
                    }
                }
            })
            .catch(err => {
                res.status(500).json({ message: err.message })
            })
    }

    static googleLogin(req, res) {
        let payload
        let token
        
        client
            .verifyIdToken({
                idToken: req.body.token,
                audience: CLIENT_ID,
            })
            .then(ticket => {
                payload = ticket.getPayload()
                const userid = payload['sub']
                
                return User.findOne({ 
                    email: payload.email
                })
            })
            .then(user => {
                if (!user) {
                    return User.create(
                        { 
                            name: payload.name,
                            email: payload.email,
                            password: generatePassword()
                        }
                    )
                } else {
                    return user
                }
            })
            .then(newUser => {
                token = Helper.generateJWT(newUser._id, newUser.name)

                res.status(200).json({ accesstoken: token })
            })
            .catch(err => {
                res.status(500).json({ message: err.message })
            })
    }
}

module.exports = UserController
