let router = require('express').Router()
let Upvotes = require('../models/upvote')

router.get('/by-comment/:commentId', (req, res, next) => {
    Upvotes.findById({
        commentId: req.params.commentId
    })
    .then(upvoteList => {
        res.send(upvoteList)
    })
    .catch(next)
})

router.post('/', (req, res, next) => {
    Upvotes.create(req.body)
    .then(upVotes => {
        res.send(upVotes)
    })
    .catch(next)
})

router.put('/by-comment/:commentId', (req, res, next) => {
    Upvotes.findByIdAndUpdate(req.params.commentId, req.body)
    .then((upVotes) => res.send(upVotes))
    .catch(next)
})

router.delete('/:commentId', (req, res, next) => {
    Upvotes.findByIdAndRemove(req.params.commentId)
    .then((upVotes) => res.send(upVotes))
    .catch(next)
})

module.exports = router