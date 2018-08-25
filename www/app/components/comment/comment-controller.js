import Store from "../../store/store.js";

let store = new Store()

function drawCommentDetail() {
  console.log('drawn Comment details!')
}
function drawCommentsList() {
  console.log('drawn comment list')
}

export default class CommentController {
  getComments() {
    store.getComments()
  }
  createComment(e) {
    e.preventDefault()
    let newComment = {
      userId: store.state.user._id,
      postId: store.state.activePost._id,
      content: e.target.comment.value
    }
    store.createComment(newComment, drawCommentsList)
  }
}

