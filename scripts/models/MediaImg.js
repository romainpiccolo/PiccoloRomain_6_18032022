import { Media } from './Media.js'

class MediaImg extends Media {
    constructor(data) {
        super(data);
        this._image = data.image;
    }

    get image() {
        return this._image
    }

    get thumbnail() {
        return `assets/photographers/medias/${this.photographerId}/${this.image}`;
    }
}

export { MediaImg };