//comments route
let router = require('express').Router()
let Comments = require('../models/comment')

router.get('/by-post/:postId', (req, res, next) => {
  Comments.find({
    postId: req.params.postId
  }).then(commentList => {
    res.send(commentList)
  }).catch(next)
})

router.post('/', (req, res, next) => {
  Comments.create(req.body)
    .then(newComment => {
      res.send(newComment)
    })
    .catch(err => {
      console.log(err)
      next()
    })
})

router.put('/:id', (req, res, next) => {
  Comments.findByIdAndUpdate(req.params.id, req.body)
    .then(() => res.send({
      message: 'Successfully Commented!'
    }))
    .catch(next)
})


//VOTE FOR A POST UP OR DOWN OR 0 (for Comments)
router.put('/:id/vote', (req, res, next) => {
  Comments.findById(req.params.id)
    .then((comment) => {
      let alreadyVoted = comment.votes.find(v => v.userId == req.body.userId)
      if (alreadyVoted) {
        alreadyVoted.value = req.body.value
      } else {
        comment.votes.push(req.body)
      }
      return comment.save()
    })
    .then(() => res.send({ message: "Thanks for the vote on this comment" }))
    .catch(next)
})


router.delete('/:id', (req, res, next) => {
  Comments.findByIdAndRemove(req.params.id)
    .then(() => res.send({
      message: 'Comment Deleted'
    })).catch(next)
})


module.exports = router