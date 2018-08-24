
export default class Post {
  constructor(data) {
    this._id = data._id
    this.title = data.title
    this.description = data.description
    this.content = data.content
    this.userId = data.userId
    this.timestamp = data.timestamp || Date.now()
    this.comments = data.comments || []
    this.votes = data.votes || []
  }
}