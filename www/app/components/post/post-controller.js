import Store from "../../store/store.js";

let store = new Store()

function drawPostDetail() {
    console.log('drawn Post details!')
}

function drawPostList() {
    console.log('drawn post list')
}

export default class PostController {
    getPosts() {
        store.getPosts(drawPostList)
        store.getComments()
    }
    createPost(e) {
        let newPost = {
            userId: store.state.user.user._id,
            title: e.target.title.value,
            content: {
                imgUrl: e.target.imgUrl.value,
                vidUrl: e.target.vidUrl.value,
                textInput: e.target.textInput.value
            }
        }
        store.createPost(newPost, drawPostList)

    }

}
