let router = require('express').Router()
let Posts = require('../models/post')

router.get('/by-user/:userId', (req, res, next) => {
    Posts.find()
        .then(postList => {
            res.send(postList)
        })
        .catch(next)
})

router.get('/', (req, res, next) => {
    Posts.find()
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
            message: 'Successfully Posted!'
        }))
        .catch(next)
})
//VOTE FOR A POST UP OR DOWN OR 0
router.put('/:id/vote', (req, res, next) => {
    Posts.findById(req.params.id)
        .then((post) => {
            let alreadyVoted = post.votes.find(v => v.userId == req.body.userId)
            if (alreadyVoted) {
                alreadyVoted.value = req.body.value
            } else {
                post.votes.push(req.body)
            }
            return post.save()
        })
        .then(() => res.send({ message: "Thanks for the vote" }))
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