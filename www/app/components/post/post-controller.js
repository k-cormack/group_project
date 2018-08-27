import Store from "../../store/store.js";

let store = new Store()
let postList = document.getElementById("post-list")
// let postDetail = document.getElementById("post-detail")

let open = {}

//draw full details for active post when selected
function drawPostDetail() {
    let post = store.state.activePost
    if (!open[post._id]) {
        open[post._id] = true
        let template = `
        <p><strong>${post.title} &nbsp </strong> <i class="fa fa-plus-square" onclick="app.controllers.post.setActivePost('${post._id}')"></i><p>
        <h3>${post.title}</h3>
        <h5>${post.userName}</h5>
        <button class="btn-btn-primary" onclick="app.controllers.post.deletePost()">Delete Post</button>
        <div>
            <img src="${post.content.imgUrl}" height="150"/>
        </div>
        <h5>${post.content.textInput}</h5>
        <div>
            <i class="fa fa-arrow-up" onclick="app.controllers.post.votePost(1)"> </i>
           <div id="score-${post._id}"> 
           
           </div>
            <i class="fa fa-arrow-down" onclick="app.controllers.post.votePost(-1)"> </i>
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
        drawVoteScore(post)
        drawCommentsList()

    }
    else {
        open[post._id] = false
        document.getElementById(`post-${post._id}`).innerHTML = post.basicDraw
    }

    console.log('drawn details!')
}

//draw list of all posts, summary version
function drawPostList() {
    let template = ''
    store.state.posts.forEach(post => {
        template += post.basicDraw
    })
    postList.innerHTML = template
}

//draw complete list of comments associate with active post
function drawCommentsList() {
    let post = store.state.activePost
    let elem = document.getElementById('comments-' + post._id)
    let template = ''
    post.comments.forEach(c => {
        template += `
            <div><p style="display: inline-block;">
            <i class="fa fa-arrow-up" onclick="app.controllers.post.voteComment(1, '${c._id}')"> </i>
                <span id="score-${c._id}"> </span>
            <i class="fa fa-arrow-down" onclick="app.controllers.post.voteComment(-1, '${c._id}')"> </i>
            ${c.content} &nbsp</p><button class="btn btn-primary" 
            onclick="app.controllers.post.deleteComment('${c._id}')">Delete Comment</button></div>
        `
        console.log("drawing comments:", c)
        //drawVoteScore(c)
    })
    elem.innerHTML = template
}

//draw current voteScore
function drawVoteScore(postcomment) {
    // let post = store.state.activePost    
    let elem = document.getElementById('score-' + postcomment._id)

    let sum = 0
    postcomment.votes.forEach(vote => {
        return sum += vote.value
    })
    elem.innerHTML = `<strong>${sum}</strong>`
}

//sort posts by timestamp compare function
function comparePosts(post1, post2) {
    const time1 = post1.timestamp
    const time2 = post2.timestamp
    let comparison = 0
    if (time2 > time1) {
        comparison = 1
    }
    else if (time1 > time2) {
        comparison = -1
    }
    return comparison
}

export default class PostController {

    //get all posts
    getPosts() {
        store.getPosts(drawPostList)
    }

    //create a new post
    createPost(e) {
        e.preventDefault()
        let newPost = {
            userId: store.state.user._id,
            userName: store.state.user.userName,
            title: e.target.title.value,
            timestamp: Date.now(),
            content: {
                imgUrl: e.target.imgUrl.value,
                textInput: e.target.textInput.value
            }
        }
        store.createPost(newPost, drawPostList)
        e.target.reset()
    }

    //set currentpost as the active post
    setActivePost(postID) {
        console.log("PC set active post: ", postID)
        store.setActivePost(postID, drawPostDetail)
    }

    //up or down vote a post
    votePost(value) {
        let voteNumber = parseInt(value)
        let prevVote = store.state.activePost.votes.find(vote => {
            return vote.userId == store.state.user._id
        })
        if (prevVote && prevVote.value == voteNumber) {
            voteNumber = 0;
        }
        let newVote = {
            userId: store.state.user._id,
            value: voteNumber
        }
        store.votePost(newVote, drawVoteScore)
    }

    //delete active post
    deletePost() {
        store.deletePost(drawPostList)
    }

    //sort posts by timestamp--most recent on top
    sortPosts() {
        store.sortPosts(comparePosts, drawPostList)
    }

    //add a new comment
    createComment(e) {
        e.preventDefault()
        let newComment = {
            userId: store.state.user._id,
            postId: store.state.activePost._id,
            content: e.target.comment.value,
            timestamp: Date.now()
        }
        store.createComment(newComment, drawCommentsList)
        e.target.reset()
    }

    //delete a comments
    deleteComment(commentId) {
        store.deleteComment(commentId, drawPostDetail)
    }

    //upvote or downvote a comment
    voteComment(value, commentId) {
        let voteNumber = parseInt(value)
        console.log("receiving vote: ", voteNumber)
        //find comment object
        let comment = store.state.activePost.comments.find(c => {
            return c._id == commentId
        })

        //determine if user has already voted on that comment
        let prevVote = comment.votes.find(vote => {
            return vote.userId == store.state.user._id
        })
        console.log("prev vote found: ", prevVote)
        //if user has previously voted the same value, set it to 0
        if (prevVote && prevVote.value == voteNumber) {
            voteNumber = 0;
        }
        let newVote = {
            userId: store.state.user._id,
            value: voteNumber
        }
        store.voteComment(newVote, commentId, drawVoteScore)
    }



}