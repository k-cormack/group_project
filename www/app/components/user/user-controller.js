import Store from "../../store/store.js";


let store = new Store()
let userLogin = document.getElementById('user')

function draw() {
  userLogin.innerHTML =
    `
  <h1>Hello, ${store.state.user.userName}</h1>
  <button onclick="app.controllers.post.getPosts()" class="btn-btn-primary">See Posts!</button>
  `
}

export default class UserController {


  login(e) {
    e.preventDefault()
    let creds = {
      userName: e.target.userName.value,
      password: e.target.password.value
    }
    store.login(creds, draw)
  }

  register(e) {
    e.preventDefault()
    let creds = {
      userName: e.target.userName.value,
      password: e.target.password.value
    }
    store.register(creds, draw)
  }


}