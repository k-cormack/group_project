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
    let newComment = {
      userId: store.state.user.user._id,
      title: e.target.title.value,
      content: e.target.textInput.value
    }
    store.createComment(newComment, drawCommentsList)
  }
}

