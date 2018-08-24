
export default class Upvote {
  constructor(data) {
    this._id = data._id
    this.userId = data.userId
    this.commentId = data.commentId
    this.postId = data.postId
  }
}