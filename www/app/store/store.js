
import User from "../models/User.js"
import Post from "../models/Post.js"
import Comment from "../models/Comment.js"
import Vote from "../models/Vote.js"


let appStore

//@ts-ignore
let userApi = axios.create({
  baseURL: "//localhost:3000/auth",
  timeout: 3000
})

// @ts-ignore
let postApi = axios.create({
  baseURL: "//localhost:3000/api/posts",
  timeout: 3000
})

// @ts-ignore
let commentApi = axios.create({
  baseURL: "//localhost:3000/api/comments",
  timeout: 3000
})

let state = {
  user: {},
  activePost: {},
  posts: [],
  votes: []
}

function setState(prop, data) {
  state[prop] = data
  console.log('state: ', state)
}

function getPostComments(drawPosts) {
  state.posts.forEach(post => {
    commentApi.get(`/by-post/${post._id}`)
      .then(data => {
        console.log(data)
        post.comments = data.data.map(comment => new Comment(comment))
        drawPosts()
      })
      .catch(err => {
        console.log(err.message)
      })
  })
}


export default class Store {

  register(creds, draw) {
    userApi.post('/register', creds)
      .then(data => {
        setState('user', new User(data.data))
        draw()
      })
      .catch(console.error)
  }

  login(creds, draw) {
    userApi.post('/login', creds)
      .then(data => {
        console.log('login: ', data)
        setState('user', new User(data.data))
        draw()
      })
      .catch(console.error)
  }

  getPosts(drawPosts) {
    postApi.get()
      .then(data => {
        console.log('get posts: ', data)
        setState('posts', data.data.map(post => new Post(post)))
        getPostComments(drawPosts)
        //drawPosts()
      })
  }

  getComments() {
    commentApi.get()
      .then(data => {
        console.log(data)
        setState('comments', data.map(comment => new Comment(comment)))
      })
  }

  createPost(newPost, draw) {
    postApi.post('', newPost)
      .then(data => {
        console.log(data)
        let post = new Post(data.data)
        state.posts.push(post)
        draw()
      })
  }

  createComment(newComment, draw) {
    commentApi.post('', newComment)
      .then(data => {
        console.log(data)
        let comment = new Comment(data.data)
        state.activePost.comments.push(comment)
        draw()
      })
      .catch(err => {
        console.log(err.message)
      })
  }

  get state() {
    return { ...state }
  }

  setActivePost(postID, draw) {
    let myPost = state.posts.find(post => {
      return post._id == postID
    })
    setState('activePost', myPost)
    console.log("active post: ", state.activePost)
    draw()
  }

  vote(newVote, draw) {
    let vote = new Vote(newVote)
    state.activePost.votes.push(vote)
    postApi.put(`/${state.activePost._id}/vote`, newVote)
      .then(data => {
        console.log(data.data.message)
      })
      .catch(err => {
        console.log(err.message)
      })
    draw()
  }
}