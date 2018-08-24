export default class Comment {
  constructor(data) {
    this._id = data._id
    this.userId = data.userId
    this.postId = data.postId
    this.timeStamp = data.timeStamp
    this.content = data.content
    this.upvotes = data.upvotes
    this.downvotes = data.downvotes
    this.voteScore = data.voteScore
  }
}