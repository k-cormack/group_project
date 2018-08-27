import Store from "../../store/store.js";


let store = new Store()
let userLogin = document.getElementById('user')

function draw() {
  userLogin.innerHTML =
    `
  <h1>Hello, ${store.state.user.userName}</h1>
  <button onclick="app.controllers.post.getPosts()" class="btn btn-primary">View Posts</button>
  <button onclick="app.controllers.post.sortPosts()" class="btn btn-primary">Sort Posts</button>
  `
  document.getElementById("new-post").innerHTML = `
    <form onsubmit="app.controllers.post.createPost(event)">
      <input type="text" name="title" placeholder="Post Title here" autocomplete="off"/>
      <input type="text" name="textInput" placeholder="Enter comments here" autocomplete="off" />
      <input type="url" name="imgUrl" placeholder="Image URL here" autocomplete="off"/>      
      <button type="submit" class="btn btn-primary">Submit Post</button>
    </form> 
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