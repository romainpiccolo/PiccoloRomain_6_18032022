import { mediaIsAVideo } from '../utils/helpers.js'

class Lightbox {

    static #mediaIsAVideo = mediaIsAVideo;
    static #lightboxDOM = document.getElementById('lightbox');
    static #previousContentDOM = document.getElementById('lightbox-previous');
    static #nextContentDOM = document.getElementById('lightbox-next');
    static #closeLightbox = document.getElementById('lightbox-close');
    static #imgContentDOM =  document.querySelector('.dialog-img-content');
    static #videoContentDOM =  document.querySelector('.dialog-video-content');
    static #contentPATH = `assets/photographers/medias/`;

    constructor(listMedias, currentId) {
        this.medias = listMedias;
        this.currentId = currentId;
    }

    _openLightbox() {
        Lightbox.#lightboxDOM.style.display = 'block';
    }

    init() {
        Lightbox.#previousContentDOM.addEventListener('click', () => this.previous());
        Lightbox.#nextContentDOM.addEventListener('click', () => this.next());
        Lightbox.#closeLightbox.addEventListener('click', this.close);

        this.loadContent();
        this._openLightbox();
    }

    loadContent() {
        const media = this.medias.find(media => media.id === this.currentId);
        const mediaIsAVideo = Lightbox.#mediaIsAVideo(media);

        if (mediaIsAVideo) {
            Lightbox.#videoContentDOM.src = Lightbox.#contentPATH + `${media.photographerId}/${media.video}`;
            Lightbox.#videoContentDOM.querySelector('source').src = Lightbox.#contentPATH + `${media.photographerId}/${media.video}`;

            console.log('video');
        } else {
            Lightbox.#imgContentDOM.src = Lightbox.#contentPATH + `${media.photographerId}/${media.image}`;
            Lightbox.#imgContentDOM.alt = media.alt;
        }

        Lightbox.#imgContentDOM.style.display = mediaIsAVideo ? 'none' : 'block';
        Lightbox.#videoContentDOM.style.display = mediaIsAVideo ? 'block' : 'none';
    }

    next() {
        const currentIndex = this.medias.findIndex(media => media.id === this.currentId)

        if (currentIndex < this.medias.length - 1) {
            this.currentId = this.medias[currentIndex + 1].id;
        } else {
            this.currentId = this.medias[0].id;
        }
        this.loadContent();
    }

    previous() {
        
        const currentIndex = this.medias.findIndex(media => media.id === this.currentId)

        if (currentIndex > 0) {
            this.currentId = this.medias[currentIndex - 1].id;
        } else {
            this.currentId = this.medias[this.medias.length - 1].id;
        }
        this.loadContent();
    }

    close() {
        Lightbox.#lightboxDOM.style.display = 'none';
    }
}

export { Lightbox };