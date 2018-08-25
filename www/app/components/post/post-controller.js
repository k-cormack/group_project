import Store from "../../store/store.js";

let store = new Store()
let postList = document.getElementById("post-list")
let postDetail = document.getElementById("post-detail")

function drawPostDetail() {
    let post = store.state.activePost
    let template = `
    <h3>${post.title}</h3>
    <h5>${post.userName}</h5>
    <div>
        <img src="${post.content.imgUrl}" height="150"/>
    </div>

    
    `


    console.log('drawn details!')
}

function drawPostList() {
    let template = ''
    store.state.posts.forEach(post => {
        template += `
            <p><strong>${post.title} &nbsp </strong> <i class="fa fa-plus-square" onclick="app.controllers.post.setActivePost('${post._id}')"></i><p>
            <p>${post.content.textInput}<p>
            <p>Comments: ${post.comments.length}<p>
            <div>
            <form onsubmit="app.controllers.post.createComment(event)">
              <input type="text" name="comment" placeholder="Enter your opinion here">
              <button type="submit">Post Comment</button>
            </form>
          </div>
            <hr />        
        `
    })
    postList.innerHTML = template
}

function drawCommentsList() {
    console.log('drawn comment list')
    drawPostList()
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
            userName: store.state.user.userName,
            title: e.target.title.value,
            content: {
                imgUrl: e.target.imgUrl.value,
                textInput: e.target.textInput.value
            }
        }
        store.createPost(newPost, drawPostList)
        e.target.reset()
    }

    setActivePost(postID) {
        console.log("PC set active post: ", postID)
        store.setActivePost(postID, drawPostDetail)
    }

    createComment(e) {
        e.preventDefault()
        let newComment = {
            userId: store.state.user._id,
            postId: store.state.activePost._id,
            content: e.target.comment.value
        }
        store.createComment(newComment, drawCommentsList)
        e.target.reset()
    }


}