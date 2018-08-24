import Store from "../../store/store.js";
import { deflateRaw } from "zlib";

let store = new Store()

function draw() {
  console.log("Login successful")
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


}