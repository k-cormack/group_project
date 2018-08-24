
import User from "../models/User.js"
import Post from "../models/Post.js"
import Comment from "../models/Comment.js"
import Downvote from "../models/Downvote.js"
import Upvote from "../models/Upvote.js"

let appStore

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

  get state() {
    return { ...state }
  }
}