import UserController from "./components/user/user-controller.js"
import PostController from "./components/post/post-controller.js"

class App {
  constructor() {
    this.controllers = {
      user: new UserController,
      post: new PostController
    }
  }
}

window.app = new App()