let router = require('express').Router()
let Users = require('../models/user')

//User LOGIN

router.post('/login', (req, res, next) => {
    Users.findOne({
        username: req.body.username,
        password: req.body.password
    })
    .then(user => {
        if (user) {
            return res.send(user)
        }
        return res.status(401).send({
            error: 'Invalid Login'
        })
    })
})

router.post('/register', (req, res, next) => {
    Users.create(req.body).then(user => {
        res.send(user)
    })
    .catch(next)
})

module.exports = router

