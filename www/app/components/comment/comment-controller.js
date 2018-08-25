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
      userId: store.state.user.user._id,
      content: e.target.comment.value,
      // postId: store.state.activePost
    }
    store.createComment(newComment, drawCommentsList)
  }
}

