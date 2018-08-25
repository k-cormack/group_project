
export default class Post {
  constructor(data) {
    this._id = data._id
    this.title = data.title
    this.content = data.content
    this.userId = data.userId
    this.userName = data.userName
    this.timestamp = data.timestamp || Date.now()
    this.comments = data.comments || []
    this.votes = data.votes || []
  }

  get basicDraw() {
    return `
    <div id="post-${this._id}">
    <p><strong>${this.title} &nbsp </strong> <i class="fa fa-plus-square" onclick="app.controllers.post.setActivePost('${this._id}')"></i><p>
    <p>${this.content.textInput}<p>
    <p>Comments: ${this.comments.length}<p>
    <div>
    <div id="comments-${this._id}"></div>
    <form onsubmit="app.controllers.post.createComment(event)">
      <input type="text" name="comment" placeholder="Enter your opinion here">
      <button type="submit">Post Comment</button>
    </form>
  </div>
    <hr />  
    </div>      
`
  }
}