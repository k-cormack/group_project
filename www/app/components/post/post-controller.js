import Store from "../../store/store.js";

let store = new Store()
let postList = document.getElementById("post-list")
// let postDetail = document.getElementById("post-detail")

let open = {}

function drawPostDetail() {
    let post = store.state.activePost
    if (!open[post._id]) {
        open[post._id] = true
        let template = `
        <p><strong>${post.title} &nbsp </strong> <i class="fa fa-plus-square" onclick="app.controllers.post.setActivePost('${post._id}')"></i><p>
        <h3>${post.title}</h3>
        <h5>${post.userName}</h5>
        <div>
            <img src="${post.content.imgUrl}" height="150"/>
        </div>
        <h5>${post.content.textInput}</h5>
        <div>
            <i class="fa fa-arrow-up" onclick="app.controllers.post.vote(1)"> </i>
           <div> ${post.votes.length}</div>
            <i class="fa fa-arrow-down" onclick="app.controllers.post.vote(-1)"> </i>
        </div>
        <div id="comments-${post._id}">
        </div>
        <div>
            <form onsubmit="app.controllers.post.createComment(event)">
            <input type="text" name="comment" placeholder="Enter your opinion here">
            <button type="submit">Post Comment</button>
            </form>
        </div>
        `
        document.getElementById(`post-${post._id}`).innerHTML = template
        drawCommentsList()

    }
    else {
        open[post._id] = false
        document.getElementById(`post-${post._id}`).innerHTML = post.basicDraw
    }

    console.log('drawn details!')
}

function drawPostList() {
    let template = ''
    store.state.posts.forEach(post => {
        template += post.basicDraw
    })
    postList.innerHTML = template
}

function drawCommentsList() {
    let post = store.state.activePost
    let elem = document.getElementById('comments-' + post._id)
    let template = ''
    post.comments.forEach(c => {
        template += `
            <p>${c.content}</p>
        `
    })
    elem.innerHTML = template
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

    vote(value) {
        let voteNumber = parseInt(value)
        let newVote = {
            userId: store.state.user._id,
            value: voteNumber,
            // username: store.state.user.userName
        }
        store.vote(newVote, drawPostDetail)
    }


}