//comments route
let router = require('express').Router()
let Comments = require('../models/comment')

router.get('/by-user/:userId', (req, res, next) => {
  Comments.find({
    userId: req.params.userId
  }).then(alist => {
    res.send(alist)
  }).catch(next)
})

router.post('/', (req, res, next) => {

})