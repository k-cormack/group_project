//comments route
let router = require('express').Router()
let Comments = require('../models/comment')

router.get('/by-post/:postId', (req, res, next) => {
  Comments.find({
    userId: req.params.postId
  }).then(commentList => {
    res.send(commentList)
  }).catch(next)
})

router.post('/', (req, res, next) => {
  Comments.create(req.body)
    .then((newComment) => res.send(newComment))
    .catch(next)
})

router.delete('/:id', (req, res, next) => {
  Comments.findByIdAndRemove(req.params.id)
    .then(() => res.send({
      message: 'Comment Deleted'
    })).catch(next)
})
module.exports = router