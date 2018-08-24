let router = require('express').Router()
let Posts = require('../models/post')

router.get('./by-user/:userId', (req, res, next) => {
    Posts.find({
        userId: req.params.id
    })
    .then(postList => {
        res.send(postList)
    })
    .catch(next)
})

router.post('/', (req, res, next) => {
    Posts.create(req.body)
    .then(post => {
        res.send(post)
    })
    .catch(next)
})

router.put('/:id', (req, res, next) => {
    Posts.findByIdAndUpdate(req.params.id, req.body)
    .then(() => res.send({
        message: 'Successfully Poated!'
    }))
    .catch(next)
})

router.delete('/:id', (req, res, next) => {
    Posts.findByIdAndRemove(req.params.id)
    .then(() => res.send({
        message: 'Post has been Deleted'
    }))
    .catch(next)
})

module.exports = router