let router = require('express').Router()
let DownVotes = require('../models/downvote')

router.get('/by-comment/:commentId', (req, res, next) => {
    DownVotes.findById({
        commentId: req.params.commentId
    })
    .then(downvoteList => {
        res.send(downvoteList)
    })
    .catch(next)
})

router.post('/', (req, res, next) => {
    DownVotes.create(req.body)
    .then(downVotes => {
        res.send(downVotes)
    })
    .catch(next)
})

router.put('/by-comment/:commentId', (req, res, next) => {
    DownVotes.findByIdAndUpdate(req.params.commentId, req.body)
    .then((downvote) => res.send(downvote))
    .catch(next)
})

router.delete('/:commentId', (req, res, next) => {
    DownVotes.findByIdAndRemove(req.params.commentId)
    .then((downvote) => res.send(downvote))
    .catch(next)
})

module.exports = router