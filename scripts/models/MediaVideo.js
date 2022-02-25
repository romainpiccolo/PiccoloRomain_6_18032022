import { Media } from './Media.js'

class MediaVideo extends Media {
    constructor(data) {
        super(data);
        this._video = data.video;
    }

    get video() {
        return this._video
    }

    get thumbnail() {
        return `assets/photographers/medias/${this.photographerId}/${this.video}`;
    }
}

export { MediaVideo };