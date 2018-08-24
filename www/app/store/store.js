
import User from "../models/User.js"
import Post from "../models/Post.js"
import Comment from "../models/Comment.js"
import Downvote from "../models/Downvote.js"
import Upvote from "../models/Upvote.js"

let appStore

//@ts-ignore
let userApi = axios.create({
  baseURL: "localhost:3000/auth",
  timeout: 3000
})

// @ts-ignore
let postApi = axios.create({
  baseURL: "localhost:3000/api/posts/",
  timeout: 3000
})

// @ts-ignore
let commentApi = axios.create({
  baseURL: "localhost:3000/api/comments/",
  timeout: 3000
})

// @ts-ignore
let upvoteApi = axios.create({
  baseURL: "localhost:3000/api/upvotes/",
  timeout: 3000
})

// @ts-ignore
let downvoteApi = axios.create({
  baseURL: "localhost:3000/api/downvotes/",
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
  console.log(state)
}

export default class Store {
  constructor() {
    if (appStore) {
      return appStore
    }
    appStore = this
  }

  login(creds, draw) {
    userApi.post('/login/', creds)
      .then(data => {
        setState('user', new User(data))
        draw()
      })
      .catch(console.error)
  }

  getPosts(drawPosts) {
    postApi.get()
      .then(data => {
        console.log(data)
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

  getUpvotes() {
    upvoteApi.get()
      .then(data => {
        console.log(data)
        setState('upvotes', data.map(upvote => new Upvote(upvote)))
      })
  }
  getdownvotes() {
    downvoteApi.get()
      .then(data => {
        console.log(data)
        setState('downvotes', data.map(downvote => new Downvote(downvote)))
      })
  }

  get state() {
    return { ...state }
  }
}