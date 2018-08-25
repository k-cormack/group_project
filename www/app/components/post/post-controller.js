import Store from "../../store/store.js";

let store = new Store()

function drawPostDetail() {
    console.log('drawn details!')
}

function drawPostList() {
    console.log('drawn list')
}

function drawComment() {
    console.log("drawing comment")
}

export default class PostController {
    getPosts() {
        store.getPosts(drawPostList)
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
