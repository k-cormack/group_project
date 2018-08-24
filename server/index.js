let express = require('express')
let bp = require('body-parser')
require('./db/db-config')
let server = express()
let port = 3000

server.use(bp.json())
server.use(bp.urlencoded(({
    extended: true
})))
server.use(express.static(__dirname + '/../www/'))

//ROUTES

let userRoutes = require('./routes/users')
let postRoutes = require('./routes/posts')
let commentRoutes = require('./routes/comments')
let upvoteRoutes = require('./routes/upvotes')
let downvoteRoutes = require('./routes/downvotes')

server.use('/auth', userRoutes)
server.use('/api/posts', postRoutes)
server.use('/api/comments', commentRoutes)
server.use('/api/upvotes', upvoteRoutes)
server.use('/api/downvotes', downvoteRoutes)

//ERROR HANDLERS

server.use('api/*', (err, req, res, next) => {
    res.status(400).send(err)
})
server.use('*', (req, res, next) => {
    res.status(404).send('404 Error Message!')
})

server.listen(port, () => {
    console.log('Server up and running', port)
})