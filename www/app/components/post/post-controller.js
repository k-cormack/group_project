import Store from "../../store/store.js";

let store = new Store()

function drawPost() {
    console.log('drawn!')
}

export default class PostController {
    getPosts() {
        store.getPosts(drawPost)
        store.getComments()
        drawPost()
    }


}