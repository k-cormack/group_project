export default class Vote {
    constructor(data) {
        this._id = data._id
        this.userId = data.userId
        this.value = data.value
    }
}