
export default class Post {
  constructor(data) {
    this._id = data._id
    this.title = data.title
    this.description = data.description
    this.content = data.content
    this.userId = data.userId
    this.timestamp = data.timestamp
    this.comments = data.comments
    this.upvotes = data.upvotes
    this.downvotes = data.downvotes
    this.voteScore = data.voteScore
  }
}