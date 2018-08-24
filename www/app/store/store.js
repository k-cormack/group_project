
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
    userApi.post('/login', creds)
      .then(data => {
        setState('user', new User(data))
        draw()
      })
      .catch(console.error)
  }

  get state() {
    return { ...state }
  }
}