export default class Comment {
  constructor(data) {
    this._id = data._id
    this.userId = data.userId
    this.postId = data.postId
    this.timestamp = data.timestamp
    this.content = data.content //from form
    this.votes = data.votes || []
  }
}