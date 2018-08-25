import Store from "../../store/store.js";

let store = new Store()
let postList = document.getElementById("post-list")
let postDetail = document.getElementById("post-detail")

function drawPostDetail(post) {
    console.log('drawn details!')
}

function drawPostList() {
    let template = ''
    store.state.posts.forEach(post => {
        template += `
            <p><strong>${post.title} &nbsp </strong> <i class="fa fa-plus-square" onclick="app.controllers.post.setActivePost(${post._id})"></i><p>
            <p>${post.content.textInput}<p>
            <p>Comments: ${post.comments.length}<p>
            <div>
            <form onsubmit="app.controllers.comment.createComment(event)">
              <input type="text" name="comment" placeholder="Enter your opinion here">
              <button type="submit">Post Comment</button>
            </form>
          </div>
            <hr />        
        `
    })
    postList.innerHTML = template
}

function drawComment() {
    console.log("drawing comment")
}

export default class PostController {
    getPosts() {
        store.getPosts(drawPostList)
    }
    createPost(e) {
        e.preventDefault()
        let newPost = {
            userId: store.state.user._id,
            title: e.target.title.value,
            content: {
                imgUrl: e.target.imgUrl.value,
                vidUrl: e.target.vidUrl.value,
                textInput: e.target.textInput.value
            }
        }
        store.createPost(newPost, drawPostList)
        e.resetDefault()
    }

    setActivePost(postID) {
        store.setActivePost(postID, drawPostDetail)
    }


}
