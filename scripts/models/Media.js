class Media {
    constructor(data) {
        this._id = data.id;
        this._date = data.date;
        this._likes = data.likes;
        this._photographerId = data.photographerId;
        this._price = data.price;
        this._title = data.title;
        this._mediaType =  Object.prototype.hasOwnProperty.call(data, 'video') ? 'video': 'img';
    }

    get id() {
        return this._id
    }

    get date() {
        return this._date
    }

    get likes() {
        return this._likes
    }

    get photographerId() {
        return this._photographerId
    }

    get price() {
        return this._price
    }

    get title() {
        return this._title
    }
    
    get mediaType() {
        return this._mediaType
    }
}

export { Media };