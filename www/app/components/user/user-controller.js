import Store from "../../store/store.js";


let store = new Store()
let userLogin = document.getElementById('user')

function draw() {
  userLogin.innerHTML =
    `
  <h1>Hello, ${store.state.user.username}</h1>
  <button onclick="app.controllers.post.getPosts()" class="btn btn-primary">See Posts!</button>
  <form onsubmit="app.controllers.post.createPost(event)>
    <input type="text" name="description" placeholder="New post here" />
  <button type="submit" class="btn btn-primary>Submit Post</button>
  `
}

export default class UserController {


  login(e) {
    e.preventDefault()
    let creds = {
      username: e.target.username.value,
      password: e.target.password.value
    }
    store.login(creds, draw)
  }

  register(e) {
    e.preventDefault()
    let creds = {
      username: e.target.username.value,
      password: e.target.password.value
    }
    store.register(creds, draw)
  }


}