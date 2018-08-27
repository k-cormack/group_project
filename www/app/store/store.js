
import User from "../models/User.js"
import Post from "../models/Post.js"
import Comment from "../models/Comment.js"
import Vote from "../models/Vote.js"

//singleton store
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

//update state properties
function setState(prop, data) {
  state[prop] = data
  console.log('state: ', state)
}

//get all comments
function getComments(drawPosts) {
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

//gets the activePost comments to draw to screen
function getPostComments(drawPost) {
  commentApi.get(`by-post/${state.activePost._id}`)
    .then(res => {
      state.activePost.comments = res.data.map(comment => new Comment(comment))
      drawPost()
    })
    .catch(err => console.error(err.message))
}


export default class Store {

  get state() {
    return { ...state }
  }

  //register new user
  register(creds, draw) {
    userApi.post('/register', creds)
      .then(data => {
        setState('user', new User(data.data))
        draw()
      })
      .catch(console.error)
  }

  //login authorized user
  login(creds, draw) {
    userApi.post('/login', creds)
      .then(data => {
        setState('user', new User(data.data))
        draw()
      })
      .catch(console.error)
  }

  //retrieve all posts
  getPosts(drawPosts) {
    postApi.get()
      .then(data => {
        console.log('get posts: ', data)
        setState('posts', data.data.map(post => new Post(post)))
        getComments(drawPosts)
        //drawPosts()
      })
  }



  //create new post
  createPost(newPost, draw) {
    postApi.post('', newPost)
      .then(data => {
        console.log(data)
        let post = new Post(data.data)
        state.posts.push(post)
        draw()
      })
  }

  setActivePost(postID, draw) {
    let myPost = state.posts.find(post => {
      return post._id == postID
    })
    setState('activePost', myPost)
    console.log("active post: ", state.activePost)
    draw()
  }

  //up or down vote a post
  votePost(newVote, draw) {
    postApi.put(`/${state.activePost._id}/vote`, newVote)
      .then(res => {
        let post = res.data
        state.activePost.votes = post.votes.map(v => new Vote(v))
        draw(post)
      })
      .catch(err => {
        console.log(err.message)
      })
  }

  //delete active post
  deletePost(draw) {
    //user can only delete their own post
    if (state.activePost.userId != state.user._id) { return }
    postApi.delete(`/${state.activePost._id}`)
      .then(res => {
        console.log(res)
        this.getPosts(draw)
      })
      .catch(err => console.error(err.message))

  }

  sortPosts(compare, draw) {
    let sorted = state.posts.sort(compare)
    setState('posts', sorted)
    draw()
  }

  //create a new comment
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

  //delete a comment
  deleteComment(commentId, draw) {
    let comment = state.activePost.comments.find(c => {
      return c._id = commentId
    })
    if (comment.userId != state.user._id) { return }
    commentApi.delete(`/${commentId}`)
      .then(data => {
        console.log(data)
        getPostComments(draw)
      })
      .catch(err => console.error(err.message))
  }

  //up or down vote a comment
  voteComment(newVote, commentId, draw) {
    console.log("sending vote value: ", newVote.value)
    let comment = state.activePost.comments.find(c => {
      return c._id == commentId
    })
    commentApi.put(`/${commentId}/vote`, newVote)
      .then(res => {
        console.log("new vote: ", res.data)
        comment.votes = res.data.votes.map(v => new Vote(v))
        draw(comment)
      })
      .catch(err => {
        console.log(err.message)
      })
  }

}