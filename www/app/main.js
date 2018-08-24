
class App {
  constructor() {
    this.controllers = {
      user: new UserController,
      post: new PostController
    }
  }
}

window.app = new App()