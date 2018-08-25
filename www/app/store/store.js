
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
  baseURL: "//localhost:3000/api/posts/",
  timeout: 3000
})

// @ts-ignore
let commentApi = axios.create({
  baseURL: "//localhost:3000/api/comments/",
  timeout: 3000
})

let state = {
  user: {},
  activePost: {},
  posts: [],
  comments: [],
  upvotes: [],
  downvotes: []
}

function setState(prop, data) {
  state[prop] = data
  console.log('state: ', state)
}

let post = new Post()

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
        setState('posts', data.map(post => new Post(post)))
        drawPosts()
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
    postApi.create()
    .then(data => {
      console.log(data)
      
    })     
  }

  get state() {
    return { ...state }
  }
}